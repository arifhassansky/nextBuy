"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Shop {
  slug: string;
  _id: string;
  name: string;
  createdAt: string;
  coverImage: string;
  category: string[];
  street: string;
  city: string;
  postalCode: string;
  country: string;
  address : string;
}

const Shop = () => {

  const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    // console.log("common url",process.env.NEXTAUTH_URL)
  
    useEffect(() => {
      const fetchShops = async () => {
        try {
          const response = await fetch("/api/store");
          if (!response.ok) {
            throw new Error("Failed to fetch shops");
          }
          const data = await response.json();
          console.log(data.data);
          setShops(data.data);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
          console.error("Error fetching shops:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchShops();
    }, []);

    if (error) {
      return (
        <div className="w-11/12 mx-auto py-20 px-4">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          Explore Our Exclusive Shops
          </h2>
          <p className="text-lg text-gray-600 mt-2 text-center mb-8">
        Discover high-quality products from trusted sellers.
      </p>
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        </div>
      );
    }
  return (
    <div className="w-11/12 mx-auto p-6 mt-24">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
        Explore Our Exclusive Shops
      </h1>
      <p className="text-lg text-gray-600 mt-2 text-center mb-8">
        Discover high-quality products from trusted sellers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shops.map((shop) => (
          <div
            key={shop._id}
            className="h-[350px] border border-gray-300 rounded-xl shadow-lg hover:scale-105 transition duration-300 bg-white cursor-pointer"
          >
            <div className="hover14 column">
              <figure className="w-full h-40 overflow-hidden">
                <Image
                  src={shop.coverImage}
                  alt={shop.name}
                  width={300}
                  height={160}
                  className="w-full h-40 rounded-t-xl object-cover"
                />
              </figure>
            </div>
            <div className="p-4 space-y-2">
              <h1 className="font-semibold text-lg">{shop.name}</h1>
              <p className="text-gray-600 text-xs">
                Category: {shop.category}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">Address:{shop.address.street},{shop.address.city},{shop.address.postalCode}, {shop.address.country}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
