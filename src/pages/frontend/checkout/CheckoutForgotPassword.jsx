import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgetPasswordMutation } from "../../../redux/feature/auth/authApi";
import { setToLocalStorage } from "../../../utils/local-storage";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const CheckoutForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleForgetPassword = async (data) => {
    try {
      setLoading(true);
      const res = await forgetPassword(data);
      if (res?.data?.success) {
        toast.success(res?.data?.message, {
          autoClose: 2000,
        });
        setToLocalStorage("reset-phone", data?.phone);
        navigate("/checkout?user=change-password");
        reset();
      } else if (res?.error?.status === 400) {
        toast.error(res?.error?.data?.message, {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("sign-in error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full mx-3 px-3 md:px-10 pt-5">
        <h2 className="text-2xl text-gray-900 my-4 font-bold border-b pb-2">
          Reset Password
        </h2>

        <form
          onSubmit={handleSubmit(handleForgetPassword)}
          className="space-y-4"
        >
          <div className="form-control w-full flex flex-col mb-10">
            <label htmlFor="phone" className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              className="border rounded px-3 p-3 w-full"
              {...register("phone", { required: "Phone Number is required" })}
            />
            {errors.phone && (
              <p className="text-red-600"> {errors.phone.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="px-5 py-2 w-[180px] text-textColor bg-primaryColor opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out rounded-full"
              type="submit"
            >
              {loading || isLoading ? <MiniSpinner /> : "Reset Password"}
            </button>
          </div>
        </form>
        <p className="text-[14px] mt-5">
          <Link to="/checkout?user=login" className="text-primaryColor">
            Back to Login in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckoutForgotPassword;
