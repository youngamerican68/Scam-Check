import React from 'react';
import { ShieldCheck, Lock, Sparkles } from 'lucide-react';

// Stars component for twinkling effect
const Stars = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 60}%`,
    size: Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small',
    delay: `${Math.random() * 5}s`,
    duration: `${2 + Math.random() * 3}s`,
  }));

  return (
    <div className="stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.size === 'small' ? 'star-small' : star.size === 'large' ? 'star-large' : ''}`}
          style={{
            left: star.left,
            top: star.top,
            animation: `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
};

// Silhouette cityscape/landscape - smooth rolling hills
const SilhouetteLandscape = () => (
  <div className="absolute bottom-0 left-0 right-0 h-24 z-10">
    <svg
      viewBox="0 0 1440 96"
      className="w-full h-full"
      preserveAspectRatio="none"
      fill="#0a0a0a"
    >
      {/* Smooth rolling hills - single continuous path */}
      <path d="M0,96 L0,60 C120,50 180,65 300,55 C420,45 480,70 600,50 C720,30 800,55 960,40 C1100,28 1200,50 1320,35 C1380,30 1420,45 1440,40 L1440,96 Z" />
    </svg>
  </div>
);

export const Hero: React.FC<{ onStartScan: () => void }> = ({ onStartScan }) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-nocturne-full noise-overlay">
      {/* Stars */}
      <Stars />

      {/* Sunrise glow at bottom */}
      <div className="absolute inset-0 sunrise-glow" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 pt-8 pb-48 min-h-screen flex flex-col">

        {/* Nav Bar - Glassmorphism */}
        <nav className="glass rounded-full px-6 py-3 mb-16 flex items-center justify-between max-w-4xl mx-auto w-full animate-fadeInUp">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sunrise to-ember flex items-center justify-center shadow-glow-gold">
              <ShieldCheck className="w-5 h-5 text-midnight" />
            </div>
            <span className="font-serif font-semibold text-xl text-starlight">Scam Shield</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-cloud">
            <Lock className="w-4 h-4 text-sunrise" />
            <span className="tracking-wide-plus">Free & Private</span>
          </div>
        </nav>

        {/* Main Content - Centered */}
        <div className="flex-grow flex flex-col items-center justify-center text-center max-w-4xl mx-auto">

          {/* Floating Badge */}
          <div className="glass-gold rounded-full px-5 py-2 mb-8 animate-fadeInUp inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sunrise" />
            <span className="text-sunrise text-sm tracking-cinematic uppercase font-medium">AI-Powered Protection</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold text-starlight leading-tight mb-6 animate-fadeInUp-delay-1">
            Verify <em className="text-sunrise text-glow-gold">Suspicious</em>
            <br />
            Messages
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-cloud leading-relaxed mb-12 max-w-2xl animate-fadeInUp-delay-2">
            Not sure if that text or email is real? Paste it here for an
            <span className="text-sunrise font-medium"> instant AI scan</span> against scams, phishing, and red flags.
          </p>

          {/* CTA Area - Glass Card */}
          <div
            onClick={onStartScan}
            className="glass rounded-2xl p-2 cursor-pointer transition-all hover:shadow-glow-gold w-full max-w-2xl group animate-fadeInUp-delay-2"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow glass-dark rounded-xl px-6 py-5 text-left">
                <span className="text-cloud/60 text-lg group-hover:text-cloud/80 transition-colors">
                  Paste suspicious message here...
                </span>
              </div>
              <button className="bg-gradient-to-r from-sunrise to-ember text-midnight font-bold text-lg px-8 py-5 rounded-xl shadow-glow-gold hover:shadow-glow-ember transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Scan Now
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-cloud/70">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-sunrise/70" />
              <span>Never Stored</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sunrise/70" />
              <span>No Sign-up Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sunrise/70" />
              <span>Results in Seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Silhouette Landscape */}
      <SilhouetteLandscape />

      {/* Horizon glow line */}
      <div className="absolute bottom-24 left-0 right-0 horizon-glow z-[9]" />
    </section>
  );
};
