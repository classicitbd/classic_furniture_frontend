import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { RxCross1 } from "react-icons/rx";
import { useUpdateStyleMutation } from "../../../redux/feature/style/styleApi";

const UpdateStyle = ({
  refetch,
  setStyleUpdateModal,
  styleUpdateModalValue,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateStyle] = useUpdateStyleMutation(); //Update Style

  // post a Style details
  const handleDataPost = (data) => {
    const sendData = {
      _id: styleUpdateModalValue?._id,
      style: data?.style,
      slug: slugify(data.style, {
        lower: true,
        replacement: "-",
      }),
    };
    updateStyle(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Style update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        reset();
        setStyleUpdateModal(false);
      } else {
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
            Update Style{" "}
          </h3>
          <button className="btn bg-white hover:bg-white border p-1">
            <RxCross1
              onClick={() => setStyleUpdateModal(false)}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        <form onSubmit={handleSubmit(handleDataPost)}>
          <div className="mt-3">
            <label className="font-semibold" htmlFor="style">
              Style Type<span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Style Types"
              {...register("style", { required: "Style Types is required" })}
              id="style"
              type="text"
              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
              defaultValue={styleUpdateModalValue?.style}
            />
            {errors.style && (
              <p className="text-red-600">{errors.style?.message}</p>
            )}
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={() => setStyleUpdateModal(false)}
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

export default UpdateStyle;
