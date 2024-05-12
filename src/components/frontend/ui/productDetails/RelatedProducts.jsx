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
import ProductCard from "../../../common/card/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";
import ProductCardSkeleton from "../../../../shared/loader/ProductCardSkeleton";
const RelatedProducts = ({ product_name }) => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: [`${product_name}`],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/product/get_related_product/${product_name}`
      );
      const data = await res.json();
      return data;
    },
  }); // get All Product

  // const relatedProducts = product?.data?.filter(
  //   (product) => product?.colorId?.color !== color
  // );
  console.log(products);
  console.log(product_name);
  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <>
      {products?.data?.length > 0 && (
        <div className="py-10 bg-[#fff]  mb-10 md:mx-0 mx-5 mt-10">
          <div className="px-[5px] lg:px-[50px] pt-[5px]">
            <h1 className="text-3xl text-center font-normal tracking-normal leading-6 mb-5 sm:mb-10">
              Variations{" "}
            </h1>
            <div className="mx-auto w-full">
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
                  nextEl: ".next-rtp",
                  prevEl: ".prev-rtp",
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
                  {products?.data?.map((product) => (
                    <SwiperSlide
                      key={product?._id}
                      className="border bg-[#F0F0F0] hover:border-bgray-400 group rounded-md overflow-hidden shadow"
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
                  <button className="prev-rtp w-10 h-10 z-10 bg-white hover:bg-opacity-50 rounded-full border flex items-center justify-center transition-all duration-300">
                    <span>
                      <FcPrevious className="text-xl md:text-2xl p-1 font-light" />
                    </span>
                  </button>
                  <button className="next-rtp w-10 h-10 z-10 hover:bg-opacity-50 rounded-full bg-white border shadow-sm flex items-center justify-center transition-all duration-300">
                    <span>
                      <FcNext className="text-xl md:text-2xl p-1 font-light" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedProducts;
