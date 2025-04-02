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

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import speaker from "../../../public/assets/speaker.jpg";
import Recommendation from "@/components/Recommendation/Recommendation";

const images = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1522115174737-2497162f69ec?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542598953-41310c43f54b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  speaker,
];

const Slider: React.FC = () => {
  return (
     <div className='w-full'>
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
           className='mySwiper w-full h-auto [&>.swiper-button-next]:text-[#43B02A]
          [&>.swiper-button-prev]:text-[#43B02A]'
        >
           {images.map((image, index) => (
              <SwiperSlide key={index}>
                 <Image
                    src={image}
                    width={1080}
                    height={1080}
                    alt='Monitor'
                    className='object-cover w-full max-h-[850px]'
                 />
              </SwiperSlide>
           ))}
           {/* <SwiperSlide>
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
        </SwiperSlide> */}
      </Swiper>
      
        <Recommendation/>
     </div>
  );
};

export default Slider;
