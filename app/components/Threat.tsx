import React from 'react';
import { AlertTriangle, TrendingUp, Users, FileText } from 'lucide-react';

export const Threat: React.FC = () => {
  return (
    <section className="relative py-32 bg-nocturne-mid noise-overlay overflow-hidden">
      {/* Ember glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-ember/5 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6">
            <AlertTriangle className="w-4 h-4 text-ember" />
            <span className="text-ember text-sm tracking-cinematic uppercase font-medium">The Reality</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif font-semibold text-starlight mb-4">
            Why You Need a <em className="text-ember">Second Opinion</em>
          </h2>
          <p className="text-xl text-cloud max-w-2xl mx-auto leading-relaxed">
            Scams aren&apos;t just &quot;bad grammar&quot; anymore. AI can generate convincing fraud that tricks even careful people.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Research Card */}
          <div className="glass rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sunrise/20 to-ember/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-sunrise" />
              </div>
              <span className="text-cloud/70 text-sm tracking-cinematic uppercase">Research Spotlight</span>
            </div>

            <h3 className="font-serif text-2xl text-starlight mb-4 leading-snug">
              &quot;Can AI Models be Jailbroken to Phish <em className="text-sunrise">Elderly Victims</em>?&quot;
            </h3>

            <p className="text-cloud mb-8">
              A 2025 study cited by <span className="text-starlight font-medium">Senator Kelly</span> in a Senate hearing on AI chatbots and older Americans.
            </p>

            {/* Stats */}
            <div className="space-y-4">
              <div className="glass-dark rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-ember/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-ember" />
                </div>
                <div>
                  <p className="font-serif text-2xl text-starlight">11%</p>
                  <p className="text-cloud/70 text-sm">fell for AI-generated phishing</p>
                </div>
              </div>

              <div className="glass-dark rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-sunrise/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-sunrise" />
                </div>
                <div>
                  <p className="font-serif text-2xl text-starlight">Senate</p>
                  <p className="text-cloud/70 text-sm">cited in official hearing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Consequences Card */}
          <div className="glass-dark rounded-3xl p-8 md:p-10 relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-ember/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Warning Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ember/30 to-ember/10 flex items-center justify-center shadow-glow-ember animate-glow-pulse">
                  <AlertTriangle className="w-10 h-10 text-ember" />
                </div>
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-xl md:text-2xl text-starlight italic text-center mb-10 leading-relaxed">
                &quot;AI can now automate much larger parts of the scam and phishing infrastructure.&quot;
              </blockquote>

              {/* Consequences */}
              <div className="space-y-4">
                {[
                  { title: "Account Takeover", desc: "Attackers gain access to your email or bank" },
                  { title: "Data Theft", desc: "Personal info gets harvested and sold" },
                  { title: "Malware Install", desc: "One click can silently infect your device" },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-ember/50 pl-4 py-1">
                    <p className="font-medium text-starlight">{item.title}</p>
                    <p className="text-cloud/60 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 pt-6 border-t border-starlight/10 text-center">
                <p className="text-sunrise font-medium">
                  Fight <em>AI scams</em> with <em>AI defense</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
