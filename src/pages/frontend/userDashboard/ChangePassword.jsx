import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../../../redux/feature/auth/authApi";
import { toast } from "react-toastify";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { Link } from "react-router-dom";

const ChangePassword = ({ user, setActive }) => {
  const [loading, setLoading] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {}, [user]);
  // console.log(user);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.user_phone = user?.user_phone;
      const res = await changePassword(data);

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        reset();
        setActive("profile");
      } else if (res?.error?.status === 400) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white p-10">
        <h2 className="text-[20px] font-medium mb-4">Change Password</h2>

        <div className="w-full">
          <label htmlFor="current_password" className="label">
            <span className="label-text">Current Password</span>
          </label>
          <input
            id="current_password"
            type="password"
            placeholder="*****"
            className="border rounded px-3 py-2 w-full"
            {...register("current_password", {
              required: "Current Password is required!",
            })}
          />
          {errors.current_password && (
            <p className="text-error-300">
              {errors?.current_password?.message}
            </p>
          )}
        </div>
        <div className="w-full mt-5">
          <label htmlFor="new_password" className="label">
            <span className="label-text">New Password</span>
          </label>
          <input
            id="new_password"
            type="password"
            placeholder="*****"
            className="border rounded px-3 py-2 w-full"
            {...register("new_password", {
              required: "New Password is required!",
              minLength: {
                value: 6,
                message: "Password must be 6 character",
              },
            })}
          />
          {errors.new_password && (
            <p className="text-error-300">{errors?.new_password?.message}</p>
          )}
        </div>
        <div className="flex  justify-end mt-5 flex-wrap gap-3">
          <Link
            to={"/forget-password"}
            className="text-primaryColor underline pt-2 cursor-pointer"
          >
            Forget Password
          </Link>
          <button
            type="submit"
            className="flex justify-end gap-1 text-[#fff] mb-5 bg-success-200 hover:bg-success-300 px-5 py-2 rounded-sm"
          >
            {!loading || !isLoading ? (
              <span>Change Password</span>
            ) : (
              <MiniSpinner />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
