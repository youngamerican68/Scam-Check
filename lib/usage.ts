// lib/usage.ts
// Usage tracking with Vercel KV
import { kv } from "@vercel/kv";

export interface UserData {
  email: string;
  name?: string;
  image?: string;
  tier: 'free' | 'premium' | 'family';
  createdAt: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

/**
 * Track a scam check for a user
 */
export async function trackCheck(email: string): Promise<void> {
  const month = new Date().toISOString().slice(0, 7); // "2025-11"
  const key = `checks:${email}:${month}`;

  await kv.incr(key);
  await kv.expire(key, 60 * 60 * 24 * 35); // Auto-delete after 35 days
}

/**
 * Get the number of checks used this month
 */
export async function getCheckCount(email: string): Promise<number> {
  const month = new Date().toISOString().slice(0, 7);
  const count = await kv.get<number>(`checks:${email}:${month}`);
  return count || 0;
}

/**
 * Check if user is premium
 */
export async function isPremium(email: string): Promise<boolean> {
  const userData = await kv.get<UserData>(`user:${email}`);
  return userData?.tier === 'premium' || userData?.tier === 'family';
}

/**
 * Get user tier
 */
export async function getUserTier(email: string): Promise<'free' | 'premium' | 'family'> {
  const userData = await kv.get<UserData>(`user:${email}`);
  return userData?.tier || 'free';
}

/**
 * Set user premium status
 */
export async function setUserTier(
  email: string,
  tier: 'free' | 'premium' | 'family',
  stripeCustomerId?: string,
  stripeSubscriptionId?: string
): Promise<void> {
  const userData = await kv.get<UserData>(`user:${email}`);

  if (userData) {
    await kv.set(`user:${email}`, {
      ...userData,
      tier,
      stripeCustomerId,
      stripeSubscriptionId,
      updatedAt: new Date().toISOString(),
    });
  }
}

/**
 * Get user data
 */
export async function getUserData(email: string): Promise<UserData | null> {
  return await kv.get<UserData>(`user:${email}`);
}

/**
 * Check if user has reached free tier limit
 */
export async function hasReachedLimit(email: string): Promise<boolean> {
  const tier = await getUserTier(email);

  if (tier === 'premium' || tier === 'family') {
    return false; // Unlimited
  }

  const count = await getCheckCount(email);
  return count >= 5; // Free tier limit
}

/**
 * Get remaining checks for free users
 */
export async function getRemainingChecks(email: string): Promise<number> {
  const tier = await getUserTier(email);

  if (tier === 'premium' || tier === 'family') {
    return 999999; // Effectively unlimited
  }

  const used = await getCheckCount(email);
  const remaining = Math.max(0, 5 - used);
  return remaining;
}
