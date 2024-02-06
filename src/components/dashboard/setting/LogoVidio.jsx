import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import VideoUploader from "./VideoUploader";
import ImageUploader from "../product/productCreate/ImageUploader";
import { useAddSiteSettingMutation } from "../../../redux/feature/setting/settingApi";

const LogoVidio = ({ refetch, initialData }) => {
  const { register, reset, handleSubmit } = useForm(); //get data in form

  const [postSiteSettng] = useAddSiteSettingMutation();

  const handleDataPost = async (data) => {
    toast.error("Please wait a moment");
    let video;
    let logo;
    let logo_name;
    let favicon;
    let product_size_picture;
    if (data?.logo?.[0]) {
      const logoUpload = await ImageUploader(data?.logo?.[0]);
      logo = logoUpload[0];
    }
    if (data?.logo_name?.[0]) {
      const logoUpload = await ImageUploader(data?.logo_name?.[0]);
      logo_name = logoUpload[0];
    }
    if (data?.favicon?.[0]) {
      const faviconUpload = await ImageUploader(data?.favicon?.[0]);
      favicon = faviconUpload[0];
    }
    if (data?.product_size_picture?.[0]) {
      const product_size_pictureUpload = await ImageUploader(data?.product_size_picture?.[0]);
      product_size_picture = product_size_pictureUpload[0];
    }
    if (data?.video?.[0]) {
      const videoUpload = await VideoUploader(data?.video?.[0]);
      video = videoUpload[0];
    }
    const sendData = {
      video: video || initialData?.video,
      logo: logo || initialData?.logo,
      logo_name: logo_name || initialData?.logo_name,
      favicon: favicon || initialData?.favicon,
      product_size_picture: product_size_picture || initialData?.product_size_picture,
      title: data?.title || initialData?.title,
      emergency_contact: data?.emergency_contact || initialData?.emergency_contact,
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
            <label className="font-semibold" htmlFor="logo_name">
              Logo Name<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              {...register("logo_name")}
              id="logo_name"
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
            <label className="font-semibold" htmlFor="video">
              Video<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              {...register("video")}
              id="video"
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
            <label className="font-semibold" htmlFor="product_size_picture">
              Product Size Picture<span className="text-red-500"> if need</span>{" "}
            </label>
            <input
              {...register("product_size_picture")}
              id="product_size_picture"
              type="file"
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
