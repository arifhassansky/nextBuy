"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        console.log(data.data)
        setCategories(data.data);
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
      <div className="w-11/12 mx-auto py-20 px-4 mt-28 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          OUR CATEGORIES
        </h2>
        <div className="text-center py-10">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-11/12 mx-auto py-20 px-4 mt-28 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          OUR CATEGORIES
        </h2>
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-20 px-4 mt-28 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        OUR CATEGORIES
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {categories.map((category) => (
          <Link key={category._id} href={`/products?search=${category.slug}`}>
             <div className="flex items-center justify-center flex-col">
                  <div className="bg-gray-200 rounded-full flex items-center justify-center p-3 w-48 h-48 overflow-hidden">
                    <Image
                      width={400}
                      height={300}
                      src={category.image}
                      alt={category.name}
                      className="h-60 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 p-1"
                    />
                  </div>
                  <div className="flex items-center flex-col justify-center mx-auto mt-2">
                    <span className="font-bold">{category.name}</span>
            
                    <p className="text-center">
                      {category.description}
                    </p>
                  </div>
                </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
