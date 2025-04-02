"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Select Component
// const Select = ({ items }) => {
//   const [isActive, setIsActive] = useState(false);
//   const [content, setContent] = useState("Select Option");

//   // Close dropdown when clicking outside
//   React.useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".dropdown")) {
//         setIsActive(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <button
//       className="bg-[#fff] border border-gray-200 rounded-md mt-1 justify-between px-3 py-2 flex items-center gap-8 relative cursor-pointer dropdown w-full"
//       onClick={() => setIsActive(!isActive)}
//     >
//       <p
//         className={
//           content === "Select Option" ? "text-gray-400" : "text-gray-800"
//         }
//       >
//         {content}
//       </p>
//       <IoChevronDown
//         className={`${
//           isActive ? "rotate-180" : "rotate-0"
//         } transition-all duration-300 text-gray-600 text-[1.2rem]`}
//       />
//       <div
//         className={`${
//           isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 z-[-1]"
//         } w-full absolute top-12 left-0 right-0 z-40 bg-white rounded-xl flex flex-col overflow-hidden transition-all duration-200 ease-in-out py-1 shadow-lg`}
//       >
//         {items?.map((option, index) => (
//           <p
//             className="py-2 px-4 text-left text-gray-800 hover:bg-gray-50 transition-all duration-200"
//             key={index}
//             onClick={(e) => {
//               setContent(e.target.textContent);
//               setIsActive(false);
//             }}
//           >
//             {option}
//           </p>
//         ))}
//       </div>
//     </button>
//   );
// };

// Main Checkout Component
interface CheckoutPageProps {
  params: {
    id: string;
  };
}

const CheckoutPage = ({ params }: CheckoutPageProps) => {
  const { id: slug } = params;
  const { data: session } = useSession();
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [isChecked, setIsChecked] = useState(false);
  //   product
  interface Product {
    image: string;
    title: string;
    // Add other properties of the product object as needed
  }

  const [product, setProduct] = useState<Product | null>(null);
  console.log(product);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`
      );
      setProduct(data.data);
    };
    fetchProduct();
  }, [slug]);

  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-3 w-full p-4 max-w-7xl mx-auto">
      {/* Billing and Payment Form */}
      <div className="md:col-span-2 space-y-8 w-full">
        {/* Billing Information */}
        <div className="w-full">
          <h2 className="text-[1.5rem] font-medium text-gray-700 mb-6">
            Billing Information
          </h2>

          <div className="grid grid-cols-1 gap-[16px]">
            <div className="w-full col-span-2">
              <label
                htmlFor="firstName"
                className="text-[14px] font-[400] text-gray-700"
              >
                Name
              </label>
              <input
                placeholder="Your name"
                type="text"
                id="name"
                defaultValue={session?.user?.name}
                readOnly
                className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="text-[14px] font-[400] text-gray-700"
              >
                Address
              </label>
              <input
                placeholder="Address"
                type="text"
                id="address"
                className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <div className="w-full md:w-[50%]">
                <label
                  htmlFor="country"
                  className="text-[14px] font-[400] text-gray-700"
                >
                  Country
                </label>
                <input
                  placeholder="Country"
                  type="text"
                  id="country"
                  className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                />
              </div>
              <div className="w-full md:w-[50%]">
                <label
                  htmlFor="state"
                  className="text-[14px] font-[400] text-gray-700"
                >
                  Region/State
                </label>
                <input
                  placeholder="state"
                  type="text"
                  id="state"
                  className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <div className="w-full md:w-[50%]">
                <label
                  htmlFor="city"
                  className="text-[14px] font-[400] text-gray-700"
                >
                  City
                </label>
                <input
                  placeholder="City"
                  type="text"
                  id="city"
                  className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                />
              </div>
              <div className="w-full md:w-[50%]">
                <label
                  htmlFor="zipCode"
                  className="text-[14px] font-[400] text-gray-700"
                >
                  Zip Code
                </label>
                <input
                  placeholder="Zip code"
                  type="text"
                  id="zipCode"
                  className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center col-span-2 gap-4 w-full">
              <div className="w-full md:w-[50%]">
                <label
                  htmlFor="email"
                  className="text-[14px] font-[400] text-gray-700"
                >
                  Email
                </label>
                <input
                  placeholder="Email address"
                  type="email"
                  id="email"
                  defaultValue={session?.user?.email}
                  readOnly
                  className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                />
              </div>
              <div className="w-full md:w-[50%]">
                <label
                  htmlFor="phone"
                  className="text-[14px] font-[400] text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  placeholder="Phone number"
                  type="tel"
                  id="phone"
                  className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center gap-[10px] cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                // onChange={handleCheckboxChange}
                onClick={(e) =>
                  setIsChecked((e.target as HTMLInputElement)?.checked)
                }
              />
              {isChecked ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    rx="4"
                    className="fill-[#0FABCA]"
                    stroke="#0FABCA"
                  />
                  <path
                    d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    rx="4"
                    className="fill-transparent"
                    stroke="#ccc"
                  />
                </svg>
              )}

              <span className="text-[0.9rem] text-gray-700">
                Ship to a different address
              </span>
            </label>
          </div>
        </div>

        {/* Payment Options */}
        <div className="border border-gray-200 rounded-md">
          <h2 className="text-[1.2rem] font-medium text-gray-700 border-b border-gray-200 px-5 py-3">
            Payment Option
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-5">
            <button
              onClick={() => setSelectedPayment("cash")}
              className={`flex flex-col items-center justify-center p-4 border rounded-lg ${
                selectedPayment === "cash"
                  ? "border-[#0FABCA]"
                  : "border-gray-200"
              }`}
            >
              <span className="text-2xl">💵</span>
              <span className="text-[0.9rem] text-gray-700 font-[500] mt-2">
                Cash on Delivery
              </span>
            </button>
            <button
              onClick={() => setSelectedPayment("credit-card")}
              className={`flex flex-col items-center justify-center p-4 border rounded-lg ${
                selectedPayment === "credit-card"
                  ? "border-[#0FABCA]"
                  : "border-gray-200"
              }`}
            >
              <span className="text-2xl">💳</span>
              <span className="text-[0.9rem] text-gray-700 font-[500] mt-2">
                Debit/Credit Card
              </span>
            </button>
          </div>

          {selectedPayment === "credit-card" && (
            <div className="px-5 pb-5 space-y-[16px]">
              <div>
                <label
                  htmlFor="cardName"
                  className="text-[14px] font-[400] text-gray-700"
                >
                  Name on Card
                </label>
                <input
                  placeholder="Name on card"
                  type="text"
                  id="cardName"
                  className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                />
              </div>
              <div>
                <label
                  htmlFor="cardNumber"
                  className="text-[14px] font-[400] text-gray-700"
                >
                  Card Number
                </label>
                <input
                  placeholder="Card number"
                  type="text"
                  id="cardNumber"
                  className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="expireDate"
                    className="text-[14px] font-[400] text-gray-700"
                  >
                    Expire Date
                  </label>
                  <input
                    type="text"
                    id="expireDate"
                    placeholder="MM/YY"
                    className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvc"
                    className="text-[14px] font-[400] text-gray-700"
                  >
                    CVC
                  </label>
                  <input
                    placeholder="CVC"
                    type="text"
                    id="cvc"
                    className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div>
          <h2 className="text-[1.2rem] font-medium text-gray-700 mb-4">
            Additional Information
          </h2>
          <div>
            <label
              htmlFor="notes"
              className="text-[14px] font-[400] text-gray-700"
            >
              Order Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={4}
              placeholder="Notes about your order e.g. special notes for delivery"
              className="border border-gray-200 w-full px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA] py-3"
            />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full">
        <div className="bg-white rounded-md border border-gray-200 p-6">
          <h2 className="text-[1.2rem] font-medium text-gray-700 mb-6">
            Order Summary
          </h2>
          <div className="space-y-4">
            {/* product */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image
                  src={product?.image || ""}
                  alt="product"
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                  {product?.title}
                </p>
                <div className="flex items-center gap-[5px] mt-0.5">
                  <p className="text-sm text-gray-500">1 x </p>
                  <p className="text-sm text-[#0FABCA] font-[600]">$100</p>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sub-total</span>
                <span className="font-medium text-gray-800">$670</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-500">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-gray-800">$20</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-800">$650</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-base font-medium text-gray-800">
                  Total
                </span>
                <span className="text-base font-medium text-gray-800">
                  $357.99 USD
                </span>
              </div>
            </div>

            <button className="w-full bg-[#0FABCA] text-white py-3 px-4 rounded-lg hover:bg-[#0FABCA]/90 transition-colors">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
