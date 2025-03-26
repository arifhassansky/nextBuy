import Image from "next/image";
import React from "react";
import phone from "../../../public/assets/phone.jpg";
import charger from "../../../public/assets/charger.jpg";
import battery from "../../../public/assets/battery.jpg";
import headphone from "../../../public/assets/headphone.jpg";
import tablet from "../../../public/assets/tablet.jpg";

const Category = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 container mx-auto mt-32 gap-10 ">
      <div>
        <div className="bg-gray-200 rounded-full flex items-center justify-center p-3 w-48 h-48 overflow-hidden">
          <Image
            width={100}
            height={100}
            src={phone}
            alt=""
            className="h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 p-1"
          />
        </div>
        <div className="flex  justify-center mx-auto mt-2">
          <span className="font-bold">phones</span>
        </div>
      </div>

      <div>
        <div className="bg-gray-200 rounded-full flex items-center justify-center p-5 w-48 h-48 overflow-hidden">
          <Image
            width={100}
            height={100}
            src={charger}
            alt=""
            className="h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 p-1"
          />
        </div>

        <div className="flex items-center justify-center mt-2">
          <span className="font-bold">chargers</span>
        </div>
      </div>

      <div>
        <div className="bg-gray-200 rounded-full flex items-center justify-center p-5 w-48 h-48 overflow-hidden">
          <Image
            width={100}
            height={100}
            alt=""
            src={battery}
            className="h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 p-1"
          />
        </div>

        <div className="flex items-center justify-center mt-2">
          <span className="font-bold">battery</span>
        </div>
      </div>

      <div>
        <div className="bg-gray-200 rounded-full flex items-center justify-center p-5 w-48 h-48 overflow-hidden">
          <Image
            width={100}
            height={100}
            alt=""
            src={headphone}
            className="h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 p-1"
          />
        </div>
        <div className="flex items-center justify-center mt-2">
          <span className="font-bold">head phones</span>
        </div>
      </div>

      <div>
        <div className="bg-gray-200 rounded-full flex items-center justify-center p-5 w-48 h-48 overflow-hidden">
          <Image
            width={100}
            height={100}
            alt=""
            src={tablet}
            className="h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 p-1"
          />
        </div>

        <div className="flex items-center justify-center mt-2 ">
          <span className="font-bold">tablets</span>
        </div>
      </div>
    </div>
  );
};

export default Category;
