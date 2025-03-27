"use client";

import Image from "next/image";
import {
  FaArrowsAlt,
  FaMicrochip,
  FaPlug,
  FaBatteryFull,
  FaTv,
  FaBox,
} from "react-icons/fa";

const TechnicalSpecifications = () => {
  return (
    <section className="w-11/12 mx-auto py-20">
      <h2 className="text-3xl font-bold">
        TECHNICAL SPECIFICATIONS
      </h2>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* grid side */}
        <div className="py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <FaArrowsAlt className="text-[#3C9E26] text-3xl" />
            <div>
              <h3 className="font-bold">DISPLAY SIZE</h3>
              <p>
                Capacitive touch screen / 6.2 inch LCD / 1280×720 resolution
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaMicrochip className="text-[#3C9E26] text-3xl" />
            <div>
              <h3 className="font-bold">CPU/GPU</h3>
              <p>NVIDIA customised Tegra processor</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaPlug className="text-[#3C9E26] text-3xl" />
            <div>
              <h3 className="font-bold">USB TERMINAL</h3>
              <p>USB Type-C terminal for charging or connecting to dock</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaBatteryFull className="text-[#3C9E26] text-3xl" />
            <div>
              <h3 className="font-bold">INTERNAL BATTERY</h3>
              <p>Lithium-ion battery / battery capacity 4310mA</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaBox className="text-[#3C9E26] text-3xl" />
            <div>
              <h3 className="font-bold">NINTENDO DOCK</h3>
              <p>Dock used for charging and connecting to TV</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaTv className="text-[#3C9E26] text-3xl" />
            <div>
              <h3 className="font-bold">TV CONNECTION</h3>
              <p>HDMI Out Maximum resolution: 1920×1080, 60 fps</p>
            </div>
          </div>
        </div>

        <div className="col-span-full flex flex-col items-center mt-8">
          <Image
            src="/assets/nintendo.png"
            alt="Nintendo Switch"
            width={200}
            height={100}
          />
          <p className="mt-2">
            Available now{" "}
            <span className="text-[#3C9E26] font-bold">$299.99</span>
          </p>
          <button className="mt-4 bg-[#3C9E26] text-white py-2 px-6 rounded-md hover:bg-black">
            PURCHASE NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecifications;
