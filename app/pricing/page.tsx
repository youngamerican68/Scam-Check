'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Check, Shield, Users, ArrowLeft } from 'lucide-react';

export default function PricingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleCheckout = async (priceId: string, plan: string) => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setLoading(plan);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, plan }),
      });

      if (!response.ok) throw new Error('Checkout failed');

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="container mx-auto px-6 py-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-stone-600 hover:text-ink transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-5xl font-serif font-bold text-ink mb-6">
            Choose Your Protection Plan
          </h1>
          <p className="text-xl text-stone-600 font-medium">
            Get unlimited scam checks and protect yourself and your loved ones from fraud.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">

            {/* Free Tier */}
            <div className="bg-white rounded-3xl border-2 border-stone-200 p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-bold text-ink mb-2">Free</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-ink">$0</span>
                  <span className="text-stone-500">/month</span>
                </div>
                <p className="text-stone-600">Try it out with limited checks</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700">5 checks per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700">AI-powered analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700">100% private & anonymous</span>
                </li>
              </ul>

              <button
                onClick={() => router.push('/')}
                className="w-full py-4 px-6 rounded-xl border-2 border-stone-300 text-ink font-bold hover:bg-stone-50 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Premium Tier (Popular) */}
            <div className="bg-white rounded-3xl border-2 border-emerald-600 p-8 flex flex-col relative shadow-xl shadow-emerald-900/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  Popular
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl font-serif font-bold text-ink">Premium</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-ink">$9.99</span>
                  <span className="text-stone-500">/month</span>
                </div>
                <p className="text-stone-600">For personal unlimited protection</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700 font-bold">Unlimited checks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700">Priority AI analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700">100% private & anonymous</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700">Cancel anytime</span>
                </li>
              </ul>

              <button
                onClick={() => handleCheckout(process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || '', 'premium')}
                disabled={loading === 'premium'}
                className="w-full py-4 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'premium' ? 'Loading...' : 'Subscribe Now'}
              </button>
            </div>

            {/* Family Tier */}
            <div className="bg-white rounded-3xl border-2 border-stone-200 p-8 flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl font-serif font-bold text-ink">Family</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-ink">$14.99</span>
                  <span className="text-stone-500">/month</span>
                </div>
                <p className="text-stone-600">Protect your whole family</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700 font-bold">Unlimited checks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700 font-bold">Up to 5 family members</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700">Priority AI analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700">100% private & anonymous</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700">Cancel anytime</span>
                </li>
              </ul>

              <button
                onClick={() => handleCheckout(process.env.NEXT_PUBLIC_STRIPE_FAMILY_PRICE_ID || '', 'family')}
                disabled={loading === 'family'}
                className="w-full py-4 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'family' ? 'Loading...' : 'Subscribe Now'}
              </button>
            </div>

          </div>

          {/* Trust Badge */}
          <div className="mt-16 text-center">
            <p className="text-stone-500 font-medium">
              All plans include a 7-day money-back guarantee. Cancel anytime, no questions asked.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
