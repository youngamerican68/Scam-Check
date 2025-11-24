// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { setUserTier } from "@/lib/usage";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userEmail = session.metadata?.userId;
        const plan = session.metadata?.plan || "premium";

        if (userEmail && session.customer) {
          await setUserTier(
            userEmail,
            plan as 'premium' | 'family',
            session.customer as string,
            session.subscription as string
          );

          console.log(`✅ User ${userEmail} upgraded to ${plan}`);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(subscription.customer as string);

        if ('email' in customer && customer.email) {
          // Check subscription status
          if (subscription.status === "active") {
            await setUserTier(
              customer.email,
              "premium",
              customer.id,
              subscription.id
            );
            console.log(`✅ Subscription activated for ${customer.email}`);
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(subscription.customer as string);

        if ('email' in customer && customer.email) {
          await setUserTier(customer.email, "free");
          console.log(`❌ Subscription cancelled for ${customer.email}`);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customer = await stripe.customers.retrieve(invoice.customer as string);

        if ('email' in customer && customer.email) {
          console.warn(`⚠️  Payment failed for ${customer.email}`);
          // Optional: Send email notification
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
