"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "./styles.css";

import mic from "../../public/assets/mic.jpg";
import monitor from "../../public/assets/monitor.jpg";
import speaker from "../../public/assets/speaker.jpg";

const Slider: React.FC = () => {
  return (
    <div className="w-full">
      <Swiper
        cssMode={true}
        spaceBetween={30}
        centeredSlides={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper w-full h-auto [&>.swiper-button-next]:text-[#43B02A]
          [&>.swiper-button-prev]:text-[#43B02A]"
      >
        <SwiperSlide>
          <Image
            src={monitor}
            width={1920}
            height={700}
            alt="Monitor"
            className="object-cover w-full max-h-[800px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={speaker}
            width={1920}
            height={700}
            alt="Speaker"
            className="object-cover w-full max-h-[800px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={mic}
            width={1920}
            height={700}
            alt="Microphone"
            className="object-cover w-full max-h-[800px]"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
