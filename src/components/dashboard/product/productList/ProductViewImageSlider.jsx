import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Pagination,
  Parallax,
} from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";

const ProductViewImageSlider = ({ allImages }) => {
  return (
    <section>
      {/* ------ products details left side content ------ start */}
      <Swiper
        modules={[Parallax, Mousewheel, Pagination, Autoplay, Keyboard]}
        direction={"vertical"}
        mousewheel={true}
        slidesPerView={1}
        spaceBetween={10}
        speed={400}
        parallax={true}
        autoplay={{
          delay: 2000,
        }}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        onSwiper={() => {}}
        onSlideChange={() => {}}
        className="h-[50vh] w-full"
      >
        {allImages?.map((image, index) => (
          <SwiperSlide
            key={index}
            className="border w-full flex justify-center items-center"
          >
            <img
              className="object-fill h-full w-full"
              src={image}
              alt="image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductViewImageSlider;
