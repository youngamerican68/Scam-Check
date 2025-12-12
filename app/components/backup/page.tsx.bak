// app/page.tsx
"use client";

import { useState } from "react";
import { Hero } from "./components/Hero";
import { Threat } from "./components/Threat";
import { Engine } from "./components/Engine";
import { Impact } from "./components/Impact";
import { Mission } from "./components/Mission";
import { Footer } from "./components/Footer";
import { ScannerModal } from "./components/ScannerModal";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartScan = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with CTA */}
      <Hero onStartScan={handleStartScan} />

      {/* Research & Threat Context */}
      <Threat />

      {/* How It Works */}
      <Engine />

      {/* Privacy Statement */}
      <Impact />

      {/* Second CTA - Try It Now */}
      <section className="py-16 bg-emerald-700 text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to check a message?
          </h2>
          <p className="text-lg text-emerald-100 mb-8 font-medium">
            Don't wait until it's too late. Get instant peace of mind.
          </p>
          <button
            onClick={handleStartScan}
            className="bg-white text-emerald-700 hover:bg-stone-100 font-bold text-xl px-10 py-5 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            Scan Your Message Now – Free
          </button>
          <p className="text-sm text-emerald-50 mt-3 font-medium">
            No sign-up needed. Just paste and check.
          </p>
          <p className="text-xs text-emerald-200 mt-2">
            ✓ Analyzed 500+ suspicious messages  •  ✓ Built with cybersecurity experts
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <Mission />

      {/* Footer */}
      <Footer />

      {/* Scanner Modal - Opens when user clicks "Check Now" */}
      <ScannerModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
