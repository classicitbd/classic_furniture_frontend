import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { HiMinus, HiOutlinePlus } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function Checkout() {
  const cart = useSelector((state) => state.furnitureCart.products);
  console.log(cart);
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="es_container">
      <div className="lg:mx-10 md:mx-4 mx-2">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-semibold pt-8 pb-2 flex gap-2 items-center">
            <BsCart size={26} /> Shopping Bag Item {cart.length}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 my-4  lg:gap-8 ">
          {/* Left side condition aria */}
          <div className="w-full  md:w-[68%]  p-2">
            {cart?.map((product, index) => (
              <div
                className="border rounded mb-4 flex justify-between "
                key={index}
              >
                <div className="flex  flex-col sm:flex-row md:px-0 px-4  gap-4">
                  <img
                    className="md:w-36 md:h-36 w-20 h-20  rounded-l"
                    src={product?.product_thumbnail}
                    alt=""
                  />
                  <div className="py-1.5 md:px-4 ">
                    <p className="md:text-xl text-sm font-semibold text-gray-600 ">
                      {product?.product_name}
                    </p>
                    <p className="py-1">Color: {product?.color}</p>
                    <p className="py-1">Price: {product?.price}</p>
                  </div>
                </div>
                <dir>
                  <button className="flex gap-2 px-2  bg-red-500 hover:bg-red-600 duration-200 text-white p-1 rounded my-4 text-[12px]">
                    Remove <BiTrash size={16} />
                  </button>
                  {/* quantity */}
                  <div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">
                        Quantity
                      </p>
                      <div className="flex items-center my-2  gap-2.5 flex-wrap ">
                        <div className="flex  ">
                          <button
                            type="button"
                            className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2] border border-gray-200"
                            // onClick={handleDecrement}
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
                            // onClick={handleIncrement}
                          >
                            <HiOutlinePlus className="text-gray-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </dir>
              </div>
            ))}
          </div>

          {/* Right side  */}

          <div className="w-full md:w-[32%]  p-2">
            <div className="border rounded ">
              <div className="px-6  py-3">
                <div className="pb-1.5 flex justify-between items-center">
                  <p>Item total</p>
                  <p>৳ 26100.0</p>
                </div>
                <div className="flex justify-between py-2 items-center">
                  {" "}
                  <p>Delivery fee</p>
                  <p>100</p>
                </div>
                <hr />
                <div className="flex justify-between py-2 items-center">
                  {" "}
                  <p>Grand total</p>
                  <p>100</p>
                </div>

                <div className="py-1.5 text-gray-500  flex justify-between items-center">
                  <p className="text-[12px]">Inclusive of all taxes</p>
                  <p>৳ 26100.0</p>
                </div>
                <hr />
                <div className="py-3 text-gray-500  flex justify-between items-center">
                  <p className="text-[12px]">Average delivery time: ---</p>
                  <p>3 days</p>
                </div>

                <button className="bg-primaryLightColor text-white px-4 py-2 w-full mt-4  rounded">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
