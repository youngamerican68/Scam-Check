// app/components/ResultPanel.tsx
"use client";

import { ScamCheckResult, ScamVerdict } from "@/types/scamCheck";

interface ResultPanelProps {
  result: ScamCheckResult;
  onCheckAnother: () => void;
}

interface VerdictConfig {
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  textColor: string;
}

const VERDICT_CONFIG: Record<ScamVerdict, VerdictConfig> = {
  high_scam: {
    title: "🚨 High Likelihood This Is a Scam",
    color: "text-danger-700",
    bgColor: "bg-danger-50",
    borderColor: "border-danger-600",
    icon: "⛔",
    textColor: "text-danger-900",
  },
  suspicious: {
    title: "⚠️ Suspicious - Treat With Extreme Caution",
    color: "text-warning-700",
    bgColor: "bg-warning-50",
    borderColor: "border-warning-600",
    icon: "⚠️",
    textColor: "text-warning-900",
  },
  no_obvious_scam: {
    title: "ℹ️ No Obvious Scam Signals Detected",
    color: "text-neutral-700",
    bgColor: "bg-neutral-50",
    borderColor: "border-neutral-400",
    icon: "ℹ️",
    textColor: "text-neutral-900",
  },
};

export default function ResultPanel({ result, onCheckAnother }: ResultPanelProps) {
  const config = VERDICT_CONFIG[result.verdict];
  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Verdict Header */}
      <div
        className={`${config.bgColor} ${config.borderColor} border-l-4 rounded-lg p-6`}
      >
        <h2 className={`text-2xl sm:text-3xl font-bold ${config.color} mb-3`}>
          {config.title}
        </h2>
        <p className={`text-base sm:text-lg ${config.textColor} leading-relaxed`}>
          {result.summary}
        </p>
        <div className="mt-3 text-sm text-neutral-600">
          <span className="font-medium">Analysis Confidence:</span> {confidencePercent}%
        </div>
      </div>

      {/* Recommendation */}
      {result.verdict === "high_scam" && (
        <div className="bg-danger-100 border-2 border-danger-600 rounded-lg p-5">
          <h3 className="text-xl font-bold text-danger-900 mb-2 flex items-center">
            <span className="text-2xl mr-2">🛑</span>
            DO NOT INTERACT WITH THIS MESSAGE
          </h3>
          <p className="text-danger-800 font-medium">
            Do not reply, do not click any links, do not call any numbers, and do not send any money or information.
          </p>
        </div>
      )}

      {result.verdict === "suspicious" && (
        <div className="bg-warning-100 border-2 border-warning-600 rounded-lg p-5">
          <h3 className="text-xl font-bold text-warning-900 mb-2 flex items-center">
            <span className="text-2xl mr-2">⚠️</span>
            PROCEED WITH EXTREME CAUTION
          </h3>
          <p className="text-warning-800 font-medium">
            Verify this message through official channels before taking any action. Do not use contact information provided in the message.
          </p>
        </div>
      )}

      {/* Tactics Section */}
      {result.tactics.length > 0 && (
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-neutral-900 mb-4">
            How they might be trying to trick you:
          </h3>
          <ul className="space-y-2">
            {result.tactics.map((tactic, index) => (
              <li key={index} className="flex items-start">
                <span className="text-danger-600 font-bold mr-3 mt-1">•</span>
                <span className="text-base text-neutral-800">{tactic}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safe Steps Section */}
      <div className="bg-safe-50 border border-safe-600 rounded-lg p-6">
        <h3 className="text-xl font-bold text-safe-900 mb-4">
          ✅ Safe next steps:
        </h3>
        <ol className="space-y-3">
          {result.safeSteps.map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-safe-600 text-white font-bold mr-3 flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-base text-neutral-800 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* General Advice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="text-lg font-bold text-blue-900 mb-2">
          Remember:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Real companies never ask for payment via gift cards, wire transfers, or cryptocurrency</li>
          <li>Real companies never threaten immediate action or arrest</li>
          <li>When in doubt, hang up and call the official number yourself</li>
          <li>It's always okay to say "no" or "let me think about it"</li>
        </ul>
      </div>

      {/* Additional Resources */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5">
        <h4 className="text-lg font-bold text-neutral-900 mb-3">
          Need more help?
        </h4>
        <div className="space-y-2 text-sm text-neutral-700">
          <p>
            <strong>Report fraud to the FTC:</strong>{" "}
            <a
              href="https://reportfraud.ftc.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              reportfraud.ftc.gov
            </a>
          </p>
          <p>
            <strong>National Elder Fraud Hotline:</strong>{" "}
            <a href="tel:1-833-372-8311" className="text-blue-600 hover:underline">
              1-833-FRAUD-11 (1-833-372-8311)
            </a>
          </p>
          <p>
            <strong>AARP Fraud Watch Network:</strong>{" "}
            <a
              href="https://www.aarp.org/money/scams-fraud/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              aarp.org/scams-fraud
            </a>
          </p>
        </div>
      </div>

      {/* Check Another Button */}
      <div className="text-center pt-4">
        <button
          onClick={onCheckAnother}
          className="bg-neutral-600 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-neutral-700 focus:outline-none focus:ring-4 focus:ring-neutral-300 transition-colors"
        >
          Check Another Message
        </button>
      </div>

      {/* Transparency Note */}
      {result.rawModelReasoning && (
        <details className="text-sm text-neutral-600 bg-neutral-50 border border-neutral-200 rounded p-4">
          <summary className="cursor-pointer font-semibold hover:text-neutral-900">
            How we analyzed this (technical details)
          </summary>
          <p className="mt-2 whitespace-pre-wrap font-mono text-xs">
            {result.rawModelReasoning}
          </p>
        </details>
      )}
    </div>
  );
}
