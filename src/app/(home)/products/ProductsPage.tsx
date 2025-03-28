"use client";
import AddProduct from "@/app/(store)/dashboard/add-product/page";
import React, { useEffect, useState } from "react";

const ProductsPage = ({ search }: { search: string[] }) => {
  const [products, setProducts] = useState<AddProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/products?search=${search ? search : ""}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data.data);
        setProducts(data.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

  if (loading) {
    return (
      <div className="w-11/12 mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          Our Products
        </h2>
        <div className="text-center py-10">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-11/12 mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          Our Products
        </h2>
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-11/12 mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          Our Products
        </h2>
        <div className="text-center py-10">No products found</div>
      </div>
    );
  }

  return <div></div>;
};

export default ProductsPage;
