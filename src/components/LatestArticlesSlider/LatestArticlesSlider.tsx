"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Article {
  createdAt: string;
  image: string;
  category: string[];
  title: string;
  author: string;
  content: string;
  authorImage: string;
}

export default function LatestArticlesSlider() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        console.log(data.data);
        setArticles(data.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="w-11/12 mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          OUR LATEST ARTICLES
        </h2>
        <div className="text-center py-10">Loading articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-11/12 mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          OUR LATEST ARTICLES
        </h2>
        <div className="text-center py-10 text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="w-11/12 mx-auto py-20 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          OUR LATEST ARTICLES
        </h2>
        <div className="text-center py-10">No articles found</div>
      </div>
    );
  }
  console.log(articles);
  return (
    <div className="w-11/12 mx-auto py-20 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
        OUR LATEST ARTICLES
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        breakpoints={{
          480: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="relative"
      >
        {articles?.map((article, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-white text-black px-3 py-1 text-sm font-bold">
                  {article.createdAt}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <span className="bg-[#3C9E26] text-white w-13 mx-auto px-2 py-1 text-xs text-center rounded">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold mb-2 text-center">
                  {article.title}
                </h3>
                <div className="flex gap-2 items-center justify-center">
                  <Image
                    src={article.authorImage}
                    alt="authorImage"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <p className="text-sm text-gray-600 font-semibold mb-4 text-center">
                  Posted by {article.author}
                </p>
                </div>
                
                <p className="text-sm text-gray-500 flex-grow text-center">
                {article.content.length > 100 ? `${article.content.substring(0, 100)}...` : article.content}
                </p>
                <button className="mt-4 text-[#3C9E26] text-md font-semibold text-center hover:underline">
                  CONTINUE READING
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
