import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Pagination,
  Parallax,
} from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { singleProduct } from "../../../../data/product-details-data";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";

const ProductDetails = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 h-[100vh] px-5">
      <Swiper
        modules={[Parallax, Mousewheel, Pagination, Autoplay, Keyboard]}
        direction={"horizontal"}
        mousewheel={true}
        slidesPerView={1}
        spaceBetween={10}
        speed={400}
        parallax={true}
        navigation={{
          nextEl: ".next-btm",
          prevEl: ".prev-btm",
        }}
        // loop={true}
        autoplay={{
          delay: 3000,
        }}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        onSwiper={() => {}}
        onSlideChange={() => {}}
        // className="mySwiper"
      >
        {singleProduct?.images?.map((index) => (
          <SwiperSlide key={index} className="border">
            <img
              className="h-full"
              src={`/assets/images/product-${index}.jpg`}
              alt={singleProduct?.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <h1>hello </h1>
      </div>
    </section>
  );
};

export default ProductDetails;
