"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Article {
  slug: string;
  _id: string;
  createdAt: string;
  image: string;
  category: string[];
  title: string;
  author: string;
  content: string;
  authorImage: string;
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Change this value to show more/less articles per page

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/blogs?limit=8");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching articles:", err);
      }
    };

    fetchArticles();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(articles.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedArticles = articles.slice(startIndex, startIndex + postsPerPage);

  if (error) {
    return (
      <div className="w-11/12 mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          All Blogs
        </h2>
        <div className="text-center py-10 text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto p-6 mt-28">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
        Explore Our Latest Blogs
      </h1>
      <p className="text-lg text-gray-600 mt-2 text-center mb-8">
        Stay informed with expert insights, trends, and valuable tips from
        industry professionals.
      </p>

      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedArticles.map((article) => (
          <Link
            key={article._id}
            href={`/article/${article.slug}`}
            className="h-[400px] border border-gray-300 rounded-xl shadow-lg bg-white cursor-pointer"
          >
            <div className="hover14 column">
              <figure className="w-full h-40 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={300}
                  height={160}
                  className="w-full h-40 rounded-t-xl object-cover"
                />
              </figure>
            </div>
            <div className="p-4 space-y-2">
              <h1 className="font-semibold text-lg">{article.title}</h1>
              <p className="text-gray-600 text-xs mb-4">
                {article.content.length > 100
                  ? `${article.content.substring(0, 150)}...`
                  : article.content}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Image
                    src={article.authorImage}
                    alt="authorImage"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <p className="text-xs text-gray-600 font-semibold text-center">
                    {article.author}
                  </p>
                </div>
                <p className="text-xs text-gray-500">{article.createdAt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-600"
          }`}
        >
          Previous
        </button>

        <span className="px-4 py-2 border rounded bg-gray-100 text-gray-800">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blog;