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
import MaterialAndCare from "../materialAndCares/MaterialAndCare";
import MaterialCareModal from "../../../common/modal/MaterialCareModal";
import ShippingInfo from "../shippingInfo/ShippingInfo";
import AddToCartModal from "../../../common/modal/AddToCartModal";
import AddToCart from "../addToCart/AddToCart";
import VideoModal from "../../../common/modal/VideoModal";
import ShippingInfoModal from "../../../common/modal/shippingInfoModal";

const ProductDetails = ({ product, sizePicture }) => {
  const [isModalOpen, setModalOpen] = useState(true);
  const [modal, setModal] = useState("video");

  const openModal = (value) => {
    setModalOpen(true);
    setModal(value ? value : product?.data?.product_video);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModal("");
  };

  const allImages = [...product.data.images];
  allImages?.push({ image: product?.data?.thumbnail_image });
  allImages?.push({ image: product?.data?.hover_image });

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
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
        onSwiper={() => { }}
        onSlideChange={() => { }}
        className="h-[50vh] md:h-[90vh] w-full"
      >
        {allImages?.map((image, i) => (
          <SwiperSlide
            key={i}
            className="w-full flex justify-center items-center"
          >
            <img
              loading="lazy"
              className="object-fill h-full w-full"
              src={image?.image}
              alt={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* ------ products details left side content ------ end */}

      {/* ------ products details right side content ------ start */}
      <div className="px-5 md:px-10 py-5">
        <Breadcrumb product={product?.data} />
        <div className="px-4">
          <article className="space-y-2 md:space-y-5 mt-8 border-bgray-500">
            <h1 className="text-xl font-semibold">{product?.data?.title}</h1>
            <p className="">
              <span className="text-xl font-normal">৳ </span>
              <span
                className={`text-xl font-normal mr-4 ${product?.data?.discount_price ? "line-through" : ""
                  }`}
              >
                {product?.data?.price}
              </span>
              {product?.data?.discount_price && (
                <>
                  <span className="text-xl font-normal text-error-300">৳ </span>
                  <span className={`text-xl font-normal text-error-300`}>
                    {product?.data?.discount_price}
                  </span>
                </>
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
            className="bg-primaryColor bg-opacity-100 hover:bg-opacity-80 text-lg font-medium leading-6 -tracking-normal text-white w-full py-[10px] lg:py-[20px] flex items-center justify-center rounded-sm uppercase"
          >
            Add To Shopping Bag
          </button>
          <div className="h-[1px] w-full bg-bgray-700 mt-12"></div>

          <div className="">
            <p className="py-7 text-xl font-medium tracking-tight leading-5">
              Products Details
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: product?.data?.description }}
            ></div>
          </div>
          <div className="py-5 md:py-10 gap-1 md:gap-2 items-center flex flex-col lg:flex-row">
            {product?.data?.product_video &&
              product?.data?.product_video !== "false" && (
                <button
                  onClick={() => openModal("video")}
                  className="relative inline-flex items-center justify-start px-3 md:px-4 py-3 overflow-hidden font-medium transition-all bg-primaryColor rounded group"
                >
                  <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#F9DF7B] rounded group-hover:-mr-4 group-hover:-mt-4">
                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-primaryColor rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                    This Product Video
                  </span>
                </button>
              )}
            {product?.data?.product_video &&
              product?.data?.product_video !== "false" && (
                <span className="h-[12px] w-[2px] bg-bgray-500 inline-block"></span>
              )}
            <button
              onClick={() => openModal("materialCare")}
              className="underline text-sm md:text-lg font-normal hover:opacity-100 opacity-80 tracking-tight leading-5"
            >
              Materials & Care
            </button>
            <span className="h-[12px] w-[2px] bg-bgray-500 inline-block"></span>
            <button
              onClick={() => openModal("shippingInfo")}
              className="underline text-sm md:text-lg font-normal hover:opacity-100 opacity-80 tracking-tight leading-5"
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
              sizePicture={sizePicture}
            />
          </div>
        </AddToCartModal>
      )}

      {/* ------ add to cart modal ------ end */}

      {/* ------ video modal ------ start */}

      {modal === "video" && (
        <VideoModal isOpen={isModalOpen} onClose={closeModal} length={length}>
          <div className="p-6">
            <div className="flex justify-end">
              <button
                className="text-textColor font-bold py-1 px-2 -mt-4 mb-2 -mr-4 rounded"
                onClick={closeModal}
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>
            <div className="relative group overflow-hidden md:col-span-3 md:row-span-2">
              <div className="block w-full h-full">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                >
                  {/* <source src={product.data.product_video} type="video/mp4" /> */}
                  <source src={product?.data?.product_video} type="video/mp4" />
                  {/* Your browser does not support the video tag. */}
                </video>
              </div>
            </div>
          </div>
        </VideoModal>
      )}

      {/* ------ video modal ------ end */}
    </section>
  );
};

export default ProductDetails;
