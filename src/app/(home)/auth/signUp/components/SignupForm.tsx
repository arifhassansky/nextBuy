"use client";
// import registerUser from "@/app/actions/auth/registerUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import Sociallogin from "../../login/components/Sociallogin";

const SignupForm = () => {
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget; // Ensures correct type
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const image = formData.get("image") as string;
    const password = formData.get("password") as string;

    console.log(name, email, image, password);

    try {
      // Assuming registerUser is an API call that returns a response
      // const res = await registerUser({ name, email, image, password });

      
      // if (res) {
      router.push("/");
      form.reset(); // Ensure form reset works correctly
      toast.success("User registered successfully. Please login.");
      // }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-1/2 p-28 pt-">
      <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
      <p className="text-sm text-gray-500 text-center">
        Please Sign Up to your account
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Enter Your Full Name"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#3C9E26]"
          name="name"
          required
        />

        <input
          type="text"
          placeholder="Enter Your Photo URL"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#3C9E26]"
          name="image"
          required
        />
        <input
          type="email"
          placeholder="Enter Your Email Address"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#3C9E26]"
          name="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#3C9E26]"
          name="password"
          required
        />
        <button className="w-full bg-[#3C9E26] hover:bg-[#3C9E26] text-white py-2 rounded-md">
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">Or SignUp with</p>
        <Sociallogin />
      </div>

      <p className="mt-4 text-sm text-center">
        Not a member?{" "}
        <Link href="/auth/login" className="text-[#3C9E26] font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
