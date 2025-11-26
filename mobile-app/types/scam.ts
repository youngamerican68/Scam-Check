// mobile-app/types/scam.ts
// Types matching the backend API (/api/check-scam)

/**
 * Verdict levels for scam detection
 */
export type ScamVerdict = "high_scam" | "suspicious" | "no_obvious_scam";

/**
 * Context for who the scam check is being performed for
 */
export type ContextWhoFor = "self" | "parent" | "other";

/**
 * Request payload sent to the API
 */
export interface ScamCheckRequest {
  /** The suspicious message text (required) */
  text: string;

  /** Context about who this check is for */
  contextWhoFor?: ContextWhoFor;

  /** Optional base64-encoded image of the message */
  imageBase64?: string | null;

  /** Whether the message is from a known/saved contact */
  fromKnownContact?: boolean;

  /** Optional: name of the contact if known */
  contactName?: string;
}

/**
 * Result returned from the API
 */
export interface ScamCheckResult {
  /** Overall verdict on the message */
  verdict: ScamVerdict;

  /** Confidence level (0-1) in the analysis */
  confidence: number;

  /** Plain-English summary (1-3 sentences) */
  summary: string;

  /** List of social engineering tactics identified */
  tactics: string[];

  /** Recommended safe next steps */
  safeSteps: string[];

  /** Raw reasoning from the model (for transparency/logging) */
  rawModelReasoning?: string;
}

/**
 * API error response
 */
export interface ScamCheckError {
  error: string;
  message?: string;
}
