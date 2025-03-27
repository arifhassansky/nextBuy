import React from "react";

const CardSkeleton = () => {
  return (
    <div className="w-44 md:w-80 max-w-sm mx-auto rounded-2xl  overflow-hidden relative group animate-pulse">
      <div className="relative">
        <div className="h-12 w-32 md:w-full md:h-64 bg-gray-200" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center mt-10  mb-96 md:pb-44 md:ml-64 ml-24 h-20 md:h-96">
        <div className="text-lg font-semibold text-gray-800 opacity-0 translate-x-[2px] transition-all duration-500 delay-300">
          <div className="bg-[#e1ebf5] p-1 rounded-sm shadow-md flex flex-col items-center justify-center md:space-y-4 space-y-2 h-auto">
            <div className="h-10 w-10 bg-gray-200 rounded-full my-2" />
            <div className="h-10 w-10 bg-gray-200 rounded-full my-2" />
            <div className="h-10 w-10 bg-gray-200 rounded-full my-2" />
          </div>
        </div>
      </div>
      {/* <div className="absolute inset-0 flex items-center justify-center md:pt-40 mb-10 w-[80%] md:w-full">
        <div className="h-10 w-full rounded-b-lg bg-gray-200" />
      </div> */}
      <div className="py-5">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-6 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
};

export default CardSkeleton;
