import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import slugify from "slugify";
import { useAddCollectionMutation } from "../../../redux/feature/collection/collectionApi";
import { ImageValidate } from "../../../utils/ImageValidation";

const AddCollection = ({ refetch }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const [postCollectionType] = useAddCollectionMutation(); //post Coleection type

  // post a Collection
  const handleDataPost = (data) => {
    setLoading(true);
    const formData = new FormData();
    let errorEncountered = false;

    if (data?.collection_image[0]) {
      const collection_image = data?.collection_image[0];
      const result = ImageValidate(collection_image, "collection_image"); //check image type
      if (result == true) {
        formData.append("collection_image", collection_image);
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
      if (key !== "collection_image") {
        formData.append(key, value);
      }
    });
    const slug = slugify(data.collection_name, {
      lower: true,
      replacement: "-",
    });
    formData.append("slug", slug);

    postCollectionType(formData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        setLoading(false);
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Collection Added successfully !",
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

  return (
    <>
      <div className="my-10 bg-white border border-gray-200 rounded-xl">
        <div className="m-[30px]">
          {/* Add A Collection Type */}
          <div>
            <h2 className="font-semibold text-[20px]">
              Add A Collection Type:{" "}
            </h2>
            <p className="text-red-500">Image size: 1280px X 1280px</p>

            <form
              onSubmit={handleSubmit(handleDataPost)}
              className="flex items-center gap-2 md:gap-6 mt-3"
            >
              <div>
                <input
                  placeholder="Type Name"
                  {...register("collection_name", {
                    required: "Type Name is required",
                  })}
                  id="collection_name"
                  type="text"
                  className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
                {errors.collection_name && (
                  <p className="text-red-600">
                    {errors.collection_name?.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("collection_image", {
                    required: "Image is required",
                  })}
                  id="collection_image"
                  type="file"
                  className="block w-full px-1 py-1 bg-white border border-gray-200 rounded-xl"
                />
                {errors.collection_image && (
                  <p className="text-red-600">
                    {errors.collection_image?.message}
                  </p>
                )}
              </div>

              <button
                type="Submit"
                className="px-6 py-2 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]"
              >
                {loading ? <MiniSpinner /> : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCollection;
