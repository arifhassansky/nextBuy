import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
interface CartItem {
   _id: string;
   productId: {
      _id: string;
      title: string;
      price: number;
      description: string;
      image: string;
      images: string[];
      category: string;
      quantity: number;
      slug: string;
      status: string;
   };
   quantity: number;
}

interface CartResponse {
   status: number;
   success: boolean;
   message: string;
   data: {
      _id: string;
      userEmail: string;
      items: CartItem[];
   };
}
// Define Type for Product
interface Product {
   _id: string;
   title: string;
   price: number;
   description: string;
   category: string;
   image: string;
   quantity: number;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

// Create API
export const ProductApi = createApi({
   reducerPath: 'ProductApi',
   baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXTAUTH_URL,
   }),
   tagTypes: ['Product'],
   endpoints: builder => ({
      getProducts: builder.query<Product[], void>({
         query: () => 'api/products?limit=10',
         providesTags: result =>
            Array.isArray(result)
               ? [
                    ...result.map(product => ({
                       type: 'Product' as const,
                       id: product._id,
                    })),
                    { type: 'Product', id: 'LIST' },
                 ]
               : [{ type: 'Product', id: 'LIST' }],
      }),

      getCart: builder.query<CartResponse, string>({
         query: (userEmail: string) => `/api/cart?userEmail=${userEmail}`,
      }),
   }),
});

// Export Hook
export const { useGetProductsQuery, useGetCartQuery } = ProductApi;
