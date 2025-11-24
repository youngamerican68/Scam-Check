import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle, Lock, ArrowRight, AlertTriangle } from 'lucide-react';

export const Hero: React.FC<{ onStartScan: () => void }> = ({ onStartScan }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-cream overflow-hidden py-16 lg:py-0">
      
      {/* Background - Cleaner, less blurry */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full translate-x-1/3 -translate-y-1/3 shadow-2xl shadow-stone-200/50 pointer-events-none" />

      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: Clarity & Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-bold tracking-wide uppercase mb-8 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Free • Private • Secure</span>
            </div>

            {/* Headline - Direct & Functional */}
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-ink leading-[1.1] mb-6">
              Verify Suspicious Messages
            </h1>

            {/* Subhead - Plain English */}
            <p className="text-xl text-ink/80 leading-relaxed mb-10 font-medium max-w-lg">
              Not sure if a text or email is real? Paste it here. We will check it for scams instantly.
            </p>

            {/* MOCK INPUT / CTA AREA */}
            <div className="mb-6">
              <div 
                onClick={onStartScan}
                className="group relative bg-white p-2 rounded-2xl shadow-xl shadow-stone-900/10 border-2 border-stone-200 flex flex-col sm:flex-row items-center cursor-pointer transition-all hover:border-emerald-500 hover:shadow-emerald-900/20"
              >
                <div className="flex-grow px-4 md:px-6 py-4 w-full sm:w-auto">
                  {/* Mock Placeholder */}
                  <span className="text-stone-400 text-lg font-medium select-none group-hover:text-stone-500 transition-colors">
                    Paste suspicious text here...
                  </span>
                </div>
                <button 
                  className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-md transition-all transform active:scale-95 flex-shrink-0"
                >
                  Check Now
                </button>
              </div>
              
              {/* Trust Microcopy */}
              <p className="pl-2 pt-4 text-sm font-bold text-ink/60 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                No login required. 100% Anonymous.
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Static Clarity (Before/After Card) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-stone-900/10 border border-stone-100 p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Card Title */}
              <div className="text-center border-b border-stone-100 pb-6 mb-6">
                <h3 className="text-2xl font-serif font-bold text-ink">See how it works</h3>
              </div>

              <div className="space-y-6">
                {/* Example Problem */}
                <div className="flex gap-4 opacity-100">
                   <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-red-500" />
                   </div>
                   <div className="bg-red-50 p-5 rounded-2xl rounded-tl-none border border-red-100 w-full">
                      <p className="font-bold text-red-800 text-sm mb-1 uppercase tracking-wider">Suspicious Message</p>
                      <p className="text-stone-800 font-medium">"Mom, I lost my phone. Send money to this number..."</p>
                   </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-2">
                  <div className="bg-stone-100 p-2 rounded-full text-stone-400">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </div>
                </div>

                {/* Example Solution */}
                <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                   </div>
                   <div className="bg-emerald-50 p-5 rounded-2xl rounded-tl-none border border-emerald-100 w-full">
                      <p className="font-bold text-emerald-800 text-sm mb-1 uppercase tracking-wider">Our Advice</p>
                      <p className="text-stone-800 font-medium">
                        <span className="font-bold text-emerald-700">Do not reply.</span> This is a common "Grandparent Scam" trying to panic you.
                      </p>
                   </div>
                </div>
              </div>
            </div>
            
            {/* Decorative background blob */}
            <div className="absolute inset-0 bg-emerald-600/5 rounded-3xl blur-2xl transform scale-95 translate-y-4 -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};