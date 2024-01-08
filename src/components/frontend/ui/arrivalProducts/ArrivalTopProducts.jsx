import {
  Navigation,
  Scrollbar,
  A11y,
  Keyboard,
  Parallax,
} from "swiper/modules";
import { FcNext, FcPrevious } from "react-icons/fc";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import { productData } from "../../../../data/product-data";

const ArrivalTopProducts = () => {
  return (
    <div className="px-[5px] lg:px-[50px] py-[20px]">
      <div className="flex items-center justify-between py-[20px]">
        <div className="hidden lg:block"></div>
        <h2 className="text-xl md:text-2xl font-normal md:font-medium">
          New Arrival Products
        </h2>
        <div className="flex gap-[4px]">
          <button className="prev-tp w-10 h-10 z-10 bg-white hover:bg-opacity-50 rounded-full border flex items-center justify-center transition-all duration-300">
            <span>
              <FcPrevious className="text-xl md:text-2xl p-1 font-light" />
            </span>
          </button>
          <button className="next-tp w-10 h-10 z-10 hover:bg-opacity-50 rounded-full bg-white border shadow-sm flex items-center justify-center transition-all duration-300">
            <span>
              <FcNext className="text-xl md:text-2xl p-1 font-light" />
            </span>
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Scrollbar, A11y, Keyboard, Parallax]}
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        speed={600}
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
        <div>
          {productData.map((product) => (
            <SwiperSlide
              className="border group rounded-md overflow-hidden"
              key={product?.id}
            >
              <div className="flex">
                <img
                  src={product?.thumbnail}
                  className="w-full translate-x-0 group-hover:-translate-x-full transition-all duration-700"
                  alt={product?.id}
                />
                <img
                  src={product?.thumbnailTwo}
                  className="w-full translate-x-0 group-hover:-translate-x-full  transition-all duration-700"
                  alt={product?.id}
                />
              </div>
              <article>
                <h2 className="text-center">{product?.title}</h2>
                <p>{product?.color}</p>
              </article>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default ArrivalTopProducts;
