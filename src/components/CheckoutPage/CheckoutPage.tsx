"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

//   product
interface Product {
  image: string;
  title: string;
  // Add other properties of the product object as needed
  price: number;
  _id: string;
  discount: number;
  discountPrice: number;
}
interface UserDetails {
  customer: {
    userId: string;
    name: string;
    email: string;
  };
  address: {
    address: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;

  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  payment: {
    method: "sslcommerz" | "strip" | "cod";
    amount: number;
  };
  street: string;
  city: string;
  postalCode: string;
  country: string;
  fullAddress: string;
  name: string;
  email: string;
  number: string;
  paymentMethod: string;
  cardHolderName: string;
}

const CheckoutWrapper = ({ params }: any) => {
  const { id: slug } = params;
  const { data: session } = useSession();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [isChecked, setIsChecked] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetails>({
    customer: {
      userId: "",
      name: "",
      email: "",
    },
    address: {
      address: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    phone: "",
    items: [],
    shippingAddress: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    billingAddress: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    payment: {
      method: "cod",
      amount: 0,
    },
    street: "",
    city: "",
    postalCode: "",
    country: "",
    fullAddress: "",
    name: "",
    cardHolderName: "",
    email: "",
    number: "",
    paymentMethod: "",
  });

  const [payload, setPayload] = useState<any>(null);
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  console.log(payload);
  // 🟡 Universal input handler
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Auto update payload whenever dependencies change
  useEffect(() => {
    if (!product) return;

    setPayload({
      customer: {
        userId: session?.user?.id,
        name: userDetails?.cardHolderName,
        email: session?.user?.email,
      },
      address: getAddress(userDetails),
      phone: userDetails.number,
      items: [
        {
          productId: product?._id,
          name: product?.title,
          quantity: 1,
          price: product?.price,
          subtotal: product?.price,
        },
      ],
      shippingAddress: getAddress(userDetails),
      billingAddress: getAddress(userDetails),
      payment: {
        method: selectedPayment,
        status: paymentStatus,
        amount: product?.price,
      },
    });
  }, [userDetails, selectedPayment, product, session]);

  // 🟢 Address structure helper
  const getAddress = (details: UserDetails) => ({
    address: details.address,
    street: details.street,
    city: details.city,
    postalCode: details.postalCode,
    country: details.country,
  });

  // 🟡 Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`
      );
      setProduct(data.data);
    };
    fetchProduct();
  }, [slug]);

  // 🔵 Submit only when needed
  const handlePayment = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        payload
      );
      if (response.data.status === 201) {
        setPaymentProcessing(false);
      }
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Payment error:", err);
    }
    // console.log(payload);
  };

  const handelGetClientSecret = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-payment`,
      {
        amount: product?.price,
      }
    );
    if (response.data.status === 200) {
      setClientSecret(response.data?.paymentIntent?.client_secret);
    }
  };

  const handelPaymentWithStripe = async () => {
    try {
      setPaymentProcessing(true);
      if (!stripe || !elements) {
        return;
      }

      const cardElement: any = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        String(clientSecret),
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: session?.user?.name,
              email: session?.user?.email,
            },
          },
        }
      );
      if (paymentIntent?.status === "succeeded") {
        setPaymentProcessing(false);
        setPaymentStatus("paid");
        handlePayment();
        Swal.fire({
          title: "Payment Successful!",
          text: `${product?.title} has been successfully paid.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          router.push("/dashboard/carts");
        }, 2000);
      }
      //   console.log("Response:", response.data);
      setPaymentProcessing(false);
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentProcessing(false);
      setPaymentStatus("failed");
    }
  };
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
                htmlFor="name"
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
                name="address"
                onChange={handelChange}
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
                  name="country"
                  onChange={handelChange}
                  id="country"
                  className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                />
              </div>
              <div className="w-full md:w-[50%]">
                <label
                  htmlFor="street"
                  className="text-[14px] font-[400] text-gray-700"
                >
                  Street
                </label>
                <input
                  placeholder="street"
                  type="text"
                  name="street"
                  onChange={handelChange}
                  id="street"
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
                  name="city"
                  onChange={handelChange}
                  className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                />
              </div>
              <div className="w-full md:w-[50%]">
                <label
                  htmlFor="postalCode"
                  className="text-[14px] font-[400] text-gray-700"
                >
                  Zip Code
                </label>
                <input
                  placeholder="Zip code"
                  type="text"
                  name="postalCode"
                  onChange={handelChange}
                  id="postalCode"
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
                  htmlFor="number"
                  className="text-[14px] font-[400] text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  placeholder="Phone number"
                  type="tel"
                  id="number"
                  name="number"
                  onChange={handelChange}
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
              onClick={() => setSelectedPayment("cod")}
              className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer ${
                selectedPayment === "cod"
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
              onClick={() => (
                setSelectedPayment("stripe"), handelGetClientSecret()
              )}
              className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer  ${
                selectedPayment === "stripe"
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

          {selectedPayment === "stripe" && (
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
                  onChange={handelChange}
                  name="cardHolderName"
                  id="cardHolderName"
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
                {/* <input
                  placeholder="Card number"
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                /> */}
              </div>
              <CardElement className="block w-full border border-slate-300 p-2 px-4 py-3 rounded-md focus:border-slate-500 focus:ring focus:ring-slate-200" />
              {/* <div className="grid grid-cols-2 gap-4">
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
                    name="date"
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
                    name="cvc"
                    className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]"
                  />
                </div>
              </div> */}
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
                  <p className="text-sm text-[#0FABCA] font-[600]">
                    ${product?.price || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sub-total</span>
                <span className="font-medium text-gray-800">
                  ${product?.price || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-500">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-gray-800">
                  {product?.discount ? product.discount : "Not Available"}
                </span>
              </div>
              {/* <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium text-gray-800">$650</span>
            </div> */}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-base font-medium text-gray-800">
                  Total
                </span>
                <span className="text-base font-medium text-gray-800">
                  {product?.discount
                    ? `$${product?.price - product?.discount}`
                    : `$${product?.price}` || 0}
                </span>
              </div>
            </div>

            {selectedPayment === "cod" ? (
              <button
                onClick={handlePayment}
                className="w-full bg-[#0FABCA] text-white py-3 px-4 rounded-lg hover:bg-[#0FABCA]/90 transition-colors cursor-pointer"
              >
                PLACE ORDER
              </button>
            ) : (
              <button
                onClick={handelPaymentWithStripe}
                className="w-full bg-[#0074D4] text-white py-3 px-4 rounded-lg hover:bg-[#0074D4]/90 transition-colors cursor-pointer"
              >
                {paymentProcessing ? "PROCESSING..." : "PAY WITH STRIPE"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutWrapper;
