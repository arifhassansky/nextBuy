import React from "react";

const ArticlesSkeleton = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg flex flex-col h-full animate-pulse">
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-200" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mt-2" />
        <div className="flex gap-2 items-center justify-center mt-2">
          <div className="h-10 w-10 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="h-16 bg-gray-200 rounded mt-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mt-4" />
      </div>
    </div>
  );
};

export default ArticlesSkeleton;
