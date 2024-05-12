import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import MiniSpinner from "../../../../shared/loader/MiniSpinner";
import ProductHighlightSection from "./ProductHighlightSection";
import RightSideShoppingSection from "./RightSideShoppingSection";
import ProductAccordion from "./ProductAccordion";
import { BASE_URL } from "../../../../utils/baseURL";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectSize, setSelectSize] = useState("");
  const [selectedSizeData, setSelectedSizeData] = useState(null);
  const { slug } = useParams();
  const { data: product = [], isLoading } = useQuery({
    queryKey: [`/api/v1/product/${slug}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/product/${slug}`);
      const data = await res.json();
      return data;
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (isLoading) {
    return <MiniSpinner />;
  }
  if (!product) {
    return (
      <section className="flex items-center h-full sm:p-16 bg-gray-50 text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-40 h-40 text-gray-400"
          >
            <path
              fill="currentColor"
              d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
            ></path>
            <rect
              width="176"
              height="32"
              x="168"
              y="320"
              fill="currentColor"
            ></rect>
            <polygon
              fill="currentColor"
              points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
            ></polygon>
            <polygon
              fill="currentColor"
              points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
            ></polygon>
          </svg>
          <p className="text-3xl">
            Looks like our product is currently unavailable!
          </p>
          <Link
            to="/"
            rel="noopener noreferrer"
            className="px-8 py-3 font-semibold rounded bg-orange-600 text-gray-50 hover:scale-105 duration-100"
          >
            Back to homepage
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F2F4F8] py-6 ">
      <div className=" my-8 es_container bg-white p-4  ">
        <div className="grid  grid-cols-1 sm:grid-cols-5 lg:grid-cols-7 gap-3 ">
          <div className=" lg:col-span-2  sm:col-span-2  col-span-1 ">
            <div className="">
              <div className="border-2 border-gray-300">
                <img
                  className=" w-full lg:h-[310px] sm:h-[310px]  h-full "
                  src={
                    selectedImage
                      ? selectedImage
                      : product?.data?.product_thumbnail
                  }
                  alt="product"
                />
              </div>

              <div className=" flex  overflow-x-auto  scrollbar-thin my-2 ">
                <img
                  src={product?.data?.product_thumbnail}
                  alt={`image-${product?.data?.product_name}`}
                  className={`md:h-20 md:w-20 h-16 w-16 border  p-1 mr-2 my-2 hover:border-primaryLightColor duration-200  cursor-pointer ${
                    selectedImage === product?.data?.product_thumbnail
                      ? "border-primaryLightColor"
                      : "border-gray-200"
                  }`}
                  onClick={() =>
                    setSelectedImage(product?.data?.product_thumbnail)
                  }
                />
                {product?.data?.product_images &&
                  product?.data?.product_images.map((image) => (
                    <img
                      src={image?.image}
                      alt={`image-${image?._id}`}
                      key={image?._id}
                      className={`md:h-20 md:w-20 h-16 w-16 border hover:border-primaryLightColor duration-200   p-1 mr-2 my-2 cursor-pointer ${
                        selectedImage === image?.image
                          ? "border-primaryLightColor"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedImage(image?.image)}
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* Name price and buy add to cart section  */}
          <div className="lg:col-span-3  sm:col-span-3 col-span-1 px-4 border-r-0 lg:border-r ">
            {/* <div className=" md:col-span-8 sm:col-span-2 col-span-1 px-4 "> */}
            <ProductHighlightSection
              product={product}
              selectSize={selectSize}
              setSelectSize={setSelectSize}
              setSelectedSizeData={setSelectedSizeData}
              selectedSizeData={selectedSizeData}
            />
          </div>

          <div className="lg:col-span-2  sm:col-span-5  col-span-1 px-4 border-t lg:border-t-0">
            <RightSideShoppingSection
              product={product}
              selectSize={selectSize}
              setSelectSize={setSelectSize}
              selectedSizeData={selectedSizeData}
              setSelectedSizeData={setSelectedSizeData}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-7 md:grid-5 grid-cols-1 gap-2 my-10 ">
          <div className="lg:col-span-5 md:col-span-3 col-span-1">
            <ProductAccordion
              product={product}
              selectedSizeData={selectedSizeData}
              setSelectedSizeData={setSelectedSizeData}
            />
          </div>

          {/* <div className="lg:col-span-2 md:col-span-2 col-span-1">
            <SuggestProduct />
          </div> */}
        </div>
      </div>

      {/* Related Product */}
      {/* 
      <div className="max-w-[1300px] mx-auto mt-16 mb-4  bg-white p-4 rounded-lg  ">
        <p className="text-ftPrimaryColor font-bold">RELETED PRODUCT:</p>
      </div>
      <div className="max-w-[1300px] mx-auto my-16   ">
        <RelatedProducts />
      </div> */}
    </section>
  );
};

export default ProductDetails;
