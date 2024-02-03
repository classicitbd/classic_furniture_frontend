import {
  Navigation,
  Scrollbar,
  A11y,
  Autoplay,
  Keyboard,
  Parallax,
  EffectFade,
} from "swiper/modules";
// import { FcNext, FcPrevious } from "react-icons/fc";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import { BASE_URL } from "../../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ProductCardSkeleton from "../../../../shared/loader/ProductCardSkeleton";

const CategorySlider = () => {
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["/api/v1/banner"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/banner`);
      const data = await res.json();
      return data;
    },
  }); // get all banners

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <div className="relative">
      <Swiper
        // install Swiper modules
        modules={[
          Navigation,
          EffectFade,
          Scrollbar,
          A11y,
          Autoplay,
          Keyboard,
          Parallax,
        ]}
        slidesPerView={1}
        effect={"fade"}
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
          {banners?.data?.map((banner) => (
            <SwiperSlide key={banner._id}>
              <img
                loading="lazy"
                src={banner?.banner}
                className="w-full h-[60vh] lg:h-[100vh] object-top"
                alt={banner._id}
              />

              <div className="absolute top-0 left-0 z-30 h-full w-full flex items-center justify-center px-12 md:px-20 bg-primaryColor bg-opacity-40">
                <div className="space-y-1 lg:space-y-2 flex flex-col items-center">
                  <h3 className="text-textColor text-xl md:text-2xl lg:text-4xl">
                    {banner?.title}
                  </h3>
                  <div
                    className="text-textColor"
                    dangerouslySetInnerHTML={{ __html: banner?.description }}
                  ></div>
                  <Link
                    to={`${banner?.url ? banner?.url : "/all"}`}
                    className="w-[80px] text-center relative inline-flex items-center justify-center px-5 py-3 overflow-hidden font-normal rounded group"
                  >
                    <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                    <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                      Explore
                    </span>
                    <span className="absolute inset-0 border-2 border-white rounded"></span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
        {/* <div className="">
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
        </div> */}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
