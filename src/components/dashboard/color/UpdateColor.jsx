import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { RxCross1 } from "react-icons/rx";
import { useUpdateColorMutation } from "../../../redux/feature/color/colorApi";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { useState } from "react";

const UpdateColor = ({
  refetch,
  setColorUpdateModal,
  colorUpdateModalValue,
}) => {
  const [loading, setLoading] = useState()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateColor] = useUpdateColorMutation(); //Update Color

  // post a User details
  const handleDataPost = (data) => {
    setLoading(true);
    const sendData = {
      _id: colorUpdateModalValue?._id,
      color_name: data?.color_name,
      color_slug: slugify(data.color_name, {
        lower: true,
        replacement: "-",
      }),
    };
    updateColor(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Color update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        reset();
        setLoading(false);
        setColorUpdateModal(false);
      } else {
        setLoading(false);
        toast.error(result?.error?.data?.message);
      }
    });
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
            Update Color{" "}
          </h3>
          <button className="btn bg-white hover:bg-white border p-1">
            <RxCross1
              onClick={() => setColorUpdateModal(false)}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        <form onSubmit={handleSubmit(handleDataPost)}>
          <div className="mt-3">
            <label className="font-semibold" htmlFor="color_name">
              Color Type<span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Color Types"
              {...register("color_name", { required: "Color Types is required" })}
              id="color_name"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
              defaultValue={colorUpdateModalValue?.color_name}
            />
            {errors.color_name && (
              <p className="text-red-600">{errors.color_name?.message}</p>
            )}
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={() => setColorUpdateModal(false)}
              className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border"
            >
              Cancel
            </button>
            {
              loading ?
                <button type="button" className="px-6 py-2 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]"><MiniSpinner /></button>
                :
                <button type="Submit" className="px-6 py-2 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]">Update</button>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateColor;
