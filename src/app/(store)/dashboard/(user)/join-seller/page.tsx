"use client";

import { useSession } from "next-auth/react";


import toast from "react-hot-toast";

const JoinAsSeller = () => {
  const { data: session } = useSession();
  const user = session?.user;
  
  const SellerRequest = async () => {
    if (!user) {
      toast.error("You need to be logged in to request as a seller.");
      return;
    }

    try {
      const response = await fetch("/api/store/seller-request/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: user.email }),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        toast.success("Your seller request has been submitted!");
      } else {
        toast.error(`Failed to request: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error sending seller request:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Join as a Seller</h2>
        <p className="text-gray-600 mb-4">
          Expand your reach and connect with potential buyers by listing your
          properties on our platform.
        </p>
      </div>

      {user?.role === "user" ? (
        <button onClick={SellerRequest} className="btn bg-[#3C9E26] hover:bg-black text-white">
          Request as a seller
        </button>
      ) : (
        <p className="text-red-500">You already login as a seller</p>
      )}
    </div>
  );
};

export default JoinAsSeller;
