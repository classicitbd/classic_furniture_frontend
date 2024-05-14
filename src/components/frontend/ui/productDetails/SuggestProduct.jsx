import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Keyboard,
  Parallax,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import ProductCard from "../../../common/card/ProductCard";

import ProductCardSkeleton from "../../../../shared/loader/ProductCardSkeleton";
import { useGetProductQuery } from "../../../../redux/feature/product/productApi";
const SuggestProduct = () => {
  const { data: products, isLoading } = useGetProductQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <>
      {products?.data?.length > 0 && (
        <div className=" bg-[#fff]  mx-6 pb-10 ">
          <div className="">
            <h1 className="sm:text-2xl text-lg text-center font-semibold text-gray-700 tracking-normal leading-6 py-10">
              You May Also Like
            </h1>
            <div className="mx-auto w-full">
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
                  1440: {
                    slidesPerView: 5,
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
                // pagination={{ clickable: true }}
              >
                <div>
                  {products?.data?.map((product) => (
                    <SwiperSlide
                      key={product?._id}
                      className="border bg-primaryLightColor/10 hover:border-bgray-400 group rounded-md overflow-hidden shadow"
                    >
                      <ProductCard product={product} loading={isLoading} />
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
              {/* {products?.data?.length > 1 && (
                <div className="flex items-center justify-center pt-4">
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
              )} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuggestProduct;
