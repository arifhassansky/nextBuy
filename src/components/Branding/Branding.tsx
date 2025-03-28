"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const logos = [
  "/assets/vitra.png",
  "/assets/samsung.png",
  "/assets/sephora.png",
  "/assets/sony.png",
  "/assets/oppo.png",
  "/assets/Apple.png",
  "/assets/asus.png",
  "/assets/dell.png",
  "/assets/lenevo.png",
  "/assets/philips.png",
  "/assets/microsoft.png",
  "/assets/vitra.png",
  "/assets/samsung.png",
  "/assets/sephora.png",
  "/assets/sony.png",
  "/assets/oppo.png",
  "/assets/Apple.png",
  "/assets/asus.png",
  "/assets/dell.png",
  "/assets/lenevo.png",
  "/assets/philips.png",
  "/assets/microsoft.png",
];

const Branding = () => {
  return (
    <div className="w-11/12 mx-auto py-10 px-4 relative overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
        OUR TRUSTED BRANDS
      </h2>
      <div className="relative">
        <Marquee speed={80} pauseOnHover={true} gradient={false}>
          {logos.map((logo, index) => (
            <div key={index} className="mx-6">
              <Image
                src={logo}
                alt="brand-logo"
                width={100}
                height={40}
                className="opacity-50 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </Marquee>
        {/* Left blur */}
        <div
          className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"
          style={{ filter: "blur(10px)" }}
        />
        {/* Right blur */}
        <div
          className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"
          style={{ filter: "blur(10px)" }}
        />
      </div>
    </div>
  );
};

export default Branding;
