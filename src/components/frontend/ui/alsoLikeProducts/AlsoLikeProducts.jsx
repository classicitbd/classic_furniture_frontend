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
import { useEffect, useState } from "react";

const AlsoLikeProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/product?page=${1}&limit=${30}`);
      const data = res.json();
      return data;
    },
  });

  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    if (!isLoading && products.data.length > 0) {
      // setRandomProducts(getRandomProducts());
      const numRandomProducts = 10; // Adjust the number of random products as needed
      const randomProductsArray = [];

      for (let i = 0; i < numRandomProducts; i++) {
        const randomIndex = Math.floor(Math.random() * products.data.length);
        randomProductsArray.push(products.data[randomIndex]);
      }

      setRandomProducts(randomProductsArray);
    }
  }, [isLoading, products.data]);

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <div className="px-[5px] lg:px-[50px] pt-[5px]">
      <h1 className="text-3xl text-center font-normal tracking-normal leading-6 mb-5 sm:mb-10 uppercase">
        You May also Like
      </h1>
      <div>
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
            nextEl: ".next-alp",
            prevEl: ".prev-alp",
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
            {randomProducts?.map((product) => (
              <SwiperSlide
                key={product?._id}
                className="border hover:border-bgray-400 group rounded-md overflow-hidden shadow-2xl shadow-white"
              >
                <ProductCard product={product} loading={isLoading} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        <div className="flex items-center justify-center pt-10">
          <div className="hidden lg:block"></div>
          <h2 className="text-xl md:text-2xl font-normal md:font-medium"></h2>
          <div className="flex gap-[4px]">
            <button className="prev-alp w-10 h-10 z-10 bg-white hover:bg-opacity-50 rounded-full border flex items-center justify-center transition-all duration-300">
              <span>
                <FcPrevious className="text-xl md:text-2xl p-1 font-light" />
              </span>
            </button>
            <button className="next-alp w-10 h-10 z-10 hover:bg-opacity-50 rounded-full bg-white border shadow-sm flex items-center justify-center transition-all duration-300">
              <span>
                <FcNext className="text-xl md:text-2xl p-1 font-light" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlsoLikeProducts;
