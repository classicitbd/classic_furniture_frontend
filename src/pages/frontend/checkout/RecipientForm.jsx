import { useContext, useEffect, useState } from "react";
import { useOrderRegUserMutation } from "../../../redux/feature/auth/authApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { useDispatch, useSelector } from "react-redux";
import { setCookie } from "../../../utils/cookie-storage";
import Select from "react-select";
import { districts } from "../../../data/districts";
import { divisions } from "../../../data/divisions";
import { setShippingType } from "../../../redux/feature/cart/cartSlice";
import { UserContext } from "../../../context/UserProvider";

const RecipientForm = ({ refetch }) => {
  const [loading, setLoading] = useState(false);
  const [division, setDivision] = useState(null);
  const [divisionId, setDivisionId] = useState(null);
  const [district, setDistrict] = useState(null);
  const [divisionName, setDivisionName] = useState(null);
  const [districtsData, setDistrictsData] = useState([]);
  const [changeDivision, setChangeDivision] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(true);
  const [orderRegUser, { isLoading }] = useOrderRegUserMutation();
  const deliveryPoint = useSelector((state) => state.cart.shippingType);
  const dispatch = useDispatch();
  const { userData, setUserData, setAddressUpdate } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setDivision(userData?.division);
    setDivisionName(userData?.division);
    setDistrict(userData?.district);
  }, [userData]);

  useEffect(() => {
    if (!divisionId) {
      const id = divisions.find((divi) => divi?.name === divisionName);
      setDivisionId(id?.id);
    }
  }, [divisionName, divisionId]);

  useEffect(() => {
    if (divisionId) {
      const districtData = districts.filter(
        (district) => district?.division_id === divisionId
      );
      setDistrictsData(districtData);
    }
  }, [divisionId]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.district = district;
      data.division = division;
      const res = await orderRegUser(data);

      if (res?.data?.success) {
        setUserData({ ...res?.data?.data, deliveryPoint });
        setAddressUpdate(false);
        setCookie(
          "user",
          JSON.stringify({ ...res?.data?.data, deliveryPoint })
        );

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
              type="number"
              defaultValue={userData?.phone}
              placeholder="Enter your phone number"
              className="border rounded px-3 py-2 w-full"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{11}$/,
                  message: "Phone number must be 11 digits long",
                },
              })}
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
        <div className="flex flex-col md:flex-row gap-5">
          <div className="form-control w-full">
            <label htmlFor="division" className="label">
              <span className="label-text">Division</span>
              <span className="text-error-300">*</span>
            </label>
            <Select
              id="division"
              name="division"
              required
              aria-label="Select a Menu"
              options={divisions}
              defaultValue={{
                name: userData?.division,
                id: userData?.division,
              }}
              getOptionLabel={(x) => x?.name}
              getOptionValue={(x) => x?.id}
              onChange={(selectedOption) => {
                setDivisionId(selectedOption?.id);
                setDivision(selectedOption?.name);
                setChangeDivision(true);
                setOpenDistrict(false);
                setTimeout(() => {
                  setOpenDistrict(true);
                }, 100);
              }}
            ></Select>
          </div>
          {openDistrict && (
            <div className="form-control w-full">
              <label htmlFor="district" className="label">
                <span className="label-text">District</span>
                <span className="text-error-300">*</span>
              </label>
              {changeDivision == true ? (
                <Select
                  id="district"
                  name="district"
                  required
                  aria-label="Select a District"
                  isSearchable={true}
                  options={districtsData}
                  getOptionLabel={(x) => x?.name}
                  getOptionValue={(x) => x?.id}
                  onChange={(selectedOption) => {
                    setDistrict(selectedOption?.name);
                  }}
                ></Select>
              ) : (
                <Select
                  id="district"
                  name="district"
                  required
                  aria-label="Select a district"
                  options={districtsData}
                  defaultValue={{
                    name: userData?.district,
                    id: userData?.district,
                  }}
                  getOptionLabel={(x) => x?.name}
                  getOptionValue={(x) => x?.id}
                  onChange={(selectedOption) => {
                    setDistrict(selectedOption?.name);
                    dispatch(setShippingType(selectedOption?.name));
                  }}
                ></Select>
              )}
            </div>
          )}
        </div>
        {userData && userData?.verify ? (
          <div className="flex justify-end">
            <button
              className="px-10 py-2 w-[120px] text-textColor bg-primaryColor opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out rounded-full"
              type="submit"
            >
              {loading || isLoading ? <MiniSpinner /> : "Next"}
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              className="px-10 py-2 w-[200px] text-textColor bg-primaryColor opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out rounded-full"
              type="submit"
            >
              {loading || isLoading ? <MiniSpinner /> : "Continue for Verify"}
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default RecipientForm;
