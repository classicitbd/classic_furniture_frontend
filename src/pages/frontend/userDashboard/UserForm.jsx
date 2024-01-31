import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOrderRegUserMutation } from "../../../redux/feature/auth/authApi";
import Select from "react-select";
import { toast } from "react-toastify";
import { districts } from "../../../data/districts";
import { divisions } from "../../../data/divisions";
import { setCookie } from "../../../utils/cookie-storage";
import { useSelector } from "react-redux";

const UserForm = ({ user, setUser }) => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [districtsData, setDistrictsData] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [division, setDivision] = useState(user?.division);
  const [district, setDistrict] = useState(user?.district);
  const [orderRegUser, { isLoading }] = useOrderRegUserMutation();
  const deliveryPoint = useSelector((state) => state.cart.shippingType);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (!division || !district) {
        return toast.error("Please provide your District & Division");
      }
      data.name = data.name ? data?.name : user?.name;
      data.phone = data.phone ? data?.phone : user?.phone;
      data.address = data.address ? data?.address : user?.address;
      data.district = district;
      data.division = division;
      const res = await orderRegUser(data);

      if (res?.data?.success) {
        setCookie(
          "user",
          JSON.stringify({ ...res?.data?.data, deliveryPoint })
        );
        setUser({ ...res?.data?.data, deliveryPoint });

        toast.success("Your Information is done!", {
          autoClose: 2,
        });
        setEdit(!edit);
        reset();
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
          <label htmlFor="name" className="label">
            <span className="label-text">Full Name</span>
            <span className="text-error-300">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            defaultValue={user?.name}
            disabled={!edit}
            className="border rounded px-3 py-2 w-full"
            {...register("name")}
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
            defaultValue={user?.phone}
            disabled
            placeholder="Enter your phone number"
            className="border rounded px-3 py-2 w-full"
            {...register("phone")}
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
          defaultValue={user?.address}
          disabled={!edit}
          placeholder="your delivery address"
          className="border rounded px-3 py-2 w-full"
          {...register("address")}
        ></textarea>
        {errors.address && (
          <p className="text-red-600"> {errors.address.message}</p>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="form-control w-full">
          <label htmlFor="division" className="label">
            <span className="label-text">Division</span>
            <span className="text-error-300">*</span>
            <span className="text-error-300">{user?.division}</span>
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
            <span className="text-error-300">{user?.district}</span>
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
