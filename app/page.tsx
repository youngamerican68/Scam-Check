// app/page.tsx
"use client";

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Disclaimer from "./components/Disclaimer";
import ScamCheckForm from "./components/ScamCheckForm";
import ResultPanel from "./components/ResultPanel";
import { ScamCheckResult } from "@/types/scamCheck";

export default function HomePage() {
  const [result, setResult] = useState<ScamCheckResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleResult = (newResult: ScamCheckResult) => {
    setResult(newResult);
    setError("");
    // Scroll to top to show result
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setResult(null);
  };

  const handleCheckAnother = () => {
    setResult(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-danger-50 border-l-4 border-danger-600 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-danger-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-bold text-danger-800">Error</h3>
                  <p className="text-sm text-danger-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          {!result ? (
            <>
              <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                    Check a Message for Scams
                  </h2>
                  <p className="text-base sm:text-lg text-neutral-600">
                    Paste any suspicious email, text, or message below. We'll analyze it
                    for common scam patterns and social engineering tactics.
                  </p>
                </div>

                <Disclaimer />

                <ScamCheckForm onResult={handleResult} onError={handleError} />
              </div>

              {/* Educational Content */}
              <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Common Scam Warning Signs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start">
                    <span className="text-danger-600 font-bold text-xl mr-2">⚡</span>
                    <div>
                      <strong className="text-neutral-900">Urgency & Pressure</strong>
                      <p className="text-neutral-600">"Act now or lose access"</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="text-danger-600 font-bold text-xl mr-2">👮</span>
                    <div>
                      <strong className="text-neutral-900">Authority Claims</strong>
                      <p className="text-neutral-600">"This is the IRS" or "Tech support"</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="text-danger-600 font-bold text-xl mr-2">💳</span>
                    <div>
                      <strong className="text-neutral-900">Unusual Payments</strong>
                      <p className="text-neutral-600">Gift cards, wire transfers, crypto</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="text-danger-600 font-bold text-xl mr-2">🔒</span>
                    <div>
                      <strong className="text-neutral-900">Personal Data Requests</strong>
                      <p className="text-neutral-600">SSN, passwords, bank details</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="text-danger-600 font-bold text-xl mr-2">😱</span>
                    <div>
                      <strong className="text-neutral-900">Fear Tactics</strong>
                      <p className="text-neutral-600">Threats of arrest or account closure</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="text-danger-600 font-bold text-xl mr-2">🎁</span>
                    <div>
                      <strong className="text-neutral-900">Too Good to Be True</strong>
                      <p className="text-neutral-600">Unexpected prizes or refunds</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
              <ResultPanel result={result} onCheckAnother={handleCheckAnother} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
