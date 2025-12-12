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
    <div className="min-h-screen flex flex-col bg-midnight">
      {/* Hero Section with CTA */}
      <Hero onStartScan={handleStartScan} />

      {/* Research & Threat Context */}
      <Threat />

      {/* How It Works */}
      <Engine />

      {/* Privacy Statement */}
      <Impact />

      {/* Second CTA - Try It Now */}
      <section className="relative py-24 bg-nocturne-mid noise-overlay text-center overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-sunrise/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-3xl">
          <div className="glass rounded-3xl p-10 md:p-12">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-starlight mb-4">
              Ready to <em className="text-sunrise">check</em> a message?
            </h2>
            <p className="text-xl text-cloud mb-10">
              Don&apos;t wait until it&apos;s too late. Get instant peace of mind.
            </p>
            <button
              onClick={handleStartScan}
              className="bg-gradient-to-r from-sunrise to-ember text-midnight font-bold text-xl px-12 py-6 rounded-xl shadow-glow-gold hover:shadow-glow-ember transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Scan Your Message Now — Free
            </button>
            <p className="text-cloud/70 mt-6">
              No sign-up needed. Just paste and check.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-cloud/50">
              <span>✓ Analyzed 500+ suspicious messages</span>
              <span>•</span>
              <span>✓ Built with cybersecurity experts</span>
            </div>
          </div>
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
