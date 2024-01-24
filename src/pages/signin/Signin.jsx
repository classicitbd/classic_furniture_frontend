import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MiniSpinner from "../../shared/loader/MiniSpinner";
import { useSignInMutation } from "../../redux/feature/auth/authApi";
import { setCookie } from "../../utils/cookie-storage";
import { authKey } from "../../constants/storageKey";
import { AuthContext } from "../../context/AuthProvider";

const SignIn = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const location = useLocation();
  const form = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const handleSignIn = async (data) => {
    try {
      setLoading(true);
      const res = await signIn(data);
      if (res?.data?.success) {
        setCookie(authKey, res?.data?.data?.token);
        toast.success(res?.data?.message, {
          autoClose: 2000,
        });
        navigate(form, { replace: true });
        window.location.reload();
        reset();
      } else if (res.error.status == 400) {
        toast.error(res?.error?.data?.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("sign-in error: ", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(user);
  return (
    <div className="flex justify-center items-center min-h-screen py-10 bg-gray-100">
      <div className="w-full mx-3 md:w-[400px] px-3 md:px-10 pt-5 pb-14 border rounded bg-slate-100 shadow-md">
        <h2 className="text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2">
          Login
        </h2>

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
          <div className="text-[14px] flex justify-between">
            {/* <p className="text-[14px] mt-4"></p> */}
            <Link to="/sign-up" className="text-primaryColor">
              Create account?
            </Link>
            <Link
              to={"/forget-password"}
              className="text-primaryColor underline cursor-pointer"
            >
              Forget Password
            </Link>
          </div>
          <button
            className="px-10 py-2 text-textColor bg-primaryColor w-full opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out rounded-full"
            type="submit"
          >
            {loading || isLoading ? <MiniSpinner /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
