import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import slugify from "slugify";
import { useUpdateCategoryMutation } from "../../../redux/feature/category/categoryApi";
import { ImageValidate } from "../../../utils/ImageValidation";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { useState } from "react";

const UpdateCategory = ({
  setCategoryUpdateModal,
  categoryUpdateModalValue,
  refetch,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const [updateCategory] = useUpdateCategoryMutation(); //Update Category

  // post a User details
  const handleDataPost = (data) => {
    setLoading(true);
    if (data?.category_logo[0]) {
      const formData = new FormData();
      let errorEncountered = false;

      const category_logo = data?.category_logo[0];
      const result = ImageValidate(category_logo, "category_logo"); //check image type
      if (result == true) {
        formData.append("category_logo", category_logo);
      } else {
        toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
        errorEncountered = true;
      }

      if (errorEncountered == true) {
        return;
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "category_logo") {
          formData.append(key, value);
        }
      });
      const slug = slugify(data.category_name, {
        lower: true,
        replacement: "-",
      });
      formData.append("category_slug", slug);
      formData.append("image_key", categoryUpdateModalValue?.image_key);
      formData.append("_id", categoryUpdateModalValue?._id);
      updateCategory(formData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Category update successfully !",
            {
              autoClose: 1000,
            }
          );
          refetch();
          reset();
          setCategoryUpdateModal(false);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(result?.error?.data?.message);
        }
      });
    } else {
      const sendData = {
        _id: categoryUpdateModalValue?._id,
        image_key: categoryUpdateModalValue?.image_key,
        category_logo: categoryUpdateModalValue?.category_logo,
        category_name: data?.category_name,
        category_serial: data?.category_serial,
        category_status: data?.category_status,
        category_slug: slugify(data.category_name, {
          lower: true,
          replacement: "-",
        }),
      };
      updateCategory(sendData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Category update successfully !",
            {
              autoClose: 1000,
            }
          );
          refetch();
          reset();
          setCategoryUpdateModal(false);
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
            Update Menu Type{" "}
          </h3>
          <button className="btn bg-white hover:bg-white border p-1">
            <RxCross1
              onClick={() => setCategoryUpdateModal(false)}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        <form onSubmit={handleSubmit(handleDataPost)}>
          <div className="mt-4">
            <input
              placeholder="Category Name"
              {...register("category_name", {
                required: "Category Name is required",
              })}
              defaultValue={categoryUpdateModalValue?.category_name}
              id="category_name"
              type="text"
              className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.category_name && (
              <p className="text-red-600">{errors.category_name?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <input
              {...register("category_logo")}
              id="category_logo"
              type="file"
              className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
          </div>

          <div className="mt-4">
            <input
              placeholder="Category Serial"
              {...register("category_serial", {
                required: "Category Serial is required",
              })}
              defaultValue={categoryUpdateModalValue?.category_serial}
              id="category_serial"
              type="number"
              className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.category_serial && (
              <p className="text-red-600">{errors.category_serial?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <select
              {...register("category_status", {
                required: "Category Status is required",
              })}
              id="category_status"
              className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
            >
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.category_status && (
              <p className="text-red-600">{errors.category_status?.message}</p>
            )}
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={() => setCategoryUpdateModal(false)}
              className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border"
            >
              Cancel
            </button>
            {
              loading ?
                <button
                  type="Submit"
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

export default UpdateCategory;
