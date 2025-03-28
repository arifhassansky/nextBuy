import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="flex items-center justify-center flex-col animate-pulse">
      <div className="bg-gray-200 rounded-full flex items-center justify-center p-3 w-48 h-48 overflow-hidden">
        <div className="h-full w-full bg-gray-300 rounded-full" />
      </div>
      <div className="flex items-center flex-col justify-center mx-auto mt-2">
        <span className="font-bold h-4 bg-gray-300 rounded w-1/2" />
        <p className="text-center h-4 bg-gray-300 rounded w-2/3 mt-2" />
      </div>
    </div>
  );
};

export default CategorySkeleton;
