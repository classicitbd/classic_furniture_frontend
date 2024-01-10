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
                className="w-full h-[35vh] md:h-[50vh] lg:h-[60vh] xl:h-[90vh]"
                alt={slider.id}
              />
            </SwiperSlide>
          ))}
        </div>
        <div className="">
          <button className="prev w-10 h-10 absolute top-[43%] left-0 md:left-[10px] z-10 bg-gray-600 bg-opacity-0 hover:bg-opacity-40 rounded flex items-center justify-center transition-all duration-300">
            <span>
              <FcPrevious className="text-4xl md:text-5xl p-1 font-light" />
            </span>
          </button>
          <button className="next w-10 h-10 absolute top-[43%] right-0 md:right-[10px] z-10 bg-gray-600 bg-opacity-0 hover:bg-opacity-40 rounded flex items-center justify-center transition-all duration-300">
            <span>
              <FcNext className="text-4xl md:text-5xl p-1 font-light" />
            </span>
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;