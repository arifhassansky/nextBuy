"use client";
import { imageUpload } from "@/redux/utils/ImageBbUpload";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ManageStores = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const destruction = formData.get("description") as string;
    const userId = formData.get("userId") as string;
    const street = formData.get("street") as string;
    const city = formData.get("city") as string;
    const postalCode = formData.get("postalCode") as string;
    const country = formData.get("country") as string;
    const imageFile = formData.get("image") as File;

    const imageUrl = imageFile ? await imageUpload(imageFile) : null;

    const storeData = {
      name,
      category,
      destruction,
      sellerId: userId,
      coverImage: imageUrl,
      address: {
        street,
        city,
        postalCode,
        country,
      },
    };

    console.log("Store data:", storeData);

    try {
      const res = await fetch("/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storeData),
      });

      const result = await res.json();
      console.log("Response from store", result);
      if (res.success == "true") {
        form.reset();
        toast.success("Store information saved successfully!");
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting store form:", error);
      toast.error("Failed to submit store form.");
    }
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
    }
  };
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Stores</h2>
        <p className="text-gray-600 mb-4">
          Expand your reach and connect with potential buyers by listing your
          properties on our platform.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Store Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Store Name
              </label>
              <input
                name="name"
                id="name"
                type="text"
                placeholder="Store Name"
                required
                className="w-full px-4 py-3 border border-[#3C9E26] rounded-md bg-white"
              />
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <input
                name="category"
                id="category"
                type="text"
                placeholder="Category"
                required
                className="w-full px-4 py-3 border border-[#3C9E26] rounded-md bg-white"
              />
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Write shop description here..."
                className="w-full h-32 px-4 py-3 border border-[#3C9E26] rounded-md bg-white"
              ></textarea>
            </div>
            {/* User ID */}
            <div className="space-y-1 text-sm">
              <label htmlFor="userId" className="block text-gray-600">
                User Id
              </label>
              <input
                name="userId"
                id="userId"
                type="text"
                value={user?.id}
                readOnly
                className="w-full px-4 py-3 border border-[#3C9E26] rounded-md bg-white"
              />
            </div>
          </div>

          {/* Address + Image */}
          <div className="space-y-6 flex flex-col">
            <div className="flex gap-2">
              {/* Street */}
              <div className="space-y-1 text-sm">
                <label htmlFor="street" className="block text-gray-600">
                  Street No.
                </label>
                <input
                  name="street"
                  id="street"
                  type="number"
                  required
                  className="w-full px-4 py-3 border border-[#3C9E26] rounded-md bg-white"
                />
              </div>
              {/* Country */}
              <div className="space-y-1 text-sm">
                <label htmlFor="country" className="block text-gray-600">
                  Country
                </label>
                <input
                  name="country"
                  id="country"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#3C9E26] rounded-md bg-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {/* City */}
              <div className="space-y-1 text-sm">
                <label htmlFor="city" className="block text-gray-600">
                  City
                </label>
                <input
                  name="city"
                  id="city"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#3C9E26] rounded-md bg-white"
                />
              </div>
              {/* Postal Code */}
              <div className="space-y-1 text-sm">
                <label htmlFor="postalCode" className="block text-gray-600">
                  Postal Code
                </label>
                <input
                  name="postalCode"
                  id="postalCode"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#3C9E26] rounded-md bg-white"
                />
              </div>
            </div>
            {/* Image Upload */}
            <div className="p-4 border-4 border-dotted border-gray-300 rounded-lg">
              <label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImagePreview}
                />
                <div className="bg-[#3C9E26]/80 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-black">
                  Upload Image
                </div>
              </label>
            </div>

            {previewImage && (
              <div className="flex items-center gap-3">
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={80}
                  height={80}
                  className="rounded"
                />
                <p className="text-sm text-gray-500">Image ready for upload</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full p-3 mt-5 font-medium text-white bg-[#3C9E26] rounded shadow-md hover:bg-black"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageStores;
