import { useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";
import { districts } from "../../../../data/districts";
import { divisions } from "../../../../data/divisions";
import { useUpdateUserMutation } from "../../../../redux/feature/auth/authApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import MiniSpinner from "../../../../shared/loader/MiniSpinner";
import Loader from "../../../../shared/loader/Loader";
import { useDispatch } from "react-redux";
import {
  // setShippingCharge,
  // setShippingTime,
  setShippingType
} from "../../../../redux/feature/cart/cartSlice";
// import { setCookie } from "../../../utils/cookie-storage";
// import { useSelector } from "react-redux";

const Address = ({
  settingData,
  selectedDeliveryLocation,
  setSelectedDeliveryLocation,
  deliveryType,
  userData,
}) => {
  const dispatch = useDispatch();

  // const [selectedDeliveryOption, setSelectedDeliveryOption] =
  //   useState(deliveryType);

  // const handleOptionClick = (option, delivery_charge, delivery_time) => {
  // dispatch(
  //   setShippingCharge({
  //     delivery_charge: delivery_charge,
  //   })
  // );
  // dispatch(
  //   setShippingType({
  //     deliveryType: option,
  //   })
  // );
  // dispatch(
  //   setShippingTime({
  //     delivery_time: delivery_time,
  //   })
  // );
  // setSelectedDeliveryOption(option);
  // };

  const handleLocationClick = (option) => {
    // if (option === "shop") {
    //   dispatch(
    //     setShippingCharge({
    //       delivery_charge: 0,
    //     })
    //   );
    //   dispatch(
    //     setShippingType({
    //       deliveryType: "",
    //     })
    //   );
    //   dispatch(
    //     setShippingTime({
    //       delivery_time: "",
    //     })
    //   );
    // }
    dispatch(
      setShippingType({
        deliveryType: option,
      })
    );
    setSelectedDeliveryLocation(option);
    // setSelectedDeliveryOption(null);
  };

  const {
    data: user = [],
    isLoading: getDataLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/getMe/${userData?.user_phone}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/getMe/${userData?.user_phone}`);
      const data = await res.json();
      return data.data;
    },
  });
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [districtsData, setDistrictsData] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [user_division, setDivision] = useState(user?.user_division);
  const [user_district, setDistrict] = useState(user?.user_district);

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleDataPost = async (data) => {
    try {
      setLoading(true);
      if (!user_division || !user_district) {
        return toast.error("Please provide your District & Division");
      }
      data.user_name = data.user_name ? data?.user_name : user?.user_name;
      data.user_phone = data.user_phone ? data?.user_phone : user?.user_phone;
      data.user_address = data.user_address
        ? data?.user_address
        : user?.user_address;
      data.user_district = user_district;
      data.user_division = user_division;
      const res = await updateUser(data);
      console.log(res);

      if (res?.data?.success) {
        // setCookie(
        //   "user",
        //   JSON.stringify({ ...res?.data?.data, deliveryPoint })
        // );
        // setUser({ ...res?.data?.data, deliveryPoint });

        toast.success("Your Information is done!", {
          autoClose: 2,
        });
        setEdit(!edit);
        reset();
        refetch();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (districtId) {
      const districtData = districts.filter(
        (district) => district?.division_id === districtId
      );
      setDistrictsData(districtData);
    }
  }, [districtId]);

  if (getDataLoading) {
    return <Loader />;
  }
  return (
    <div className=" bg-white border shadow rounded-lg  p-4 lg:p-8">
      <p className="sm:text-xl font-semibold pt-3 pb-4 flex gap-2 items-center">
        Customer address
      </p>
      <form onSubmit={handleSubmit(handleDataPost)} className="space-y-5 ">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full">
            <label htmlFor="user_name" className="label">
              <span className="label-text">Full Name</span>
              <span className="text-error-300">*</span>
            </label>
            <input
              id="user_name"
              type="text"
              placeholder="Enter your name"
              defaultValue={user?.user_name}
              disabled={!edit}
              className="border rounded px-3 py-2 w-full"
              {...register("user_name")}
            />
            {errors.name && (
              <p className="text-red-600"> {errors.user_name.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="user_phone" className="label">
              <span className="label-text">Phone Number</span>
              <span className="text-error-300">*</span>
            </label>
            <input
              id="user_phone"
              type="text"
              minLength={11}
              maxLength={11}
              defaultValue={user?.user_phone}
              disabled
              placeholder="Enter your phone number"
              className="border rounded px-3 py-2 w-full"
              {...register("user_phone")}
            />
            {errors.user_phone && (
              <p className="text-red-600"> {errors?.user_phone?.message}</p>
            )}
          </div>
        </div>
        <div className="form-control w-full">
          <label htmlFor="user_address" className="label">
            <span className="label-text">Address</span>
            <span className="text-error-300">*</span>
          </label>
          <textarea
            name="user_address"
            id="user_address"
            cols="30"
            rows="2"
            defaultValue={user?.user_address}
            disabled={!edit}
            placeholder="your delivery address"
            className="border rounded px-3 py-2 w-full"
            {...register("user_address")}
          ></textarea>
          {errors.user_address && (
            <p className="text-red-600"> {errors.user_address.message}</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="form-control w-full">
            <label htmlFor="division" className="label">
              <span className="label-text">Division</span>
              <span className="text-error-300">*</span>
              <span className="text-error-300">{user?.user_division}</span>
            </label>
            <Select
              id="division"
              name="division"
              aria-label="Select a Menu"
              options={divisions}
              isDisabled={!edit}
              getOptionLabel={(x) => x?.name}
              getOptionValue={(x) => x?.id}
              onChange={(selectedOption) => {
                setDistrictId(selectedOption?.id);
                setDivision(selectedOption?.name);
              }}
            ></Select>
          </div>
          <div className="form-control w-full">
            <label htmlFor="district" className="label">
              <span className="label-text">District</span>
              <span className="text-error-300">*</span>
              <span className="text-error-300">{user?.user_district}</span>
            </label>
            <Select
              id="district"
              name="district"
              aria-label="Select a district"
              options={districtsData}
              isDisabled={!edit}
              getOptionLabel={(x) => x?.name}
              getOptionValue={(x) => x?.id}
              onChange={(selectedOption) => {
                setDistrict(selectedOption?.name);
              }}
            ></Select>
          </div>
        </div>
        {edit ? (
          <div className="flex justify-end mt-5 gap-3">
            <div
              onClick={() => setEdit(false)}
              className="flex justify-end gap-1 text-[#fff] mb-5 bg-bgray-700 hover:bg-bgray-800 cursor-pointer px-5 py-2 rounded-sm"
            >
              cancel
            </div>
            <button
              type="submit"
              className="flex justify-end gap-1 text-[#fff] mb-5 bg-success-200 hover:bg-success-300 px-5 py-2 rounded-sm"
            >
              {!loading || !isLoading ? <span>Save</span> : <MiniSpinner />}
            </button>
          </div>
        ) : (
          <div className="flex justify-end mt-5 gap-3">
            <div
              onClick={() => setEdit(true)}
              className="flex justify-end gap-1 text-[#fff] mb-5 bg-bgray-700 hover:bg-bgray-800 cursor-pointer px-5 py-2 rounded-sm"
            >
              Edit
            </div>
          </div>
        )}

        {/* Select delivery location like your home or shop. */}
        <p className="text-center">Select Delivery Location</p>
        <div className="w-1/2 mx-auto flex justify-between gap-4 items-center">
          <button
            type="button"
            className={`btn btn-primary btn-sm py-2 bg-gray-100 hover:bg-primaryLightColor/20 duration-200  border rounded-lg px-4 w-full ${selectedDeliveryLocation === "home" && "bg-primaryLightColor/20"
              }`}
            onClick={() => handleLocationClick("home")}
          >
            Home
          </button>
          <button
            type="button"
            className={`btn btn-primary btn-sm py-2 bg-gray-100 hover:bg-primaryLightColor/20 duration-200  border rounded-lg px-4 w-full ${selectedDeliveryLocation === "shop" && "bg-primaryLightColor/20"
              }`}
            onClick={() => handleLocationClick("shop")}
          >
            Shop
          </button>
        </div>
        {selectedDeliveryLocation === "home" && (
          // <>
          //   {/* Delivery Option 1: Inside Dhaka */}
          //   <div className="flex flex-col mt-8">
          //     {/* Delivery Option 1: Inside Dhaka */}
          //     <div
          //       className={`delivery-option rounded-lg hover:bg-primaryLightColor/25 cursor-pointer
          //    mb-4 p-4  duration-200 border ${selectedDeliveryOption === "In_Side_Dhaka"
          //           ? "bg-primaryLightColor/20"
          //           : ""
          //         }`}
          //       onClick={() =>
          //         handleOptionClick(
          //           "In_Side_Dhaka",
          //           settingData[0]?.delivery_amount_inside_dhaka,
          //           settingData[0]?.delivery_time_inside_dhaka
          //         )
          //       }
          //     >
          //       <div className="flex items-center ">
          //         <span
          //           className={`form-radio h-4 w-4 rounded-full ${selectedDeliveryOption === "In_Side_Dhaka"
          //               ? "  bg-primaryLightColor/75  ring-2 ring-white "
          //               : " ring-1 ring-gray-600 bg-gray-100 "
          //             } `}
          //           onChange={() =>
          //             handleOptionClick(
          //               "In_Side_Dhaka",
          //               settingData[0]?.delivery_amount_inside_dhaka,
          //               settingData[0]?.delivery_time_inside_dhaka
          //             )
          //           }
          //         />
          //         <div className="flex flex-col mx-4">
          //           <span className="">Inside Dhaka</span>
          //           <span className="text-[12px] text-gray-700">
          //             {" "}
          //             Delivery cost: ৳{" "}
          //             {settingData[0]?.delivery_amount_inside_dhaka}
          //           </span>
          //         </div>
          //       </div>
          //     </div>
          //     {/* Delivery Option 2: Outside Dhaka */}
          //     <div
          //       className={`delivery-option rounded-lg cursor-pointer hover:bg-primaryLightColor/25 duration-200 border mb-4 p-4 ${selectedDeliveryOption === "Out_Side_Dhaka"
          //           ? "bg-primaryLightColor/20"
          //           : ""
          //         }`}
          //       onClick={() =>
          //         handleOptionClick(
          //           "Out_Side_Dhaka",
          //           settingData[0]?.delivery_amount_outside_dhaka,
          //           settingData[0]?.delivery_time_outside_dhaka
          //         )
          //       }
          //     >
          //       {" "}
          //       <div className="flex items-center ">
          //         <span
          //           className={`form-radio h-4 w-4 rounded-full ${selectedDeliveryOption === "Out_Side_Dhaka"
          //               ? "  bg-primaryLightColor/75  ring-2 ring-white "
          //               : " ring-1 ring-gray-600 bg-gray-100 "
          //             } `}
          //           onChange={() =>
          //             handleOptionClick(
          //               "Out_Side_Dhaka",
          //               settingData[0]?.delivery_amount_outside_dhaka,
          //               settingData[0]?.delivery_time_outside_dhaka
          //             )
          //           }
          //         />
          //         <div className="flex flex-col mx-4">
          //           <span className="">Out Side Dhaka</span>
          //           <span className="text-[12px] text-gray-700">
          //             {" "}
          //             Delivery cost: ৳{" "}
          //             {settingData[0]?.delivery_amount_outside_dhaka}
          //           </span>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </>
          <>
            <div className="text-gray-400" dangerouslySetInnerHTML={{ __html: settingData[0]?.delivery_condition }}></div>
          </>
        )}
      </form>
    </div>
  );
};

export default Address;
