import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import ReactQuill from "react-quill";
import { useAddBannerMutation } from "../../../redux/feature/banner/bannerApi";
import { ImageValidate } from "../../../utils/ImageValidation";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const AddBanner = ({ refetch, setAddBannerModalOpen }) => {
    const [description, setDescription] = useState('');
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);

    const [postBanner] = useAddBannerMutation(); //post Banner type

    // post a Banner
    const handleDataPost = (data) => {
        setLoading(true);
        const formData = new FormData();
        let errorEncountered = false;

        if (data?.banner[0]) {
            const banner = data?.banner[0];
            const result = ImageValidate(banner, "banner"); //check image type
            if (result == true) {
                formData.append("banner", banner);
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
                errorEncountered = true;
            }
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
        if (!description) {
            toast.error("Please fill up description !")
        }
        formData.append("description", description);
        toast.error("Please wait a moment !")
        postBanner(formData).then((result) => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(
                    result?.data?.message
                        ? result?.data?.message
                        : "Banner Added successfully !",
                    {
                        autoClose: 1000,
                    }
                );
                reset();
                refetch();
                setAddBannerModalOpen(false);
                setLoading(false);
            } else {
                toast.error(result?.error?.data?.message);
                setLoading(false);
            }
        });
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-30">
                <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3
                                className="text-[26px] font-bold text-[#0A0A0A] capitalize"
                                id="modal-title"
                            >
                                {" "}
                                Add Banner{" "}
                            </h3>
                            <p className="text-red-500">Image size: 3220px X 1920px</p>
                        </div>
                        <button className="btn bg-white hover:bg-white border p-1">
                            <RxCross1
                                onClick={() => setAddBannerModalOpen(false)}
                                size={25}
                            ></RxCross1>
                        </button>
                    </div>

                    {/* Add A Banner Type */}

                    <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
                        <div>
                            <input
                                {...register("banner", { required: "Banner is required" })}
                                id="banner"
                                type="file"
                                className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
                            />
                            {errors.banner && (
                                <p className="text-red-600">{errors.banner?.message}</p>
                            )}
                        </div>

                        <div>
                            <input
                                placeholder="Banner Title"
                                {...register("title", { required: "Banner Title is required" })}
                                id="title"
                                type="text"
                                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-3"
                            />
                            {errors.title && (
                                <p className="text-red-600">{errors.title?.message}</p>
                            )}
                        </div>

                        <div>
                            <input
                                placeholder="Banner Path"
                                {...register("url", { required: "Banner Path is required" })}
                                id="url"
                                type="text"
                                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-3"
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
                                onClick={() => setAddBannerModalOpen(false)}
                                className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border"
                            >
                                Cancel
                            </button>
                            <button
                                type="Submit"
                                className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]"
                            >
                                {loading ? <MiniSpinner /> : "Add"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddBanner;
