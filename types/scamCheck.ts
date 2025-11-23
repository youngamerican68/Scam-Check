// types/scamCheck.ts
// Core type definitions for the Scam-Check application

/**
 * Context for who the scam check is being performed for.
 * Helps the AI tailor its response appropriately.
 */
export type ContextWhoFor = "self" | "parent" | "other";

/**
 * Verdict levels for scam detection.
 * We use three levels with a conservative bias:
 * - high_scam: Clear indicators of scam/fraud
 * - suspicious: Red flags present, treat with extreme caution
 * - no_obvious_scam: No clear scam signals, but still advise caution
 */
export type ScamVerdict = "high_scam" | "suspicious" | "no_obvious_scam";

/**
 * Input structure for scam analysis.
 * Sent from the frontend to the API endpoint.
 */
export interface ScamCheckInput {
  /** The suspicious message text (required) */
  text: string;

  /** Context about who this check is for */
  contextWhoFor?: ContextWhoFor;

  /** Optional base64-encoded image of the message */
  imageBase64?: string | null;
}

/**
 * Result structure from scam analysis.
 * Returned by the AI analysis and sent to the frontend.
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
 * API error response structure
 */
export interface ScamCheckError {
  error: string;
  message?: string;
}

/**
 * Configuration for AI providers
 */
export interface AIProviderConfig {
  provider: "openai" | "mistral" | "nemotron" | "mock";
  apiKey?: string;
  model?: string;
  endpoint?: string;
}
