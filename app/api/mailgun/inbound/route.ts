// app/api/mailgun/inbound/route.ts
// Mailgun inbound webhook for email-to-scan functionality

import crypto from "crypto";
import { analyzeScam } from "@/lib/aiClient";
import { ScamCheckInput, ScamCheckResult } from "@/types/scamCheck";
import { storeScanRecord, scanExistsForMessage, ScanRecord } from "@/lib/scanStore";

export const runtime = "nodejs";

// Environment configuration
const MAILGUN_SIGNING_KEY = process.env.MAILGUN_SIGNING_KEY!;
// Only allow signature bypass in development (never in production)
const BYPASS_SIGNATURE_CHECK =
  process.env.BYPASS_MAILGUN_SIGNATURE === "true" &&
  process.env.NODE_ENV === "development";

// Hardcoded test token for prototype (replace with DB lookup later)
const TEST_TOKEN = "k9Xm2pL8nQ";
const TEST_USER_ID = "user_test_001";

/**
 * Timing-safe comparison for HMAC signatures
 */
function timingSafeEqualHex(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

/**
 * Verify Mailgun webhook signature
 * Prevents spoofing and replay attacks
 */
function verifyMailgunSignature(params: {
  timestamp: string;
  token: string;
  signature: string;
}): boolean {
  const { timestamp, token, signature } = params;

  // Freshness check (5 minute window to prevent replay attacks)
  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;
  const nowSec = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSec - ts) > 5 * 60) return false;

  // HMAC verification
  const hmac = crypto
    .createHmac("sha256", MAILGUN_SIGNING_KEY)
    .update(timestamp + token)
    .digest("hex");

  return timingSafeEqualHex(hmac, signature);
}

/**
 * Extract domain from email "From" header
 * Examples: "Grandma <grandma@gmail.com>" -> "gmail.com"
 */
function extractDomain(fromHeader: string): string | null {
  const match = fromHeader.match(/@([A-Za-z0-9.-]+\.[A-Za-z]{2,})/);
  return match?.[1]?.toLowerCase() ?? null;
}

/**
 * Extract user token from recipient address
 * Format: u_<token>@scamshield.app
 */
function extractUserTokenFromRecipient(recipient: string): string | null {
  const m = recipient.toLowerCase().match(/^u_([a-z0-9]+)@scamshield\.app$/i);
  return m?.[1] ?? null;
}

/**
 * Look up userId from token
 * TODO: Replace with database/KV lookup
 */
function getUserIdFromToken(token: string): string | null {
  // Hardcoded for prototype
  if (token.toLowerCase() === TEST_TOKEN.toLowerCase()) {
    return TEST_USER_ID;
  }
  return null;
}


/**
 * POST /api/mailgun/inbound
 * Receives forwarded emails from Mailgun, analyzes them, and stores results
 */
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Extract Mailgun signature fields
    const timestamp = String(form.get("timestamp") ?? "");
    const token = String(form.get("token") ?? "");
    const signature = String(form.get("signature") ?? "");

    // Validate signature fields exist
    if (!timestamp || !token || !signature) {
      console.warn("Missing signature fields in Mailgun request");
      return new Response("Missing signature fields", { status: 400 });
    }

    // Verify webhook authenticity (skip in local dev if bypass enabled)
    if (BYPASS_SIGNATURE_CHECK) {
      console.warn("⚠️ Signature check bypassed - LOCAL TESTING ONLY");
    } else {
      if (!MAILGUN_SIGNING_KEY) {
        console.error("MAILGUN_SIGNING_KEY not configured");
        return new Response("Server not configured", { status: 500 });
      }

      if (!verifyMailgunSignature({ timestamp, token, signature })) {
        console.warn("Invalid Mailgun signature - possible spoofing attempt");
        return new Response("Invalid signature", { status: 403 });
      }
    }

    // Extract email fields from Mailgun
    const recipient = String(form.get("recipient") ?? "");
    const subject = String(form.get("subject") ?? "");
    const strippedText = String(form.get("stripped-text") ?? "");
    const bodyPlain = String(form.get("body-plain") ?? "");
    const from = String(form.get("from") ?? "");
    const messageId = String(
      form.get("Message-Id") ?? form.get("message-id") ?? ""
    );

    // Use stripped-text (removes quoted reply chains) or fall back to body-plain
    const text = (strippedText || bodyPlain || "").trim();

    // Log incoming email (redacted for privacy)
    console.log("Inbound email received:", {
      recipient,
      from: extractDomain(from),
      subjectLength: subject.length,
      textLength: text.length,
      hasMessageId: !!messageId,
    });

    // If we can't extract content, accept to prevent Mailgun retries
    if (!recipient || !text) {
      console.log("No actionable content in email");
      return new Response("Accepted (no content)", { status: 200 });
    }

    // Extract user token from recipient address
    const userToken = extractUserTokenFromRecipient(recipient);
    if (!userToken) {
      console.log("Could not extract user token from recipient:", recipient);
      return new Response("Accepted (no user token)", { status: 200 });
    }

    // Look up user from token
    const userId = getUserIdFromToken(userToken);
    if (!userId) {
      console.log("Unknown token:", userToken);
      return new Response("Accepted (unknown token)", { status: 200 });
    }

    // Dedupe: check if we already processed this email (prevents duplicates from retries/forwards)
    if (messageId && scanExistsForMessage(userId, messageId.slice(0, 200))) {
      console.log("Duplicate email detected, skipping:", messageId);
      return Response.json({ ok: true, duplicate: true }, { status: 200 });
    }

    // Prepare input for AI analysis
    const analysisInput: ScamCheckInput = {
      text: `Subject: ${subject}\n\n${text}`.slice(0, 8000), // Include subject in analysis
      contextWhoFor: "self",
      fromKnownContact: false, // Email forwards are typically from unknown senders
    };

    // Run AI analysis using existing analyzer
    let result: ScamCheckResult;
    try {
      result = await analyzeScam(analysisInput);
    } catch (error) {
      console.error("AI analysis failed for email:", error);
      // Store a failed scan record
      const scanId = `scan_${crypto.randomUUID()}`;
      storeScanRecord({
        id: scanId,
        userId,
        source: "email_forward",
        subjectSnippet: subject.slice(0, 80),
        fromDomain: extractDomain(from) ?? "unknown",
        messageId: messageId.slice(0, 200),
        verdict: "error",
        summary: "Analysis failed - please try again",
        tactics: [],
        safeSteps: [],
        confidence: 0,
        createdAt: new Date().toISOString(),
      });
      return Response.json({ ok: false, error: "Analysis failed" }, { status: 200 });
    }

    // Create minimal scan record (no raw email content stored)
    const scanId = `scan_${crypto.randomUUID()}`;
    const fromDomain = extractDomain(from) ?? "unknown";

    const scanRecord: ScanRecord = {
      id: scanId,
      userId,
      source: "email_forward",
      subjectSnippet: subject.slice(0, 80),
      fromDomain,
      messageId: messageId.slice(0, 200),
      verdict: result.verdict,
      summary: result.summary,
      tactics: result.tactics,
      safeSteps: result.safeSteps,
      confidence: result.confidence,
      createdAt: new Date().toISOString(),
    };

    // Store the scan record
    storeScanRecord(scanRecord);

    console.log("Email scan completed:", {
      scanId,
      userId,
      verdict: result.verdict,
      fromDomain,
    });

    // TODO: Send push notification to user's app
    // await sendPushNotification(userId, scanRecord);

    return Response.json({ ok: true, scanId });
  } catch (error) {
    console.error("Unexpected error in Mailgun webhook:", error);
    // Return 200 to prevent Mailgun retries on our errors
    return Response.json({ ok: false, error: "Internal error" }, { status: 200 });
  }
}

/**
 * GET /api/mailgun/inbound
 * Health check endpoint
 */
export async function GET() {
  // Only expose test info in development
  if (process.env.NODE_ENV === "development") {
    return Response.json({
      service: "Mailgun Inbound Webhook",
      status: "operational",
      testToken: TEST_TOKEN,
      testAddress: `u_${TEST_TOKEN}@scamshield.app`,
    });
  }

  return Response.json({
    service: "Mailgun Inbound Webhook",
    status: "operational",
  });
}
