"use client";

<<<<<<< HEAD
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import { Card } from '@/components/ui/Card/Card';
import { useGetProductsQuery } from '@/redux/ProductApi';
=======
import { Card } from "@/components/ui/Card/Card";
import { useGetProductsQuery } from "@/redux/ProductApi";
import { FC } from "react";
import CardSkeleton from "../ui/Skeletons/CardSkeleton/CardSkeleton";
>>>>>>> 87171002ef1fa6013d46411a98c99b8341ad66f3

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

<<<<<<< HEAD
// ProductsCard Component
const ProductsCard = () => {
   const { data, error, isLoading } = useGetProductsQuery<ApiResponse>();

   // Handle loading state
   if (isLoading) return <LoadingSpinner />;

   // Handle error state
   if (error) {
      return (
         <div className='flex justify-center items-center h-40 text-red-500 font-semibold'>
            Error: {(error as { message?: string })?.message || 'Failed to Load products.'}
         </div>
      );
   }

   const products = data?.data || [];

   return (
      <div className='md:w-11/12 mx-auto px-4'>
         {/* Grid layout for products */}
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8'>
            {products.length > 0 ? (
               products.map(product => <Card key={product._id} product={product} />)
            ) : (
               <div className='col-span-full text-center text-gray-500'>No products available.</div>
            )}
         </div>
=======
const ProductsCard: FC = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  console.log(data);
  // Handle error state
  if (error) {
    const errorMessage =
      (error as FetchError)?.data?.message ||
      (error as FetchError)?.message ||
      "Failed to load products.";
    return (
      <div className="flex justify-center items-center h-40 text-red-500 font-semibold">
        Error: {errorMessage}
>>>>>>> 87171002ef1fa6013d46411a98c99b8341ad66f3
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
          <Card key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsCard;
