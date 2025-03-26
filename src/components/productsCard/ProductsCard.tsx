'use client';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import { Card } from '@/components/ui/Card/Card';
import { useGetProductsQuery } from '@/redux/ProductApi';

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

const ProductsCard = () => {
<<<<<<< HEAD
   const { data, error, isLoading } = useGetProductsQuery();
   const products = data?.data || [];
=======
  const { data, error, isLoading }: Product = useGetProductsQuery();
  const products = data?.data || [];
>>>>>>> 61fc69e5a1f494987d96ed82a4bd334699aa153e

   if (isLoading) return <LoadingSpinner />;

   
   if (error) return <div>Error: {error?.message || 'Failed to load products.'}</div>;

   return (
      <div className='w-11/12 mx-auto px-4'>
         {/* Grid layout for products */}
         <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6  md:gap-8 place-items-center  justify-items-center'>
            {products.length > 0 ? (
               products.map(product => <Card key={product._id} product={product} />)
            ) : (
               <div>No products available.</div>
            )}
         </div>
      </div>
   );
};

export default ProductsCard;
