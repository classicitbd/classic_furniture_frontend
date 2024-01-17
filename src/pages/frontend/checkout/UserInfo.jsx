/* eslint-disable react/prop-types */
// import react icons
import { CiUser } from "react-icons/ci";
import { SlPhone } from "react-icons/sl";
import { AiOutlineMail } from "react-icons/ai";

const UserInfo = ({ user }) => {
  console.log(user);
  return (
    <div className="px-10">
      <div className="flex items-center gap-7">
        <p className="bg-black text-white h-8 w-8 rounded-full flex justify-center items-center font-bold">
          1
        </p>
        <h2 className="text-xl font-semibold tracking-normal leading-5">
          Account
        </h2>
      </div>
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
  );
};

export default UserInfo;
