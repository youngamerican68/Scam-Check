import React from 'react';
import { Clipboard, Search, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Clipboard,
    number: "1",
    title: "Paste Message",
    desc: "Copy the suspicious text or email and paste it into our box."
  },
  {
    icon: Search,
    number: "2",
    title: "We Check It",
    desc: "Our AI looks for hidden traps, fake links, and scam patterns in seconds."
  },
  {
    icon: CheckCircle,
    number: "3",
    title: "You Get Answers",
    desc: "Simple verdict (Safe/Suspicious/Danger) plus a plain-English explanation of what to do next."
  }
];

export const Engine: React.FC = () => {
  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-ink mb-3">How it works</h2>
          <p className="text-lg text-stone-600 font-medium">Results in seconds, not minutes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border-2 border-stone-200 flex flex-col items-center text-center shadow-sm relative"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-xl flex items-center justify-center shadow-lg">
                {s.number}
              </div>

              <div className="p-4 bg-emerald-50 rounded-full mb-6 mt-4 text-emerald-700">
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