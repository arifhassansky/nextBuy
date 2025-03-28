import React from "react";
type ActionLinkProps = {
  number: number;
};

const ActionLink = () => {
  return (
    <div className="animate-pulse mt-2">
      <div className="flex items-center gap-2 w-full p-1 rounded-md">
        <div className="h-6 w-6 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
};
const ActionLinkSkeleton = ({ number }: ActionLinkProps) => {
  return (
    <>
      {Array.from({ length: number }, (_, i) => i + 1).map((_, i) => (
        <ActionLink key={i} />
      ))}
    </>
  );
};

export default ActionLinkSkeleton;
