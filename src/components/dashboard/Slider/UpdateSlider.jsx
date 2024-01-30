import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useUpdateSliderMutation } from "../../../redux/feature/slider/sliderApi";
import { ImageValidate } from "../../../utils/ImageValidation";
import ReactQuill from "react-quill";
import { useState } from "react";

const UpdateSlider = ({
  refetch,
  setSliderUpdateModal,
  sliderUpdateModalValue,
}) => {
  const [description, setDescription] = useState(sliderUpdateModalValue?.description);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateSlider] = useUpdateSliderMutation(); //Update Slider

  // post a Slider details
  const handleDataPost = (data) => {
    if (data?.slider[0]) {
      const formData = new FormData();
      let errorEncountered = false;

      const slider = data?.slider[0];
      const result = ImageValidate(slider, "slider"); //check image type
      if (result == true) {
        formData.append("slider", slider);
      } else {
        toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
        errorEncountered = true;
      }

      if (errorEncountered == true) {
        return;
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "slider") {
          formData.append(key, value);
        }
      });
      if(!data?.title){
        formData.append("title", sliderUpdateModalValue?.title);
      }
      if(!description){
        toast.error("Please fill up description")
        return;
      }
      formData.append('description', description);
      formData.append("_id", sliderUpdateModalValue?._id);
      updateSlider(formData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Slider update successfully !",
            {
              autoClose: 1000,
            }
          );
          refetch();
          reset();
          setSliderUpdateModal(false);
        } else {
          toast.error(result?.error?.data?.message);
        }
      });
    } else {
      const sendData = {
        title: data?.title || sliderUpdateModalValue?.title,
        url: data?.url || sliderUpdateModalValue?.url,
        description: data?.description || sliderUpdateModalValue?.description,
        slider: sliderUpdateModalValue?.slider,
        _id: sliderUpdateModalValue?._id
      }
      updateSlider(sendData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Slider update successfully !",
            {
              autoClose: 1000,
            }
          );
          refetch();
          reset();
          setSliderUpdateModal(false);
        } else {
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
            Update Slider{" "}
          </h3>
          <button className="btn bg-white hover:bg-white border p-1">
            <RxCross1
              onClick={() => setSliderUpdateModal(false)}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        <form onSubmit={handleSubmit(handleDataPost)}>
          <div className="mt-3">
            <label className="font-semibold" htmlFor="slider">
              Slider Image<span className="text-red-500"> if need</span>
            </label>
            <input
              placeholder="Image"
              {...register("slider")}
              id="slider"
              type="file"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>

          <div className="mt-3">
            <label className="font-semibold" htmlFor="title">
              Slider Title
            </label>
            <input
              defaultValue={sliderUpdateModalValue?.title}
              {...register("title", { required: "Slider Title is required" })}
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
              Slider Path
            </label>
            <input
              defaultValue={sliderUpdateModalValue?.url}
              {...register("url", { required: "Slider Path is required" })}
              id="url"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-1"
            />
            {errors.url && (
              <p className="text-red-600">{errors.url?.message}</p>
            )}
          </div>

          <div className="mt-3">
            <p className="mb-2 font-medium">Slider Description: </p>
            <ReactQuill theme="snow" value={description} onChange={setDescription} />
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={() => setSliderUpdateModal(false)}
              className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border"
            >
              Cancel
            </button>
            <button
              type="Submit"
              className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSlider;
