"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";

const articles = [
  {
    date: '23 JUL',
    image: 'https://i.ibb.co.com/prk4XmjK/pexels-kamo11235-667838.jpg',
    category: ['DESIGN TRENDS', 'INSPIRATION'],
    title: 'Reinterprets the classic bookshelf',
    author: 'S. Rogers',
    excerpt: 'Discover how classic bookshelves are being reimagined with modern aesthetics and innovative functionality.',
  },
  {
    date: '23 JUL',
    image: 'https://i.ibb.co.com/DPmkf0Yk/pexels-ivan-samkov-4899424.jpg',
    category: ['DESIGN TRENDS', 'FURNITURE'],
    title: 'Minimalist design furniture 2024',
    author: 'S. Rogers',
    excerpt: 'Explore the latest minimalist furniture trends that blend simplicity, elegance, and sustainability.',
  },
  {
    date: '23 JUL',
    image: 'https://i.ibb.co.com/Z6nZ2p1z/pexels-pixabay-459653.jpg',
    category: ['DESIGN TRENDS', 'HAND MADE'],
    title: 'Green interior design inspiration',
    author: 'S. Rogers',
    excerpt: 'Uncover eco-friendly interior design ideas that harmonize sustainability with style.',
  },
  {
    date: '24 JUL',
    image: 'https://i.ibb.co.com/chzD05TR/pexels-eric-mufasa-578798-1350789.jpg',
    category: ['INTERIOR', 'MODERN'],
    title: 'The rise of modern interior aesthetics',
    author: 'J. Doe',
    excerpt: 'Learn how modern interior design is evolving to embrace functionality and artistic expression.',
  },
  {
    date: '25 JUL',
    image: 'https://i.ibb.co.com/xN223r4/pexels-yankrukov-5793655.jpg',
    category: ['ARCHITECTURE', 'DESIGN'],
    title: 'Exploring futuristic architecture trends',
    author: 'A. Smith',
    excerpt: 'Dive into the world of futuristic architecture, where technology and design redefine urban landscapes.',
  }
];


export default function LatestArticlesSlider() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
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
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col">
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
                <Image
                  src={article.image}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
                <div className="absolute top-2 left-2 bg-white text-black px-3 py-1 text-sm font-bold">
                  {article.date}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2 text-center">
                  {article.category.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-[#3C9E26] text-white px-2 py-1 text-xs mr-2 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2 text-center">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Posted by {article.author}
                </p>
                <p className="text-sm text-gray-500 flex-grow text-center">
                  {article.excerpt}
                </p>
                <button className="mt-4 text-[#3C9E26] text-md font-semibold text-center">
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
