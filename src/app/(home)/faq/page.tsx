 "use client"
import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 text-center lg:text-3xl dark:text-white">
          Frequently <span className="text-primary">Asked </span> Questions
        </h1>

        <div className="mt-8 space-y-8 lg:mt-12">
          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleAnswer(0)}
            >
              <h1 className="font-semibold text-gray-700 dark:text-white">
              What is NextBuy?
              </h1>
              {
                activeIndex === 0? <span className="text-gray-400 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              </span>: <span className="text-white bg-primary rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                </span>
              }
             
            </button>
            {activeIndex === 0 && (
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
               NextBuy is an online shopping platform that offers a wide range of products, including electronics, fashion, home essentials, and more, at competitive prices.
              </p>
            )}
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleAnswer(1)}
            >
              <h1 className="font-semibold text-gray-700 dark:text-white">
              How do I create an account on NextBuy?
              </h1>
              {
                activeIndex === 1? <span className="text-gray-400 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              </span>: <span className="text-white bg-primary rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                </span>
              }
            </button>
            {activeIndex === 1 && (
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
                You can sign up for a NextBuy account by clicking the "Sign Up" button on the homepage. You’ll need to provide your email address, create a password, and verify your account.
              </p>
            )}
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleAnswer(2)}
            >
              <h1 className="font-semibold text-gray-700 dark:text-white">
              What is NextBuy’s return and refund policy?
              </h1>
              {
                activeIndex === 2? <span className="text-gray-400 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              </span>: <span className="text-white bg-primary rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                </span>
              }
            </button>
            {activeIndex === 2 && (
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
               We offer a 7-day return policy for most items. If you receive a damaged, defective, or incorrect product, you can request a return or replacement. Refunds are processed within 5-10 business days after the returned item is received.
              </p>
            )}
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleAnswer(3)}
            >
              <h1 className="font-semibold text-gray-700 dark:text-white">
              How can I track my order?
              </h1>
              {
                activeIndex === 3? <span className="text-gray-400 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              </span>: <span className="text-white bg-primary rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                </span>
              }
            </button>
            {activeIndex === 3 && (
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              After placing an order, you will receive a tracking link via email/SMS. You can also track your order by logging into your NextBuy account and visiting the “Orders” section.
              </p>
            )}
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleAnswer(4)}
            >
              <h1 className="font-semibold text-gray-700 dark:text-white">
              How can I track my order?
              </h1>
              {
                activeIndex === 4? <span className="text-gray-400 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              </span>: <span className="text-white bg-primary rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                </span>
              }
            </button>
            {activeIndex === 4 && (
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
              After placing an order, you will receive a tracking link via email/SMS. You can also track your order by logging into your NextBuy account and visiting the “Orders” section.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
