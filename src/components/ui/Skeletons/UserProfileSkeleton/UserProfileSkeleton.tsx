import React from "react";

const UserProfileSkeleton = () => {
  return (
    <div className="flex items-center justify-center gap-2 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-full" />
      <div>
        <div className="w-20 h-3 bg-gray-200 rounded mt-1 inline-block" />
        <div className="w-20 h-3 bg-gray-200 rounded mt-1 inline-block" />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
