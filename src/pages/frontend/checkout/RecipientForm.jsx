import { useState } from "react";
import { useOrderRegUserMutation } from "../../../redux/feature/auth/authApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import {
  setShippingCharge,
  setShippingType,
} from "../../../redux/feature/cart/cartSlice";
import { setCookie } from "../../../utils/cookie-storage";

const RecipientForm = ({
  userData,
  refetch,
  setAddressUpdate,
  addressUpdate,
  setUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [orderRegUser, { isLoading }] = useOrderRegUserMutation();
  const deliveryPoint = useSelector((state) => state.cart.shippingType);
  const dispatch = useDispatch();

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
    suspense: false,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await orderRegUser(data);

      if (res?.data?.success) {
        setAddressUpdate(!addressUpdate);
        setCookie(
          "user",
          JSON.stringify({ ...res?.data?.data, deliveryPoint })
        );
        setUser({ ...res?.data?.data, deliveryPoint });

        toast.success("Your Information is done!", {
          autoClose: 2,
        });
        refetch();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <form className="space-y-5 mb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full">
            <label htmlFor="name" className="label">
              <span className="label-text">Full Name</span>
              <span className="text-error-300">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              defaultValue={userData?.name}
              className="border rounded px-3 py-2 w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-600"> {errors.name.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="phone" className="label">
              <span className="label-text">Phone Number</span>
              <span className="text-error-300">*</span>
            </label>
            <input
              id="phone"
              type="text"
              minLength={11}
              maxLength={11}
              defaultValue={userData?.phone}
              placeholder="Enter your phone number"
              className="border rounded px-3 py-2 w-full"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-red-600"> {errors?.phone?.message}</p>
            )}
          </div>
        </div>
        <div className="form-control w-full">
          <label htmlFor="address" className="label">
            <span className="label-text">Address</span>
            <span className="text-error-300">*</span>
          </label>
          <textarea
            name="address"
            id="address"
            cols="30"
            rows="2"
            defaultValue={userData?.address}
            placeholder="your delivery address"
            className="border rounded px-3 py-2 w-full"
            {...register("address", { required: "Address is required" })}
          ></textarea>
          {errors.address && (
            <p className="text-red-600"> {errors.address.message}</p>
          )}
        </div>
        {/* <div className="flex items-center gap-3">
          <div className="w-full">
            <label htmlFor="city" className="label">
              <span className="label-text">City</span>
              <span className="text-error-300">* {userData?.city}</span>
            </label>
            <Select
              className="basic-single"
              name="city"
              options={options}
              defaultValue={city}
              onChange={(e) => setCity(e.value)}
              required={!userData?.address}
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
              defaultValue={userData?.zip_code}
              placeholder="zipcode"
              className="border rounded px-3 py-2 w-full"
              {...register("zip_code")}
            />
          </div>
        </div> */}
        {/* <div className="form-control w-full">
          <label htmlFor="country" className="label">
            <span className="label-text">Country</span>
          </label>
          <input
            id="country"
            type="text"
            placeholder="country"
            defaultValue={userData?.country ? userData?.country : country}
            className="border rounded px-3 py-2 w-full"
            disabled
            {...register("country")}
          />
        </div> */}

        <div className="mb-10 flex items-center gap-3">
          <h2>
            <span>Delivery Point</span>
            <span className="text-error-300">*</span>
          </h2>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
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
                    type="button"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                    onClick={() => {
                      dispatch(
                        setShippingCharge(deliveryCharge?.data[0]?.inside_dhaka)
                      );
                      dispatch(setShippingType("Inside Dhaka"));
                      toggleDropdown();
                    }}
                  >
                    Inside Dhaka
                  </button>
                  <button
                    type="button"
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                    onClick={() => {
                      dispatch(
                        setShippingCharge(
                          deliveryCharge?.data[0]?.outside_dhaka
                        )
                      );
                      dispatch(setShippingType("Outside Dhaka"));
                      toggleDropdown();
                    }}
                  >
                    Outside Dhaka
                  </button>
                </div>
              </div>
            )}
          </div>
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
    </>
  );
};

export default RecipientForm;
