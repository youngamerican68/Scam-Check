// lib/validation.ts
// Input validation and sanitization utilities

import { ContextWhoFor, ScamCheckInput } from "@/types/scamCheck";

// Maximum allowed text length (configurable via env)
const MAX_TEXT_LENGTH = parseInt(process.env.MAX_TEXT_LENGTH || "8000", 10);

// Maximum image size in bytes (5MB default)
const MAX_IMAGE_SIZE_BYTES = (parseInt(process.env.MAX_IMAGE_SIZE_MB || "5", 10)) * 1024 * 1024;

/**
 * Validation error class
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Normalizes the contextWhoFor field, defaulting to "self" if undefined
 */
export function normalizeContextWhoFor(
  context: ContextWhoFor | undefined | null
): ContextWhoFor {
  if (!context || !["self", "parent", "other"].includes(context)) {
    return "self";
  }
  return context;
}

/**
 * Sanitizes and validates text input
 */
export function validateText(text: string | undefined | null): string {
  if (!text || typeof text !== "string") {
    throw new ValidationError("Text content is required");
  }

  const trimmed = text.trim();

  if (trimmed.length === 0) {
    throw new ValidationError("Text content cannot be empty");
  }

  if (trimmed.length > MAX_TEXT_LENGTH) {
    throw new ValidationError(
      `Text content exceeds maximum length of ${MAX_TEXT_LENGTH} characters`
    );
  }

  return trimmed;
}

/**
 * Validates base64 image string
 */
export function validateImageBase64(
  imageBase64: string | null | undefined
): string | null {
  if (!imageBase64) {
    return null;
  }

  if (typeof imageBase64 !== "string") {
    throw new ValidationError("Invalid image data format");
  }

  // Check if it's a valid base64 data URI
  const base64Pattern = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;
  if (!base64Pattern.test(imageBase64)) {
    throw new ValidationError(
      "Image must be a valid base64 data URI (png, jpeg, jpg, gif, or webp)"
    );
  }

  // Estimate size (base64 is ~1.37x the original size)
  const estimatedSize = (imageBase64.length * 3) / 4;
  if (estimatedSize > MAX_IMAGE_SIZE_BYTES) {
    const maxMB = MAX_IMAGE_SIZE_BYTES / (1024 * 1024);
    throw new ValidationError(
      `Image size exceeds maximum of ${maxMB}MB`
    );
  }

  return imageBase64;
}

/**
 * Validates the complete ScamCheckInput
 */
export function validateScamCheckInput(
  input: Partial<ScamCheckInput>
): ScamCheckInput {
  const text = validateText(input.text);
  const contextWhoFor = normalizeContextWhoFor(input.contextWhoFor);
  const imageBase64 = validateImageBase64(input.imageBase64);

  return {
    text,
    contextWhoFor,
    imageBase64,
  };
}

/**
 * Checks if text contains obvious sensitive data patterns
 * Returns warnings if detected
 */
export function detectSensitiveData(text: string): string[] {
  const warnings: string[] = [];

  // SSN pattern (XXX-XX-XXXX)
  if (/\b\d{3}-\d{2}-\d{4}\b/.test(text)) {
    warnings.push("Possible Social Security Number detected");
  }

  // Credit card pattern (simplified)
  if (/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/.test(text)) {
    warnings.push("Possible credit card number detected");
  }

  // Password-like strings
  if (/password[\s:=]+\S+/i.test(text)) {
    warnings.push("Possible password detected");
  }

  return warnings;
}
