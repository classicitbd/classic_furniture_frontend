import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MiniSpinner from "../../shared/loader/MiniSpinner";
import { useSignUpMutation } from "../../redux/feature/auth/authApi";

const SignUp = () => {
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
      const { user_password, confirm_password } = data;
      if (user_password !== confirm_password) {
        setError("Does not match password!");
        return;
      }
      delete data?.confirm_password;
      const res = await signUp(data);
      if (res?.data?.success) {
        toast.info(res?.data?.message, {
          autoClose: 2000,
        });
        navigate(`/verify-user?phone=${res?.data?.data?.user_phone}`);
        reset();
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error("sign-up error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <div className="w-full mx-3 md:w-[400px] px-3 md:px-10 pt-5 pb-14 border rounded bg-slate-100 shadow-md">
        <h2 className="text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2">
          Create a New Account
        </h2>

        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div className="w-full">
            <label htmlFor="user_name" className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              id="user_name"
              type="text"
              placeholder="Enter your name"
              className="border rounded px-3 py-2 w-full"
              {...register("user_name", { required: "Name is required" })}
            />
            {errors.user_name && (
              <p className="text-red-600"> {errors.user_name.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="user_phone" className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              id="user_phone"
              type="number"
              placeholder="Enter your phone number"
              className="border rounded px-3 py-2 w-full"
              {...register("user_phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{11}$/,
                  message: "Phone number must be 11 digits long",
                },
              })}
            />
            {errors.user_phone && (
              <p className="text-red-600"> {errors.user_phone?.message}</p>
            )}
          </div>
          {/* <div className="w-full">
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              className="border rounded px-3 py-2 w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-600"> {errors.email.message}</p>
            )}
          </div> */}
          <div className="w-full">
            <label htmlFor="user_password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="user_password"
              type={`${isChecked ? "text" : "password"}`}
              placeholder="* * * * *"
              className="border rounded px-3 py-2 w-full"
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
            {loading || isLoading ? <MiniSpinner /> : "SignUp"}
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

export default SignUp;
