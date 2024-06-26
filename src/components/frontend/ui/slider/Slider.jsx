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
import banner1 from "../../../../assets/banner/banner1.jpg";
import banner2 from "../../../../assets/banner/banner2.jpg";
import banner3 from "../../../../assets/banner/banner3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/bundle";

import { Link } from "react-router-dom";
import { useGetBannerQuery } from "../../../../redux/feature/banner/bannerApi";

const Slider = () => {
  const { data: sliders, isLoading } = useGetBannerQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      {isLoading ? (
        <div className="relative es_container bg-gray-50 animate-pulse   rounded-b-lg">
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
            <div className="relative " data-swiper-parallax-duration="2000">
              <SwiperSlide className="rounded-b-lg">
                <img
                  loading="lazy"
                  src={banner1}
                  className="w-full h-[40vh] md:h-[30vh] lg:h-[50vh] object-fill rounded-b-lg "
                />

                <div
                  className="absolute  top-0 left-0 z-30 h-full w-full flex items-center rounded-b-lg  "
                  style={{
                    backgroundImage: `linear-gradient(30deg, #23262B, 60%, transparent), url('${banner1}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat ",
                  }}
                >
                  <div className="space-y-1 lg:space-y-2 es_container ">
                    <h3 className="text-primaryLightColor font-semibold text-xl md:text-2xl lg:text-5xl  text-center mt-20">
                      Compliments your lifestyle
                    </h3>
                    {/* <div
                      className="text-gray-800 text-lg md:ms-20 xl:ms-0 px-5 mb-5"
                      dangerouslySetInnerHTML={{ __html: slider?.description }}
                    ></div> */}
                    <div className="text-center">
                      <div className="relative inline-flex items-center justify-start px-5 lg:mt-5 py-3 overflow-hidden font-normal rounded group md:ms-20 xl:ms-5 ">
                        <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-5 top-0 bg-white opacity-[3%]"></span>
                        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-primaryLightColor opacity-100 group-hover:-translate-x-8"></span>
                        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900 px-4">
                          Explore
                        </span>
                        <span className="absolute inset-0 border-2 border-[#ffc] rounded"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="rounded-b-lg">
                <img
                  loading="lazy"
                  src={banner2}
                  className="w-full h-[40vh] md:h-[30vh] lg:h-[50vh] object-fill rounded-b-lg "
                />

                <div
                  className="absolute  top-0 left-0 z-30 h-full w-full flex items-center rounded-b-lg  "
                  style={{
                    backgroundImage: `linear-gradient(30deg, #23262B, 60%, transparent), url('${banner2}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat ",
                  }}
                >
                  <div className="space-y-1 lg:space-y-2 es_container ">
                    <h3 className="text-primaryLightColor font-semibold text-xl md:text-2xl lg:text-5xl  text-center mt-20">
                      Sets you as a trend
                    </h3>

                    <div className="text-center">
                      <div className="relative inline-flex items-center justify-start px-5 lg:mt-5 py-3 overflow-hidden font-normal rounded group md:ms-20 xl:ms-5 ">
                        <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-5 top-0 bg-white opacity-[3%]"></span>
                        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-primaryLightColor opacity-100 group-hover:-translate-x-8"></span>
                        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900 px-4">
                          Explore
                        </span>
                        <span className="absolute inset-0 border-2 border-[#ffc] rounded"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="rounded-b-lg">
                <img
                  loading="lazy"
                  src={banner3}
                  className="w-full h-[40vh] md:h-[30vh] lg:h-[50vh] object-fill rounded-b-lg "
                />

                <div
                  className="absolute  top-0 left-0 z-30 h-full w-full flex items-center rounded-b-lg  "
                  style={{
                    backgroundImage: `linear-gradient(30deg, #23262B, 60%, transparent), url('${banner3}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat ",
                  }}
                >
                  <div className="space-y-1 lg:space-y-2 es_container ">
                    <h3 className="text-primaryLightColor font-semibold text-xl md:text-2xl lg:text-5xl  text-center mt-20">
                      Made for creating tasty memories
                    </h3>
                    {/* <div
                      className="text-gray-800 text-lg md:ms-20 xl:ms-0 px-5 mb-5"
                      dangerouslySetInnerHTML={{ __html: slider?.description }}
                    ></div> */}
                    <div className="text-center">
                      <div className="relative inline-flex items-center justify-start px-5 lg:mt-5 py-3 overflow-hidden font-normal rounded group md:ms-20 xl:ms-5 ">
                        <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-5 top-0 bg-white opacity-[3%]"></span>
                        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-primaryLightColor opacity-100 group-hover:-translate-x-8"></span>
                        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900 px-4">
                          Explore
                        </span>
                        <span className="absolute inset-0 border-2 border-[#ffc] rounded"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
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
      ) : (
        <div className="relative es_container   rounded-b-lg">
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
            <div className="relative " data-swiper-parallax-duration="2000">
              {sliders?.data?.map((slider) => (
                <SwiperSlide key={slider._id} className="rounded-b-lg">
                  <img
                    loading="lazy"
                    src={slider?.banner_image}
                    className="w-full h-[40vh] md:h-[30vh] lg:h-[50vh] object-fill rounded-b-lg "
                    alt={slider?.banner_title}
                  />

                  <div
                    className="absolute  top-0 left-0 z-30 h-full w-full flex items-center rounded-b-lg  "
                    style={{
                      backgroundImage: `linear-gradient(30deg, #23262B, 60%, transparent), url('${slider?.banner_image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat ",
                    }}
                  >
                    <div className="space-y-1 lg:space-y-2 es_container ">
                      <h3 className="text-primaryLightColor font-semibold text-xl md:text-2xl lg:text-5xl  text-center mt-20">
                        {slider?.banner_title}
                      </h3>
                      {/* <div
                      className="text-gray-800 text-lg md:ms-20 xl:ms-0 px-5 mb-5"
                      dangerouslySetInnerHTML={{ __html: slider?.description }}
                    ></div> */}
                      <div className="text-center">
                        <Link
                          to={`${
                            slider?.banner_path ? slider?.banner_path : "/all"
                          }`}
                          className="relative inline-flex items-center justify-start px-5 lg:mt-5 py-3 overflow-hidden font-normal rounded group md:ms-20 xl:ms-5 "
                        >
                          <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-5 top-0 bg-white opacity-[3%]"></span>
                          <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-primaryLightColor opacity-100 group-hover:-translate-x-8"></span>
                          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900 px-4">
                            Explore
                          </span>
                          <span className="absolute inset-0 border-2 border-[#ffc] rounded"></span>
                        </Link>
                      </div>
                    </div>
                  </div>
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
      )}
    </>
  );
};

export default Slider;
