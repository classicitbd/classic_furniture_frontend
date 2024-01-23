import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignInMutation } from "../../../redux/feature/auth/authApi";
import { setCookie } from "../../../utils/cookie-storage";
import { authKey } from "../../../constants/storageKey";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const CheckoutLogin = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const handleSignIn = async (data) => {
    try {
      setLoading(true);
      const trimmedPhoneNumber = data.phone.trim();
      const bdPhoneNumberRegex = /^01[3-9]\d{8}$/;

      if (bdPhoneNumberRegex.test(trimmedPhoneNumber)) {
        // toast.info(`Valid phone number: ${trimmedPhoneNumber}`);
      } else {
        return toast.error("Invalid phone number.");
      }

      const res = await signIn(data);
      if (res?.data?.success) {
        setCookie(authKey, res?.data?.data?.token);
        navigate("/checkout?user=info");
        toast.success(res?.data?.message, {
          autoClose: 2000,
        });
        reset();
        window.location.reload();
      } else if (res.error.status == 400) {
        toast.error(res?.error?.data?.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("sign-in error: ", error);
    } finally {
      setLoading(false);
      //   window.location.reload();
    }
  };

  return (
    <div className="pt-5 pb-7">
      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        <div className="form-control w-full">
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
            <p className="text-red-600"> {errors?.phone?.message}</p>
          )}
        </div>
        <div className="form-control w-full">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            id="password"
            type="password"
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
        <div className="text-[14px] flex">
          <Link
            to={"/checkout?user=forgot-password"}
            className="text-primaryColor underline cursor-pointer"
          >
            Forget Password
          </Link>
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

export default CheckoutLogin;
