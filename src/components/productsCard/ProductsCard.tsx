'use client';

import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import { Card } from '@/components/ui/Card/Card';
import { useGetProductsQuery } from '@/redux/ProductApi';

// Define Product Type
type Product = {
   _id: string;
   title: string;
   price: number;
   image: string;
};

// Define API Response Type
type ApiResponse = {
   data: Product[];
};

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
      </div>
   );
};

export default ProductsCard;
