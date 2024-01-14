/* eslint-disable react/prop-types */
// import react icons
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

const Payment = ({ email }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
              id="option1"
              type="radio"
              tabIndex="-1"
              name="option"
            />

            <label
              htmlFor="option1"
              className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
              tabIndex="0"
            >
              <span className="text-sm"> Option 1 </span>
            </label>
          </div>

          <div>
            <input
              className="peer sr-only"
              id="option2"
              type="radio"
              tabIndex="-1"
              name="option"
            />

            <label
              htmlFor="option2"
              className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
              tabIndex="0"
            >
              <span className="text-sm"> Option 2 </span>
            </label>
          </div>

          <div>
            <input
              className="peer sr-only"
              id="option3"
              type="radio"
              tabIndex="-1"
              name="option"
            />

            <label
              htmlFor="option3"
              className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
              tabIndex="0"
            >
              <span className="text-sm"> Option 3 </span>
            </label>
          </div>
        </div>
      </form>
      <p className="text-xs">
        By making this purchase you agree to our
        <span className="text-blue-500"> terms and conditions.</span>
      </p>
      <Link
        to={`/all`}
        className="block w-full text-center py-3 text-white bg-black hover:bg-opacity-70 rounded mt-4"
      >
        Shop More
      </Link>
    </div>
  );
};

export default Payment;
