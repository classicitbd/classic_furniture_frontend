import { BiTrash } from "react-icons/bi";
import { HiMinus, HiOutlinePlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../../../redux/feature/cart/cartSlice";
import { toast } from "react-toastify";

export default function CartItems({ cart }) {
  const dispatch = useDispatch();

  return (
    <div className=" bg-white border shadow rounded-lg  p-4 ">
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
              <p className="py-1 text-xs sm:text-sm">Color: {product?.color}</p>
              <p className="py-1 text-xs sm:text-sm">Price: {product?.price}</p>
              {product?.size && (
                <p className="py-1 text-xs sm:text-sm">Size: {product?.size}</p>
              )}
              {product?.product_partial_payment &&
                product?.product_partial_payment == true && (
                  <p className="py-1 text-xs sm:text-sm">
                    Partial Payment: {product?.product_partial_payment_amount}
                  </p>
                )}
            </div>
          </div>
          <dir className="flex flex-col md:px-0 mr-3 justify-end">
            <button
              onClick={() => {
                dispatch(
                  removeFromCart({
                    productId: product?.productId,
                    size: product?.size,
                  })
                );
              }}
              className="flex gap-2 items-center justify-center bg-red-500 hover:bg-red-600 duration-200 text-white p-1 rounded my-4 text-[12px]"
            >
              Remove <BiTrash size={16} />
            </button>
            {/* quantity */}
            <div>
              <div>
                <p className="font-semibold  text-gray-800 flex justify-end  text-xs sm:text-sm">
                  Quantity
                </p>
                <div className="flex items-center justify-end my-2  gap-2.5 flex-wrap ">
                  <div className="flex  ">
                    <button
                      type="button"
                      className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2] border border-gray-200"
                      onClick={() => {
                        if (product?.quantity > 1) {
                          dispatch(
                            decrementQuantity({
                              productId: product?.productId,
                              size: product?.size,
                              product_partial_total_payment:
                                product?.product_partial_payment_amount *
                                (product?.quantity - 1),
                            })
                          );
                        }
                      }}
                    >
                      <HiMinus className="text-gray-700" />
                    </button>
                    <span
                      type="number"
                      className="border flex justify-center border-gray-200 text-gray-800  text-xs  items-center w-14 "
                    >
                      {product?.quantity}
                    </span>
                    <button
                      onClick={() => {
                        if (product?.quantity === product?.totalQuantity) {
                          toast.error("Not Enough Stock");
                          return;
                        }
                        dispatch(
                          incrementQuantity({
                            productId: product?.productId,
                            size: product?.size,
                            product_partial_total_payment:
                              product?.product_partial_payment_amount *
                              (product?.quantity + 1),
                          })
                        );
                      }}
                      type="button"
                      className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2]  border border-gray-200"
                    >
                      <HiOutlinePlus className="text-gray-700" />
                    </button>
                  </div>
                </div>
                <p className="flex justify-end  text-xs sm:text-sm">
                  Sub Total: {product?.quantity * product?.price}
                </p>
                {product?.product_partial_payment &&
                  product?.product_partial_payment == true && (
                    <p className="py-1 flex justify-end  text-xs sm:text-sm">
                      Total Partial Pay:{" "}
                      {product?.product_partial_total_payment}
                    </p>
                  )}
              </div>
            </div>
          </dir>
        </div>
      ))}
    </div>
  );
}
