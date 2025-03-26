import React from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

const Quality = () => {
  return (
    <div className="mt-32 container mx-auto">
      <p className="text-center text-[#43b02a]">
        There are some redeeming factors
      </p>
      <h1 className="text-center mt-6 text-3xl font-bold">
        We Provide High Quality Goods
      </h1>
      <p className="text-center mt-6">
        A client that's unhappy for a reason is a problem, a client that's
        unhappy though he or her can't.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <TbTruckDelivery size={100} className="text-[#43b02a]" />
          <h4 className="text-2xl font-bold mt-3">Fast Delivery</h4>
          <p className="text-center mt-4">
            Chances are there wasn't collaboration and checkpoints, there wasn't
            a process
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <FaRegThumbsUp size={80} className="text-[#43b02a]" />
          <h4 className="text-2xl font-bold mt-3">Best Quality</h4>
          <p className="text-center mt-4">We provide best quality</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <MdOutlineAssignmentReturn size={80} className="text-[#43b02a]" />
          <h4 className="text-2xl font-bold mt-3">Free Return</h4>
          <p className="text-center mt-4">
            Incase of a certain situation we provide free return
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quality;
