/* eslint-disable react/prop-types */
// import react icons
import { useState } from "react";
import { useSelector } from "react-redux";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { useOrderMutation } from "../../../redux/feature/payment/paymentApi";
import { toast } from "react-toastify";
import { cartKey } from "../../../constants/cartKey";
import { useNavigate } from "react-router-dom";

const Payment = ({ total, user }) => {
  const [payBy, setPayBy] = useState("");
  const [loading, setLoading] = useState(false);
  const carts = useSelector((state) => state.cart.products);
  const [order, { isLoading, isError }] = useOrderMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let data = {};
      if (!payBy) {
        return toast.error("select your payment method");
      }
      if (user && user?.address) {
        data = {
          userInfo: user?._id,
          email: user?.email,
          name: user?.name,
          phone: user?.phone,
          payment_type: payBy,
          order: carts,
          price: total,
          address: user?.address,
          city: user?.city,
          zip_code: user?.zip_code,
          country: user?.country,
          shipping_price: 60,
        };
      }
      const res = await order(data);
      if (res?.data?.statusCode == 200 && res?.data?.success == true) {
        setLoading(false);
        if (res?.data?.data?.GatewayPageURL) {
          window.location.replace(res?.data?.data?.GatewayPageURL);
        } else {
          localStorage.removeItem(cartKey);
          toast.success(res?.data?.message);
          navigate(`/payment-success/${res?.data?.transactionId}`);
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
    <div className="px-10">
      <div className="flex items-center gap-7">
        <p className="bg-black text-white h-8 w-8 rounded-full flex justify-center items-center font-bold">
          3
        </p>
        <h2 className="text-xl font-semibold tracking-normal leading-5">
          Payment
        </h2>
      </div>
      <p className="py-5 font-normal tracking-tight">BDT {total}</p>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2 text-center">
          <div onClick={() => setPayBy("online")}>
            <input
              className="peer sr-only"
              id="online"
              type="radio"
              tabIndex="-1"
              name="online"
            />

            <label
              htmlFor="online"
              className="w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-success-400 flex justify-between items-center"
              tabIndex="0"
            >
              <span className="text-sm"> Pay With SSL Commerz </span>
              <img
                src={`/assets/images/payment-gateways.png`}
                alt=""
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
              name="cod"
            />

            <label
              htmlFor="cod"
              className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-success-400"
              tabIndex="0"
            >
              <span className="text-sm"> Cash On Delivery </span>
            </label>
          </div>
        </div>
        <p className="text-xs mt-2">
          By making this purchase you agree to our
          <span className="text-blue-500"> terms and conditions.</span>
        </p>
        <button
          type="submit"
          className="block w-full text-center py-3 text-white bg-black hover:bg-opacity-70 rounded mt-4"
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
