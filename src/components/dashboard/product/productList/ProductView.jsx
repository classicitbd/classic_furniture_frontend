/* eslint-disable no-unsafe-optional-chaining */
import { RxCross1 } from "react-icons/rx";
import ProductViewImageSlider from "./ProductViewImageSlider";
import Select from "react-select";

const ProductView = ({ setIsViewOpen, isViewData }) => {
  // send all image for sliding
  const allImages = [
    isViewData?.product_thumbnail,
    ...isViewData?.product_images?.map((item) => item?.image),
  ];

  function formatSizeVariation(option) {
    const baseString = `Size: ${option?.size}, Quantity: ${option?.quantity}`;

    // Check if price and discount_price is not null before including it in the string
    const priceString = option?.price ? `, Price: ${option?.price}` : "";

    const discountString = option?.discount_price
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
                {isViewData?.product_name}
              </h3>

              <div className="flex items-center justify-between mt-2">
                <h2 className="text-red-400">
                  Price: <strong>৳ {isViewData?.product_price}</strong>{" "}
                </h2>
                {isViewData?.product_discount_price && (
                  <h2 className="text-red-400">
                    Discount Price:{" "}
                    <strong>৳ {isViewData?.product_discount_price}</strong>{" "}
                  </h2>
                )}
              </div>

              <div className="flex items-center justify-between mt-1">
                <h2>Color: {isViewData?.product_color_id?.color_name} </h2>
                <h2>Category: {isViewData?.category_id?.category_name} </h2>
              </div>
              <h2 className="mt-1">
                Sub Category: {isViewData?.sub_category_id?.sub_category_name}{" "}
              </h2>

              {isViewData?.product_size_variation?.length > 0 &&
                <div>
                  <p className="mt-4">See Variation: </p>
                  <Select
                    id="variation"
                    name="variation"
                    required
                    aria-label="See all variation"
                    options={isViewData?.product_size_variation}
                    getOptionLabel={(option) => formatSizeVariation(option)}
                    getOptionValue={(x) => x?._id}
                  ></Select>
                </div>
              }
            </div>
          </div>
          <div className="text-gray-400" dangerouslySetInnerHTML={{ __html: isViewData?.product_description }}></div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
