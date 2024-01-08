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
import { Link } from "react-router-dom";

const ArrivalBottomProducts = () => {
  return (
    <div className="px-[5px] lg:px-[50px] pb-[20px] pt-[5px]">
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
          nextEl: ".next-btm",
          prevEl: ".prev-btm",
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
              key={product?.id}
              className="border group rounded-md overflow-hidden"
            >
              <Link to={`/products/details/${product?.id}`}>
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
                <article className="pb-[10px]">
                  <h2 className="text-center">{product?.title}</h2>
                  <p className="text-center py-3 text-bgray-700">
                    {product?.color}
                  </p>
                  <p className="px-4">BDT {product?.price}.00</p>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      <div className="flex items-center justify-between py-[20px]">
        <div className="hidden lg:block"></div>
        <h2 className="text-xl md:text-2xl font-normal md:font-medium">
        </h2>
        <div className="flex gap-[4px]">
          <button className="prev-btm w-10 h-10 z-10 bg-white hover:bg-opacity-50 rounded-full border flex items-center justify-center transition-all duration-300">
            <span>
              <FcPrevious className="text-xl md:text-2xl p-1 font-light" />
            </span>
          </button>
          <button className="next-btm w-10 h-10 z-10 hover:bg-opacity-50 rounded-full bg-white border shadow-sm flex items-center justify-center transition-all duration-300">
            <span>
              <FcNext className="text-xl md:text-2xl p-1 font-light" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArrivalBottomProducts;
