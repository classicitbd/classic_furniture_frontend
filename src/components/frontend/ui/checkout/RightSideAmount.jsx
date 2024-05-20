import { toast } from "react-toastify";
import { useOrderMutation } from "../../../../redux/feature/payment/paymentApi";
import { useState } from "react";
import MiniSpinner from "../../../../shared/loader/MiniSpinner";
import { useSelector } from "react-redux";
import { cartKey } from "../../../../constants/cartKey";

export default function RightSideAmount({
  subTotal,
  handleBack,
  handleContinue,
  settingData,
  delivery_charge,
  activeStep,
  deliveryType,
  // selectedDeliveryLocation,
  userData
}) {
  const cart = useSelector((state) => state.furnitureCart.products);
  const [loading, setLoading] = useState(false);

  const handleContinueCheck = () => {
    if (activeStep == 2) {
      if (!deliveryType) {
        toast.error("Please select delivery type")
        return;
      }
      if (!userData?.user_phone) {
        toast.error("Please Fill Up User Information")
        return;
      }
    }
    handleContinue()
  }

  const [order] = useOrderMutation();

  const calculateSubtotal = (products) => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const handlePaymentAll = async () => {
    setLoading(true)
    const total_product_price = calculateSubtotal(cart);
    const sendData = {
      customer_id: userData?._id,
      customer_phone: userData?.user_phone,
      customer_name: userData?.user_name,
      total_amount: total_product_price,
      pay_amount: total_product_price,
      due_amount: 0,
      buying_type: "Online Payment",
      payment_method: "online",
      division: userData?.user_division,
      district: userData?.user_district,
      delivery_method: deliveryType,
      order_products: cart,
    }
    const res = await order(sendData);

    if (res?.data?.statusCode == 200 && res?.data?.success == true) {
      if (res?.data?.data?.GatewayPageURL) {
        localStorage.removeItem(cartKey);
        window.location.replace(res?.data?.data?.GatewayPageURL);
      }
    } else {
      setLoading(false);
      toast.error(res?.error?.data?.message);
    }

  }

  return (
    <div className="w-full md:w-[32%] pt-16  ">
      <div className=" rounded-lg border shadow bg-white p-4">
        <div className="md:px-6   py-3 ">
          {/* <div className="pb-1.5 flex justify-between items-center">
            <p>Item total</p>
            <p>৳ {subTotal}</p>
          </div>
          <div className="flex justify-between py-2 items-center">
            {" "}
            <p>Delivery fee</p>
            <p>৳ {delivery_charge ? delivery_charge : 0}</p>
          </div>
          <hr /> */}
          <div className="flex justify-between py-2 items-center">
            {" "}
            <p>Grand total</p>
            <p>৳ {subTotal + delivery_charge}</p>
          </div>

          <hr />
          <div className="py-3 text-gray-500  flex justify-between items-center">
            <p className="text-[12px]">Delivery Time Inside Dhaka: ---</p>
            <p>{settingData[0]?.delivery_time_inside_dhaka} Days</p>
          </div>
          <div className="py-1 text-gray-500  flex justify-between items-center">
            <p className="text-[12px]">Delivery Time Outside Dhaka: ---</p>
            <p>{settingData[0]?.delivery_time_outside_dhaka} Days</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            {
              activeStep == 3 ?

                loading ?
                  <button
                    className="bg-primaryLightColor text-white px-4 py-2 w-full mt-4  rounded"
                  >
                    <MiniSpinner />
                  </button>
                  :
                  <button
                    className="bg-primaryLightColor text-white px-4 py-2 w-full mt-4  rounded"
                    onClick={() => handlePaymentAll()}
                  >
                    Payment All
                  </button>

                :
                <button
                  className="bg-primaryLightColor text-white px-4 py-2 w-full mt-4  rounded"
                  onClick={() => handleContinueCheck()}
                >
                  Continue
                </button>
            }
            <button
              className="bg-gray-400 text-white px-4 py-2 w-full mt-4  rounded"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
