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
import { productData } from "../../../../data/product-data";

const ArrivalTopProducts = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div></div>
        <h2>New Arrival Products</h2>
        <div className="flex">
          <button className="prev w-10 h-10 z-10 bg-gray-600 bg-opacity-0 hover:bg-opacity-40 rounded flex items-center justify-center transition-all duration-300">
            <span>
              <FcPrevious className="text-xl md:text-2xl p-1 font-light" />
            </span>
          </button>
          <button className="next w-10 h-10 z-10 hover:bg-opacity-50 rounded-full bg-white border shadow-sm flex items-center justify-center transition-all duration-300">
            <span>
              <FcNext className="text-xl md:text-2xl p-1 font-light" />
            </span>
          </button>
        </div>
      </div>
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Autoplay,
          Keyboard,
          Parallax,
        ]}
        slidesPerView={4}
        speed={1000}
        parallax={true}
        navigation={{
          nextEl: ".next-tp",
          prevEl: ".prev-tp",
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
          {productData.map((product) => (
            <SwiperSlide key={product.id}>
              <img
                src={product.img}
                className="w-full h-[35vh] md:h-[50vh] lg:h-[60vh] xl:h-[90vh]"
                alt={product.id}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default ArrivalTopProducts;
