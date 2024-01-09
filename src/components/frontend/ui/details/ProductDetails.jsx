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
import Breadcrumb from "../../../common/breadCrumb/BreadCrumb";

const ProductDetails = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 h-[50vh] md:h-[100vh] px-2">
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
      >
        {singleProduct?.images?.map((index) => (
          <SwiperSlide key={index} className="border">
            <img
              className=""
              src={`/assets/images/product-${index}.jpg`}
              alt={singleProduct?.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="px-10 py-5">
        <Breadcrumb product={singleProduct} />
        <div className="px-4">
          <article className="space-y-5 mt-8 border-bgray-500">
            <h1 className="text-xl font-semibold">{singleProduct.title}</h1>
            <p className="text-xl font-normal">BDT {singleProduct?.price}.00</p>
          </article>
          <div className="h-[1px] w-full bg-bgray-700 mt-12"></div>
          <p className="px-4 text-xl py-8">
            <strong>Color:</strong> {singleProduct.color}
          </p>
          <button className="bg-black hover:bg-opacity-80 text-xl font-medium leading-6 -tracking-normal text-white w-full py-[10px] lg:py-[20px] flex items-center justify-center rounded-sm uppercase">
            Add To Shopping Bag
          </button>
          <div className="h-[1px] w-full bg-bgray-700 mt-12"></div>

          <div className="">
            <p className="py-7 text-xl font-medium">Products Details</p>
            <div dangerouslySetInnerHTML={{__html: singleProduct.description}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
