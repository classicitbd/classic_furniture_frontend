import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddSiteSettingMutation } from "../../../redux/feature/setting/settingApi";

const StoreDetails = ({ refetch, initialData }) => {
  const { register, reset, handleSubmit, formState: { errors }, } = useForm(); //get data in form

  const [postSiteSettng] = useAddSiteSettingMutation();

  const handleDataPost = async (data) => {
    toast.error("Please wait a moment");
    const sendData = {
      location: data?.location || initialData?.location,
      facebook: data?.facebook || initialData?.facebook,
      instagram: data?.instagram || initialData?.instagram,
      youTube: data?.youTube || initialData?.youTube,
      inside_dhaka: data?.inside_dhaka || initialData?.inside_dhaka,
      outside_dhaka: data?.outside_dhaka || initialData?.outside_dhaka,
      inside_dhaka_charge: data?.inside_dhaka_charge || initialData?.inside_dhaka_charge,
      outside_dhaka_charge: data?.outside_dhaka_charge || initialData?.outside_dhaka_charge,
      address: data?.address || initialData?.address,
      email: data?.email || initialData?.email,
      hours: data?.hours || initialData?.hours,
      tin: data?.tin || initialData?.tin,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleDataPost)}>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
          <div>
            <label className="font-semibold" htmlFor="inside_dhaka">
              Delivery Inside Dhaka Days
              <span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.inside_dhaka}
              {...register("inside_dhaka")}
              id="inside_dhaka"
              type="string"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="outside_dhaka">
              Delivery Outside Dhaka days
              <span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.outside_dhaka}
              {...register("outside_dhaka")}
              id="outside_dhaka"
              type="string"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="inside_dhaka_charge">
              Delivery Charge Inside Dhaka
            </label>
            <input
              defaultValue={initialData?.inside_dhaka_charge}
              {...register("inside_dhaka_charge", { required: "Inside delivery charge must be required" })}
              id="inside_dhaka_charge"
              type="number"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.inside_dhaka_charge && (
              <p className="text-red-600">{errors.inside_dhaka_charge?.message}</p>
            )}
          </div>
          <div>
            <label className="font-semibold" htmlFor="outside_dhaka_charge">
              Delivery Charge Outside Dhaka
            </label>
            <input
              defaultValue={initialData?.outside_dhaka_charge}
              {...register("outside_dhaka_charge", { required: "Outside delivery charge must be required" })}
              id="outside_dhaka_charge"
              type="number"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.outside_dhaka_charge && (
              <p className="text-red-600">{errors.outside_dhaka_charge?.message}</p>
            )}
          </div>
          <div>
            <label className="font-semibold" htmlFor="location">
              Store Loaction<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.location}
              {...register("location")}
              id="location"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="facebook">
              Facebook<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.facebook}
              {...register("facebook")}
              id="facebook"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="instagram">
              Instagram<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.instagram}
              {...register("instagram")}
              id="instagram"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="youTube">
              You Tube<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.youTube}
              {...register("youTube")}
              id="youTube"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="address">
              Address
              <span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.address}
              {...register("address")}
              id="address"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="email">
              E-Mail
              <span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.email}
              {...register("email")}
              id="inside_dhaka"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="hours">
              Start And Close<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.hours}
              {...register("hours")}
              id="hours"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="tin">
              Tin Number<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.tin}
              {...register("tin")}
              id="tin"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-end">
          <button
            type="submit"
            className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default StoreDetails;
