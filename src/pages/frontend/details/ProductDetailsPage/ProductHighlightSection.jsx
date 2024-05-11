/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductHighlightSection = ({
  product,
  selectSize,
  setSelectSize,
  setSelectedSizeData,
  selectedSizeData,
}) => {
  const [selectColor, setSelectColor] = useState("");

  const {
    _id,
    product_name,
    category_id,
    product_description,
    product_images,
    product_slug,
    product_price,
    product_discount_price,
    product_quantity,
    product_size_variation,
    category,
    product_thumbnail,
    product_color_id,
  } = product?.data;

  // const handleSelectColor = (color) => {
  //   setSelectColor(color);
  // };

  // const handleSelectSize = (size) => {
  //   setSelectSize(size);
  // };
  console.log(selectedSizeData);
  return (
    <div>
      <h2 className=" font-semibold text-gray-700 text-2xl my-3  ">
        {product_name}
      </h2>
      <hr />

      <div className=" my-3 ">
        {selectedSizeData != null ? (
          <>
            {selectedSizeData?.discount_price && (
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
                <div className="bg-red-600 text-white inline text-xs px-1.5 rounded ml-4">
                  OFF{" "}
                  {selectedSizeData?.price
                    ? selectedSizeData?.price - selectedSizeData?.discount_price
                    : product_price - selectedSizeData?.discount_price}
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
                {selectedSizeData?.discount_price
                  ? selectedSizeData?.discount_price
                  : product_discount_price
                  ? product_discount_price
                  : selectedSizeData?.price
                  ? selectedSizeData?.price
                  : product_price}
              </strong>
            </div>
            <h1 className="text-md  text-gray-700 my-3">
              <span className="mr-4"> Size:</span>{" "}
              <span className="font-semibold text-[18px] ">
                {selectedSizeData?.size}
              </span>
            </h1>

            {selectedSizeData?.quantity > 0 ? (
              <h1 className="text-md  text-gray-700 my-3">
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
                <div className="bg-red-600 text-white inline text-xs px-1.5 rounded ml-4">
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
              <h1 className="text-md  text-gray-700 my-3">
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

        {/* Size section */}
        {/* category details */}
        <div className="flex gap-8 mt-10 items-start">
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
        {}
      </div>

      <hr />

      {/* Color section */}
      {/* <div className="my-4">
        <p className="text-sm py-2">
          <span className="font-semibold">Color:</span>{" "}
          <span className="text-gray-600">{selectColor}</span>
        </p>

        <div className="flex flex-wrap gap-2">
          <div
            className="w-4 h-4 rounded cursor-pointer bg-red-500"
            onClick={() => handleSelectColor("Red")}
          ></div>
          <div
            className="w-4 h-4 rounded cursor-pointer bg-blue-500"
            onClick={() => handleSelectColor("Blue")}
          ></div>
          <div
            className="w-4 h-4 rounded cursor-pointer bg-green-500"
            onClick={() => handleSelectColor("Green")}
          ></div>
          <div
            className="w-4 h-4 rounded cursor-pointer bg-yellow-500"
            onClick={() => handleSelectColor("Yellow")}
          ></div>
          <div
            className="w-4 h-4 rounded cursor-pointer bg-indigo-500"
            onClick={() => handleSelectColor("Indigo")}
          ></div>
        </div>
      </div> */}
      {/* Size section */}
      {/* <div className="my-4">
        <p>
          <span className="font-semibold text-sm">
            Size: <span className=" text-gray-600">{selectSize}</span>
          </span>
        </p>
        <div className="flex flex-wrap gap-2 my-2">
          <span
            className="px-3 py-1 font-semibold rounded cursor-pointer border text-xs text-gray-500"
            onClick={() => handleSelectSize(36)}
          >
            {" "}
            36
          </span>
          <span
            className="px-3 py-1 font-semibold rounded cursor-pointer border text-xs text-gray-500"
            onClick={() => handleSelectSize(37)}
          >
            {" "}
            37
          </span>
          <span
            className="px-3 py-1 font-semibold rounded cursor-pointer border text-xs text-gray-500"
            onClick={() => handleSelectSize(38)}
          >
            {" "}
            38
          </span>
          <span
            className="px-3 py-1 font-semibold rounded cursor-pointer border text-xs text-gray-500"
            onClick={() => handleSelectSize(39)}
          >
            {" "}
            39
          </span>
          <span
            className="px-3 py-1 font-semibold rounded cursor-pointer border text-xs text-gray-500"
            onClick={() => handleSelectSize(40)}
          >
            {" "}
            40
          </span>
          <span
            className="px-3 py-1 font-semibold rounded cursor-pointer border text-xs text-gray-500"
            onClick={() => handleSelectSize(41)}
          >
            {" "}
            41
          </span>
          <span
            className="px-3 py-1 font-semibold rounded cursor-pointer border text-xs text-gray-500"
            onClick={() => handleSelectSize(42)}
          >
            {" "}
            42
          </span>
          <span
            className="px-3 py-1 font-semibold rounded cursor-pointer border text-xs text-gray-500"
            onClick={() => handleSelectSize(43)}
          >
            {" "}
            43
          </span>
          <span
            className="px-3 py-1 font-semibold rounded cursor-pointer border text-xs text-gray-500"
            onClick={() => handleSelectSize(44)}
          >
            {" "}
            44
          </span>
          <span
            className="px-3 py-1 font-semibold rounded cursor-pointer border text-xs text-gray-500"
            onClick={() => handleSelectSize(45)}
          >
            {" "}
            45
          </span>
          <span
            className="px-3 py-1 font-semibold rounded cursor-pointer border text-xs text-gray-500"
            onClick={() => handleSelectSize(46)}
          >
            {" "}
            46
          </span>
        </div>
      </div> */}
      {/* Quantity section */}
      {/* <div className="my-4">
        <table className="table-auto border border-collapse w-full">
          <thead className="border">
            <tr className="border">
              <td className="font-semibold text-xs p-1.5 border-r " colSpan={3}>
                Quantity
              </td>
              <td className="font-semibold text-xs p-1.5" colSpan={1}>
                Price
              </td>
            </tr>
          </thead>
          <tbody className="text-xs">
            <tr className="bg-[#F2F2F2] border">
              <td colSpan={3} className=" border-r p-1.5 ">
                1 - 49 pieces
              </td>
              <td className=" p-1.5">2000 BDT</td>
            </tr>
            <tr className="bg-white border">
              <td colSpan={3} className=" border-r p-1.5">
                50 - 9999 pieces
              </td>
              <td className="  p-1.5">1500 BDT</td>
            </tr>
            <tr className="bg-[#F2F2F2] border">
              <td colSpan={3} className=" border-r p-1.5 ">
                10000 - 99998 pieces
              </td>
              <td className=" p-1.5">1200 BDT</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default ProductHighlightSection;
