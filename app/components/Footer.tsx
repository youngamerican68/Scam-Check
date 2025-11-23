// app/components/Footer.tsx
"use client";

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-warning-50 border-l-4 border-warning-600 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-warning-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold text-warning-800 mb-2">
                Important Disclaimer
              </h3>
              <div className="text-sm text-warning-700 space-y-1">
                <p className="font-medium">• This tool does NOT guarantee safety or accuracy.</p>
                <p>• Never rely solely on this tool for decisions about payments, transfers, or sharing sensitive information.</p>
                <p>• We are extremely conservative and may flag legitimate messages as suspicious.</p>
                <p>• False negatives (missing real scams) are still possible.</p>
                <p className="font-semibold mt-2">When in doubt: DO NOT interact with the message. Contact the company directly using official contact information.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-neutral-600 space-y-2">
          <p>
            <strong>Remember:</strong> Real companies will NEVER ask you to pay with gift cards,
            wire transfers, or cryptocurrency.
          </p>
          <p>
            They will NEVER threaten you with immediate arrest or account closure if you don't act right away.
          </p>
          <p className="text-xs text-neutral-500 mt-4">
            © 2024 Scam-Check One-Shot. Built to protect those we love.
          </p>
        </div>
      </div>
    </footer>
  );
}
