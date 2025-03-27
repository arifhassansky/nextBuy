"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FiLoader } from "react-icons/fi";
import { TbLoader3 } from "react-icons/tb";

interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  createdAt: string;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/products/${params.productId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const result = await response.json();

        if (result.success) {
          setProduct(result.data);
        } else {
          throw new Error(result.message || "Unknown error occurred");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (params.productId) {
      fetchProductDetails();
    }
  }, [params.productId]);

  if (isLoading) {
    return (
      <>
        <div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>

        <FiLoader className="text-[2.8rem] animate-spin text-[#3B9DF8]" />

        <TbLoader3 className="text-[2.8rem] animate-spin text-[#3B9DF8]" />
      </>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square">
          {product && (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold text-primary mr-4">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex gap-4">
            {/* <Button className="w-full" variant="default">
              Add to Cart
            </Button>
            <Button className="w-full" variant="outline">
              Buy Now
            </Button> */}
          </div>

          {/* Additional Product Details */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Product Information</h2>
            <ul className="space-y-2">
              <li>
                <strong>Stock:</strong> {product.quantity} available
              </li>
              <li>
                <strong>Added:</strong>{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
