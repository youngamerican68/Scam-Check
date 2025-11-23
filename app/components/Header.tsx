// app/components/Header.tsx
"use client";

export default function Header() {
  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">
            🛡️ Scam‑Check One‑Shot
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 font-medium">
            The Granny Guard
          </p>
          <p className="text-sm sm:text-base text-neutral-500 mt-2 italic">
            A second opinion for your panic. Antivirus for social engineering.
          </p>
        </div>
      </div>
    </header>
  );
}
