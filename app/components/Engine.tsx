import React from 'react';
import { Clipboard, Search, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Clipboard,
    number: "01",
    title: "Paste",
    subtitle: "Your Message",
    desc: "Copy the suspicious text or email and paste it into our scanner.",
  },
  {
    icon: Search,
    number: "02",
    title: "AI",
    subtitle: "Analyzes",
    desc: "Our AI scans for hidden traps, fake links, and scam patterns in seconds.",
  },
  {
    icon: CheckCircle,
    number: "03",
    title: "Get",
    subtitle: "Your Verdict",
    desc: "Simple result (Safe/Suspicious/Danger) plus clear advice on what to do.",
  }
];

export const Engine: React.FC = () => {
  return (
    <section className="relative py-32 bg-nocturne-upper noise-overlay overflow-hidden">
      {/* Subtle stars in upper portion */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star star-small"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 40}%`,
              animation: `twinkle ${3 + Math.random() * 2}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-sunrise/80 text-sm tracking-cinematic uppercase font-medium mb-4 block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-semibold text-starlight mb-4">
            How It <em className="text-sunrise">Works</em>
          </h2>
          <p className="text-xl text-cloud max-w-xl mx-auto">
            Three easy steps to protect yourself
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                {/* Connection line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-sunrise/30 to-transparent" />
                )}

                {/* Card */}
                <div className="glass rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-glow-gold hover:border-sunrise/30 text-center">
                  {/* Number */}
                  <span className="text-6xl font-serif font-bold text-starlight/10 absolute top-4 right-6">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sunrise/20 to-ember/20 flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow-gold transition-all">
                    <Icon className="w-8 h-8 text-sunrise" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl text-starlight mb-1">
                    {step.title}
                  </h3>
                  <p className="font-serif text-xl text-sunrise italic mb-4">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-cloud leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <div className="text-center mt-16">
          <div className="glass-gold inline-block rounded-full px-8 py-4">
            <p className="text-sunrise font-medium">
              <span className="text-starlight">Results in seconds</span> — not minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
