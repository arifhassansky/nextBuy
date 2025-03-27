"use client";

import { Card } from "@/components/ui/Card/Card";
import { useGetProductsQuery } from "@/redux/ProductApi";
import { FC } from "react";
import CardSkeleton from "../ui/Skeletons/CardSkeleton/CardSkeleton";
import Link from "next/link";

// Define Product Type (matching the API or as a subset)
interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
  description?: string; // Optional fields if not always used
  category?: string;
  quantity?: number;
  createdAt?: string;
  updatedAt?: string;
  slug: string;
  __v?: number;
}

// Define possible error type
interface FetchError {
  status?: number;
  data?: {
    message?: string;
  };
  message?: string;
}

// Define the expected API response structure
interface ApiResponse {
  data: Product[];
}

const ProductsCard: FC = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  // Handle error state
  if (error) {
    const errorMessage =
      (error as FetchError)?.data?.message ||
      (error as FetchError)?.message ||
      "Failed to load products.";
    return (
      <div className="flex justify-center items-center h-40 text-red-500 font-semibold">
        Error: {errorMessage}
      </div>
    );
  }

  // Safely handle the data type
  const products =
    data && "data" in data
      ? (data as ApiResponse).data
      : (data as Product[] | undefined);

  return (
    <div className="md:w-11/12 mx-auto px-4">
      {/* Grid layout for products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {isLoading && (
          <>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </>
        )}
        {products?.map((product) => (
          <Link
            key={product._id}
            href={`${process.env.NEXTAUTH_URL}${product.slug}`}
          >
            <Card key={product?._id} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsCard;
