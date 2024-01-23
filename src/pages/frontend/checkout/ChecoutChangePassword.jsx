import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { useSetPasswordMutation } from "../../../redux/feature/auth/authApi";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../../utils/local-storage";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const CheckoutChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  const handleSetPassword = async (data) => {
    try {
      setLoading(true);
      const phone = getFromLocalStorage("reset-phone");
      const { password, confirm_password } = data;
      if (password !== confirm_password) {
        setError("Does not match password!");
        return;
      }
      delete data.confirm_password;
      data.phone = phone;
      const res = await setPassword(data);
      if (res?.data?.success) {
        toast.info(res?.data?.message);
        setToLocalStorage("reset-phone", "");
        navigate(`/checkout?user=login`);
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
    <div className="flex justify-center items-center">
      <div className="w-full mx-3 px-3 md:px-10 pt-5">
        <h2 className="text-2xl text-gray-900 my-4 font-bold border-b pb-2">
          Change Password
        </h2>

        <form onSubmit={handleSubmit(handleSetPassword)} className="space-y-4">
          <div className="form-control w-full flex flex-col">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type={`${isChecked ? "text" : "password"}`}
              placeholder="* * * * *"
              className="border rounded px-3 p-1 w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 character",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600"> {errors.password.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="confirm-password" className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              id="confirm-password"
              type={`${isChecked ? "text" : "password"}`}
              placeholder="* * * * *"
              className="border rounded px-3 p-1 w-full"
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
          <div className="flex justify-end">
            <button
              className="px-5 py-2 w-[180px] text-textColor bg-primaryColor opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out rounded-full"
              type="submit"
            >
              {loading || isLoading ? <MiniSpinner /> : "Change Password"}
            </button>
          </div>
        </form>
        <p className="text-[14px] mt-4">
          <Link to="/checkout?user=login" className="text-primaryColor">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckoutChangePassword;
