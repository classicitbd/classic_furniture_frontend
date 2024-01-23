import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignUpMutation } from "../../../redux/feature/auth/authApi";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const CheckoutSignup = () => {
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
  const [signUp, { isLoading }] = useSignUpMutation();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSignUp = async (data) => {
    try {
      setLoading(true);
      const { password, confirm_password } = data;
      if (password !== confirm_password) {
        setError("Does not match password!");
        return;
      }
      delete data.confirm_password;
      const res = await signUp(data);
      if (res?.data?.success) {
        toast.info(res?.data?.message, {
          autoClose: 2000,
        });
        navigate(`/checkout?phone=${res?.data?.data?.phone}`);
        reset();
      }
    } catch (error) {
      console.error("sign-up error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-5 pb-7">
      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
        <div className="flex gap-5">
          <div className="w-full">
            <label htmlFor="name" className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="border rounded px-3 py-2 w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-600"> {errors.name.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="phone" className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              className="border rounded px-3 py-2 w-full"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-red-600"> {errors.phone.message}</p>
            )}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-full">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type={`${isChecked ? "text" : "password"}`}
              placeholder="* * * * *"
              className="border rounded px-3 py-2 w-full"
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
              className="border rounded px-3 py-2 w-full"
              {...register("confirm_password", {
                required: "Confirm Password is required",
              })}
            />
            {errors.confirm_password && (
              <p className="text-red-600"> {errors.confirm_password.message}</p>
            )}
            {error && <p className="text-red-600 mb-3">{error}</p>}
          </div>
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
            className="px-10 py-2 w-[120px] text-textColor bg-primaryColor opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out rounded-full"
            type="submit"
          >
            {loading || isLoading ? <MiniSpinner /> : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutSignup;
