import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Payment = () => {
  const cart = useSelector((state) => state.furnitureCart.products);
  const subTotal = useSelector((state) => state.furnitureCart.subtotal);
  const totalQuantity = useSelector((state) => state.furnitureCart.quantity);
  const delivery_charge = useSelector(
    (state) => state.furnitureCart.delivery_charge
  );
  const deliveryType = useSelector((state) => state.furnitureCart.deliveryType);

  const [partialPayProducts, setPartialPayProducts] = useState([]);
  const [codProducts, setCodProducts] = useState([]);

  useEffect(() => {
    const partialPayAllProducts = cart?.filter(
      (product) => product?.product_partial_payment === true
    );
    setPartialPayProducts(partialPayAllProducts);
    const codAllProducts = cart?.filter(
      (product) => product?.product_partial_payment === false
    );
    setCodProducts(codAllProducts);
  }, [cart]);

  console.log(partialPayProducts);
  console.log(codProducts);

  return (
    <div className=" bg-white border shadow rounded-lg  p-4 lg:p-8">
      {partialPayProducts.length > 0 && (
        <>
          <p className="sm:text-xl font-semibold pt-3 pb-4   ">
            Partial Payment
          </p>

          {partialPayProducts.map((product, index) => (
            <div
              className="border rounded mb-6 flex justify-between "
              key={index}
            >
              <div className="flex  flex-col sm:flex-row md:px-0 px-4  gap-4">
                <img
                  className="md:w-36 md:h-36 w-20 h-20  rounded-l"
                  src={product?.product_thumbnail}
                  alt=""
                />
                <div className="py-1 md:px-4 space-y-[2px] ">
                  <p className="md:text-xl text-sm font-semibold text-gray-600 ">
                    {product?.product_name}
                  </p>
                  <p className="">Color: {product?.color}</p>
                  <p className="">Price: {product?.price}</p>
                  {product?.size && <p className="">Size: {product?.size}</p>}
                  {product?.product_partial_payment &&
                    product?.product_partial_payment == true && (
                      <p className="">
                        Partial Payment:{" "}
                        {product?.product_partial_payment_amount}
                      </p>
                    )}
                </div>
              </div>
              <dir className="flex flex-col md:px-0 space-y-2 m-3 ">
                {/* quantity */}

                <p className="font-semibold text-sm text-gray-800">
                  Quantity: {product?.quantity}
                </p>

                <p>Sub Total: {product?.quantity * product?.price} ৳</p>
              </dir>
            </div>
          ))}

          <div className="flex justify-end flex-wrap gap-4 items-center">
            <p className="text-error-300 font-semibold text-[12px]">
              *Note: If you want to buy only this products in partial payment{" "}
            </p>
            <button className="btn text-white font-semibold  hover:bg-primaryLightColor/75 hover:scale-105 bg-primaryLightColor rounded px-2.5 py-1.5 duration-300">
              Payment
            </button>
          </div>
        </>
      )}
      {codProducts.length > 0 && (
        <>
          <p className="sm:text-xl font-semibold pt-3 pb-4   ">
            Partial Payment
          </p>

          {codProducts.map((product, index) => (
            <div
              className="border rounded mb-6 flex justify-between "
              key={index}
            >
              <div className="flex  flex-col sm:flex-row md:px-0 px-4  gap-4">
                <img
                  className="md:w-36 md:h-36 w-20 h-20  rounded-l"
                  src={product?.product_thumbnail}
                  alt=""
                />
                <div className="py-1 md:px-4 space-y-[2px] ">
                  <p className="md:text-xl text-sm font-semibold text-gray-600 ">
                    {product?.product_name}
                  </p>
                  <p className="">Color: {product?.color}</p>
                  <p className="">Price: {product?.price}</p>
                  {product?.size && <p className="">Size: {product?.size}</p>}
                  {product?.product_partial_payment &&
                    product?.product_partial_payment == true && (
                      <p className="">
                        Partial Payment:{" "}
                        {product?.product_partial_payment_amount}
                      </p>
                    )}
                </div>
              </div>
              <dir className="flex flex-col md:px-0 space-y-2 m-3 ">
                {/* quantity */}

                <p className="font-semibold text-sm text-gray-800">
                  Quantity: {product?.quantity}
                </p>

                <p>Sub Total: {product?.quantity * product?.price} ৳</p>
              </dir>
            </div>
          ))}

          <div className="flex justify-end flex-wrap gap-4 items-center">
            <p className="text-error-300 font-semibold text-[12px]">
              *Note: If you want to buy only this products in COD payment{" "}
            </p>
            <button className="btn text-white font-semibold  hover:bg-primaryLightColor/75 hover:scale-105 bg-primaryLightColor rounded px-2.5 py-1.5 duration-300">
              Order Now
            </button>
          </div>
        </>
      )}

      <div className="w-full flex justify-center items-center gap-4 mt-10 mb-4">
        <button className="btn text-white font-semibold  hover:bg-primaryLightColor/75 hover:scale-105 bg-primaryLightColor rounded px-2.5 py-1.5 duration-300">
          Payment All
        </button>
      </div>
    </div>
  );
};

export default Payment;
