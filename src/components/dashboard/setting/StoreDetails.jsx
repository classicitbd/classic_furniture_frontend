import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddSiteSettingMutation } from "../../../redux/feature/setting/settingApi";

const StoreDetails = ({ refetch, initialData }) => {
  const {
    register,
    reset,
    handleSubmit,
    // formState: { errors },
  } = useForm(); //get data in form

  const [postSiteSettng] = useAddSiteSettingMutation();

  const handleDataPost = async (data) => {
    toast.error("Please wait a moment");
    const sendData = {
      delivery_time_inside_dhaka:
        data?.delivery_time_inside_dhaka ||
        initialData?.delivery_time_inside_dhaka,
      delivery_time_outside_dhaka:
        data?.delivery_time_outside_dhaka ||
        initialData?.delivery_time_outside_dhaka,
      // delivery_amount_inside_dhaka:
      //   data?.delivery_amount_inside_dhaka ||
      //   initialData?.delivery_amount_inside_dhaka,
      // delivery_amount_outside_dhaka:
      //   data?.delivery_amount_outside_dhaka ||
      //   initialData?.delivery_amount_outside_dhaka,
      facebook: data?.facebook || initialData?.facebook,
      instagram: data?.instagram || initialData?.instagram,
      you_tube: data?.you_tube || initialData?.you_tube,
      watsapp: data?.watsapp || initialData?.watsapp,
      location: data?.location || initialData?.location,
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
            <label
              className="font-semibold"
              htmlFor="delivery_time_inside_dhaka"
            >
              Delivery Inside Dhaka Days
              <span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.delivery_time_inside_dhaka}
              {...register("delivery_time_inside_dhaka")}
              id="delivery_time_inside_dhaka"
              type="string"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label
              className="font-semibold"
              htmlFor="delivery_time_outside_dhaka"
            >
              Delivery Outside Dhaka days
              <span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.delivery_time_outside_dhaka}
              {...register("delivery_time_outside_dhaka")}
              id="delivery_time_outside_dhaka"
              type="string"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          {/* <div>
            <label
              className="font-semibold"
              htmlFor="delivery_amount_inside_dhaka"
            >
              Delivery Charge Inside Dhaka
            </label>
            <input
              defaultValue={initialData?.delivery_amount_inside_dhaka}
              {...register("delivery_amount_inside_dhaka", {
                required: "Inside delivery charge must be required",
              })}
              id="delivery_amount_inside_dhaka"
              type="number"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.delivery_amount_inside_dhaka && (
              <p className="text-red-600">
                {errors.delivery_amount_inside_dhaka?.message}
              </p>
            )}
          </div> */}
          {/* <div>
            <label
              className="font-semibold"
              htmlFor="delivery_amount_outside_dhaka"
            >
              Delivery Charge Outside Dhaka
            </label>
            <input
              defaultValue={initialData?.delivery_amount_outside_dhaka}
              {...register("delivery_amount_outside_dhaka", {
                required: "Outside delivery charge must be required",
              })}
              id="delivery_amount_outside_dhaka"
              type="number"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.delivery_amount_outside_dhaka && (
              <p className="text-red-600">
                {errors.delivery_amount_outside_dhaka?.message}
              </p>
            )}
          </div> */}
          <div>
            <label className="font-semibold" htmlFor="location">
              Store Loaction<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.location}
              {...register("location")}
              id="location"
              type="url"
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
            <label className="font-semibold" htmlFor="you_tube">
              You Tube<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.you_tube}
              {...register("you_tube")}
              id="you_tube"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="watsapp">
              Watsapp<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.watsapp}
              {...register("watsapp")}
              id="watsapp"
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
