import React from 'react';
import { TrendingDown, Users, Heart } from 'lucide-react';

export const Mission: React.FC = () => {
  return (
    <section className="relative py-32 bg-nocturne-upper noise-overlay overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="star star-small"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animation: `twinkle ${3 + Math.random() * 2}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        {/* Big Stat Section */}
        <div className="text-center mb-20">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ember/30 to-ember/10 flex items-center justify-center shadow-glow-ember">
              <TrendingDown className="w-10 h-10 text-ember" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8">
            <TrendingDown className="w-4 h-4 text-ember" />
            <span className="text-ember text-sm tracking-cinematic uppercase font-medium">The Problem</span>
          </div>

          <h3 className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-ember text-glow-gold mb-4">
            $10B
          </h3>
          <p className="text-2xl text-cloud mb-2">lost to online scams in 2023</p>
          <p className="text-cloud/50 text-sm mb-10">Source: Federal Trade Commission (FTC)</p>

          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-6">
              <p className="text-xl text-cloud italic font-serif">
                Most victims thought the message &quot;looked real enough&quot; — until it was too late.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-16">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-sunrise/30" />
          <div className="w-2 h-2 rounded-full bg-sunrise shadow-glow-gold" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-sunrise/30" />
        </div>

        {/* Mission Statement */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-5 py-2 mb-8">
            <Heart className="w-4 h-4 text-sunrise" />
            <span className="text-sunrise text-sm tracking-cinematic uppercase font-medium">Our Mission</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-starlight mb-8">
            Built for <em className="text-sunrise">Peace of Mind</em>
          </h2>

          {/* Who It's For Card */}
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sunrise/20 to-ember/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-sunrise" />
              </div>
              <h4 className="font-serif text-xl text-starlight">Who We Help</h4>
            </div>
            <p className="text-cloud text-lg leading-relaxed">
              Built for anyone who worries <span className="text-starlight font-medium">&quot;Is this real?&quot;</span> — seniors, busy professionals, and non-technical users who want a second opinion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
