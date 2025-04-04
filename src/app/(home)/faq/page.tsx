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
              What types of apartments are available at Skyline Haven?
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
            {activeIndex === 0 && (
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
                Skyline Haven offers a range of modern one, two, and three-bedroom apartments designed for both comfort and luxury. Each unit is built with high-end finishes and optimized for contemporary living.
              </p>
            )}
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleAnswer(1)}
            >
              <h1 className="font-semibold text-gray-700 dark:text-white">
              What amenities are included in the Skyline Haven apartments?
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
                Our apartments come with top-notch amenities, including a fully-equipped gym, swimming pool, 24/7 security, parking spaces, high-speed internet, and access to common areas like a lounge and rooftop garden.
              </p>
            )}
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleAnswer(2)}
            >
              <h1 className="font-semibold text-gray-700 dark:text-white">
              Are the apartments at Skyline Haven pet-friendly?
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
                Yes! We understand that pets are family, and Skyline Haven is a pet-friendly community. We provide designated pet areas and parks within the premises.
              </p>
            )}
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleAnswer(3)}
            >
              <h1 className="font-semibold text-gray-700 dark:text-white">
              How can I schedule a viewing for an apartment at Skyline Haven?
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
              To schedule a viewing, simply visit our website and fill out the contact form, or call our office directly. We’ll be happy to arrange a tour of the apartments at your convenience.
              </p>
            )}
          </div>

          <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleAnswer(4)}
            >
              <h1 className="font-semibold text-gray-700 dark:text-white">
              Is there parking available for residents at Skyline Haven?
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
              Yes, Skyline Haven offers ample parking spaces for residents. There are both indoor and outdoor parking options available, as well as electric vehicle charging stations.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
