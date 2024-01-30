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
import { BASE_URL } from "../../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
// import Header from "../../../../shared/header/Header";

const Slider = () => {
  const { data: sliders = [] } = useQuery({
    queryKey: ["/api/v1/slider"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/slider`);
      const data = await res.json();
      return data;
    },
  }); // get all slider

  return (
    <div className="relative">
      {/* <div
        className={`absolute top-0 right-0 z-30 w-full hover:bg-primaryColor bg-opacity-5 hover:bg-opacity-100`}
      >
        <Header />
      </div> */}
      <Swiper
        // install Swiper modules
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Autoplay,
          Keyboard,
          Parallax,
        ]}
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
          {sliders?.data?.map((slider) => (
            <SwiperSlide key={slider._id}>
              <img
                loading="lazy"
                src={slider?.slider}
                className="w-full h-[35vh] md:h-[50vh] lg:h-[60vh] xl:h-[90vh] object-fill"
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
