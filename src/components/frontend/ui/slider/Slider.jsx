import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Keyboard,
  Parallax,
} from "swiper/modules";
import { FcNext, FcPrevious } from "react-icons/fc";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
// import "swiper/css/keyboard";
import { sliderData } from "../../../../data/slider-data";

const Slider = () => {
  return (
    <div className="main-container">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Keyboard, Parallax]}
        slidesPerView={1}
        speed={1000}
        parallax={true}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        onSwiper={() => {}}
        onSlideChange={() => {}}
      >
        <div className="relative" data-swiper-parallax-duration="2000">
          {sliderData.map((slider) => (
            <SwiperSlide key={slider.id}>
              <img
                src={slider.img}
                className="w-full h-[200px] z-0 lg:h-[600px]"
                alt={slider.id}
              />
            </SwiperSlide>
          ))}
        </div>
        <div className="">
          <button className="prev w-10 h-10 absolute top-[50%] left-[10px] z-10 bg-gray-600 bg-opacity-0 hover:bg-opacity-40 rounded flex items-center justify-center transition-all duration-300">
            <span>
              <FcPrevious className="text-5xl p-1" />
            </span>
          </button>
          <button className="next w-10 h-10 absolute top-[50%] right-[10px] z-10 bg-gray-600 bg-opacity-0 hover:bg-opacity-40 rounded flex items-center justify-center transition-all duration-300">
            <span>
              <FcNext className="text-5xl p-1 font-light" />
            </span>
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;
