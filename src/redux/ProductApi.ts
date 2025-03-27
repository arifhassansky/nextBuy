import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  reducerPath: "ProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "api/products",
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map((product) => ({
                type: "Product" as const,
                id: product._id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
  }),
});

// Export Hook
export const { useGetProductsQuery } = ProductApi;
