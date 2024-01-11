import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Pagination,
  Parallax,
} from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { singleProduct } from "../../../../data/product-details-data";
// Import React icons
import { IoCloseOutline } from "react-icons/io5";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";
import Breadcrumb from "../../../common/breadCrumb/BreadCrumb";
import { useState } from "react";
import ShippingInfoModal from "../../../common/modal/shippingInfoModal";
import ShippingInfo from "../shippingInfo/ShippingInfo";
import MaterialCareModal from "../../../common/modal/MaterialCareModal";
import MaterialAndCare from "../materialAndCare/MaterialAndCare";
import AddToCartModal from "../../../common/modal/AddToCartModal";
import AddToCart from "../addToCart/AddToCart";

const ProductDetails = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState("");

  const openModal = (value) => {
    setModalOpen(true);
    setModal(value);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModal("");
  };
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 sm:mx-5">
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
        className="h-[50vh] md:h-[80vh] w-full"
      >
        {singleProduct?.images?.map((index) => (
          <SwiperSlide key={index} className="border w-full flex justify-center items-center">
            <img
              className="object-fill h-full w-full"
              src={`/assets/images/product-${index}.jpg`}
              alt={singleProduct?.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="md:px-10 py-5">
        <Breadcrumb product={singleProduct} />
        <div className="md:px-4">
          <article className="space-y-5 mt-8 border-bgray-500">
            <h1 className="text-xl font-semibold">{singleProduct.title}</h1>
            <p className="text-xl font-normal">BDT {singleProduct?.price}.00</p>
          </article>
          <div className="h-[1px] w-full bg-bgray-700 mt-12"></div>
          <p className="text-xl py-8">
            <strong>Color:</strong> {singleProduct.color}
          </p>
          <button
            onClick={() => openModal("addToCart")}
            className="bg-black hover:bg-opacity-80 text-xl font-medium leading-6 -tracking-normal text-white w-full py-[10px] lg:py-[20px] flex items-center justify-center rounded-sm uppercase"
          >
            Add To Shopping Bag
          </button>
          <div className="h-[1px] w-full bg-bgray-700 mt-12"></div>

          <div className="">
            <p className="py-7 text-xl font-medium tracking-tight leading-5">
              Products Details
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: singleProduct.description }}
            ></div>
          </div>
          <div className="py-10 space-x-5">
            <button
              onClick={() => openModal("shippingInfo")}
              className="underline text-xl font-medium hover:opacity-100 opacity-85 tracking-tight leading-5"
            >
              Materials & Care
            </button>
            <span className="h-[12px] w-[2px] bg-bgray-500 inline-block"></span>
            <button
              onClick={() => openModal("materialCare")}
              className="underline text-xl font-medium hover:opacity-100 opacity-85 tracking-tight leading-5"
            >
              Shipping Info
            </button>
          </div>
        </div>
      </div>
      {modal === "shippingInfo" && (
        <ShippingInfoModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            <div className="flex justify-end">
              <button
                className="bg-bgray-900 hover:bg-bgray-700 text-white font-bold py-1 px-2 -mt-4 mb-2 -mr-4 rounded"
                onClick={closeModal}
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>
            <ShippingInfo />
          </div>
        </ShippingInfoModal>
      )}
      {modal === "materialCare" && (
        <MaterialCareModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            <div className="flex justify-end">
              <button
                className="bg-bgray-900 hover:bg-bgray-700 text-white font-bold py-1 px-2 -mt-4 mb-2 -mr-4 rounded"
                onClick={closeModal}
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>
            <MaterialAndCare />
          </div>
        </MaterialCareModal>
      )}
      {modal === "addToCart" && (
        <AddToCartModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            <div className="flex justify-end">
              <button
                className="bg-bgray-900 hover:bg-bgray-700 text-white font-bold py-1 px-2 -mt-4 mb-2 -mr-4 rounded"
                onClick={closeModal}
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>
            <AddToCart />
          </div>
        </AddToCartModal>
      )}

    </section>
  );
};

export default ProductDetails;
