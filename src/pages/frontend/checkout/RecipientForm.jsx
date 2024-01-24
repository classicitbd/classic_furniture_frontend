import { useState } from "react";
import { useUpdateUserMutation } from "../../../redux/feature/auth/authApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";

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

const RecipientForm = ({
  userData,
  refetch,
  setAddressUpdate,
  addressUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [country, setCountry] = useState("Bangladesh");

  const [city, setCity] = useState(userData?.city);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.city = city;
      data.country = country;
      data.phone = userData?.phone;
      const res = await updateUser(data);
      if (res?.data?.success) {
        toast.success(res?.data?.message, {
          autoClose: 2,
        });
        // window.location.reload();
        setAddressUpdate(!addressUpdate);
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
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full">
          <label htmlFor="address" className="label">
            <span className="label-text">Address</span>
            <span className="text-error-300">*</span>
          </label>
          <input
            id="address"
            type="text"
            defaultValue={userData?.address}
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
        </div>
        <div className="form-control w-full">
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
    </>
  );
};

export default RecipientForm;
