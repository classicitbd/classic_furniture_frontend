/* eslint-disable no-unsafe-optional-chaining */
import { RxCross1 } from "react-icons/rx";
import ProductViewImageSlider from "./ProductViewImageSlider";
import Select from "react-select";

const ProductView = ({ setIsViewOpen, isViewData }) => {
  // send all image for sliding
  const allImages = [
    isViewData?.hover_image,
    isViewData?.thumbnail_image,
    ...isViewData?.images?.map((item) => item.image),
  ];

  function formatSizeVariation(option) {
    const baseString = `Size: ${option.size}, Quantity: ${option.quantity}`;

    // Check if price and discount_price is not null before including it in the string
    const priceString = option.price ? `, Price: ${option.price}` : "";

    const discountString = option.discount_price
      ? `, Discount Price: ${option.discount_price}`
      : "";

    return baseString + priceString + discountString;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-10/12 p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3
              className="text-[26px] font-bold text-[#0A0A0A] capitalize"
              id="modal-title"
            >
              {" "}
              Product Information{" "}
            </h3>
            <button className="btn bg-white hover:bg-white border p-1">
              <RxCross1
                onClick={() => setIsViewOpen(false)}
                size={25}
              ></RxCross1>
            </button>
          </div>

          <div className="grid grid-cols-12 gap-0 md:gap-4 my-8">
            {/* Show all image */}
            <div className="md:col-span-6 col-span-12">
              <ProductViewImageSlider allImages={allImages} />
            </div>
            {/* Show data */}
            <div className="md:col-span-6 col-span-12">
              <h3 className="text-xl font-semibold text-bgray-900">
                {isViewData?.title}
              </h3>

              <div className="flex items-center justify-between mt-2">
                <h2 className="text-red-400">
                  Price: <strong>৳ {isViewData?.price}</strong>{" "}
                </h2>
                {isViewData?.discount_price && (
                  <h2 className="text-red-400">
                    Discount Price:{" "}
                    <strong>৳ {isViewData?.discount_price}</strong>{" "}
                  </h2>
                )}
              </div>

              <div className="flex items-center justify-between mt-1">
                <h2>Color: {isViewData?.colorId?.color} </h2>
                <h2>Menu: {isViewData?.menuId?.menu} </h2>
              </div>

              <h2 className="mt-1">
                Category: {isViewData?.categoryId?.category}{" "}
              </h2>
              <h2 className="mt-1">
                Sub Category: {isViewData?.subCategoryId?.sub_category}{" "}
              </h2>
              {isViewData?.featureId?.feature && (
                <h2 className="mt-1">
                  Feature: {isViewData?.featureId?.feature}{" "}
                </h2>
              )}
              {isViewData?.collectionId?.collection_name && (
                <h2 className="mt-1">
                  Collection: {isViewData?.collectionId?.collection_name}{" "}
                </h2>
              )}
              {isViewData?.styleId?.style && (
                <h2 className="mt-1">Style: {isViewData?.styleId?.style} </h2>
              )}

              <p className="mt-4">See Variation: </p>
              <Select
                id="variation"
                name="variation"
                required
                aria-label="See all variation"
                options={isViewData?.size_variation}
                getOptionLabel={(option) => formatSizeVariation(option)}
                getOptionValue={(x) => x?._id}
              ></Select>
            </div>
          </div>
          <div className="text-gray-400" dangerouslySetInnerHTML={{ __html: isViewData?.description }}></div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
