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
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";
import ProductCard from "../../../common/card/ProductCard";
import ProductCardSkeleton from "../../../../shared/loader/ProductCardSkeleton";

const ArrivalBottomProducts = () => {
  const {
    data: products = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [`/api/v1/product?page=${1}&limit=${50}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/product?page=${1}&limit=${50}`);
      const data = await res.json();
      return data;
    },
  }); // get All Product

  if (isLoading) {
    return null;
  }
  const sortedProducts = [...products.data].reverse(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <div className="px-[5px] lg:px-[10px] pt-[5px]">
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-4">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      ) : (
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
            {sortedProducts?.map((product) => (
              <SwiperSlide
                key={product?._id}
                className="border group rounded-md overflow-hidden bg-secondary"
              >
                <ProductCard product={product} loading={isLoading} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      )}
      <div className="flex items-center justify-between py-[20px]">
        <div className="hidden lg:block"></div>
        <h2 className="text-xl md:text-2xl font-normal md:font-medium"></h2>
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
