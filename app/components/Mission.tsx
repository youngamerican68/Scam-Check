import React from 'react';
import { Scale, TrendingDown, Users } from 'lucide-react';

export const Mission: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-stone-200">
       <div className="container mx-auto px-4 max-w-5xl">

         {/* Big Stat Hero */}
         <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center p-4 bg-red-50 rounded-full mb-6">
              <TrendingDown className="w-8 h-8 text-red-600" />
           </div>

           <h3 className="text-6xl md:text-7xl font-serif font-bold text-red-600 mb-4">$10 Billion</h3>
           <p className="text-xl text-stone-600 font-medium mb-2">lost to online scams in 2023</p>
           <p className="text-sm text-stone-500">Source: Federal Trade Commission (FTC)</p>
         </div>

         <div className="h-px bg-stone-200 my-12"></div>

         {/* Mission Statement */}
         <div className="text-center">
           <div className="inline-flex items-center justify-center p-4 bg-stone-50 rounded-full mb-6">
              <Scale className="w-8 h-8 text-stone-400" />
           </div>

           <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-6 leading-tight">
             Bridging the Gap
           </h2>

           <p className="text-xl text-stone-600 leading-relaxed font-medium mb-8">
             Research shows there is a gap between "jailbreaking" studies and understanding the real-world harm to seniors.
             <br className="hidden md:block" />
             We built <span className="text-emerald-700 font-bold">Scam Shield</span> to fill that gap—providing an end-to-end defense layer that works instantly, without technical jargon.
           </p>

           {/* Who It's For */}
           <div className="inline-flex items-center gap-3 bg-emerald-50 px-6 py-4 rounded-xl border border-emerald-100">
             <Users className="w-5 h-5 text-emerald-700" />
             <p className="text-base text-emerald-900 font-medium">
               Built for anyone who worries <span className="font-bold">"Is this real?"</span> — seniors, busy professionals, and non-technical users
             </p>
           </div>
         </div>

       </div>
    </section>
  );
};