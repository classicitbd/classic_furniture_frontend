import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Keyboard,
} from "swiper/modules";
import { FcNext, FcPrevious } from "react-icons/fc";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { sliderData } from "../../../../data/slider-data";

const Slider = () => {
  return (
    <div className="main-container">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Keyboard]}
        slidesPerView={1}
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
        <div className="relative">
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
          <button className="prev w-10 h-10 absolute top-[50%] left-[10px] z-10">
            <span>
              <FcPrevious className="text-5xl" />
            </span>
          </button>
          <button className="next w-10 h-10 absolute top-[50%] right-[10px] z-10">
            <span>
              <FcNext className="text-5xl" />
            </span>
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;
