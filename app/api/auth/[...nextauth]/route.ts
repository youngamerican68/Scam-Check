// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email"; // Disabled for MVP - add later if needed
import { kv } from "@vercel/kv";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // EmailProvider disabled for MVP - requires database adapter
    // Uncomment when you want to add email magic links:
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (user.email) {
        // Store user in KV on first sign in
        const existingUser = await kv.get(`user:${user.email}`);

        if (!existingUser) {
          await kv.set(`user:${user.email}`, {
            email: user.email,
            name: user.name,
            image: user.image,
            createdAt: new Date().toISOString(),
            tier: 'free',
          });

          // Initialize usage counter for current month
          const month = new Date().toISOString().slice(0, 7);
          await kv.set(`checks:${user.email}:${month}`, 0);
          await kv.expire(`checks:${user.email}:${month}`, 60 * 60 * 24 * 35);
        }
      }
      return true;
    },

    async session({ session, token }) {
      if (session.user && session.user.email) {
        // Add custom fields to session
        const userData = await kv.get(`user:${session.user.email}`) as any;

        if (userData) {
          (session.user as any).tier = userData.tier || 'free';

          // Get current usage
          const month = new Date().toISOString().slice(0, 7);
          const checksUsed = await kv.get(`checks:${session.user.email}:${month}`) || 0;
          (session.user as any).checksUsed = checksUsed;
        }
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
