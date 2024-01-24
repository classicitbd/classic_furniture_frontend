import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../../redux/feature/auth/authApi";
import Select from "react-select";
import { toast } from "react-toastify";

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

const UserForm = ({ user, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [country, setCountry] = useState(user?.country);
  const [city, setCity] = useState(user?.city);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.city = city;
      data.country = country;
      data.zip_code = data?.zip_code ? data?.zip_code : user?.zip_code;
      data.address = data?.address ? data?.address : user?.address;
      data.phone = user?.phone;
      data.name = data?.name ? data?.name : user?.name;
      const res = await updateUser(data);
      if (res.data.success) {
        toast.success(res?.data?.message);
        setEdit(false);
        reset();
        refetch();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [user, edit]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white p-10">
        <h2 className="text-[20px] font-medium mb-4">Personal Information</h2>
        <div className="flex flex-col md:flex-row gap-5 mb-5">
          <div className="w-full">
            <label htmlFor="name" className="label">
              <span className="label-text">Your Name</span>
              <span className="text-error-300">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="your name"
              defaultValue={user?.name}
              className="border rounded px-3 py-2 w-full"
              {...register("name")}
              disabled={!edit}
            />
          </div>
          <div className="w-full">
            <label htmlFor="phone" className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Enter your Phone number"
              defaultValue={user?.phone}
              className="border rounded px-3 py-2 w-full"
              disabled
              {...register("phone")}
            />
          </div>
        </div>
        {/* <div className="mb-5">
          <label htmlFor="phone" className="label">
            <span className="label-text">Phone Number </span>
            <span className="text-error-300">{user?.phone}</span>
          </label>
          <PhoneInput
            country={"bd"}
            inputProps={{
              name: "phone",
              disabled: !edit,
              autoFocus: true,
            }}
            disableDropdown={true}
            defaultValue={phone}
            onChange={(value) => setPhone(value)}
          />
        </div> */}
        <div className="w-full">
          <label htmlFor="address" className="label">
            <span className="label-text">Address</span>
            <span className="text-error-300">*</span>
          </label>
          <textarea
            rows={2}
            id="address"
            type="text"
            defaultValue={user?.address}
            placeholder="your address"
            className="border rounded px-3 py-2 w-full"
            {...register("address")}
            disabled={!edit}
          />
        </div>
        <div className="flex items-center gap-5 my-5">
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
              isDisabled={!edit}
            />
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
              disabled={!edit}
            />
          </div>
        </div>
        <div className="w-full">
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
      </div>
    </form>
  );
};

export default UserForm;
