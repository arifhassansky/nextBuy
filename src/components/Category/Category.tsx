"use client";
import { useEffect, useState } from "react";
import CategoryComponents from "./CategoryComponents"; // Typo corrected: "Catagory" -> "Category"
import Link from "next/link";
import CategorySkeleton from "../ui/Skeletons/CategorySkeleton/CategorySkeleton";

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

  // Function to get an array of random categories
  const getRandomCategories = (sourceArray: Category[], count: number) => {
    const shuffled = [...sourceArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, sourceArray.length));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category?limit=20");
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

  if (error) {
    return (
      <div className="w-11/12 mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          OUR CATEGORIES
        </h2>
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-20 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
        OUR CATEGORIES
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {loading ? (
          <>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </>
        ) : (
          categories.map((category) => (
            <Link key={category._id} href={`/products?search=${category.slug}`}>
              <CategoryComponents img={category.image} value={category.name} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
