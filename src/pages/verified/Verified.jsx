import { useLocation, useNavigate } from "react-router-dom";
import { getEmail } from "../../utils/get-email";
import MiniSpinner from "../../shared/loader/MiniSpinner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useOtpVerifyMutation, useResendOtpMutation } from "../../redux/feature/auth/authApi";

const Verified = () => {
  const [loading, setLoading] = useState(false);
  const path = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [otpVeriy, { isLoading }] = useOtpVerifyMutation();
  const [resendOtp,{isLoading: resendLoading}] = useResendOtpMutation();

  const email = getEmail(path?.search);
  const handleVerify = async (data) => {
    try {
      setLoading(true);
      data.email = email;
      const res = await otpVeriy(data);
      console.log(res);
      if (res?.data?.success) {
        toast.info(res?.data?.message);
        navigate(`/sign-in`);
        reset();
      }
    } catch (error) {
      console.error("otp verified error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const data = {
        email,
      };
      const res = await resendOtp(data);
      if (res?.data?.success) {
        toast.info(res?.data?.message);
      }
      console.log(res);
    } catch (error) {
      console.error("resend otp error", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen py-10 bg-gray-100">
      <div className="w-full mx-3 md:w-96 px-3 md:px-10 pt-5 pb-14 border rounded bg-slate-100 shadow-md">
        <h2 className="text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit(handleVerify)} className="space-y-4">
          <div className="w-full max-w-xs sr-only">
            <label htmlFor="email" className="label">
              <span className="label-text"></span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              disabled
              className="border rounded px-3 p-1 w-full max-w-xs"
              {...register("email")}
            />
          </div>
          <div className="w-full max-w-xs">
            <input
              id="otp"
              type="text"
              placeholder="Enter your OTP"
              className="border rounded px-3 p-1 w-full max-w-xs"
              {...register("otp", { required: "OTP must be provide" })}
            />
            {errors.otp && (
              <p className="text-red-600"> {errors.otp.message}</p>
            )}
          </div>
          <div className="text-[14px] flex justify-end">
            <p
              onClick={handleResend}
              className="text-secondary underline cursor-pointer"
            >
              {resendLoading ? "Resending OTP..." :"Resend-OTP"}
            </p>
          </div>

          <button
            className="px-10 py-2 text-white bg-green-500 w-full rounded-full"
            type="submit"
          >
            {loading || isLoading ? <MiniSpinner /> : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verified;
