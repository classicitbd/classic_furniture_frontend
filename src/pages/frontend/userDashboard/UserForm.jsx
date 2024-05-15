import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../../redux/feature/auth/authApi";
import Select from "react-select";
import { toast } from "react-toastify";
import { districts } from "../../../data/districts";
import { divisions } from "../../../data/divisions";
// import { setCookie } from "../../../utils/cookie-storage";
// import { useSelector } from "react-redux";

const UserForm = ({ user, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [districtsData, setDistrictsData] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [user_division, setDivision] = useState(user?.user_division);
  const [user_district, setDistrict] = useState(user?.user_district);
  // console.log(user);
  // const [orderRegUser, { isLoading }] = useOrderRegUserMutation();

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  // const deliveryPoint = useSelector((state) => state.cart.shippingType);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
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

  return (
    <form className="space-y-5 mb-10" onSubmit={handleSubmit(onSubmit)}>
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
            {!loading || !isLoading ? (
              <span>Save</span>
            ) : (
              <span>loading...</span>
            )}
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
    </form>
  );
};

export default UserForm;
