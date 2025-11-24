import React from 'react';
import { Lock } from 'lucide-react';

export const Impact: React.FC = () => {
  return (
    <section className="py-20 bg-ink text-white text-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="p-4 bg-white/10 rounded-full">
            <Lock className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-serif font-bold">Your Privacy Comes First</h2>
          <p className="text-xl text-stone-300 max-w-2xl font-medium leading-relaxed">
            We do not save your messages, photos, or personal data. 
            Once the check is done, it is erased.
          </p>
        </div>
      </div>
    </section>
  );
};