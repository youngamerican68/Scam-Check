import React from 'react';
import { Lock, CheckCircle, Shield, Trash2 } from 'lucide-react';

export const Impact: React.FC = () => {
  return (
    <section className="py-20 bg-ink text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col items-center justify-center gap-6 text-center mb-12">
          <div className="p-4 bg-white/10 rounded-full">
            <Lock className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-serif font-bold">Your Privacy Comes First</h2>
          <p className="text-lg text-stone-300 max-w-2xl font-medium leading-relaxed">
            We take your privacy seriously. Here's exactly how we protect your data:
          </p>
        </div>

        {/* Specific Privacy Guarantees */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <Trash2 className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Never Stored</h3>
            <p className="text-sm text-stone-300">Messages are <span className="font-bold text-white">analyzed in real-time and never stored</span>. Nothing is saved to our servers.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <Shield className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Never Sold</h3>
            <p className="text-sm text-stone-300"><span className="font-bold text-white">We never sell your data. Period.</span> No ads, no tracking, no third parties.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <CheckCircle className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Auto-Deleted</h3>
            <p className="text-sm text-stone-300">Content <span className="font-bold text-white">automatically deleted within 5 minutes</span> after analysis completes.</p>
          </div>
        </div>

        {/* Privacy Policy Link */}
        <div className="text-center">
          <a href="#footer" className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-2 transition-colors">
            Read our Privacy Promise →
          </a>
        </div>
      </div>
    </section>
  );
};