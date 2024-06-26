import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import MiniSpinner from "../../shared/loader/MiniSpinner";
import { useSetPasswordMutation } from "../../redux/feature/auth/authApi";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../utils/local-storage";

const NewPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [setPassword, { isLoading }] = useSetPasswordMutation();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleInputChange = (index, value) => {
    const newOTPinput = [...OTPinput];
    newOTPinput[index] = value;
    setOTPinput(newOTPinput);

    // Automatically move to the next input field if the current field is not the last one
    if (index < newOTPinput.length - 1 && value !== "") {
      document.getElementById(`otpInput-${index + 1}`).focus();
    }
  };

  const handleInputKeyDown = (index, e) => {
    // Move to the previous input field on backspace if the current field is empty
    if (e.key === "Backspace" && index > 0 && OTPinput[index] === "") {
      document.getElementById(`otpInput-${index - 1}`).focus();
    }
  };

  const handleSetPassword = async (data) => {
    try {
      setLoading(true);
      const user_phone = getFromLocalStorage("reset-phone");
      const user_otp = OTPinput.join(""); // Make sure OTPinput is an array
      if (!user_otp) {
        toast.warn("Must provide OTP!");
        return;
      }

      const { user_password, confirm_password } = data;
      if (user_password !== confirm_password) {
        setError("Passwords do not match!");
        return;
      }

      delete data.confirm_password;
      data.user_otp = user_otp;
      data.user_phone = user_phone;
      // console.log(data);
      const res = await setPassword(data);
      console.log(res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setToLocalStorage("reset-phone", "");
        navigate(`/sign-in`);
        reset();
      } else if (res?.error?.status === 400) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error("reset-password error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <div className="w-full mx-3 md:w-96 px-3 md:px-10 pt-5 pb-14 border rounded bg-slate-100 shadow-md">
        <h2 className="text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(handleSetPassword)} className="space-y-4">
          <p className="label text-center border-b pb-2">
            <span className="label-text">Fill your reset OTP</span>
          </p>
          <div className="flex flex-row items-center justify-between mx-auto max-w-xs">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="w-12 md:w-16 h-12 md:h-16">
                <input
                  maxLength="1"
                  id={`otpInput-${index}`}
                  className="w-full h-full flex flex-col items-center justify-center text-center px-2 md:px-5 outline-none rounded-md border border-primaryColor text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-primaryColor"
                  type="text"
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleInputKeyDown(index, e)}
                ></input>
              </div>
            ))}
          </div>
          <div className="form-control w-full">
            <label htmlFor="user_password" className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              id="user_password"
              type={`${isChecked ? "text" : "password"}`}
              placeholder="* * * * *"
              className="border rounded px-3 p-2 w-full"
              {...register("user_password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 character",
                },
              })}
            />
            {errors.user_password && (
              <p className="text-red-600"> {errors.user_password.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <label htmlFor="confirm-password" className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              id="confirm-password"
              type={`${isChecked ? "text" : "password"}`}
              placeholder="* * * * *"
              className="border rounded px-3 p-2 w-full"
              {...register("confirm_password", {
                required: "Confirm Password is required",
              })}
            />
            {errors.confirm_password && (
              <p className="text-red-600"> {errors.confirm_password.message}</p>
            )}
            {error && <p className="text-red-600 mb-3">{error}</p>}
          </div>
          <div className="flex flex-row-reverse justify-end gap-2">
            <label htmlFor="show">Show Password</label>
            <input
              checked={isChecked}
              onChange={handleCheckboxChange}
              type="checkbox"
              name="show"
              id="show"
            />
          </div>
          <button
            className="px-10 py-2 text-textColor bg-primaryColor w-full rounded-full"
            type="submit"
          >
            {loading || isLoading ? <MiniSpinner /> : "Change Password"}
          </button>
        </form>
        <p className="text-[14px] mt-4">
          Already have a account?
          <Link to="/sign-in" className="text-primaryColor underline">
            Sign-in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NewPassword;
