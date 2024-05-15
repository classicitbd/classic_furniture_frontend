import { BiTrash } from "react-icons/bi";
import { HiMinus, HiOutlinePlus } from "react-icons/hi";

export default function CartItems({ cart, quantity, setQuantity }) {
  return (
    <div className="w-full  md:w-[68%] bg-white border shadow rounded-lg p-4">
      {cart?.map((product, index) => (
        <div className="border rounded mb-4 flex justify-between " key={index}>
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
                <p className="font-semibold text-sm text-gray-800">Quantity</p>
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
  );
}
