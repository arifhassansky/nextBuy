import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addToCartApi = createApi({
  reducerPath: "addToCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `cart`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: "Cart", id })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),

    // createProducts: builder.mutation({
    //   query: (newProduct) => ({
    //     url: "products",
    //     method: "POST",
    //     body: newProduct,
    //   }),
    //   invalidatesTags: (results, error, id) => [
    //     {
    //       type: "Product",
    //       id,
    //     },
    //   ],
    // }),

    // deleteProduct: builder.mutation({
    //   query: (id) => ({
    //     url: `products/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: (results, error, id) => [
    //     {
    //       type: "Product",
    //       id,
    //     },
    //   ],
    // }),
  }),
});

export const { useGetProductsQuery } = addToCartApi;
