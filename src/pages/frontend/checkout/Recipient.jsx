/* eslint-disable react/prop-types */
// import react icons
import { CiLocationOn } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { PiAddressBook } from "react-icons/pi";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUpdateUserMutation } from "../../../redux/feature/auth/authApi";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import { useDispatch, useSelector } from "react-redux";
import {
  setShippingCharge,
  setShippingType,
} from "../../../redux/feature/cart/cartSlice";

const options = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chittagong", label: "Chittagong" },
  { value: "khulna", label: "Khulna" },
  { value: "rajshahi", label: "Rajshahi" },
  { value: "barisal", label: "Barisal" },
  { value: "sylhet", label: "Sylhet" },
  { value: "rangpur", label: "Rangpur" },
  { value: "comilla", label: "Comilla" },
  { value: "narayanganj", label: "Narayanganj" },
  { value: "gazipur", label: "Gazipur" },
  { value: "mymensingh", label: "Mymensingh" },
  { value: "jessore", label: "Jessore" },
  { value: "bogura", label: "Bogura" },
  { value: "dinajpur", label: "Dinajpur" },
  { value: "coxsbazar", label: "Cox's Bazar" },
  { value: "tangail", label: "Tangail" },
  { value: "jamalpur", label: "Jamalpur" },
  { value: "pabna", label: "Pabna" },
  { value: "naogaon", label: "Naogaon" },
  { value: "feni", label: "Feni" },
  { value: "bhairab", label: "Bhairab" },
  { value: "manikganj", label: "Manikganj" },
  { value: "lakshmipur", label: "Lakshmipur" },
  { value: "bandarban", label: "Bandarban" },
  { value: "hajiganj", label: "Hajiganj" },
  { value: "sreemangal", label: "Sreemangal" },
  { value: "kishoreganj", label: "Kishoreganj" },
  { value: "habiganj", label: "Habiganj" },
  { value: "ishurdi", label: "Ishurdi" },
  { value: "narail", label: "Narail" },
  { value: "faridpur", label: "Faridpur" },
  { value: "lalmohon", label: "Lalmohon" },
  { value: "bhairab bazar", label: "Bhairab Bazar" },
  { value: "palang", label: "Palang" },
  { value: "ramganj", label: "Ramganj" },
  { value: "satkania", label: "Satkania" },
  { value: "pirojpur", label: "Pirojpur" },
  { value: "gafargaon", label: "Gafargaon" },
  { value: "mirzapur", label: "Mirzapur" },
  { value: "raipur", label: "Raipur" },
  { value: "tekirdağ", label: "Tekirdağ" },
  { value: "kushtia", label: "Kushtia" },
  { value: "teknaf", label: "Teknaf" },
  { value: "bhandaria", label: "Bhandaria" },
  { value: "shibganj", label: "Shibganj" },
  { value: "mirpur", label: "Mirpur" },
  { value: "bera", label: "Bera" },
  { value: "narail", label: "Narail" },
  // Add more cities as needed
];

const Recipient = ({ user, addressUpdate, setAddressUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState("Bangladesh");

  const [city, setCity] = useState(user?.city);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: deliveryCharge = [] } = useQuery({
    queryKey: ["/api/v1/siteSetting"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = res.json();
      return data;
    },
  });

  const deliveryPoint = useSelector((state) => state.cart.shippingType);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.city = city;
      data.country = country;
      data.email = user?.email;
      const res = await updateUser(data);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        window.location.reload();
        setAddressUpdate(!addressUpdate);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10">
      <div className="flex items-center gap-7">
        <p className="bg-primaryColor text-textColor h-8 w-8 rounded-full flex justify-center items-center font-bold">
          2
        </p>
        <h2 className="text-xl font-semibold tracking-normal leading-5">
          Recipient
        </h2>
      </div>
      <div className="flex justify-between">
        <p className="py-5 font-semibold tracking-tight">Delivery Address</p>
        {user?.address && (
          <div>
            {addressUpdate ? (
              <button
                onClick={() => setAddressUpdate(!addressUpdate)}
                className="flex items-center gap-1 text-[#549AFC]"
              >
                <span>Cancel</span>
              </button>
            ) : (
              <button
                onClick={() => setAddressUpdate(!addressUpdate)}
                className="flex items-center gap-1 text-[#549AFC]"
              >
                <CiEdit />
                <span>Edit</span>
              </button>
            )}
          </div>
        )}
      </div>
      {!user?.address || addressUpdate ? (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label htmlFor="address" className="label">
              <span className="label-text">Address</span>
              <span className="text-error-300">*</span>
            </label>
            <input
              id="address"
              type="text"
              defaultValue={user?.address}
              placeholder="your delivery address"
              className="border rounded px-3 py-2 w-full"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-600"> {errors.address.message}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-full">
              <label htmlFor="city" className="label">
                <span className="label-text">City</span>
                <span className="text-error-300">* {user?.city}</span>
              </label>
              <Select
                className="basic-single"
                name="city"
                options={options}
                defaultValue={city}
                onChange={(e) => setCity(e.value)}
                required={!user?.address}
              />
              {errors.city && (
                <p className="text-red-600"> {errors.city.message}</p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="zipcode" className="label">
                <span className="label-text">Zipcode</span>
              </label>
              <input
                id="zipcode"
                type="text"
                defaultValue={user?.zip_code}
                placeholder="zipcode"
                className="border rounded px-3 py-2 w-full"
                {...register("zip_code")}
              />
            </div>
          </div>
          <div className="form-control w-full">
            <label htmlFor="country" className="label">
              <span className="label-text">Country</span>
            </label>
            <input
              id="country"
              type="text"
              placeholder="country"
              defaultValue={user?.country ? user?.country : country}
              className="border rounded px-3 py-2 w-full"
              disabled
              {...register("country")}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex justify-end gap-1 text-[#549AFC] mb-5"
            >
              {!loading || !isLoading ? (
                <span>Save</span>
              ) : (
                <span>loading...</span>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div>
          <table className="divide-y-2 divide-gray-200 bg-white text-sm mb-10">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900 flex items-center gap-1">
                  <PiAddressBook />
                  <span> Address</span>
                </td>
                <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                  {user?.address}
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900 uppercase flex items-center gap-1">
                  <CiLocationOn />
                  <span> Zipcode</span>
                </td>

                <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                  {user?.zip_code}
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900 flex items-center gap-1">
                  <CiLocationOn />
                  <span>City</span>
                </td>

                <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                  {user?.city}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap pr-4 py-1 font-medium text-gray-900 flex items-center gap-1">
                  <CiLocationOn />
                  <span>Country</span>
                </td>

                <td className="whitespace-nowrap px-4 py-1 text-gray-700">
                  {user.country}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between mb-10">
        <h2>Delivery Point</h2>
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={toggleDropdown}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              {deliveryPoint}
              <svg
                className={`-mr-1 h-5 w-5 text-gray-400 transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <button
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                  onClick={() => {
                    dispatch(
                      setShippingCharge(deliveryCharge?.data[0]?.inside_dhaka)
                    );
                    dispatch(setShippingType("Inside Dhaka"));
                  }}
                >
                  Inside Dhaka
                </button>
                <button
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                  onClick={() => {
                    dispatch(
                      setShippingCharge(deliveryCharge?.data[0]?.outside_dhaka)
                    );
                    dispatch(setShippingType("Outside Dhaka"));
                  }}
                >
                  Outside Dhaka
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm">
        For urgent delivery, please contact{" "}
        <span className="text-blue-500">+88*********16</span> (11AM-10PM) or
        reach to our social media platform{" "}
        <span className="text-blue-500">Facebook/ Instagram</span>
      </p>
    </div>
  );
};

export default Recipient;
