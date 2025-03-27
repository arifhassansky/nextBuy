"use client";

import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { Card } from "@/components/ui/Card/Card";
import { useGetProductsQuery } from "@/redux/ProductApi";
import { FC } from "react";

// Define Product Type (matching the API or as a subset)
// interface Product {
//   _id: string;
//   title: string;
//   price: number;
//   image: string;
//   description?: string; // Optional fields if not always used
//   category?: string;
//   quantity?: number;
//   createdAt?: string;
//   updatedAt?: string;
//   __v?: number;
// }

// Define possible error type
interface FetchError {
  status?: number;
  data?: {
    message?: string;
  };
  message?: string;
}

const ProductsCard: FC = () => {
  // Remove generic type since it matches the API definition
  const { data, error, isLoading } = useGetProductsQuery();

  // Handle loading state
  if (isLoading) return <LoadingSpinner />;

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

  // Data is Product[] directly from the API
  const products = data || [];

  return (
    <div className="md:w-11/12 mx-auto px-4">
      {/* Grid layout for products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsCard;
