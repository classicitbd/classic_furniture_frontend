import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductHighlightSection = ({ product, selectedSizeData }) => {

  const [outOfStockStock, setOutOfStock] = useState(false);
  const stackManage = product?.data?.product_size_variation;

  useEffect(() => {
    if (stackManage && stackManage.length > 0) {
      const allZero = stackManage.map(item => item?.quantity === 0).every(Boolean);
      setOutOfStock(allZero);
    } else {
      if (product?.data?.product_quantity === 0) {
        setOutOfStock(true)
      }
    }
  }, [stackManage, product]);

  const {
    product_name,
    category_id,
    product_price,
    product_discount_price,
    product_quantity,
    product_color_id,
    // eslint-disable-next-line no-unsafe-optional-chaining
  } = product?.data;

  // const handleSelectColor = (color) => {
  //   setSelectColor(color);
  // };

  // const handleSelectSize = (size) => {
  //   setSelectSize(size);
  // };
  return (
    <div>
      <h2 className=" font-semibold text-gray-700 text-2xl my-3  ">
        {product_name}
      </h2>
      <hr />

      <div className=" my-3 ">
        {selectedSizeData != null ? (
          <>
            {selectedSizeData?.discount_price ? (
              <div className="flex items-center  ">
                {" "}
                <span className="text-md  text-gray-600 mr-4"> M.R.P </span>
                <span className="mr-1">৳ </span>{" "}
                <span className="line-through text-lg text-[#0f172a99] font-medium">
                  {" "}
                  {selectedSizeData?.price
                    ? selectedSizeData?.price
                    : product_price}
                </span>
                <div className="bg-red-600 text-white inline text-xs px-1.5  rounded-tr-lg rounded-bl-lg ml-4">
                  OFF{" "}
                  {selectedSizeData?.price
                    ? selectedSizeData?.price - selectedSizeData?.discount_price
                    : product_price - selectedSizeData?.discount_price}
                  TK
                </div>
              </div>
            ) : (
              product_discount_price && (
                <div className="flex items-center  ">
                  {" "}
                  <span className="text-md  text-gray-600 mr-4"> M.R.P </span>
                  <span className="mr-1">৳ </span>{" "}
                  <span className="line-through text-lg text-[#0f172a99] font-medium">
                    {" "}
                    {selectedSizeData?.price
                      ? selectedSizeData?.price
                      : product_price}
                  </span>
                  <div className="bg-red-600 text-white inline text-xs px-1.5  rounded-tr-lg rounded-bl-lg ml-4">
                    OFF{" "}
                    {product_discount_price && selectedSizeData?.price
                      ? selectedSizeData?.price - product_discount_price
                      : product_price - product_discount_price}
                    TK
                  </div>
                </div>
              )
            )}
            <div className="my-2">
              <strong className="offer_price text-[#FF0000] text-2xl  font-semibold">
                <span className="text-md text-gray-600 mr-3 font-medium">
                  {" "}
                  Price
                </span>{" "}
                ৳{" "}
                {selectedSizeData?.discount_price
                  ? selectedSizeData?.discount_price
                  : product_discount_price
                    ? product_discount_price
                    : selectedSizeData?.price
                      ? selectedSizeData?.price
                      : product_price}
              </strong>
            </div>
            <div className="flex items-center gap-4 mb-2">
              {" "}
              <h1 className="text-md text-gray-700 ">
                <span className="mr-3"> Color:</span>{" "}
                {product_color_id?.color_name}
              </h1>
              <h1 className="text-md  text-gray-700 ">
                <span className="mr-4"> Size:</span>{" "}
                <span className="font-semibold ">{selectedSizeData?.size}</span>
              </h1>
            </div>

            <h1 className="text-md  text-gray-700 my-4">
              <span className="mr-2"> Status:</span>{" "}
              <span className="text-green-600">{outOfStockStock == false ? "In stock" : "Out of stock"}</span>
            </h1>
          </>
        ) : (
          <>
            {" "}
            {product_discount_price && (
              <div className="flex items-center  ">
                {" "}
                <span className="text-md  text-gray-600 mr-4"> M.R.P </span>
                <span className="mr-1">৳ </span>{" "}
                <span className="line-through text-lg text-[#0f172a99] font-medium">
                  {" "}
                  {product_price}
                </span>
                <div className="bg-red-600 text-white inline text-xs px-1.5  rounded-tr-lg rounded-bl-lg ml-4">
                  OFF {product_price - product_discount_price}
                  TK
                </div>
              </div>
            )}
            <div className="my-2">
              <strong className="offer_price text-[#FF0000] text-2xl  font-semibold">
                <span className="text-md text-gray-600 mr-3 font-medium">
                  {" "}
                  Price
                </span>{" "}
                ৳{" "}
                {product_discount_price
                  ? product_discount_price
                  : product_price}
              </strong>
            </div>
            <h1 className="text-md text-gray-700 my-2">
              <span className="mr-3"> Color:</span>{" "}
              {product_color_id?.color_name}
            </h1>
            {product_quantity > 0 ? (
              <h1 className="text-md  text-gray-700 my-4">
                <span className="mr-2"> Status:</span>{" "}
                <span className="text-green-600">In Stock</span>
              </h1>
            ) : (
              <h1 className="text-md text-gray-700 my-4">
                <span className="mr-2"> Status:</span>{" "}
                <span className="text-red-600">Out of Stock</span>
              </h1>
            )}
          </>
        )}

        {
          product?.data?.product_partial_payment_amount &&
          <div className="my-2">
            <strong className="offer_price text-[#FF0000]  font-semibold">
              <span className="text-md text-gray-600 mr-3 font-medium">
                {" "}
                Need Partial Pay
              </span>{" "}
              ৳{" "}
              {product?.data?.product_partial_payment_amount}
            </strong>
          </div>
        }

        <hr />

        {/* category details */}
        <div className="flex gap-8 mt-8 items-start">
          <img
            src={category_id?.category_logo}
            alt={category_id?.category_name}
            className="w-20 h-[68px] border"
          />
          <div>
            <p className="text-[12px] text-gray-500 ">Category</p>
            <p className="font-semibold text-lg text-primary">
              {category_id?.category_name}
            </p>
            <Link to={`/all?category=${category_id?.category_slug}`}>
              <p className="text-[10px] pt-1 text-gray-700 transition duration-100 hover:text-primaryLightColor hover:underline ">
                View Other Products
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHighlightSection;
