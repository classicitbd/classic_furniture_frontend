import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ImageUploader from "../product/productCreate/ImageUploader";
import { useAddSiteSettingMutation } from "../../../redux/feature/setting/settingApi";
import { ImageValidate } from "../../../utils/ImageValidation";
import VideoUploaders from "./VideoUploaders";

const LogoVidio = ({ refetch, initialData }) => {
  const { register, reset, handleSubmit } = useForm(); //get data in form

  const [postSiteSettng] = useAddSiteSettingMutation();

  const handleDataPost = async (data) => {
    toast.error("Please wait a moment");
    let video;
    let logo;
    let footer_logo;
    let favicon;
    let product_size_picture;
    if (data?.logo?.[0]) {
      const validate_image = data?.logo?.[0];
      const result = ImageValidate(validate_image, "category_image"); //check image type
      if (result == false) {
        toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
        return;
      }
      const logoUpload = await ImageUploader(data?.logo?.[0]);
      logo = logoUpload[0];
    }
    if (data?.footer_logo?.[0]) {
      const validate_image = data?.footer_logo?.[0];
      const result = ImageValidate(validate_image, "category_image"); //check image type
      if (result == false) {
        toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
        return;
      }
      const logoUpload = await ImageUploader(data?.footer_logo?.[0]);
      footer_logo = logoUpload[0];
    }
    if (data?.favicon?.[0]) {
      const validate_image = data?.favicon?.[0];
      const result = ImageValidate(validate_image, "category_image"); //check image type
      if (result == false) {
        toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
        return;
      }
      const faviconUpload = await ImageUploader(data?.favicon?.[0]);
      favicon = faviconUpload[0];
    }
    if (data?.product_size_picture?.[0]) {
      const validate_image = data?.product_size_picture?.[0];
      const result = ImageValidate(validate_image, "category_image"); //check image type
      if (result == false) {
        toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
        return;
      }
      const product_size_pictureUpload = await ImageUploader(data?.product_size_picture?.[0]);
      product_size_picture = product_size_pictureUpload[0];
    }
    if (data?.video?.[0]) {
      const videoUpload = await VideoUploaders(data?.video?.[0]);
      video = videoUpload[0];
    }
    const sendData = {
      video: video || initialData?.video,
      logo: logo || initialData?.logo,
      footer_logo: footer_logo || initialData?.footer_logo,
      favicon: favicon || initialData?.favicon,
      product_size_picture: product_size_picture || initialData?.product_size_picture,
      title: data?.title || initialData?.title,
      emergency_contact: data?.emergency_contact || initialData?.emergency_contact,
      _id: initialData?._id,
      email: data?.email || initialData?.email,
      address: data?.address || initialData?.address,
      start_close: data?.start_close || initialData?.start_close,
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
        <div className="grid gap-6 grid-cols-2">
          <div>
            <label className="font-semibold" htmlFor="logo">
              Logo<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              {...register("logo")}
              id="logo"
              type="file"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="footer_logo">
              Footer Logo<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              {...register("footer_logo")}
              id="footer_logo"
              type="file"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="favicon">
              Favicon<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              {...register("favicon")}
              id="favicon"
              type="file"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="title">
              Title<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.title}
              {...register("title")}
              id="title"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="emergency_contact">
              Contact No<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.emergency_contact}
              {...register("emergency_contact")}
              id="emergency_contact"
              type="number"
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
            <label className="font-semibold" htmlFor="start_close">
              Start And Close<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              defaultValue={initialData?.start_close}
              {...register("start_close")}
              id="start_close"
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

export default LogoVidio;
