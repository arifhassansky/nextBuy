"use client";

import Image from "next/image";
import React from "react";

const shops = [
  {
    id: 1,
    name: "Elite Tech Store",
    seller: "Michael Anderson",
    totalQuantity: 30,
    image: "https://i.ibb.co.com/nqQzPrq2/tem-rysh-F6-U5f-GAOik-unsplash.jpg",
  },
  {
    id: 2,
    name: "Gizmo Galaxy",
    seller: "Sophia Reynolds",
    totalQuantity: 26,
    image:
      "https://i.ibb.co.com/nM7VBqRK/fikri-rasyid-eze-C8-cl-ZSs-unsplash.jpg",
  },
  {
    id: 3,
    name: "QuickMart",
    seller: "Daniel Carter",
    totalQuantity: 29,
    image:
      "https://i.ibb.co.com/pjJ9XrGF/alison-pang-Df8-Hjc-QTVQU-unsplash.jpg",
  },
  {
    id: 4,
    name: "Infinity Market",
    seller: "Emma Thompson",
    totalQuantity: 35,
    image:
      "https://i.ibb.co.com/GfhGrfmh/clark-street-mercantile-P3p-I6xzovu0-unsplash.jpg",
  },
  {
    id: 5,
    name: "Mega Mart",
    seller: "Robert Johnson",
    totalQuantity: 35,
    image: "https://i.ibb.co.com/DfWgNk43/nrd-D6-Tu-L3ch-LE-unsplash.jpg",
  },
];

const Shop = () => {
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
            key={shop.id}
            className="h-[350px] border border-gray-300 rounded-xl shadow-lg hover:scale-105 transition duration-300 bg-white cursor-pointer"
          >
            <div className="hover14 column">
              <figure className="w-full h-40 overflow-hidden">
                <Image
                  src={shop.image}
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
                Total Quantity: {shop.totalQuantity}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">Seller:{shop.seller}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
