import { Link, useParams } from "react-router-dom";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";

const ProductDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const { slug } = useParams();
  const { data: product = [], isLoading } = useQuery({
    queryKey: [`/api/v1/product/${slug}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/product/${slug}`);
      const data = await res.json();
      return data;
    },
  });

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
    <section>
      <div className="max-w-[1300px] mx-auto my-8  bg-white p-5  ">
        <div className="grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-7 ">
          <div className=" lg:col-span-2 md:col-span-2 sm:col-span-1  col-span-1 ">
            <div className="">
              <div className="border border-gray-200 p-2">
                <img
                  className=" w-full lg:h-[382px]  md:h-[272px] sm:h-[353px]"
                  src={
                    selectedImage
                      ? selectedImage
                      : product?.data?.product_thumbnail
                  }
                  alt="product"
                />
              </div>

              <div className="flex flex-wrap my-2 ">
                <img
                  src={product?.data?.product_thumbnail}
                  alt={`image-${product?.data?.product_name}`}
                  className={`h-16 w-16 border  p-1 mr-2 my-2 cursor-pointer ${
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
                    <div key={image?._id}>
                      <img
                        src={image?.image}
                        alt={`image-${image?._id}`}
                        className={`h-16 w-16 border  p-1 mr-2 my-2 cursor-pointer ${
                          selectedImage === image?.image
                            ? "border-primaryLightColor"
                            : "border-gray-200"
                        }`}
                        onClick={() => setSelectedImage(image?.image)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Name price and buy add to cart section  */}
          {/* <div className="lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-1 px-4 ">
            <ProductHighlightSection product={product} />
          </div>

          <div className="lg:col-span-2 md:col-span-2 sm:col-span-3  col-span-1 px-4 ">
            <RightSideShoppingSection product={product} />
          </div>
        </div>

        <div className="grid lg:grid-cols-7 md:grid-5 grid-cols-1 gap-2 my-10">
          <div className="lg:col-span-5 md:col-span-3 col-span-1">
            <ProductAccordion product={product} />
          </div>

          <div className="lg:col-span-2 md:col-span-2 col-span-1">
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

export default ProductDetailsPage;