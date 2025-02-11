import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const PLAN_PRICES = {
  free: 'price_free',
  pro: 'price_inr_pro', // ₹2,499/month
  enterprise: 'price_inr_enterprise', // ₹8,499/month
};