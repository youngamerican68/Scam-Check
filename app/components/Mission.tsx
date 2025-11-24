import React from 'react';
import { Scale } from 'lucide-react';

export const Mission: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-stone-200 text-center">
       <div className="container mx-auto px-4 max-w-4xl">
         
         <div className="inline-flex items-center justify-center p-4 bg-stone-50 rounded-full mb-8">
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

         <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full opacity-20"></div>
       </div>
    </section>
  );
};