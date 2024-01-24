import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useUpdateSliderMutation } from "../../../redux/feature/slider/sliderApi";
import { ImageValidate } from "../../../utils/ImageValidation";

const UpdateSlider = ({
  refetch,
  setSliderUpdateModal,
  sliderUpdateModalValue,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateSubCategory] = useUpdateSliderMutation(); //Update Category

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
      formData.append("_id", sliderUpdateModalValue?._id);
      updateSubCategory(formData).then((result) => {
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
      toast.error("Please add a photo");
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
              Slider Image<span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Image"
              {...register("slider", { required: "Image is required" })}
              id="slider"
              type="file"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.slider && (
              <p className="text-red-600">{errors.slider?.message}</p>
            )}
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
