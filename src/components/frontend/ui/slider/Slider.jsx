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
import banner1 from "../../../../assets/banner/banner1.jpg"
import banner2 from "../../../../assets/banner/banner2.jpg"
import banner3 from "../../../../assets/banner/banner3.jpg"

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
// import "swiper/css/keyboard";
// import { BASE_URL } from "../../../../utils/baseURL";
// import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// import PreLoader from "../../../../shared/loader/PreLoader";
// import Header from "../../../../shared/header/Header";

const Slider = () => {
  // const { data: sliders = [], isLoading } = useQuery({
  //   queryKey: ["/api/v1/slider"],
  //   queryFn: async () => {
  //     const res = await fetch(`${BASE_URL}/slider`);
  //     const data = await res.json();
  //     return data;
  //   },
  // }); // get all slider
  const sliders = [
    {
      _id: 1,
      slider:banner1,
      title: "Banner 1 Title",
      description: "Description for Banner 1",
      url: "/banner1",
    },
    {
      _id: 2,
      slider: banner2,
      title: "Banner 2 Title",
      description: "Description for Banner 2",
      url: "/banner2",
    },
    {
      _id: 3,
      slider:banner3,
      title: "Banner 3 Title",
      description: "Description for Banner 3",
      url: "/banner3",
    },
    {
      _id: 4,
      slider:banner1,
      title: "Banner 4 Title",
      description: "Description for Banner 4",
      url: "/banner4",
    },
    {
      _id: 5,
      slider: banner2,
      title: "Banner 5 Title",
      description: "Description for Banner 5",
      url: "/banner5",
    },
  ];


  return (
    <div className="relative mt-2">
      
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
            {sliders?.map((slider) => (
              <SwiperSlide key={slider._id}>
                <img
                  loading="lazy"
                  src={slider?.slider}
                  className="w-full h-[40vh] md:h-[30vh] lg:h-[83vh] object-fill"
                  alt={slider.id}
                />

                <div className="absolute top-0 left-0 z-30 h-full w-full flex items-center px-12 md:px-20 bg-primaryColor bg-opacity-40">
                  <div className="space-y-1 lg:space-y-2">
                    <h3 className="text-textColor text-xl md:text-2xl lg:text-4xl">
                      {slider?.title}
                    </h3>
                    <div
                      className="text-textColor"
                      dangerouslySetInnerHTML={{ __html: slider?.description }}
                    ></div>
                    <Link
                      to={`${slider?.url ? slider?.url : "/all"}`}
                      className="relative inline-flex items-center justify-start px-5 py-3 overflow-hidden font-normal rounded group"
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
  );
};

export default Slider;
