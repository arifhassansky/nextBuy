"use client";
// Main Checkout Component
import CheckoutWrapper from "@/components/CheckoutPage/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
); // Replace with
const CheckoutPage = ({ params }: any) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutWrapper params={params} />
    </Elements>
  );
};

export default CheckoutPage;
