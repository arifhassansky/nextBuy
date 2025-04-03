"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Shop {
  slug: string;
  _id: string;
  title: string;
  createdAt: string;
  price: string;
  description: string[];
  quantity: string;
  category: string;
  status: string;
  image: string;
}

const ShopDetails = ({ params }: { params: { id: string } }) => {
  
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch(`/api/store/${params.id}`); 
        if (!response.ok) throw new Error("Failed to fetch shops");

        const data = await response.json();
        console.log(data.data);
        setShops(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error fetching shops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [params.id]); // Use params.id as a dependency

  if (loading) return <p className="text-center text-gray-500 mt-6">Loading shops...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="w-11/12 mx-auto p-6 mt-24">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
        Explore Our Exclusive {params.id} Products
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
                  src={shop.image} 
                  alt={shop.title} 
                  width={300}
                  height={160}
                  className="w-full h-40 rounded-t-xl object-cover"
                />
              </figure>
            </div>
            <div className="p-4 space-y-2">
              <h1 className="font-semibold text-lg">{shop.title}</h1>
              <p className="text-gray-600 text-xs">Category: {shop.category}</p>
              <p className="text-gray-600 text-xs">Quantity: {shop.quantity}</p>
              <p className="text-xs text-gray-500">Status: {shop.status}</p> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopDetails;
