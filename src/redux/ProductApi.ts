import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define Type for Product
interface Product {
   id: number;
   title: string;
   price: number;
   description: string;
   category: string;
   image: string;
   rating: {
      rate: number;
      count: number;
   };
}

// Create API
export const ProductApi = createApi({
   reducerPath: 'ProductApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://fakestoreapi.com/',
   }),
   tagTypes: ['Product'],
   endpoints: builder => ({
      getProducts: builder.query<Product[], void>({
         query: () => 'products',
         providesTags: result =>
            result
               ? [
                    ...result.map(product => ({ type: 'Product' as const, id: product.id })),
                    { type: 'Product', id: 'LIST' },
                 ]
               : [{ type: 'Product', id: 'LIST' }],
      }),
   }),
});

// Export Hook
export const { useGetProductsQuery } = ProductApi;
