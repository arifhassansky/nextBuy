"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import mic from "../../public/assets/mic.jpg";
import monitor from "../../public/assets/monitor.jpg";
import speaker from "../../public/assets/speaker.jpg";

const Slider: React.FC = () => {
  return (
    <div className="w-full pt-44">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper w-full h-auto"
      >
        <SwiperSlide className="flex justify-center items-center">
          <Image
            src={monitor}
            width={1920}
            height={600}
            alt="Monitor"
            className="object-cover w-full"
          />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <Image
            src={speaker}
            width={1920}
            height={600}
            alt="Speaker"
            className="object-cover w-full"
          />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <Image
            src={mic}
            width={1920}
            height={600}
            alt="Microphone"
            className="object-cover w-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
