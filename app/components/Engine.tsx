import React from 'react';
import { Clipboard, Search, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Clipboard,
    title: "1. Paste Message",
    desc: "Copy the suspicious text or email and paste it into our box."
  },
  {
    icon: Search,
    title: "2. We Check It",
    desc: "Our system looks for hidden traps, fake links, and scam patterns."
  },
  {
    icon: CheckCircle,
    title: "3. You Get Answers",
    desc: "We tell you clearly: Safe or Danger. And what you should do next."
  }
];

export const Engine: React.FC = () => {
  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-ink">How it works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border-2 border-stone-200 flex flex-col items-center text-center shadow-sm"
            >
              <div className="p-4 bg-emerald-50 rounded-full mb-6 text-emerald-700">
                <s.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-ink mb-3">{s.title}</h3>
              <p className="text-lg text-stone-600 font-medium leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};