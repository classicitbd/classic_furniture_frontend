/* eslint-disable react/prop-types */
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
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { BASE_URL } from "../../../utils/baseURL";
// import "swiper/css/keyboard";

const SliderImage = ({ sliders }) => {
  return (
    <div className="main-container mt-8">
      {sliders?.data?.length > 0 ? (
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
              <SwiperSlide key={slider.id}>
                <img
                  src={`${BASE_URL}/sliderImages/${slider?.slider}`}
                  className="w-full h-[35vh] md:h-[50vh] lg:h-[60vh]"
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
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default SliderImage;
