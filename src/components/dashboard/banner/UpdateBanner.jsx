import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { ImageValidate } from "../../../utils/ImageValidation";
import { useUpdateBannerMutation } from "../../../redux/feature/banner/bannerApi";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const UpdateBanner = ({
    refetch,
    setBannerUpdateModal,
    bannerUpdateModalValue,
}) => {
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
        if (data?.banner_image[0]) {
            const formData = new FormData();
            let errorEncountered = false;

            const banner_image = data?.banner_image[0];
            const result = ImageValidate(banner_image, "banner_image"); //check image type
            if (result == true) {
                formData.append("banner_image", banner_image);
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
                errorEncountered = true;
            }

            if (errorEncountered == true) {
                setLoading(false);
                return;
            }

            Object.entries(data).forEach(([key, value]) => {
                if (key !== "banner_image") {
                    formData.append(key, value);
                }
            });
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
                banner_title: data?.banner_title,
                banner_path: data?.banner_path,
                banner_serial: data?.banner_serial,
                banner_status: data?.banner_status,
                banner_image: bannerUpdateModalValue?.banner_image,
                image_key: bannerUpdateModalValue?.image_key,
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

                <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
                    <div>
                        <input
                            {...register("banner_image")}
                            id="banner_image"
                            type="file"
                            className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>

                    <div>
                        <input
                            placeholder="Banner Title"
                            {...register("banner_title", { required: "Banner Title is required" })}
                            id="banner_title"
                            defaultValue={bannerUpdateModalValue?.banner_title}
                            type="text"
                            className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-3"
                        />
                        {errors.banner_title && (
                            <p className="text-red-600">{errors.banner_title?.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            placeholder="Banner Path"
                            {...register("banner_path", { required: "Banner Path is required" })}
                            id="banner_path"
                            defaultValue={bannerUpdateModalValue?.banner_path}
                            type="text"
                            className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-3"
                        />
                        {errors.banner_path && (
                            <p className="text-red-600">{errors.banner_path?.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            placeholder="Banner Serial"
                            {...register("banner_serial", { required: "Banner Serial is required" })}
                            id="banner_serial"
                            defaultValue={bannerUpdateModalValue?.banner_serial}
                            type="number"
                            className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-3"
                        />
                        {errors.banner_serial && (
                            <p className="text-red-600">{errors.banner_serial?.message}</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <select
                            {...register("banner_status", {
                                required: "Sub Category Status is required",
                            })}
                            id="banner_status"
                            className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        >
                            <option value="active">Active</option>
                            <option value="in-active">In-Active</option>
                        </select>
                        {errors.banner_status && (
                            <p className="text-red-600">{errors.banner_status?.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end mt-6 gap-4">
                        <button
                            onClick={() => setBannerUpdateModal(false)}
                            className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border"
                        >
                            Cancel
                        </button>
                        {
                            loading ?
                                <button
                                    type="button"
                                    className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]"
                                >
                                    <MiniSpinner />
                                </button>
                                :
                                <button
                                    type="Submit"
                                    className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]"
                                >
                                    Update
                                </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBanner;
