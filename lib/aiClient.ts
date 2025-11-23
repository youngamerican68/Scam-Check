// lib/aiClient.ts
// Generic AI client for scam analysis with swappable providers

import {
  ScamCheckInput,
  ScamCheckResult,
  ScamVerdict,
  AIProviderConfig,
} from "@/types/scamCheck";
import {
  SYSTEM_PROMPT,
  generateUserPrompt,
  getFallbackResult,
} from "./scamPrompt";

/**
 * Determines which AI provider to use based on environment variables
 */
function getProviderConfig(): AIProviderConfig {
  const provider = (process.env.AI_PROVIDER || "mock") as AIProviderConfig["provider"];

  return {
    provider,
    apiKey: process.env.OPENAI_API_KEY ||
            process.env.MISTRAL_API_KEY ||
            process.env.CUSTOM_AI_API_KEY,
    model: process.env.OPENAI_MODEL ||
           process.env.MISTRAL_MODEL ||
           process.env.CUSTOM_AI_MODEL,
    endpoint: process.env.CUSTOM_AI_ENDPOINT,
  };
}

/**
 * Mock AI implementation for development/testing
 * Uses simple heuristics to simulate scam detection
 */
async function mockAnalyzeScam(input: ScamCheckInput): Promise<ScamCheckResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const text = input.text.toLowerCase();
  let verdict: ScamVerdict = "no_obvious_scam";
  let confidence = 0.6;
  const tactics: string[] = [];

  // Simple heuristic checks
  const scamKeywords = [
    "urgent", "verify", "suspend", "limited time", "act now",
    "click here", "confirm your", "unusual activity", "verify your account",
    "gift card", "wire transfer", "bitcoin", "cryptocurrency",
    "social security", "ssn", "tax refund", "irs",
    "congratulations", "you've won", "claim your prize",
    "dear customer", "dear user"
  ];

  const highRiskKeywords = [
    "gift card", "bitcoin", "wire transfer", "your account will be closed",
    "arrest", "legal action", "suspended", "verify now or"
  ];

  let scamScore = 0;

  scamKeywords.forEach((keyword) => {
    if (text.includes(keyword)) {
      scamScore += 1;
      tactics.push(`Uses urgency or suspicious language: "${keyword}"`);
    }
  });

  highRiskKeywords.forEach((keyword) => {
    if (text.includes(keyword)) {
      scamScore += 3;
    }
  });

  // Determine verdict based on score
  if (scamScore >= 6) {
    verdict = "high_scam";
    confidence = 0.9;
  } else if (scamScore >= 2) {
    verdict = "suspicious";
    confidence = 0.75;
  }

  // Generic tactics if none detected
  if (tactics.length === 0) {
    tactics.push("No obvious scam indicators detected in this analysis");
  }

  const summaries = {
    high_scam: "This message shows multiple red flags commonly found in scam attempts. The combination of urgency, unusual requests, and suspicious language is typical of fraud.",
    suspicious: "This message contains some concerning elements that warrant caution. While it might be legitimate, the language and requests match patterns we see in scams.",
    no_obvious_scam: "We didn't find obvious scam indicators, but that doesn't guarantee this message is safe. Always verify unexpected messages through official channels."
  };

  const safeSteps = verdict === "high_scam"
    ? [
        "DO NOT reply, click any links, or call any numbers in this message",
        "DO NOT provide any personal information or payment",
        "If this claims to be from a real company, contact them directly using the official number from their website or your card",
        "Delete this message",
        "Consider reporting it to the FTC at reportfraud.ftc.gov"
      ]
    : verdict === "suspicious"
    ? [
        "DO NOT click any links or provide information yet",
        "Verify this is real by contacting the company directly using a phone number from their official website (not the message)",
        "Do not use phone numbers or links provided in the message",
        "If you're unsure, ask a trusted family member or friend for help",
        "When in doubt, it's safer to ignore the message"
      ]
    : [
        "Even if this looks legitimate, verify unexpected requests through official channels",
        "Never click links or download attachments from unexpected messages",
        "Contact the organization directly using official contact info if you have any doubts",
        "Be cautious about sharing personal or financial information"
      ];

  return {
    verdict,
    confidence,
    summary: summaries[verdict],
    tactics: tactics.slice(0, 5), // Limit to 5 tactics
    safeSteps,
    rawModelReasoning: `Mock analysis detected ${scamScore} risk indicators. Verdict: ${verdict}. This is a simulated analysis for development purposes.`
  };
}

/**
 * OpenAI implementation
 */
async function openAIAnalyzeScam(
  input: ScamCheckInput,
  config: AIProviderConfig
): Promise<ScamCheckResult> {
  if (!config.apiKey) {
    throw new Error("OpenAI API key not configured");
  }

  const model = config.model || "gpt-4-turbo-preview";
  const userPrompt = generateUserPrompt(
    input.text,
    input.contextWhoFor || "self",
    !!input.imageBase64
  );

  const messages: any[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userPrompt }
  ];

  // If image is provided, use vision capabilities
  if (input.imageBase64) {
    messages[1] = {
      role: "user",
      content: [
        { type: "text", text: userPrompt },
        {
          type: "image_url",
          image_url: { url: input.imageBase64 }
        }
      ]
    };
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.3, // Lower temperature for more consistent analysis
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No response from OpenAI");
  }

  return parseAIResponse(content);
}

/**
 * Mistral implementation
 */
async function mistralAnalyzeScam(
  input: ScamCheckInput,
  config: AIProviderConfig
): Promise<ScamCheckResult> {
  if (!config.apiKey) {
    throw new Error("Mistral API key not configured");
  }

  const model = config.model || "mistral-large-latest";
  const userPrompt = generateUserPrompt(
    input.text,
    input.contextWhoFor || "self",
    !!input.imageBase64
  );

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Mistral API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No response from Mistral");
  }

  return parseAIResponse(content);
}

/**
 * Custom endpoint (Nemotron/vLLM) implementation
 */
async function customAnalyzeScam(
  input: ScamCheckInput,
  config: AIProviderConfig
): Promise<ScamCheckResult> {
  if (!config.endpoint) {
    throw new Error("Custom AI endpoint not configured");
  }

  const model = config.model || "default";
  const userPrompt = generateUserPrompt(
    input.text,
    input.contextWhoFor || "self",
    !!input.imageBase64
  );

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (config.apiKey) {
    headers["Authorization"] = `Bearer ${config.apiKey}`;
  }

  const response = await fetch(`${config.endpoint}/chat/completions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Custom AI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No response from custom AI");
  }

  return parseAIResponse(content);
}

/**
 * Parses and validates AI response JSON
 */
function parseAIResponse(content: string): ScamCheckResult {
  try {
    const parsed = JSON.parse(content);

    // Validate required fields
    if (!parsed.verdict || !["high_scam", "suspicious", "no_obvious_scam"].includes(parsed.verdict)) {
      throw new Error("Invalid verdict in AI response");
    }

    return {
      verdict: parsed.verdict as ScamVerdict,
      confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0.5,
      summary: parsed.summary || "Analysis completed",
      tactics: Array.isArray(parsed.tactics) ? parsed.tactics : [],
      safeSteps: Array.isArray(parsed.safeSteps) ? parsed.safeSteps : [],
      rawModelReasoning: parsed.rawModelReasoning,
    };
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    // Return fallback if parsing fails
    const fallback = JSON.parse(getFallbackResult("Failed to parse AI response"));
    return fallback as ScamCheckResult;
  }
}

/**
 * Main entry point for scam analysis
 * Automatically selects the appropriate provider and handles errors
 */
export async function analyzeScam(
  input: ScamCheckInput
): Promise<ScamCheckResult> {
  const config = getProviderConfig();

  try {
    switch (config.provider) {
      case "openai":
        return await openAIAnalyzeScam(input, config);

      case "mistral":
        return await mistralAnalyzeScam(input, config);

      case "nemotron":
        return await customAnalyzeScam(input, config);

      case "mock":
      default:
        return await mockAnalyzeScam(input);
    }
  } catch (error) {
    console.error("AI analysis failed:", error);

    // Return conservative fallback result
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const fallback = JSON.parse(getFallbackResult(errorMessage));
    return fallback as ScamCheckResult;
  }
}
