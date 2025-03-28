"use client";
// import AddProduct from "@/app/(store)/dashboard/add-product/page";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import shopBanner from "../../../../public/assets/shopBanner.jpg";
import shopB2 from "../../../../public/assets/shopB2.jpg";
import sb3 from "../../../../public/assets/sb3.jpg";
import sb4 from "../../../../public/assets/sb4.jpg";
import sbr from "../../../../public/assets/resized-image-Promo.jpeg";
import sb5 from "../../../../public/assets/sb5.jpg";
import { Card } from "@/components/ui/Card/Card";
// import Category from "@/components/Category/Category";

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
  slug: string;
  __v?: number;
}
type AddProduct = Product;

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

const ProductsPage = ({ search }: { search: string[] }) => {
  const [products, setProducts] = useState<AddProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [checked, setChecked] = useState(false);

  const getRandomCategories = (sourceArray: Category[], count: number) => {
    const shuffled = [...sourceArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, sourceArray.length));
  };

  console.log(products);
  const [value, setValue] = useState(0);

  const sliderChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = (event) => {
    const slider = event.target.getBoundingClientRect();
    const newValue = ((event.clientX - slider.left) / slider.width) * 100;
    setValue(Math.min(Math.max(newValue, 0), 100));
  };

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category?limit=6");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        const randomCategories = getRandomCategories(data.data, 5); // Get 5 random categories
        setCategories(randomCategories);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-11/12 mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          OUR PRODUCTS
        </h2>
        <div className="text-center py-10">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-11/12 mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          OUR PRODUCTS
        </h2>
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-11/12 mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          OUR PRODUCTS
        </h2>
        <div className="text-center py-10">No products found</div>
      </div>
    );
  }
  // console.log(products);

  const handleInputChange = (event) => {
    if (event.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  return (
    <div className="w-full relative">
      {/* Banner image */}
      <div className="w-screen relative h-[400px] -mx-[calc(50vw-50%)]">
        <Image
          src={sb5}
          fill
          sizes="100vw"
          priority
          className="object-cover"
          alt="banner"
        />
      </div>

      {/* categories */}
      <div className="absolute top-[15%] hidden lg:flex">
        <div className="flex items-center gap-24 ">
          {categories.map((category) => (
            <div key={category._id} className="flex items-center gap-2">
              <Image
                src={category.image}
                width={50}
                height={50}
                className="object-cover bg-transparent"
                alt="category"
              />
              <h2 className="text-white">{category.name}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* all products area */}
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-start justify-between mt-10 gap-10">
        {/* left column */}
        <div className="w-full lg:w-1/4 flex flex-col items-start ">
          <h3>Filter by price</h3>
          <div className="flex items-center justify-center mt-4">
            <div
              className="relative w-64 h-3 bg-gray-300 rounded-full cursor-pointer"
              onClick={handleClick}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={sliderChange}
                className="absolute w-full h-3 top-0 z-20 opacity-0 cursor-pointer"
              />
              <div
                className="absolute top-0 h-3 bg-[#108476] rounded-full"
                style={{
                  width: `${value}%`,
                }}
              />
              <div
                className="absolute top-[50%] w-[22px] h-[22px] transform bg-[#108476] rounded-full -translate-x-1/2 translate-y-[-50%] cursor-pointer transition-transform duration-150 ease-in-out border-2 border-white"
                style={{
                  left: `${value}%`,
                }}
              />
            </div>
          </div>
          {/* status */}
          <div className="mt-24">
            <h3>Product Status</h3>
            <label className="flex items-center gap-[10px] cursor-pointer mt-5">
              <input
                type="checkbox"
                className="hidden"
                onChange={handleInputChange}
              />
              {checked ? (
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 335">
                    <rect
                      id="Rectangle 331"
                      x="-0.00012207"
                      y="6.10352e-05"
                      width="20"
                      height="20"
                      rx="4"
                      className="fill-[#3B9DF8]"
                      stroke="#3B9DF8"
                    ></rect>
                    <path
                      id="Vector"
                      d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                      fill="white"
                    ></path>
                  </g>
                </svg>
              ) : (
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 335">
                    <rect
                      id="Rectangle 331"
                      x="-0.00012207"
                      y="6.10352e-05"
                      width="20"
                      height="20"
                      rx="4"
                      className="fill-transparent"
                      stroke="#ccc"
                    ></rect>
                  </g>
                </svg>
              )}

              <span className="text-[1.2rem] text-[#424242]">On sale</span>
            </label>
            <label className="flex items-center gap-[10px] cursor-pointer mt-5">
              <input
                type="checkbox"
                className="hidden"
                onChange={handleInputChange}
              />
              {checked ? (
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 335">
                    <rect
                      id="Rectangle 331"
                      x="-0.00012207"
                      y="6.10352e-05"
                      width="20"
                      height="20"
                      rx="4"
                      className="fill-[#3B9DF8]"
                      stroke="#3B9DF8"
                    ></rect>
                    <path
                      id="Vector"
                      d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                      fill="white"
                    ></path>
                  </g>
                </svg>
              ) : (
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 335">
                    <rect
                      id="Rectangle 331"
                      x="-0.00012207"
                      y="6.10352e-05"
                      width="20"
                      height="20"
                      rx="4"
                      className="fill-transparent"
                      stroke="#ccc"
                    ></rect>
                  </g>
                </svg>
              )}

              <span className="text-[1.2rem] text-[#424242]">In stock</span>
            </label>
          </div>
        </div>

        {/* all products */}
        {/* right column */}
        <div className="w-full  lg:w-3/4 grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
