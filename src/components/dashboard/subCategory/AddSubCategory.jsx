import { useForm } from "react-hook-form";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { toast } from "react-toastify";
import { useState } from "react";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import slugify from "slugify";
import { useAddSub_CategoryMutation } from "../../../redux/feature/subCategory/subCategoryApi";
import Select from "react-select";

const AddSubCategory = ({ refetch }) => {
  const [category_id, setcategory_id] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const { data: categoryTypes = [], isLoading } = useQuery({
    queryKey: [`/api/v1/category/dashboard`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/category/dashboard`);
      const data = await res.json();
      return data;
    },
  }); // get Category type

  const [postSubCategoryType] = useAddSub_CategoryMutation(); //post Sub Category type

  // post a Sub Category
  const handleDataPost = (data) => {
    setLoading(true);
    const slug = slugify(data.sub_category_name, {
      lower: true,
      replacement: "-",
    });
    const sendData = {
      category_id: category_id,
      sub_category_name: data?.sub_category_name,
      sub_category_serial: data?.sub_category_serial,
      sub_category_status: data?.sub_category_status,
      sub_category_slug: slug
    }
    postSubCategoryType(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        setLoading(false);
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Sub Category Added successfully !",
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
          {/* Add A Sub Category Type */}
          <div>
            <h2 className="font-semibold text-[20px]">
              Add A Sub Category Type:{" "}
            </h2>

            <form
              onSubmit={handleSubmit(handleDataPost)}
              className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 items-center gap-2 md:gap-6 mt-3"
            >
              <div>
                <input
                  placeholder="Type Name"
                  {...register("sub_category_name", {
                    required: "Type Name is required",
                  })}
                  id="sub_category_name"
                  type="text"
                  className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
                {errors.sub_category_name && (
                  <p className="text-red-600">{errors.sub_category_name?.message}</p>
                )}
              </div>

              <div>
                <input
                  placeholder="Sub Category Serial"
                  {...register("sub_category_serial", {
                    required: "Sub Category Serial is required",
                  })}
                  id="sub_category_serial"
                  type="number"
                  className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
                {errors.sub_category_serial && (
                  <p className="text-red-600">{errors.sub_category_serial?.message}</p>
                )}
              </div>

              <div>
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

              <div>
                <Select
                  id="category_id"
                  name="category_id"
                  required
                  aria-label="Category Type"
                  options={categoryTypes?.data}
                  getOptionLabel={(x) => x?.category_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) =>
                    setcategory_id(selectedOption?._id)
                  }
                ></Select>
              </div>

              {
                loading ?
                  <button
                    type="button"
                    className="px-6 py-2 mt-6 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]"
                  >
                    <MiniSpinner />
                  </button>
                  :
                  <button
                    type="Submit"
                    className="px-6 py-2 mt-6 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]"
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

export default AddSubCategory;
