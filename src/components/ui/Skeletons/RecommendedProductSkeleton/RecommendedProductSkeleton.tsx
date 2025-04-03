import React from "react";

const RecommendedProductSkeleton = () => {
  return (
    <div key="{i}" className="p-2 bg-[#f7f7f7] rounded-xl animate-pulse">
      <div className="w-64 h-64 bg-gray-200 rounded-lg" />
      <div className="">
        <div className="mt-2 h-6 bg-gray-200 w-3/4" />
        <div className="mt-2 h-6 bg-gray-200 w-1/2" />
        <div className="mt-2 h-6 bg-gray-200 w-1/4" />
      </div>
    </div>
  );
};

export default RecommendedProductSkeleton;
