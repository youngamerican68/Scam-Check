import React from 'react';
import { FileText, TrendingUp, Users, AlertCircle } from 'lucide-react';

export const Threat: React.FC = () => {
  return (
    <section className="py-20 bg-stone-50 border-y border-stone-200">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-bold uppercase tracking-wide mb-4">
            <AlertCircle className="w-4 h-4" />
            <span>The Reality</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-ink mb-6">
            Why you need a second opinion.
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed font-medium">
            Scams are no longer just "bad grammar." New research confirms that AI models can be used to generate highly convincing fraud that tricks even careful people.
          </p>
        </div>

        {/* Research Feature Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-stone-900/5 border border-stone-200 overflow-hidden">
          <div className="grid md:grid-cols-2">
            
            {/* Left: The Study Context */}
            <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-emerald-700" />
                <span className="text-stone-500 font-bold uppercase tracking-widest text-sm">Research Spotlight</span>
              </div>
              
              <h3 className="text-2xl font-bold text-ink mb-4">
                "Can AI Models be Jailbroken to Phish Elderly Victims?"
              </h3>
              <p className="text-stone-600 mb-6 font-medium">
                A 2025 study by researchers <span className="text-ink font-bold">Simon Lermen</span> and <span className="text-ink font-bold">Fred Heiding</span>, in collaboration with <span className="text-ink font-bold">Reuters</span>.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-red-50 p-2 rounded-lg mt-1">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <strong className="block text-ink text-lg">11% Success Rate</strong>
                    <p className="text-stone-600">In the study, 11% of participants fell for at least one AI-generated phishing email.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg mt-1">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <strong className="block text-ink text-lg">Senate Attention</strong>
                    <p className="text-stone-600">This research was cited by Senator Kelly to motivate a Senate hearing on AI chatbots and older Americans.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Key Takeaway Visual */}
            <div className="bg-stone-100 p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-stone-200">
              <blockquote className="text-xl md:text-2xl font-serif text-ink italic leading-relaxed mb-6">
                "AI can now automate much larger parts of the scam and phishing infrastructure."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-12 w-1 bg-emerald-600 rounded-full"></div>
                <div>
                   <p className="font-bold text-ink">The Vulnerability Gap</p>
                   <p className="text-stone-600 text-sm mt-1">
                     Scammers use tools like ChatGPT (jailbroken) to write perfect English and simulate empathy. Humans need AI defense to fight back.
                   </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};