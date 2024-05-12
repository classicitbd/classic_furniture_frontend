import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { HiMinus, HiOutlinePlus } from "react-icons/hi";
const RightSideShoppingSection = ({
  product,
  selectSize,
  setSelectSize,
  selectedSizeData,
  setSelectedSizeData,
}) => {
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // console.log(selectedSizeData);
  // console.log(selectSize);
  return (
    <div>
      {/* Short Description / Stock / Quantity / cart */}
      <div className=" pt-2  ">
        {/* Short description */}
        {/* <div className="bg-[#F2F2F2] rounded p-2.5">
          <p className=" font-semibold text-gray-800 tracking-tight">
            Short Description:
          </p>
          <li className="text-xs font-semibold text-gray-700 list-decimal pt-2 py-1">
            <span className="text-gray-600 font-normal ">
              {" "}
              NVIDIA GeForce RTX 4060 Laptop GPU 8 GB GDDR6
            </span>
          </li>
          <li className="text-xs font-semibold text-gray-700 list-decimal py-1">
            <span className="text-gray-600 font-normal ">
              {" "}
              Intel Core i7 13th Gen 13620H (2.40GHz)
            </span>
          </li>
          <li className="text-xs font-semibold text-gray-700 list-decimal py-1">
            <span className="text-gray-600 font-normal ">
              {" "}
              16GB Memory 1 TB NVMe SSD
            </span>
          </li>
        </div> */}
        {product?.data?.product_size_variation.length > 0 ? (
          <div>
            <p className="font-semibold text-[16px] text-gray-800 pb-2">
              Select Size: {selectSize}
            </p>
            <div className="flex flex-wrap gap-2">
              {product?.data?.product_size_variation.map((item) => (
                <div key={item?._id}>
                  <button
                    className={` border rounded-lg cursor-pointer py-2 px-3.5 mr-2 hover:bg-primaryLightColor hover:text-white font-semibold text-gray-700 transition duration-200 ease-in-out hover:shadow-xl ${
                      selectSize === item?.size
                        ? "bg-primaryLightColor text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectSize(item.size);
                      setSelectedSizeData(item);
                    }}
                  >
                    {item?.size}
                  </button>
                </div>
              ))}
              <button
                className="border rounded-lg cursor-pointer px-3 mr-2  hover:bg-red-600 hover:text-white text-[12px] font-semibold hover:shadow-xl duration-200 text-gray-700  bg-gray-200"
                onClick={() => {
                  setSelectSize("");
                  setSelectedSizeData(null);
                }}
              >
                Remove
              </button>
            </div>
            <div>
              {selectedSizeData?.quantity > 0 ? (
                <div>
                  {" "}
                  <div>
                    <p className="font-semibold text-sm text-gray-800 mt-6 mb-4">
                      Product Stock:{" "}
                      <span className="ml-1 bg-primaryDeepColor text-white text-xs px-2.5 py-1 rounded-xl">
                        {" "}
                        {selectedSizeData?.quantity}
                      </span>
                    </p>
                  </div>
                  {/* Product quantity */}
                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      Quantity
                    </p>
                    <div className="flex items-center my-2  gap-2.5 flex-wrap ">
                      <div className="flex  ">
                        <button
                          type="button"
                          className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2] border border-gray-200"
                          onClick={handleDecrement}
                        >
                          <HiMinus className="text-gray-700" />
                        </button>
                        <input
                          type="number"
                          className="border border-gray-200 text-gray-800  text-xs  text-center w-14 "
                          value={quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value);
                            if (!isNaN(newQuantity) && newQuantity >= 1) {
                              setQuantity(newQuantity);
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2]  border border-gray-200"
                          onClick={handleIncrement}
                        >
                          <HiOutlinePlus className="text-gray-700" />
                        </button>
                      </div>
                      <div className=" text-xs px-2.5 py-2  bg-primaryDeepColor text-white ">
                        <FaRegHeart />
                      </div>
                    </div>
                  </div>
                  {/* Add to cart button  */}
                  <button className="w-full text-center bg-primaryDeepColor text-white font-semibold py-1.5 hover:bg-[#019C9F] duration-150    rounded-full my-2.5">
                    Buy Now
                  </button>
                  <button className="w-full text-center bg-[#F2F2F2] font-semibold py-1.5 hover:bg-gray-200 duration-150 mb-2 border border-black rounded-full ">
                    Add To Cart
                  </button>
                </div>
              ) : product?.data?.product_quantity > 0 ? (
                <div>
                  {" "}
                  <div>
                    <p className="font-semibold text-sm text-gray-800 mt-6 mb-4">
                      Product Stock:{" "}
                      <span className="ml-1 bg-primaryDeepColor text-white text-xs px-2.5 py-1 rounded-xl">
                        {" "}
                        {product?.data?.product_quantity}
                      </span>
                    </p>
                  </div>
                  {/* Product quantity */}
                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      Quantity
                    </p>
                    <div className="flex items-center my-2  gap-2.5 flex-wrap ">
                      <div className="flex  ">
                        <button
                          type="button"
                          className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2] border border-gray-200"
                          onClick={handleDecrement}
                        >
                          <HiMinus className="text-gray-700" />
                        </button>
                        <input
                          type="number"
                          className="border border-gray-200 text-gray-800  text-xs  text-center w-14 "
                          value={quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value);
                            if (!isNaN(newQuantity) && newQuantity >= 1) {
                              setQuantity(newQuantity);
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2]  border border-gray-200"
                          onClick={handleIncrement}
                        >
                          <HiOutlinePlus className="text-gray-700" />
                        </button>
                      </div>
                      <div className=" text-xs px-2.5 py-2  bg-primaryDeepColor text-white ">
                        <FaRegHeart />
                      </div>
                    </div>
                  </div>
                  {/* Add to cart button  */}
                  <button className="w-full text-center bg-primaryDeepColor text-white font-semibold py-1.5 hover:bg-[#019C9F] duration-150    rounded-full my-2.5">
                    Buy Now
                  </button>
                  <button className="w-full text-center bg-[#F2F2F2] font-semibold py-1.5 hover:bg-gray-200 duration-150 mb-2 border border-black rounded-full ">
                    Add To Cart
                  </button>
                </div>
              ) : (
                <div>Out of stock</div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {product?.data?.product_quantity > 0 ? (
              <div>
                {" "}
                <div>
                  <p className="font-semibold text-sm text-gray-800 mt-6 mb-4">
                    Product Stock:{" "}
                    <span className="ml-1 bg-primaryDeepColor text-white text-xs px-2.5 py-1 rounded-xl">
                      {" "}
                      {product?.data?.product_quantity}
                    </span>
                  </p>
                </div>
                {/* Product quantity */}
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    Quantity
                  </p>
                  <div className="flex items-center my-2  gap-2.5 flex-wrap ">
                    <div className="flex  ">
                      <button
                        type="button"
                        className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2] border border-gray-200"
                        onClick={handleDecrement}
                      >
                        <HiMinus className="text-gray-700" />
                      </button>
                      <input
                        type="number"
                        className="border border-gray-200 text-gray-800  text-xs  text-center w-14 "
                        value={quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          if (!isNaN(newQuantity) && newQuantity >= 1) {
                            setQuantity(newQuantity);
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2]  border border-gray-200"
                        onClick={handleIncrement}
                      >
                        <HiOutlinePlus className="text-gray-700" />
                      </button>
                    </div>
                    <div className=" text-xs px-2.5 py-2  bg-primaryDeepColor text-white ">
                      <FaRegHeart />
                    </div>
                  </div>
                </div>
                {/* Add to cart button  */}
                <button className="w-full text-center bg-primaryDeepColor text-white font-semibold py-1.5 hover:bg-[#019C9F] duration-150    rounded-full my-2.5">
                  Buy Now
                </button>
                <button className="w-full text-center bg-[#F2F2F2] font-semibold py-1.5 hover:bg-gray-200 duration-150 mb-2 border border-black rounded-full ">
                  Add To Cart
                </button>
              </div>
            ) : (
              <div>Out of stock</div>
            )}
          </div>
        )}
        {/* Product  stock */}
      </div>
    </div>
  );
};

export default RightSideShoppingSection;