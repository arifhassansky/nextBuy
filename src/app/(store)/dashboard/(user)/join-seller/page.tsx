"use client";
import Image from "next/image";
import React from "react";

const JoinAsSeller = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const sellerId = formData.get("sellerId") as string;
    const street = formData.get("street") as string;
    const city = formData.get("city") as string;
    const postalCode = formData.get("postalCode") as string;
    const country = formData.get("country") as string;

    console.log({
      name,
      category,
      description,
      sellerId,
      street,
      city,
      postalCode,
      country,
    });
  };
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800">
      {/* heading */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Join as a Seller</h2>
        <p className="text-gray-600 mb-4">
          Expand your reach and connect with potential buyers by listing your
          properties on our platform.
        </p>
      </div>
      {/* Join As Seller form */}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#3C9E26] focus:outline-[#3C9E26]/60 rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#3C9E26] focus:outline-[#3C9E26]/60 rounded-md bg-white"
                name="category"
                id="category"
                type="text"
                placeholder="Category"
                required
              />
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Write shop description here..."
                className="block rounded-md focus:outline-[#3C9E26]/60 w-full h-32 px-4 py-3 text-gray-800 border bg-white border-[#3C9E26]"
                name="description"
              ></textarea>
            </div>
            {/* seller id */}
            <div className="space-y-1 text-sm">
                <label htmlFor="sellerId" className="block text-gray-600">
                  Seller Id
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-[#3C9E26] focus:outline-[#3C9E26]/60 rounded-md bg-white"
                  name="sellerId"
                  id="sellerId"
                  type="text"
                  placeholder="Seller Id"
                  required
                />
              </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* minPrice & maxPrice */}
            <div className="flex justify-between gap-2">
             
              <div className="space-y-1 text-sm">
                <label htmlFor="street" className="block text-gray-600">
                  Street No.
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-[#3C9E26] focus:outline-[#3C9E26]/60 rounded-md bg-white"
                  name="street"
                  id="street"
                  type="number"
                  placeholder="Street No"
                  required
                />
              </div>

               {/* Country */}
            <div className="space-y-1 text-sm">
              <label htmlFor="country" className="block text-gray-600">
                Country
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#3C9E26] focus:outline-[#3C9E26]/60 rounded-md bg-white"
                name="country"
                id="country"
                type="text"
                placeholder="Enter Country"
                required
              />
            </div>
            </div>
           <div className="flex justify-between gap-2">
              {/* City */}
              <div className="space-y-1 text-sm">
              <label htmlFor="city" className="block text-gray-600">
                City
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#3C9E26] focus:outline-[#3C9E26]/60 rounded-md bg-white"
                name="city"
                id="city"
                type="text"
                placeholder="Enter City"
                required
              />
            </div>
            {/* Postal Code */}
            <div className="space-y-1 text-sm">
              <label htmlFor="postalCode" className="block text-gray-600">
                Postal Code
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#3C9E26] focus:outline-[#3C9E26]/60 rounded-md bg-white"
                name="postalCode"
                id="postalCode"
                type="text"
                placeholder="Enter Postal Code"
                required
              />
            </div>
           </div>
            {/* Image */}
            <div className=' p-4  w-full  m-auto rounded-lg flex-grow'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />

                    <div className='bg-[#3C9E26]/80 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-black'>
                      Image
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/* {uploadImage && uploadImage?.image?.size && (
              <div className='flex gap-5 items-center'>
                <Image className='w-20' src="/image" alt='' />
                <p>Image Size: 0 Bytes</p>
              </div>
            )} */}
           
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#3C9E26] hover:bg-black"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JoinAsSeller;
