"use client";

import Image from "next/image";



export default function NewsletterSection() {
  return (
    <div
      className="py-20 px-4 md:px-10 lg:px-20 flex justify-center"
      style={{
        backgroundImage:
          "url('/assets/bg-newsletter.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-20 shadow-lg w-full max-w-4xl flex flex-col md:flex-row items-center">
        {/* Left Side - Newsletter Form */}
        <div className="md:w-1/2 text-center md:pr-6">
          <p className="text-sm uppercase text-gray-500">
            Join our newsletter now
          </p>
          <h2 className="text-xl font-bold mt-2 mb-4">
            Stay Updated with Our Latest News!
          </h2>
          <div className="flex flex-col sm:flex-row items-center">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C9E26]"
            />
            <button className="mt-2 sm:mt-0 sm:ml-2 bg-[#3C9E26] text-white px-4 py-2 rounded-lg font-semibold hover:bg-black transition">
              Sign Up
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            We respect your privacy. Read our{" "}
            <span className="text-[#3C9E26] font-semibold">Privacy Policy</span>
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
            width={60}
            height={60}
            referrerPolicy="no-referrer"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <p className="text-gray-600 text-sm mb-2">
            Subscribing to this newsletter keeps me ahead in the latest trends
            and insights. Highly recommended!
          </p>
          <p className="font-semibold">
            John Doe <span className="text-gray-500">- CEO, TechCorp</span>
          </p>
        </div>
      </div>
    </div>
  );
}
