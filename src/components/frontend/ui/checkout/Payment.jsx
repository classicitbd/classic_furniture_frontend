import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOrderMutation } from "../../../../redux/feature/payment/paymentApi";
import MiniSpinner from "../../../../shared/loader/MiniSpinner";
import { toast } from "react-toastify";
import { cartKey } from "../../../../constants/cartKey";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../shared/loader/Loader";

const Payment = ({ userData }) => {
  const navigate = useNavigate();
  const [parLoading, setParLoading] = useState(false)
  const [codLoading, setCodLoading] = useState(false)
  const cart = useSelector((state) => state.furnitureCart.products);
  // const subTotal = useSelector((state) => state.furnitureCart.subtotal);
  // const totalQuantity = useSelector((state) => state.furnitureCart.quantity);
  // const delivery_charge = useSelector(
  //   (state) => state.furnitureCart.delivery_charge
  // );
  const deliveryType = useSelector((state) => state.furnitureCart.deliveryType);
  // const deliveryTime = useSelector((state) => state.furnitureCart.delivery_time);

  const [partialPayProducts, setPartialPayProducts] = useState([]);
  const [codProducts, setCodProducts] = useState([]);

  const {
    data: user = [],
    isLoading: getDataLoading,
  } = useQuery({
    queryKey: [`/api/v1/getMe/${userData?.user_phone}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/getMe/${userData?.user_phone}`);
      const data = await res.json();
      return data.data;
    },
  });

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

  const calculateSubtotal = (products) => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const calculatePartialSubtotal = (products) => {
    return products.reduce((total, product) => {
      return total + product?.product_partial_total_payment;
    }, 0);
  };

  const [order] = useOrderMutation();

  const handlePartialPayment = async () => {
    if (!deliveryType) {
      toast.error("Please select delivery type")
      return;
    }
    setParLoading(true)
    const total_product_price = calculateSubtotal(partialPayProducts);
    const partial_pay_amount = calculatePartialSubtotal(partialPayProducts);
    const sendData = {
      customer_id: userData?._id,
      customer_phone: userData?.user_phone,
      customer_name: userData?.user_name,
      total_amount: parseInt(total_product_price),
      pay_amount: parseInt(0),
      partial_pay_amount: parseInt(partial_pay_amount),
      due_amount: parseInt(total_product_price),
      buying_type: "Partial Payment",
      payment_method: "partial",
      division: user?.user_division,
      district: user?.user_district,
      delivery_method: deliveryType,
      order_products: partialPayProducts,
    }
    const res = await order(sendData);

    if (res?.data?.statusCode == 200 && res?.data?.success == true) {
      if (res?.data?.data?.GatewayPageURL) {
        localStorage.removeItem(cartKey);
        window.location.replace(res?.data?.data?.GatewayPageURL);
      }
    } else {
      setParLoading(false);
      toast.error(res?.error?.data?.message);
    }
  }

  const handleCODPayment = async () => {
    if (!deliveryType) {
      toast.error("Please select delivery type")
      return;
    }
    setCodLoading(true)
    const total_product_price = calculateSubtotal(codProducts);
    const sendData = {
      customer_id: userData?._id,
      customer_phone: userData?.user_phone,
      customer_name: userData?.user_name,
      total_amount: parseInt(total_product_price),
      pay_amount: parseInt(0),
      partial_pay_amount: 0,
      due_amount: total_product_price,
      buying_type: "Cash On Delivery",
      payment_method: "cod",
      division: user?.user_division,
      district: user?.user_district,
      delivery_method: deliveryType,
      order_products: codProducts,
    }
    const res = await order(sendData);

    if (res?.data?.statusCode == 200 && res?.data?.success == true) {
      navigate(`/order-success/cash-on-delivery`);
      localStorage.removeItem(cartKey);
      window.location.reload();
    } else {
      setCodLoading(false);
      toast.error(res?.error?.data?.message);
    }
  }

  if (getDataLoading) {
    return <Loader />;
  }

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
              <dir className="flex flex-col md:px-0 space-y-2 m-3 items-end">
                {/* quantity */}

                <p className="font-semibold text-sm text-gray-800">
                  Quantity: {product?.quantity}
                </p>

                <p>Sub Total: {product?.quantity * product?.price} ৳</p>
                {product?.product_partial_payment &&
                  product?.product_partial_payment == true && (
                    <p className="py-1 flex justify-end">
                      Total Partial Pay: {product?.product_partial_total_payment}
                    </p>
                  )}
              </dir>
            </div>
          ))}

          <p className="flex justify-end items-center mb-2 font-semibold">Total Amount: {calculateSubtotal(partialPayProducts)}</p>
          <p className="flex justify-end items-center mb-2 font-semibold">Partial Pay Amount: {calculatePartialSubtotal(partialPayProducts)}</p>
          {/* <p className="flex justify-end items-center mb-2 font-semibold">Delivery Charge: {delivery_charge}</p> */}
          {/* <p className="flex justify-end items-center mb-2 font-semibold">Total Amount: {calculatePartialSubtotal(partialPayProducts) + delivery_charge}</p> */}
          <p className="flex justify-end items-center mb-2 font-semibold">Due Amount: {calculateSubtotal(partialPayProducts) - calculatePartialSubtotal(partialPayProducts)}</p>

          <div className="flex justify-end flex-wrap gap-4 items-center">
            <p className="text-error-300 font-semibold text-[12px]">
              *Note: If you want to buy only this products in partial payment{" "}
            </p>
            {
              parLoading ?
                <button className="btn text-white font-semibold  hover:bg-primaryLightColor/75 hover:scale-105 bg-primaryLightColor rounded px-2.5 py-1.5 duration-300">
                  <MiniSpinner />
                </button>
                :
                <button onClick={() => handlePartialPayment()} className="btn text-white font-semibold  hover:bg-primaryLightColor/75 hover:scale-105 bg-primaryLightColor rounded px-2.5 py-1.5 duration-300">
                  Payment
                </button>
            }
          </div>
        </>
      )}
      {codProducts?.length > 0 && (
        <>
          <p className="sm:text-xl font-semibold pt-3 pb-4   ">
            Cash On Delivery Payment
          </p>

          {codProducts?.map((product, index) => (
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
              <dir className="flex flex-col md:px-0 space-y-2 m-3 items-end">
                {/* quantity */}

                <p className="font-semibold text-sm text-gray-800">
                  Quantity: {product?.quantity}
                </p>

                <p>Sub Total: {product?.quantity * product?.price} ৳</p>
              </dir>
            </div>
          ))}

          <p className="flex justify-end items-center mb-2 font-semibold">Total Amount: {calculateSubtotal(codProducts)}</p>
          {/* <p className="flex justify-end items-center mb-2 font-semibold">Delivery Charge: {delivery_charge}</p>
          <p className="flex justify-end items-center mb-2 font-semibold">Total Amount: {calculateSubtotal(codProducts) + delivery_charge}</p> */}

          <div className="flex justify-end flex-wrap gap-4 items-center">
            <p className="text-error-300 font-semibold text-[12px]">
              *Note: If you want to buy only this products in COD payment{" "}
            </p>
            {
              codLoading ?
                <button className="btn text-white font-semibold  hover:bg-primaryLightColor/75 hover:scale-105 bg-primaryLightColor rounded px-2.5 py-1.5 duration-300">
                  <MiniSpinner />
                </button>
                :
                <button onClick={() => handleCODPayment()} className="btn text-white font-semibold  hover:bg-primaryLightColor/75 hover:scale-105 bg-primaryLightColor rounded px-2.5 py-1.5 duration-300">
                  Order Now
                </button>
            }
          </div>
        </>
      )}

      {/* <div className="w-full flex justify-center items-center gap-4 mt-10 mb-4">
        <button className="btn text-white font-semibold  hover:bg-primaryLightColor/75 hover:scale-105 bg-primaryLightColor rounded px-2.5 py-1.5 duration-300">
          Payment All
        </button>
      </div> */}
    </div>
  );
};

export default Payment;
