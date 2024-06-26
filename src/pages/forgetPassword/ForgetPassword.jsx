import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MiniSpinner from "../../shared/loader/MiniSpinner";
import { useForgetPasswordMutation } from "../../redux/feature/auth/authApi";
import { setToLocalStorage } from "../../utils/local-storage";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const navigate = useNavigate();

  const handleForgetPassword = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await forgetPassword(data);
      if (res?.data?.success) {
        toast.success(res?.data?.message, {
          autoClose: 2000,
        });
        setToLocalStorage("reset-phone", res?.data?.data?.user_phone);
        navigate("/reset-password");
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
    <div className="flex justify-center items-center md:min-h-screen py-10">
      <div className="w-full mx-3 md:w-96 px-3 md:px-10 pt-5 pb-14 border rounded bg-slate-100 shadow-md">
        <h2 className="text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2">
          Reset Password
        </h2>

        <form
          onSubmit={handleSubmit(handleForgetPassword)}
          className="space-y-4"
        >
          <div className="form-control w-full max-w-xs">
            <label htmlFor="user_phone" className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              id="user_phone"
              type="text"
              maxLength={11}
              minLength={11}
              placeholder="Enter your phone number"
              className="border rounded px-3 p-2 w-full max-w-xs"
              {...register("user_phone", {
                required: "Phone Number is required",
              })}
            />
            {errors.phone && (
              <p className="text-red-600"> {errors.user_phone.message}</p>
            )}
          </div>
          <button
            className="px-10 py-2 text-textColor bg-primaryColor w-full rounded-full"
            type="submit"
          >
            {loading || isLoading ? <MiniSpinner /> : "Reset Password"}
          </button>
        </form>
        <p className="text-[14px] mt-4 text-center">
          <Link to="/sign-in" className="text-primaryColor">
            Back to Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
