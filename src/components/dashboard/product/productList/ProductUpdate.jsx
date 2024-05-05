import { Controller, useFieldArray, useForm } from "react-hook-form";
import BigSpinner from "../../../../shared/loader/BigSpinner";
import { BASE_URL } from "../../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import slugify from "slugify";
import { useUpdateProductMutation } from "../../../../redux/feature/product/productApi";
import ImageUploader from "../productCreate/ImageUploader";
import { RxCross1 } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import ReactQuill from "react-quill";
import { ImageValidate } from "../../../../utils/ImageValidation";
// import { VideoValidate } from "../../../../utils/VideoValidation";
import MiniSpinner from "../../../../shared/loader/MiniSpinner";
// import VideoUploaders from "../../setting/VideoUploaders";

const ProductUpdate = ({ setIsUpdateModalOpen, updateModalValue, refetch }) => {
  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState(updateModalValue?.product_description);

  const [oldVariation, setOldVariation] = useState(
    updateModalValue?.product_size_variation
  );
  // select field data
  const [colorName, setColorName] = useState(updateModalValue?.product_color_id?.color_name);
  const [colorId, setColorId] = useState(updateModalValue?.product_color_id?._id);
  const [subcategory, setSubCategory] = useState(
    updateModalValue?.sub_category_id?._id
  );
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [categoryIdForSubCategory, setCategoryIdForSubCategory] = useState(
    updateModalValue?.category_id?._id
  );

  const colorNameValue =
    updateModalValue?.product_color_id?.color_name;
  const colorNameId = updateModalValue?.product_color_id?._id;
  let categoryNameValue =
    updateModalValue?.category_id?.category_name;
  let categoryNameId = updateModalValue?.category_id?._id;
  let subCategoryNameValue =
    updateModalValue?.sub_category_id?.sub_category_name;
  let subCategoryNameId = updateModalValue?.sub_category_id?._id;
  const [isOpenSubCategory, setIsOpenSubCategory] = useState(true);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      product_size_variation: [
        { size: "", quantity: "", price: "", discount_price: "", description: "" },
      ],
    },
  }); //get data in form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product_size_variation",
  }); //variation data handle

  const {
    data: colors = [],
    isLoading
  } = useQuery({
    queryKey: ["/api/v1/color"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/color`);
      const data = await res.json();
      return data;
    },
  }); // get Color type

  const setColorIdValue = (color) => {
    setColorName(color?.color_name);
    setColorId(color?._id);
  };

  const { data: categories = [] } = useQuery({
    queryKey: [`/api/v1/category/dashboard`],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/category/dashboard`
      );
      const data = await res.json();
      return data;
    },
  }); // get Category type

  const { data: subCategories = [] } = useQuery({
    queryKey: [
      `/api/v1/sub_category/dashboard`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/sub_category/dashboard`
      );
      const data = await res.json();
      return data;
    },
  }); // get Sub Category type

  const handleCategoryToSubCategory = (category) => {
    setIsOpenSubCategory(false);
    setTimeout(() => {
      setCategoryIdForSubCategory(category?._id);
      setSubCategory("");
      setIsOpenSubCategory(true);
    }, 100);
  };

  useEffect(() => {
    const getSubCategoryData = subCategories?.data?.filter(
      (sub_category) => sub_category?.category_id?._id === categoryIdForSubCategory
    );
    setSubCategoryData(getSubCategoryData);
  }, [subCategories?.data, categoryIdForSubCategory]);

  const handleDeleteOldVariation = (data) => {
    setOldVariation(oldVariation.filter((item) => item._id !== data._id));
  };

  const [updateProduct] = useUpdateProductMutation(); //Add product

  // image upload start
  const fileInputRefs = useRef([]);
  const multiInputRefs = useRef([]);
  const [imageName, setImageName] = useState(updateModalValue?.product_thumbnail);
  const [multiImage, setMultiImage] = useState(updateModalValue?.product_images);

  const handleOnChange = async (fieldName) => {
    if (fieldName[0]) {
      const validate_image = fieldName[0];
      const result = ImageValidate(validate_image, "category_image"); //check image type
      if (result == false) {
        toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
        return;
      }
      if (!imageName) {
        toast.error("Please wait a minute", {
          autoClose: 1000,
        });
        const image = await ImageUploader(fieldName[0]);
        if (image[1] == true) {
          const updatedImage = image[0];
          setImageName(updatedImage);
          toast.success("Now Add Another Picture", {
            autoClose: 1000,
          });
        } else toast.error("Something Wrong");
      } else {
        toast.error("Delete the previous image first", {
          autoClose: 1000,
        });
      }
    } else {
      toast.error("Please select a image", {
        autoClose: 1000,
      });
    }
  };

  const handleMuilOnChange = async (fieldName) => {
    if (fieldName[0]) {
      const validate_image = fieldName[0];
      const result = ImageValidate(validate_image, "category_image"); //check image type
      if (result == false) {
        toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
        return;
      }
      if (multiImage.length >= 11) {
        toast.error("only 10 images are allowed", {
          autoClose: 1000,
        });
      } else {
        toast.error("Please wait a minute", {
          autoClose: 1000,
        });
        if (multiImage?.length == 0) {
          const image = await ImageUploader(fieldName[0]);
          console.log(image)
          if (image[1] == true) {
            const updatedImage = [...multiImage, image[0]];
            setMultiImage(updatedImage);
            toast.success("Now Add Another Picture", {
              autoClose: 1000,
            });
          } else
            toast.error("Something Wrong", {
              autoClose: 1000,
            });
        } else {
          const image = await ImageUploader(fieldName[0]);
          if (image[1] == true) {
            const updatedImage = [...multiImage, { image: image[0] }];
            setMultiImage(updatedImage);
            toast.success("Now Add Another Picture", {
              autoClose: 1000,
            });
          } else
            toast.error("Something Wrong", {
              autoClose: 1000,
            });
        }
      }
    } else {
      toast.error("Please select a image", {
        autoClose: 1000,
      });
    }
  };

  const handleDeleteImg = () => {
    fileInputRefs.current.forEach((inputRef) => {
      inputRef.value = "";
    });
    setImageName("");
  };

  const handleMuilDelete = (item) => {
    const mulImage = multiImage?.filter((image) => image !== item);
    setMultiImage(mulImage);
  };

  //image upload end

  // data post in backend
  const handleDataPost = async (data) => {
    setLoading(true)
    if (!description) {
      toast.error("Error: Please fill in the product description box.");
      setLoading(false)
      return;
    }
    if (data?.product_size_variation?.length > 0) {
      const hasEmptySizeOrColor = data?.product_size_variation.some(
        (variation) =>
          variation?.size === "" ||
          variation?.size === null ||
          variation?.size === undefined ||
          variation?.quantity === "" ||
          variation?.quantity === null ||
          variation?.quantity === undefined
      );
      if (hasEmptySizeOrColor) {
        toast.error(
          "Error: Please fill in the size and quantity for all size variations."
        );
        setLoading(false)
        return; // Stop the function
      }
    }

    if (!imageName) {
      toast.error("Error: Please fill the main image.");
      setLoading(false)
      return; // Stop the function
    }

    if (!categoryIdForSubCategory) {
      toast.error("Error: Please fill the category.");
      setLoading(false)
      return; // Stop the function
    }

    if (multiImage?.length == 0) {
      toast.error(
        "Error: Please fill atleast one image in another image field."
      );
      setLoading(false)
      return; // Stop the function
    }
    const combinedVariation = oldVariation.concat(data?.product_size_variation || []);
    const slug = colorName + " " + data?.product_name;

    const sendData = {
      product_name: data?.product_name,
      product_related_slug: slugify(data?.product_name, {
        lower: true,
        replacement: "-",
      }),
      product_slug: slugify(slug, {
        lower: true,
        replacement: "-",
      }),
      product_description: description,
      product_price: data?.product_price,
      product_discount_price: data?.product_discount_price,
      product_size_variation: combinedVariation?.map((item) => ({
        size: item?.size,
        quantity: item?.quantity,
        price: item?.price,
        discount_price: item?.discount_price,
        description: item?.description
      })),
      product_thumbnail: imageName,
      product_images: multiImage?.map((item) => ({
        image: item?.image,
      })),
      product_color_id: colorId,
      category_id: categoryIdForSubCategory,
      _id: updateModalValue?._id,
      sub_category_id: subcategory,
      product_quantity: data?.product_quantity
    };
    if (subcategory == "" || subcategory == undefined || subcategory == null) {
      delete sendData.sub_category_id
    }
    updateProduct(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Product Added successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        setImageName("");
        setMultiImage([]);
        refetch();
        setLoading(false)
        setIsUpdateModalOpen(false);
      } else {
        toast.error(result?.error?.data?.message);
        setLoading(false)
      }
    });
  };


  if (isLoading) {
    <BigSpinner />;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-10/12 p-6 max-h-[90vh] overflow-y-auto">
          <div className="mt-4 bg-white">
            <div className="p-1">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-[20px] mt-2">
                  Product Information Update
                </h4>
                <button className="btn bg-white hover:bg-white border p-1">
                  <RxCross1
                    onClick={() => setIsUpdateModalOpen(false)}
                    size={25}
                  ></RxCross1>
                </button>
              </div>
              <hr className="mt-2 mb-4" />

              <form onSubmit={handleSubmit(handleDataPost)}>
                <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
                  <div>
                    <label className="font-semibold" htmlFor="product_name">
                      {" "}
                      Product Name<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      defaultValue={updateModalValue?.product_name}
                      {...register("product_name", {
                        required: "Product Name is required",
                      })}
                      id="product_name"
                      type="text"
                      className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                    />
                    {errors.product_name && (
                      <p className="text-red-600">{errors.product_name?.message}</p>
                    )}
                  </div>

                  <div className="mt-2">
                    <label className="font-semibold" htmlFor="color">
                      {" "}
                      Select Color<span className="text-red-500">*</span>{" "}
                    </label>
                    <Select
                      id="color"
                      name="color"
                      required
                      aria-label="Select a sub category"
                      defaultValue={{
                        _id: colorNameId,
                        color_name: colorNameValue,
                      }}
                      options={colors?.data}
                      getOptionLabel={(x) => x?.color_name}
                      getOptionValue={(x) => x?._id}
                      onChange={(selectedOption) => setColorIdValue(selectedOption)}
                    ></Select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="font-semibold" htmlFor="description">
                    Description<span className="text-red-500">*</span>
                  </label>
                  <ReactQuill
                    className="mt-4"
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-3">
                  <div>
                    <label className="font-semibold" htmlFor="product_price">
                      Price<span className="text-red-500">*</span>
                    </label>
                    <input
                      defaultValue={updateModalValue?.product_price}
                      {...register("product_price", { required: "Price must be required" })}
                      id="product_price"
                      type="number"
                      min={1}
                      className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                    />
                    {errors.product_price && (
                      <p className="text-red-600">{errors.product_price?.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-semibold" htmlFor="product_discount_price">
                      Discount Price
                    </label>
                    <input
                      defaultValue={updateModalValue?.product_discount_price}
                      {...register("product_discount_price")}
                      id="product_discount_price"
                      min={1}
                      type="number"
                      className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-semibold" htmlFor="product_quantity">
                      Quantity
                    </label>
                    <input
                      defaultValue={updateModalValue?.product_quantity}
                      {...register("product_quantity")}
                      id="product_quantity"
                      min={1}
                      type="number"
                      className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid gap-6 mt-4 grid-cols-2">
                  <div>
                    <label className="font-semibold" htmlFor="category_id">
                      Category Type
                    </label>
                    <Select
                      id="category_id"
                      name="category_id"
                      required
                      isClearable
                      aria-label="Select a menu"
                      defaultValue={{
                        _id: categoryNameId,
                        category_name: categoryNameValue,
                      }}
                      options={categories?.data}
                      getOptionLabel={(x) => x?.category_name}
                      getOptionValue={(x) => x?._id}
                      onChange={(selectedOption) =>
                        handleCategoryToSubCategory(selectedOption)
                      }
                    ></Select>
                  </div>


                  {isOpenSubCategory && (
                    <div>
                      <label className="font-semibold" htmlFor="subCategoryId">
                        Sub Category Type
                      </label>
                      <Select
                        id="subCategoryId"
                        isClearable
                        name="subCategoryId"
                        aria-label="Select a sub category"
                        defaultValue={{
                          _id: subCategoryNameId,
                          sub_category_name: subCategoryNameValue,
                        }}
                        options={subCategoryData}
                        getOptionLabel={(x) => x?.sub_category_name}
                        getOptionValue={(x) => x?._id}
                        onChange={(selectedOption) =>
                          setSubCategory(selectedOption?._id)
                        }
                      ></Select>
                    </div>
                  )}
                </div>

                {/* Image add */}
                <div className="mt-3">
                  <div className="grid grid-cols-2 gap-8">
                    {/* <Backlink link="/register/hotel/hotel-details-completion" text="Back" /> */}
                    <div>
                      <p className="font-semibold text-red-500">
                        Main image size: 1280px X 1280px
                      </p>
                      {/*   */}
                      <div className="border border-gray-300 p-3 rounded-sm">
                        {imageName ? (
                          <div className="h-[70px] w-[100px] rounded-md relative">
                            <img
                              src={imageName}
                              alt="image"
                              height={0}
                              width={0}
                              sizes="100vw"
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "5px",
                              }}
                            />
                            <button
                              className="absolute top-0 left-0 bg-gray-100 w-7 h-7 rounded-full text-sm hover:text-red-500 mb-3"
                              type="button"
                              onClick={handleDeleteImg}
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                        <input
                          type="file"
                          onChange={(e) => handleOnChange(e.target.files)}
                          className="file-input w-full max-w-xs mt-3"
                          ref={(ref) => (fileInputRefs.current[0] = ref)}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-red-500">
                        Other images size: 1280px X 1280px{" "}
                      </p>
                      <div className="border border-gray-300 rounded-sm p-3">
                        <div className="">
                          {multiImage?.length >= 0 ? (
                            <div className="rounded-md flex items-center justify-start gap-3">
                              {multiImage?.map((image, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={image?.image}
                                    alt="image"
                                    height={0}
                                    width={0}
                                    sizes="100vw"
                                    style={{
                                      width: "100px",
                                      height: "70px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                  <button
                                    className="absolute top-0 left-0 bg-gray-100 w-7 h-7 rounded-full text-sm hover:text-red-500 mb-3"
                                    type="button"
                                    onClick={() => handleMuilDelete(image)}
                                  >
                                    X
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        {Array.from({ length: 1 }).map((_, index) => (
                          <input
                            key={index}
                            type="file"
                            onChange={(e) => handleMuilOnChange(e.target.files)}
                            className="file-input w-full max-w-xs mt-3"
                            ref={(ref) => (multiInputRefs.current[index] = ref)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>


                <h1 className="font-semibold text-xl mt-4">
                  Product Variation:{" "}
                </h1>
                {
                  oldVariation && (
                    <>
                      <table className="min-w-full divide-y-2 divide-gray-200 text-sm border border-gray-300 mt-4 rounded-xl">
                        <thead>
                          <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                              Size
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                              Quantity
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                              Price
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                              Discount Price
                            </th>
                            <th className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap">
                              Action
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                          {oldVariation?.map((variation) => (
                            <tr key={variation?._id}>
                              <td className="whitespace-nowrap px-4 py-2 font-semibold">
                                {variation?.size}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-semibold">
                                {variation?.quantity}
                              </td>
                              <td
                                className={`whitespace-nowrap px-4 py-2 font-semibold`}
                              >
                                {variation?.price}
                              </td>
                              <td
                                className={`whitespace-nowrap px-4 py-2 font-semibold`}
                              >
                                {variation?.discount_price}
                              </td>

                              <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                                <MdDeleteForever
                                  onClick={() =>
                                    handleDeleteOldVariation(variation)
                                  }
                                  className="cursor-pointer text-red-500 hover:text-red-300"
                                  size={25}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )
                }


                <div className="mt-10 border p-5 border-gray-300 rounded-md">
                  <label className="font-semibold" htmlFor="ads_topBadge">
                    Size Variations:{" "}
                  </label>
                  {fields.map((variation, index) => (
                    <div
                      key={variation.id}

                    >
                      <p className=" mt-4">Please fill up all required value:</p>
                      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-2 mb-28">
                        <Controller
                          name={`product_size_variation[${index}].size`}
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              placeholder="Size..."
                              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl h-10"
                            />
                          )}
                        />
                        <Controller
                          name={`product_size_variation[${index}].quantity`}
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              placeholder="Quantity..."
                              type="number"
                              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl h-10"
                            />
                          )}
                        />
                        <Controller
                          name={`product_size_variation[${index}].price`}
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="number"
                              placeholder="Price..."
                              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl h-10"
                            />
                          )}
                        />
                        <Controller
                          name={`product_size_variation[${index}].discount_price`}
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="number"
                              placeholder="Discount Price..."
                              className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl h-10"
                            />
                          )}
                        />
                        <Controller
                          name={`product_size_variation[${index}].description`}
                          control={control}
                          render={({ field }) => (
                            <ReactQuill
                              theme="snow" // or 'bubble'
                              value={field.value}
                              onChange={(content) => {
                                field.onChange(content);
                              }}
                              placeholder="Value..."
                              className="h-20"
                            />
                          )}
                        />
                        <button
                          type="button"
                          className="mt-2 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A] h-10"
                          onClick={() => append({})}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="mt-2 text-white transition-colors duration-300 transform bg-red-500 rounded-xl hover:bg-red-600 h-10"
                          onClick={() => remove(index)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  ))}
                </div>


                {
                  loading ?
                    <div className="flex justify-end mt-6">
                      <button
                        type="button"
                        className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#00B7E9] rounded-xl hover:bg-[#00B7E9]"
                      >
                        <MiniSpinner />
                      </button>
                    </div>
                    :
                    <div className="flex justify-end mt-6">
                      <button
                        type="Submit"
                        className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#00B7E9] rounded-xl hover:bg-[#00B7E9]"
                      >
                        Create
                      </button>
                    </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductUpdate;
