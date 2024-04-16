import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import ReactQuill from "react-quill";
import { useState } from "react";
import { ImageValidate } from "../../../utils/ImageValidation";
import { useUpdateBannerMutation } from "../../../redux/feature/banner/bannerApi";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const UpdateBanner = ({
    refetch,
    setBannerUpdateModal,
    bannerUpdateModalValue,
}) => {
    const [description, setDescription] = useState(bannerUpdateModalValue?.description);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);

    const [updateBanner] = useUpdateBannerMutation(); //Update Banner

    // post a Banner details
    const handleDataPost = (data) => {
        setLoading(true);
        if (data?.banner[0]) {
            const formData = new FormData();
            let errorEncountered = false;

            const banner = data?.banner[0];
            const result = ImageValidate(banner, "banner"); //check image type
            if (result == true) {
                formData.append("banner", banner);
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
                errorEncountered = true;
            }

            if (errorEncountered == true) {
                setLoading(false);
                return;
            }

            Object.entries(data).forEach(([key, value]) => {
                if (key !== "banner") {
                    formData.append(key, value);
                }
            });
            if (!data?.title) {
                formData.append("title", bannerUpdateModalValue?.title);
            }
            if (!description) {
                toast.error("Please fill up description")
                return;
            }
            formData.append('description', description);
            formData.append("_id", bannerUpdateModalValue?._id);
            formData.append("image_key", bannerUpdateModalValue?.image_key);
            toast.error("Please wait a moment");
            updateBanner(formData).then((result) => {
                if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                    toast.success(
                        result?.data?.message
                            ? result?.data?.message
                            : "Banner update successfully !",
                        {
                            autoClose: 1000,
                        }
                    );
                    refetch();
                    reset();
                    setLoading(false);
                    setBannerUpdateModal(false);
                } else {
                    setLoading(false);
                    toast.error(result?.error?.data?.message);
                }
            });
        } else {
            toast.error("Please wait a moment");
            const sendData = {
                title: data?.title || bannerUpdateModalValue?.title,
                url: data?.url || bannerUpdateModalValue?.url,
                description: description || bannerUpdateModalValue?.description,
                banner: bannerUpdateModalValue?.banner,
                _id: bannerUpdateModalValue?._id,
            }
            updateBanner(sendData).then((result) => {
                if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                    toast.success(
                        result?.data?.message
                            ? result?.data?.message
                            : "Banner update successfully !",
                        {
                            autoClose: 1000,
                        }
                    );
                    refetch();
                    reset();
                    setBannerUpdateModal(false);
                    setLoading(false);
                } else {
                    setLoading(false);
                    toast.error(result?.error?.data?.message);
                }
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-30">
            <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                    <h3
                        className="text-[26px] font-bold text-[#0A0A0A] capitalize"
                        id="modal-title"
                    >
                        {" "}
                        Update Banner{" "}
                    </h3>
                    <button className="btn bg-white hover:bg-white border p-1">
                        <RxCross1
                            onClick={() => setBannerUpdateModal(false)}
                            size={25}
                        ></RxCross1>
                    </button>
                </div>

                <hr className="mt-2 mb-4" />

                <form onSubmit={handleSubmit(handleDataPost)}>
                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="banner">
                            Banner Image<span className="text-red-500"> if need</span>
                        </label>
                        <input
                            placeholder="Image"
                            {...register("banner")}
                            id="banner"
                            type="file"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>

                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="title">
                            Banner Title
                        </label>
                        <input
                            defaultValue={bannerUpdateModalValue?.title}
                            {...register("title", { required: "Banner Title is required" })}
                            id="title"
                            type="text"
                            className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-1"
                        />
                        {errors.title && (
                            <p className="text-red-600">{errors.title?.message}</p>
                        )}
                    </div>

                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="url">
                            Banner Path
                        </label>
                        <input
                            defaultValue={bannerUpdateModalValue?.url}
                            {...register("url", { required: "Banner Path is required" })}
                            id="url"
                            type="text"
                            className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-1"
                        />
                        {errors.url && (
                            <p className="text-red-600">{errors.url?.message}</p>
                        )}
                    </div>

                    <div className="mt-3">
                        <p className="mb-2 font-medium">Banner Description: </p>
                        <ReactQuill theme="snow" value={description} onChange={setDescription} />
                    </div>

                    <div className="flex justify-end mt-6 gap-4">
                        <button
                            onClick={() => setBannerUpdateModal(false)}
                            className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border"
                        >
                            Cancel
                        </button>
                        <button
                            type="Submit"
                            className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]"
                        >
                            {loading ? <MiniSpinner /> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBanner;
