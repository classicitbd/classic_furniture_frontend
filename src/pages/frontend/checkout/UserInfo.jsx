// import react icons
import { CiUser } from "react-icons/ci";
import { SlPhone } from "react-icons/sl";
import CheckoutLogin from "./CheckoutLogin";
import CheckoutSignup from "./CheckoutSignup";
import { Link, useLocation } from "react-router-dom";
import { getPhoneNumber, getUserQuery } from "../../../utils/get-email";
import CheckoutVerify from "./CheckoutVerify";
import CheckoutForgotPassword from "./CheckoutForgotPassword";
import CheckoutChangePassword from "./ChecoutChangePassword";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";

const UserInfo = ({ user }) => {
  const path = useLocation();
  const phone = getPhoneNumber(path?.search);
  const userData = getUserQuery(path?.search);

  const { data: informations = [] } = useQuery({
    queryKey: [`/api/v1/getMe/${user?.phone}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/getMe/${user?.phone}`);
      const data = await res.json();
      return data;
    },
    suspense: false,
  }); // get USER INFO

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
                    {informations?.data?.name}
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900 uppercase">
                    <SlPhone />
                  </td>

                  <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                    {informations?.data?.phone
                      ? informations?.data?.phone
                      : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!user && userData === "login" && (
        <div>
          <CheckoutLogin />
          <Link
            to={`/checkout?user=signup`}
            // onClick={() => setUserPosition("create-user")}
            className="text-primaryColor"
          >
            Create account?
          </Link>
        </div>
      )}

      {userData === "signup" && (
        <div>
          <CheckoutSignup />
          <Link
            to={`/checkout?user=login`}
            // onClick={() => setUserPosition("user-login")}
            className="text-primaryColor"
          >
            Login
          </Link>
        </div>
      )}

      {phone && (
        <div>
          <CheckoutVerify />
        </div>
      )}

      {userData === "forgot-password" && (
        <div>
          <CheckoutForgotPassword />
        </div>
      )}

      {userData === "change-password" && (
        <div>
          <CheckoutChangePassword />
        </div>
      )}
    </div>
  );
};

export default UserInfo;
