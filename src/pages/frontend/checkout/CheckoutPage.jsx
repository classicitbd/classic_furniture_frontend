// import react icons
import { CiTrash } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

import { productData } from "../../../data/product-data";
import { getUserInfo } from "../../../service/Auth.service";
import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";
import Recipient from "./Recipient";
import { useState } from "react";
import Payment from "./Payment";

const CheckoutPage = () => {
  const [addressUpdate, setAddressUpdate] = useState(false);
  const { email } = getUserInfo();
  return (
    <div className="container py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <section className="overflow-y-auto space-y-5">
          <div className="bg-white py-[40px] px-[12px] rounded-lg shadow-md">
            <UserInfo email={email} />
          </div>
          <div className="bg-white py-[40px] px-[12px] rounded-lg shadow-md">
            <Recipient
              email={email}
              addressUpdate={addressUpdate}
              setAddressUpdate={setAddressUpdate}
            />
          </div>
          <div className="bg-white py-[40px] px-[12px] rounded-lg shadow-md">
            <Payment />
          </div>
        </section>
        <section className="bg-white px-10 p-5 w-3/4 mx-auto rounded sticky">
          <h2 className="text-center mb-10 tracking-normal leading-5 text-lg font-medium">
            Order Summary
          </h2>
          <div className="space-y-2 border-t pt-3">
            {productData.map((product) => (
              <div
                className="flex items-center gap-2 border-b pb-3"
                key={product?.id}
              >
                <div className="w-[70px] h-[70px] border rounded mr-3">
                  <img
                    src={product?.thumbnail}
                    alt={product?.title}
                    className="object-fill rounded"
                  />
                </div>
                <div className="flex flex-col flex-1 space-y-2">
                  <h2 className="text-sm tracking-tight leading-5">
                    {product?.title}
                  </h2>
                  <p className="flex gap-2 items-center">
                    <span className="text-sm tracking-tight leading-5">
                      {product?.color}
                    </span>
                    <span className="text-sm tracking-tight leading-5">
                      {product?.size}
                    </span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm">BDT {product?.price}.00</p>
                  <div
                    className={`flex items-center justify-center border rounded-md px-2`}
                  >
                    <button className="text-error-200 px-1 py-1 border rounded hover:bg-bgray-300 hidden">
                      <CiTrash />
                    </button>

                    <button className="text-bgray-700 px-1 py-1 border rounded hover:bg-bgray-300">
                      <FiMinus />
                    </button>
                    <span className="px-2 py-1">1</span>
                    <button className="text-bgray-700 px-1 py-1 border rounded hover:bg-bgray-300">
                      <GoPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            to={`/all`}
            className="block w-full text-center py-3 text-white bg-black hover:bg-opacity-70 rounded mt-4"
          >
            Shop More
          </Link>
          <div className="overflow-x-auto mt-5">
            <table className="min-w-1/2 ml-auto divide-y-2 divide-gray-200 bg-white text-sm">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py- font-medium text-gray-900">
                    Sub-Total
                  </td>
                  <td className="whitespace-nowrap px-4 py- text-gray-700">
                    BDT
                  </td>
                  <td className="whitespace-nowrap px-4 py- text-gray-700">
                    ৳120,000
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py- font-medium text-gray-900 uppercase">
                    Vat 5%
                  </td>

                  <td className="whitespace-nowrap px-4 py- text-gray-700">
                    BDT
                  </td>
                  <td className="whitespace-nowrap px-4 py- text-gray-700">
                    ৳100,000
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py- font-medium text-gray-900">
                    Delivery Charge
                  </td>

                  <td className="whitespace-nowrap px-4 py- text-gray-700">
                    BDT
                  </td>
                  <td className="whitespace-nowrap px-4 py- text-gray-700">
                    ৳20,000
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-4 py- font-medium text-gray-900">
                    Total
                  </td>

                  <td className="whitespace-nowrap px-4 py- text-gray-700 font-medium">
                    BDT
                  </td>
                  <td className="whitespace-nowrap px-4 py- text-gray-700 font-medium">
                    ৳20,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-sm">
            <span className="text-error-300">*</span> Add more items to reduce
            delivery charge
          </p>
        </section>
      </div>
    </div>
  );
};

export default CheckoutPage;
