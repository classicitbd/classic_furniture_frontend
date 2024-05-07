import { useForm } from "react-hook-form";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { toast } from "react-toastify";
import { useState } from "react";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import Select from "react-select";
import { useAddVideoMutation } from "../../../redux/feature/video/videoApi";

const AddVideo = ({ refetch }) => {
    const [product_id, setProduct_id] = useState("");

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);

    const { data: products = [], isLoading } = useQuery({
        queryKey: [`/api/v1/product/dashboard_product`],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/product/dashboard_product`);
            const data = await res.json();
            return data;
        },
    }); // get Category type

    const [postVideo] = useAddVideoMutation(); //post Video

    // post a Video
    const handleDataPost = (data) => {
        setLoading(true);
        const sendData = {
            product_id: product_id,
            video_link: data?.video_link
        }
        postVideo(sendData).then((result) => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                setLoading(false);
                toast.success(
                    result?.data?.message
                        ? result?.data?.message
                        : "Video Added successfully !",
                    {
                        autoClose: 1000,
                    }
                );
                reset();
                refetch();
            } else {
                setLoading(false);
                toast.error(result?.error?.data?.message);
            }
        });
    };

    if (isLoading) {
        return <BigSpinner />;
    }
    return (
        <>
            <div className="my-10 bg-white border border-gray-200 rounded-xl">
                <div className="m-[30px]">
                    {/* Add A Video */}
                    <div>
                        <h2 className="font-semibold text-[20px]">
                            Add A Video:{" "}
                        </h2>

                        <form
                            onSubmit={handleSubmit(handleDataPost)}
                            className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 items-center gap-2 md:gap-6 mt-3"
                        >
                            <div>
                                <input
                                    placeholder="Video Link"
                                    {...register("video_link", {
                                        required: "Video Link is required",
                                    })}
                                    id="video_link"
                                    type="text"
                                    className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
                                />
                                {errors.video_link && (
                                    <p className="text-red-600">{errors.video_link?.message}</p>
                                )}
                            </div>

                            <div>
                                <Select
                                    id="product_id"
                                    name="product_id"
                                    required
                                    aria-label="Product..."
                                    options={products?.data}
                                    getOptionLabel={(x) => x?.product_name + " color: " + x?.product_color_id?.color_name}
                                    getOptionValue={(x) => x?._id}
                                    onChange={(selectedOption) =>
                                        setProduct_id(selectedOption?._id)
                                    }
                                ></Select>
                            </div>

                            {
                                loading ?
                                    <button
                                        type="button"
                                        className="px-6 py-2 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]"
                                    >
                                        <MiniSpinner />
                                    </button>
                                    :
                                    <button
                                        type="Submit"
                                        className="px-6 py-2 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]"
                                    >
                                        Create
                                    </button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddVideo;