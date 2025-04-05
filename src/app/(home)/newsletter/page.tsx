"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function Newsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      setIsSubmitting(true);
      // Demo
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setMessage(
        "Thank you for subscribing to NextBuy! You'll receive updates on exclusive deals, latest arrivals, and special discounts."
      );
      reset();
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="py-20 mt-40 px-4 md:px-10 lg:px-20 flex justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/bg-newsletter.jpg')",
      }}
    >
      <div className="bg-white/95 p-10 shadow-lg w-full max-w-6xl rounded-lg flex flex-col md:flex-row items-center backdrop-blur-sm">
        {/* Left Side - Newsletter Form */}
        <div className="md:w-1/2 text-center md:pr-6">
          <p className="text-sm uppercase text-gray-500 tracking-wider">
            Join our newsletter now
          </p>
          <h2 className="text-2xl font-bold mt-2 mb-4">
            Stay Updated with Our Latest News & Exclusive Offers!
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to receive special discounts, product launches, and
            insider deals straight to your inbox.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Your email address"
                  {...register("email")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C9E26]"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="bg-[#3C9E26] text-white px-6 py-2 rounded-lg font-semibold hover:bg-black transition disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>
            </div>
          </form>

          {message && (
            <p
              className={`mt-4 ${
                message.includes("Thank you")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Read our{" "}
            <a
             
              className="text-[#3C9E26] font-semibold hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-300 h-24 mx-6"></div>

        {/* Right Side - Testimonial */}
        <div className="md:w-1/2 text-center">
          <Image
            src="/assets/profile.jpg"
            alt="User Testimonial"
            width={96}
            height={96}
            referrerPolicy="no-referrer"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <blockquote className="text-gray-600 text-sm mb-2 italic">
            "Ever since I subscribed, I've been getting amazing deals and early
            access to the latest products. Highly recommended!"
          </blockquote>
          <p className="font-semibold">
            John Doe <span className="text-gray-500">- CEO, TechCorp</span>
          </p>
        </div>
      </div>
    </div>
  );
}
