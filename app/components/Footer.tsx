import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="relative bg-midnight overflow-hidden">
      {/* Horizon glow at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-sunrise/50 to-transparent" />

      {/* Subtle sunrise glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-sunrise/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sunrise to-ember flex items-center justify-center shadow-glow-gold">
                <ShieldCheck className="w-6 h-6 text-midnight" />
              </div>
              <span className="font-serif font-semibold text-2xl text-starlight">Scam Shield</span>
            </div>
            <p className="text-cloud text-lg">A Family Digital Safety Initiative</p>
            <p className="text-cloud/50 text-sm mt-2">&copy; {new Date().getFullYear()}</p>
          </div>

          {/* Disclaimer Card */}
          <div className="glass rounded-2xl p-6 md:p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-ember/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-ember" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-starlight mb-2">Please Note</h4>
                <p className="text-cloud/80 text-sm leading-relaxed">
                  We&apos;re extremely cautious and may flag some real messages as suspicious just to be safe.
                  However, no tool can catch every scam. When in doubt, ignore the message or call the company
                  using a number you already trust. This tool provides a second opinion, not legal or financial advice.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-cloud/60">
            <span>Free to use</span>
            <span className="text-sunrise/30">•</span>
            <span>No account needed</span>
            <span className="text-sunrise/30">•</span>
            <span>Privacy focused</span>
          </div>
        </div>
      </div>

      {/* Silhouette cityscape at bottom */}
      <div className="h-16 relative">
        <svg
          viewBox="0 0 1440 64"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
          fill="#0a0a0a"
        >
          <path d="M0,64 L0,40 Q120,20 240,35 Q360,50 480,30 Q600,10 720,25 Q840,40 960,20 Q1080,0 1200,15 Q1320,30 1440,10 L1440,64 Z" />
          {/* Small buildings */}
          <rect x="200" y="30" width="15" height="34" />
          <rect x="220" y="38" width="10" height="26" />
          <rect x="600" y="25" width="20" height="39" />
          <rect x="625" y="32" width="12" height="32" />
          <rect x="1000" y="20" width="18" height="44" />
          <rect x="1022" y="28" width="14" height="36" />
        </svg>
      </div>
    </footer>
  );
};
