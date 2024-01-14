/* eslint-disable react/prop-types */
// import react icons
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Payment = ({ email }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    data.email = email;
    console.log(data);
  };
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
      <p className="py-5 font-normal tracking-tight">BDT 10,000.00</p>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2 text-center">
          <div>
            <input
              className="peer sr-only"
              id="online"
              type="radio"
              tabIndex="-1"
              name="option"
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

          <div>
            <input
              className="peer sr-only"
              id="cod"
              type="radio"
              tabIndex="-1"
              name="option"
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
      </form>
      <p className="text-xs mt-2">
        By making this purchase you agree to our
        <span className="text-blue-500"> terms and conditions.</span>
      </p>
      <Link
        to={`/all`}
        className="block w-full text-center py-3 text-white bg-black hover:bg-opacity-70 rounded mt-4"
      >
        Place Order
      </Link>

      <p className="text-xs mt-5">
        I agree that placing the order places me under an obligation to make a
        payment in accordance with the General Terms and Conditions.
      </p>
    </div>
  );
};

export default Payment;
