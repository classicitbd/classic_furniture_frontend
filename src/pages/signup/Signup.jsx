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
        navigate(`/verify-user?phone=${res?.data?.data?.phone}`);
        reset();
      }
    } catch (error) {
      console.error("sign-up error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10 bg-gray-100">
      <div className="w-full mx-3 md:w-[400px] px-3 md:px-10 pt-5 pb-14 border rounded bg-slate-100 shadow-md">
        <h2 className="text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2">
          Create a New Account
        </h2>

        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
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
          {/* <div>
            <label htmlFor="phone" className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <PhoneInput
              country={"bd"}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              disableDropdown={true}
              onChange={(value) => setPhone(value)}
            />
            <p className="text-red-600"> {phoneError}</p>
          </div> */}
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
