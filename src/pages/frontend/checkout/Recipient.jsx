/* eslint-disable react/prop-types */
// import react icons
import { CiUser } from "react-icons/ci";
import { SlPhone } from "react-icons/sl";
import { AiOutlineMail } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { useForm } from "react-hook-form";

const Recipient = ({ email }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(email);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="px-10">
      <div className="flex items-center gap-7">
        <p className="bg-black text-white h-8 w-8 rounded-full flex justify-center items-center font-bold">
          2
        </p>
        <h2 className="text-xl font-semibold tracking-normal leading-5">
          Recipient
        </h2>
      </div>
      <div className="flex justify-between">
        <p className="py-5 font-semibold tracking-tight">Delivery Address</p>
        <button className="flex items-center gap-1 text-[#549AFC]">
          <GoPlus />
          <span>Add Address</span>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="border rounded px-3 p-1 w-full max-w-xs"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-600"> {errors.email.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Recipient;
