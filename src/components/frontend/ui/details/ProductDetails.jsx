/* eslint-disable react/prop-types */
import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Pagination,
  Parallax,
} from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
// Import React icons
import { IoCloseOutline } from "react-icons/io5";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";
import Breadcrumb from "../../../common/breadCrumb/BreadCrumb";
import { useState } from "react";
import ShippingInfoModal from "../../../common/modal/shippingInfoModal";
import MaterialAndCare from "../materialAndCares/MaterialAndCare";
import MaterialCareModal from "../../../common/modal/MaterialCareModal";
import ShippingInfo from "../shippingInfo/ShippingInfo";
import AddToCartModal from "../../../common/modal/AddToCartModal";
import AddToCart from "../addToCart/AddToCart";

const ProductDetails = ({ product }) => {
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
        className="h-[50vh] md:h-[90vh] w-full"
      >
        {product?.data?.images?.map((image, i) => (
          <SwiperSlide
            key={i}
            className="border w-full flex justify-center items-center"
          >
            <img
              className="object-fill h-full w-full"
              src={image?.image}
              alt={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* ------ products details left side content ------ end */}

      {/* ------ products details right side content ------ start */}
      <div className="md:px-10 py-5">
        <Breadcrumb product={product?.data} />
        <div className="md:px-4">
          <article className="space-y-5 mt-8 border-bgray-500">
            <h1 className="text-xl font-semibold">{product?.data?.title}</h1>
            <p className="space-x-4">
              <span
                className={`text-xl font-normal ${
                  product?.data?.discount_price ? "line-through" : ""
                }`}
              >
                BDT {product?.data?.price}.00
              </span>
              {product?.data?.discount_price && (
                <span className={`text-xl font-normal text-error-300`}>
                  BDT {product?.data?.discount_price}.00
                </span>
              )}
            </p>
          </article>
          <div className="h-[1px] w-full bg-bgray-700 mt-12"></div>
          <p className="py-8">
            <strong className="text-lg">Color:</strong>{" "}
            <span className="text-lg ml-2">
              {product?.data?.colorId?.color}
            </span>
          </p>
          <button
            onClick={() => openModal("addToCart")}
            className="bg-[#176B87] bg-opacity-80 hover:bg-opacity-100 text-lg font-medium leading-6 -tracking-normal text-white w-full py-[10px] lg:py-[20px] flex items-center justify-center rounded-sm uppercase"
          >
            Add To Shopping Bag
          </button>
          <div className="h-[1px] w-full bg-bgray-700 mt-12"></div>

          <div className="">
            <p className="py-7 text-xl font-medium tracking-tight leading-5">
              Products Details
            </p>
            {/* <div
              dangerouslySetInnerHTML={{ __html: singleProduct.description }}
            ></div> */}
          </div>
          <div className="py-10 space-x-5">
            <button
              onClick={() => openModal("materialCare")}
              className="underline text-xl font-medium hover:opacity-100 opacity-85 tracking-tight leading-5"
            >
              Materials & Care
            </button>
            <span className="h-[12px] w-[2px] bg-bgray-500 inline-block"></span>
            <button
              onClick={() => openModal("shippingInfo")}
              className="underline text-xl font-medium hover:opacity-100 opacity-85 tracking-tight leading-5"
            >
              Shipping Info
            </button>
          </div>
        </div>
      </div>
      {/* ------ products details right side content ------ end */}

      {/* ------ shipping info ------ start */}

      {modal === "shippingInfo" && (
        <ShippingInfoModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            <div className="flex justify-end">
              <button
                className="text-bgray-900 font-bold py-1 px-2 -mt-4 mb-2 -mr-4 rounded"
                onClick={closeModal}
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>
            <ShippingInfo />
          </div>
        </ShippingInfoModal>
      )}
      {/* ------ shipping info ------ end */}

      {/* ------ material care modal ------ start */}

      {modal === "materialCare" && (
        <MaterialCareModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            <div className="flex justify-end">
              <button
                className="text-bgray-900 font-bold py-1 px-2 -mt-4 mb-2 -mr-4 rounded"
                onClick={closeModal}
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>
            <MaterialAndCare />
          </div>
        </MaterialCareModal>
      )}
      {/* ------ material care modal ------ end */}

      {/* ------ add to cart modal ------ start */}

      {modal === "addToCart" && (
        <AddToCartModal
          isOpen={isModalOpen}
          onClose={closeModal}
          length={length}
        >
          <div className="p-6">
            <div className="flex justify-end">
              <button
                className="text-bgray-900 font-bold py-1 px-2 -mt-4 mb-2 -mr-4 rounded"
                onClick={closeModal}
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>
            <AddToCart
              sizeType={product?.data?.size_variation}
              id={product?.data?._id}
              product={product?.data}
              setModal={setModal}
            />
          </div>
        </AddToCartModal>
      )}

      {/* ------ add to cart modal ------ end */}
    </section>
  );
};

export default ProductDetails;
