/* eslint-disable react/prop-types */
// import react icons
import { CiUser } from "react-icons/ci";
import { SlPhone } from "react-icons/sl";
import { AiOutlineMail } from "react-icons/ai";

const UserInfo = ({ user }) => {
  return (
    <div className="px-10">
      <div className="flex items-center gap-7">
        <p className="bg-primaryColor text-textColor h-8 w-8 rounded-full flex justify-center items-center font-bold">
          1
        </p>
        <h2 className="text-xl font-semibold tracking-normal leading-5">
          Account
        </h2>
      </div>
      {user && (
        <div>
          <p className="py-5 font-semibold tracking-tight">My Details</p>
          <div>
            <table className="divide-y-2 divide-gray-200 bg-white text-sm">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900">
                    <CiUser />
                  </td>
                  <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                    {user?.name}
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900 uppercase">
                    <SlPhone />
                  </td>

                  <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                    {user?.phone ? user?.phone : "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900">
                    <AiOutlineMail />
                  </td>

                  <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                    {user?.email}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!user && (
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
      )}
    </div>
  );
};

export default UserInfo;
