import React from 'react';
import { Lock, Shield, Trash2, CheckCircle } from 'lucide-react';

const privacyFeatures = [
  {
    icon: Trash2,
    title: "Never Stored",
    desc: "Messages are analyzed in real-time and never saved to our servers.",
  },
  {
    icon: Shield,
    title: "Never Sold",
    desc: "We never sell your data. No ads, no tracking, no third parties.",
  },
  {
    icon: CheckCircle,
    title: "Auto-Deleted",
    desc: "Content automatically deleted within 5 minutes after analysis.",
  }
];

export const Impact: React.FC = () => {
  return (
    <section className="relative py-32 bg-midnight noise-overlay overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sunrise/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sunrise/20 to-ember/10 flex items-center justify-center shadow-glow-gold animate-float">
              <Lock className="w-10 h-10 text-sunrise" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6">
            <Lock className="w-4 h-4 text-sunrise" />
            <span className="text-sunrise text-sm tracking-cinematic uppercase font-medium">Your Data</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif font-semibold text-starlight mb-4">
            Privacy <em className="text-sunrise">Comes First</em>
          </h2>
          <p className="text-xl text-cloud max-w-xl mx-auto">
            We take your privacy seriously. Here&apos;s how we protect your data.
          </p>
        </div>

        {/* Privacy Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {privacyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-glow-gold hover:border-sunrise/30 group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sunrise/20 to-ember/20 flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow-gold transition-all">
                  <Icon className="w-7 h-7 text-sunrise" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl text-starlight mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-cloud/80 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Privacy Promise Link */}
        <div className="text-center">
          <div className="glass-gold inline-block rounded-full px-6 py-3">
            <a href="#footer" className="text-sunrise hover:text-sunrise-light font-medium inline-flex items-center gap-2 transition-colors">
              Read our Privacy Promise
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
