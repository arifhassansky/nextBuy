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
];

const Branding = () => {
  return (
    <div className="w-full py-4">
      <Marquee speed={50} pauseOnHover={true} gradient={false}>
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
    </div>
  );
};

export default Branding;
