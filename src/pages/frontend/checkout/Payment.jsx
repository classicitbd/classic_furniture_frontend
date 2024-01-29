// import react icons
import { useState } from "react";
import { useSelector } from "react-redux";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { useOrderMutation } from "../../../redux/feature/payment/paymentApi";
import { toast } from "react-toastify";
import { cartKey } from "../../../constants/cartKey";
import { useNavigate } from "react-router-dom";

const Payment = ({ user, subTotal, district, division, addressUpdate }) => {
  const [payBy, setPayBy] = useState("");
  const [loading, setLoading] = useState(false);
  const carts = useSelector((state) => state.cart.products);
  const [order, { isLoading, isError }] = useOrderMutation();
  const shippingCharge = useSelector((state) => state.cart.shippingCharge);
  const shippingType = useSelector((state) => state.cart.shippingType);
  const navigate = useNavigate();

  const deliveryCharge = parseInt(shippingCharge);
  const total = subTotal + deliveryCharge;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let data;
      if (!user) {
        return toast.error("Must be provide your Information !");
      }

      if (carts.length <= 0) {
        return toast.error("Please add to cart before buy !");
      }

      if (!payBy) {
        return toast.error("select your payment method !");
      }

      if (shippingType === "select") {
        return toast.error("Select your delivery Point !");
      }

      if (user && user?.address) {
        data = {
          name: user?.name,
          phone: user?.phone,
          address: user?.address,
          payment_type: payBy,
          order: carts,
          price: total,
          shipping_price: shippingCharge,
          shipping_type: shippingType,
          district,
          division,
        };
      }
      const res = await order(data);

      if (res?.data?.statusCode == 200 && res?.data?.success == true) {
        if (res?.data?.data?.GatewayPageURL) {
          window.location.replace(res?.data?.data?.GatewayPageURL);
        } else {
          localStorage.removeItem(cartKey);
          toast.success(res?.data?.message);
          navigate(`/payment-success/cash-on-delivery`);
          window.location.reload();
        }
      } else {
        setLoading(false);
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (isLoading && isError) {
    return <p className="text-error-300">There is an error!</p>;
  }
  
  return (
    <div className="px-5 md:px-10">
      <div className="flex items-center gap-7">
        <p className="bg-black text-white h-8 w-8 rounded-full flex justify-center items-center font-bold">
          3
        </p>
        <h2 className="text-xl font-semibold tracking-normal leading-5">
          Payment
        </h2>
      </div>
      <p className="py-5 font-normal tracking-tight">BDT {total}.00</p>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <fieldset className="space-y-4">
          <legend className="sr-only">Delivery</legend>

          <div className="space-y-2 text-center">
            <div onClick={() => setPayBy("online")}>
              <input
                className="peer sr-only"
                id="online"
                type="radio"
                tabIndex="-1"
                name="payment"
              />

              <label
                htmlFor="online"
                className="w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-success-400 flex justify-between items-center"
                tabIndex="0"
              >
                <span className="text-sm"> Pay With SSL Commerz </span>
                <img
                  loading="lazy"
                  src={`/assets/images/payment-gateways.png`}
                  alt="ssl commerze"
                  className="h-[30px]"
                />
              </label>
            </div>

            <div onClick={() => setPayBy("cod")}>
              <input
                className="peer sr-only"
                id="cod"
                type="radio"
                tabIndex="-1"
                name="payment"
              />

              <label
                htmlFor="cod"
                className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-success-400 py-4"
                tabIndex="0"
              >
                <span className="text-sm"> Cash On Delivery </span>
              </label>
            </div>
          </div>
        </fieldset>

        <p className="text-xs mt-2">
          By making this purchase you agree to our
          <span className="text-blue-500"> terms and conditions.</span>
        </p>
        <button
          type="submit"
          disabled={!user || addressUpdate}
          className="block w-full text-center py-3 text-textColor bg-primaryColor hover:bg-opacity-70 rounded mt-4"
        >
          {loading || isLoading ? <MiniSpinner /> : "Place Order"}
        </button>
      </form>

      <p className="text-xs mt-5">
        I agree that placing the order places me under an obligation to make a
        payment in accordance with the General Terms and Conditions.
      </p>
    </div>
  );
};

export default Payment;
