import { useForm } from "react-hook-form";
import { useUpdateSub_CategoryMutation } from "../../../redux/feature/subCategory/subCategoryApi";
import { toast } from "react-toastify";
import slugify from "slugify";
import { RxCross1 } from "react-icons/rx";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { useState } from "react";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import BigSpinner from "../../../shared/loader/BigSpinner";
import Select from "react-select";

const UpdateSubCategory = ({
  refetch,
  setSubCategoryUpdateModal,
  subCategoryUpdateModalValue,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [category_id, setCategoryId] = useState(subCategoryUpdateModalValue?.category_id?._id);

  const categoryIdValue = subCategoryUpdateModalValue?.category_id?._id;
  const categoryNameValue = subCategoryUpdateModalValue?.category_id?.category_name;

  const { data: categoryTypes = [], isLoading } = useQuery({
    queryKey: [`/api/v1/category/dashboard`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/category/dashboard`);
      const data = await res.json();
      return data;
    },
  }); // get Category type

  const [updateSubCategory] = useUpdateSub_CategoryMutation(); //Update Category

  // post a User details
  const handleDataPost = (data) => {
    setLoading(true);
    const sendData = {
      category_id: category_id,
      _id: subCategoryUpdateModalValue?._id,
      sub_category_name: data?.sub_category_name,
      sub_category_serial: data?.sub_category_serial,
      sub_category_status: data?.sub_category_status,
      sub_category_slug: slugify(data.sub_category_name, {
        lower: true,
        replacement: "-",
      }),
    };
    updateSubCategory(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Sub category update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        reset();
        setLoading(false);
        setSubCategoryUpdateModal(false);
      } else {
        toast.error(result?.error?.data?.message);
        setLoading(false);
      }
    });
  };

  if (isLoading) {
    return <BigSpinner />
  }

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
              onClick={() => setSubCategoryUpdateModal(false)}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        <form onSubmit={handleSubmit(handleDataPost)}>
          <div className="mt-4">
            <input
              placeholder="Sub Category Name"
              {...register("sub_category_name", {
                required: "Sub Category Name is required",
              })}
              defaultValue={subCategoryUpdateModalValue?.sub_category_name}
              id="sub_category_name"
              type="text"
              className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.sub_category_name && (
              <p className="text-red-600">{errors.sub_category_name?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <input
              placeholder="Category Serial"
              {...register("sub_category_serial", {
                required: "Category Serial is required",
              })}
              defaultValue={subCategoryUpdateModalValue?.sub_category_serial}
              id="sub_category_serial"
              type="number"
              className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
            />
            {errors.sub_category_serial && (
              <p className="text-red-600">{errors.sub_category_serial?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <select
              {...register("sub_category_status", {
                required: "Sub Category Status is required",
              })}
              id="sub_category_status"
              className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
            >
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.sub_category_status && (
              <p className="text-red-600">{errors.sub_category_status?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <Select
              id="category_id"
              name="category_id"
              required
              aria-label="Category Type"
              defaultValue={{
                _id: categoryIdValue,
                category_name: categoryNameValue,
              }}
              options={categoryTypes?.data}
              getOptionLabel={(x) => x?.category_name}
              getOptionValue={(x) => x?._id}
              onChange={(selectedOption) =>
                setCategoryId(selectedOption?._id)
              }
            ></Select>
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <button
              onClick={() => setSubCategoryUpdateModal(false)}
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

export default UpdateSubCategory;
