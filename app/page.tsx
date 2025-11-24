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

      {/* Mission Statement */}
      <Mission />

      {/* Footer */}
      <Footer />

      {/* Scanner Modal - Opens when user clicks "Check Now" */}
      <ScannerModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
