import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { useAddCategoryMutation } from "../../../redux/feature/category/categoryApi";
import slugify from "slugify";
import { ImageValidate } from "../../../utils/ImageValidation";

const AddCategory = ({ refetch }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const [postCategoryType] = useAddCategoryMutation(); //post Category type

  // post a Category
  const handleDataPost = (data) => {
    setLoading(true);
    const formData = new FormData();
    let errorEncountered = false;

    if (data?.category_logo[0]) {
      const category_logo = data?.category_logo[0];
      const result = ImageValidate(category_logo, "category_logo"); //check image type
      if (result == true) {
        formData.append("category_logo", category_logo);
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
      if (key !== "category_logo") {
        formData.append(key, value);
      }
    });
    const slug = slugify(data.category_name, {
      lower: true,
      replacement: "-",
    });
    formData.append("category_slug", slug);
    postCategoryType(formData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        setLoading(false);
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Category Added successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        reset();
      } else {
        setLoading(false);
        toast.error(result?.error?.data?.message);
      }
    });
  };

  return (
    <>
      <div className="my-10 bg-white border border-gray-200 rounded-xl">
        <div className="m-[30px]">
          {/* Add A Category Type */}
          <div>
            <h2 className="font-semibold text-[20px]">Add A Category Type: </h2>
            <p className="text-red-500">Image Size: 500px X 500px</p>

            <form
              onSubmit={handleSubmit(handleDataPost)}
              className="grid md:grid-cols-5 grid-cols-2 items-center gap-2 md:gap-6 mt-3"
            >
              <div>
                <input
                  placeholder="Category Name"
                  {...register("category_name", {
                    required: "Category Name is required",
                  })}
                  id="category_name"
                  type="text"
                  className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
                {errors.category_name && (
                  <p className="text-red-600">{errors.category_name?.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register("category_logo", {
                    required: "Logo is required",
                  })}
                  id="category_logo"
                  type="file"
                  className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
                {errors.category_logo && (
                  <p className="text-red-600">
                    {errors.category_logo?.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  placeholder="Category Serial"
                  {...register("category_serial", {
                    required: "Category Serial is required",
                  })}
                  id="category_serial"
                  type="number"
                  className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
                {errors.category_serial && (
                  <p className="text-red-600">{errors.category_serial?.message}</p>
                )}
              </div>

              <div>
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

export default AddCategory;
