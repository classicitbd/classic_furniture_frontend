
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
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { Link } from "react-router-dom";
// import "swiper/css/keyboard";

const BannerImage = ({ banners }) => {

    return (
        <div className="main-container mt-8">
            {banners?.data?.length > 0 ? (
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
                    onSwiper={() => { }}
                    onSlideChange={() => { }}
                >
                    <div className="relative" data-swiper-parallax-duration="2000">
                        {banners?.data?.map((banner) => (
                            <SwiperSlide key={banner._id}>
                                <img
                                    src={banner?.banner_image}
                                    className="w-full h-[35vh] md:h-[50vh] lg:h-[60vh]"
                                    alt={banner._id}
                                />
                                <div className="absolute top-0 left-0 z-30 h-full w-full flex items-center px-12 md:px-20 bg-primaryColor bg-opacity-40">
                                    <div className="space-y-1 lg:space-y-2">
                                        <h3 className="text-textColor text-xl md:text-2xl lg:text-4xl">
                                            {banner?.banner_title}
                                        </h3>
                                        <Link
                                            to={`${banner?.banner_path ? banner?.banner_path : "/"}`}
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
            ) : (
                <NoDataFound />
            )}
        </div>
    );
};

export default BannerImage;
