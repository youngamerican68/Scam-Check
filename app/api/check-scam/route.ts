// app/api/check-scam/route.ts
// API endpoint for scam checking

import { NextRequest, NextResponse } from "next/server";
import { analyzeScam } from "@/lib/aiClient";
import { validateScamCheckInput, ValidationError, detectSensitiveData } from "@/lib/validation";
import { ScamCheckInput, ScamCheckResult, ScamCheckError } from "@/types/scamCheck";

/**
 * POST /api/check-scam
 * Analyzes a message for scam indicators
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    let validatedInput: ScamCheckInput;
    try {
      validatedInput = validateScamCheckInput(body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return NextResponse.json(
          { error: "VALIDATION_ERROR", message: error.message } as ScamCheckError,
          { status: 400 }
        );
      }
      throw error;
    }

    // Check for sensitive data in the input (warning only, not blocking)
    const sensitiveWarnings = detectSensitiveData(validatedInput.text);
    if (sensitiveWarnings.length > 0) {
      console.warn("Sensitive data detected in input:", sensitiveWarnings);
      // In production, you might want to log this for abuse monitoring
      // but we don't block the request - user might be checking a scam that contains this data
    }

    // Call AI analysis
    let result: ScamCheckResult;
    try {
      result = await analyzeScam(validatedInput);
    } catch (error) {
      console.error("AI analysis failed:", error);
      return NextResponse.json(
        {
          error: "AI_ANALYSIS_FAILED",
          message: "We couldn't complete the analysis right now. Please try again in a few moments."
        } as ScamCheckError,
        { status: 500 }
      );
    }

    // Log the analysis (in production, you'd use proper logging)
    console.log("Scam check completed:", {
      verdict: result.verdict,
      confidence: result.confidence,
      contextWhoFor: validatedInput.contextWhoFor,
      hasImage: !!validatedInput.imageBase64,
      textLength: validatedInput.text.length,
      timestamp: new Date().toISOString(),
    });

    // Return result
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Unexpected error in check-scam endpoint:", error);

    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message: "An unexpected error occurred. Please try again."
      } as ScamCheckError,
      { status: 500 }
    );
  }
}

/**
 * GET /api/check-scam
 * Returns API information (optional - for health checks)
 */
export async function GET() {
  return NextResponse.json({
    service: "Scam-Check One-Shot API",
    version: "1.0.0",
    status: "operational",
    endpoints: {
      POST: "/api/check-scam - Analyze a message for scam indicators"
    }
  });
}
