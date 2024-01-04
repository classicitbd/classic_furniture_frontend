import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PhoneInput, { isValidPhoneNumber } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [phone, setPhone] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSignUp = async (data) => {
    if (!isValidPhoneNumber(phone)) {
      // Handle the case when the phone number is not valid
      console.error("Invalid phone number");
      return;
    }
    data.phone = phone;
    console.log(data);
    // try {
    //   setLoading(true);
    //   const res = userSignup(data);
    //   console.log(res.data.statusCode);
    //   if (res?.data?.data?.success) {
    //     toast.success(res?.data?.data?.message);
    //     reset();
    //     navigate("/sign-in");
    //   } else if (res.data.statusCode === 500) {
    //     toast.error("Already this email existed");
    //   }
    // } catch (error) {
    //   console.error("Signup Error: ", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10 bg-gray-100">
      <div className="w-full mx-3 md:w-96 px-3 md:px-10 pt-5 pb-14 border rounded bg-slate-100 shadow-md">
        <h2 className="text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2">
          Create a New Account
        </h2>
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div className="w-full max-w-xs">
            <label htmlFor="username" className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="username"
              className="border rounded px-3 p-1 w-full max-w-xs"
              {...register("userName", { required: "Name is required" })}
            />
            {errors.userName && (
              <p className="text-red-600"> {errors.userName.message}</p>
            )}
          </div>
          <div className="w-full max-w-xs">
            <label htmlFor="phone" className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <PhoneInput
              country={"bd"}
              inputProps={{
                name: "phone",
                autoFocus: true,
              }}
              disableDropdown={true}
              onChange={(value) => setPhone(value)}
              isValid={(value, country) => {
                if (value.match(/12345/)) {
                  return "Invalid value: " + value + ", " + country.name;
                } else if (value.match(/1234/)) {
                  return false;
                } else {
                  return true;
                }
              }}
            />
          </div>
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
          <div className="form-control w-full max-w-xs">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="* * * * *"
              className="border rounded px-3 p-1 w-full max-w-xs"
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
          <div className="form-control w-full max-w-xs">
            <label htmlFor="confirm-password" className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              id="confirm-password"
              type={`${isChecked ? "text" : "password "}`}
              placeholder="* * * * *"
              className="border rounded px-3 p-1 w-full max-w-xs"
              {...register("confirm_password", {
                required: "Confirm Password is required",
              })}
            />
            {errors.confirm_password && (
              <p className="text-red-600"> {errors.confirm_password.message}</p>
            )}
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
            className="px-10 py-2 text-white bg-green-500 w-full rounded-full"
            type="submit"
          >
            Signup
          </button>
        </form>
        <p className="text-[14px] mt-4">
          Already have a account?
          <Link to="/sign-in" className="text-secondary">
            Sign-in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
