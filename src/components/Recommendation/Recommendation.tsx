"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import RecommendedProductSkeleton from "../ui/Skeletons/RecommendedProductSkeleton/RecommendedProductSkeleton";
import Link from "next/link";

// Define Product Type
interface Product {
  image: string;
  title: string;
  catagory: string;
  price: number;
  slug: string;
}

const Recommendation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    setIsLoading(true);
    const response = await fetch("/api/recommended-products");
    const data = await response.json();
    setProducts(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);

  const ProductSkeleton = () => {
    return (
      <div className="p-4 mt-5 rounded-lg animate-pulse lg:w-[800px] ">
        <div className="lg:h-[500px] h-64 bg-gray-200 rounded w-full" />
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
          <div className="h-4 bg-gray-200 rounded w-1/4 mt-2" />
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
        <div className=" rounded-lg">
          {isLoading && <ProductSkeleton />}
          {!isLoading && (
            <Link href={`/products/${products?.[0]?.slug}`}>
              <Image
                src={products?.[0]?.image}
                alt={products?.[0]?.title}
                width={400}
                height={300}
                className="w-full rounded-lg object-cover h-fit transform transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2"
              />
              <div>
                <h3 className="mt-2 text-gray-700 font-semibold text-xl">
                  {products?.[0]?.title.length > 40
                    ? products?.[0]?.title.slice(0, 40) + "..."
                    : products?.[0]?.title}
                </h3>
                <h3 className="mt-2 text-gray-700">
                  {products?.[0]?.catagory}
                </h3>
                <p className="text-green-600 font-semibold">
                  ${products?.[0]?.price}
                </p>
              </div>
            </Link>
          )}
        </div>

        <div className="flex justify-center items-center p-5 rounded-lg">
          <div className="w-full">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold">
                Recommended for you by AI powered
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {isLoading && (
                <>
                  <RecommendedProductSkeleton />
                  <RecommendedProductSkeleton />
                  <RecommendedProductSkeleton />
                </>
              )}

              {!isLoading &&
                products?.map((product: Product, i: number) => (
                  <Link key={i} href={`/products/${product?.slug}`}>
                    <div className="p-2 bg-[#f7f7f7] rounded-xl">
                      <Image
                        src={product?.image}
                        alt={product?.title}
                        width={500}
                        height={300}
                        className="w-full rounded-lg object-cover h-64 transform transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2"
                      />
                      <div className="">
                        <h3 className="mt-2 text-gray-700">
                          {product?.title.length > 30
                            ? product?.title.slice(0, 30) + "..."
                            : product?.title}
                        </h3>
                        <h3 className="mt-2 text-gray-700">
                          {product?.catagory}
                        </h3>
                        <p className="text-green-600 font-semibold">
                          $ {product?.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
