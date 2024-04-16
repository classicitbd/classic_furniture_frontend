import { Controller, useFieldArray, useForm } from "react-hook-form";
import BigSpinner from "../../../../shared/loader/BigSpinner";
import { BASE_URL } from "../../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useContext } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import slugify from "slugify";
import { useUpdateProductMutation } from "../../../../redux/feature/product/productApi";
import ImageUploader from "../productCreate/ImageUploader";
import { RxCross1 } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import { AuthContext } from "../../../../context/AuthProvider";
import VideoUploader from "../../setting/VideoUploader";
import ReactQuill from "react-quill";
import { ImageValidate } from "../../../../utils/ImageValidation";
import { VideoValidate } from "../../../../utils/VideoValidation";
import MiniSpinner from "../../../../shared/loader/MiniSpinner";

const ProductUpdate = ({ setIsUpdateModalOpen, updateModalValue, refetch }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState(updateModalValue?.description);

  const [oldVariation, setOldVariation] = useState(
    updateModalValue?.size_variation
  );
  // select field data
  const [colorName, setColorName] = useState(updateModalValue?.colorId?.color);
  const [colorId, setColorId] = useState(updateModalValue?.colorId?._id);
  const [subcategory, setSubCategory] = useState(
    updateModalValue?.subCategoryId?._id
  );
  const [collection, setCollection] = useState(
    updateModalValue?.collectionId?._id
  );
  const [style, setStyle] = useState(updateModalValue?.styleId?._id);
  const [feature, setFeature] = useState(updateModalValue?.featureId?._id);

  const [menuIdForCategory, setMenuIdForCategory] = useState(
    updateModalValue?.menuId?._id
  );

  const [categoryIdForSubCategory, setCategoryIdForSubCategory] = useState(
    updateModalValue?.categoryId?._id
  );

  const colorNameValue =
    updateModalValue?.colorId?.color;
  const colorNameId = updateModalValue?.colorId?._id;
  const menuNameValue =
    updateModalValue?.menuId?.menu;
  const menuNameId = updateModalValue?.menuId?._id;
  let categoryNameValue =
    updateModalValue?.categoryId?.category;
  let categoryNameId = updateModalValue?.categoryId?._id;
  let subCategoryNameValue =
    updateModalValue?.subCategoryId?.sub_category;
  let subCategoryNameId = updateModalValue?.subCategoryId?._id;
  const collectionNameValue =
    updateModalValue?.collectionId?.collection_name;
  const collectionNameId = updateModalValue?.collectionId?._id;
  const styleNameValue =
    updateModalValue?.styleId?.style
  const styleNameId = updateModalValue?.styleId?._id;
  const featureNameValue =
    updateModalValue?.featureId?.feature;
  const featureNameId = updateModalValue?.featureId?._id;

  const [isChangeMenu, setIsChangeMenu] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(true);
  const [isChangeCategory, setIsChangeCategory] = useState(true);

  const [isOpenSubCategory, setIsOpenSubCategory] = useState(true);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      size_variation: [
        { size: "", quantity: "", price: "", discount_price: "" },
      ],
    },
  }); //get data in form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "size_variation",
  }); //variation data handle

  const handleDeleteOldVariation = (data) => {
    setOldVariation(oldVariation.filter((item) => item._id !== data._id));
  };

  const [updateProduct] = useUpdateProductMutation(); //Add product

  const { data: colors = [], isLoading } = useQuery({
    queryKey: ["/api/v1/color"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/color`);
      const data = await res.json();
      return data;
    },
  }); // get Color type

  const { data: menus = [] } = useQuery({
    queryKey: ["/api/v1/menu"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/menu`);
      const data = await res.json();
      return data;
    },
  }); // get Menu type

  const { data: collections = [] } = useQuery({
    queryKey: ["/api/v1/collection"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/collection`);
      const data = await res.json();
      return data;
    },
  }); // get Collection type

  const { data: styles = [] } = useQuery({
    queryKey: ["/api/v1/style"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/style`);
      const data = await res.json();
      return data;
    },
  }); // get Style type

  const { data: features = [] } = useQuery({
    queryKey: ["/api/v1/feature"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/feature`);
      const data = await res.json();
      return data;
    },
  }); // get Feature type

  const handleMenuToCategory = (menu) => {
    setIsOpenSubCategory(false);
    setIsOpenCategory(false);
    setIsChangeMenu(true)
    setTimeout(() => {
      setMenuIdForCategory(menu?._id);
      setIsOpenCategory(true);
      setCategoryIdForSubCategory("");
      setSubCategory("");
    }, 100)
  };

  const setColorIdValue = (color) => {
    setColorName(color?.color);
    setColorId(color?._id);
  };

  const handleCategoryToSubCategory = (category) => {
    setIsOpenSubCategory(false);
    setIsChangeCategory(true)
    setTimeout(() => {
      setCategoryIdForSubCategory(category?._id);
      setSubCategory("");
      setIsOpenSubCategory(true);
    }, 100)
  };

  const { data: categories = [] } = useQuery({
    queryKey: [`/api/v1/category/menuId?menuId=${menuIdForCategory}`],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/category/menuId?menuId=${menuIdForCategory}`
      );
      const data = await res.json();
      return data;
    },
  }); // get Category type

  const { data: subCategories = [] } = useQuery({
    queryKey: [
      `/api/v1/sub_category/menuIdAndCategoryId?menuId=${menuIdForCategory}&categoryId=${categoryIdForSubCategory}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/sub_category/menuIdAndCategoryId?menuId=${menuIdForCategory}&categoryId=${categoryIdForSubCategory}`
      );
      const data = await res.json();
      return data;
    },
  }); // get Sub Category type

  if (isLoading) {
    <BigSpinner />;
  }

  // image upload start
  const fileInputRefs = useRef([]);
  const fileInputRefsHover = useRef([]);
  const multiInputRefs = useRef([]);
  const [imageName, setImageName] = useState(updateModalValue?.thumbnail_image);
  const [hoverImageName, sethoverImageName] = useState(
    updateModalValue?.hover_image
  );
  const [multiImage, setMultiImage] = useState(updateModalValue?.images);

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

  const handleHoverImageOnChange = async (fieldName) => {
    if (fieldName[0]) {
      const validate_image = fieldName[0];
      const result = ImageValidate(validate_image, "category_image"); //check image type
      if (result == false) {
        toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
        return;
      }
      if (!hoverImageName) {
        toast.error("Please wait a minute", {
          autoClose: 1000,
        });
        const image = await ImageUploader(fieldName[0]);
        if (image[1] == true) {
          const updatedImage = image[0];
          sethoverImageName(updatedImage);
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
            const updatedImage = [...multiImage, image[0]];
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

  const handleDeleteHoverImg = () => {
    fileInputRefsHover.current.forEach((inputRef) => {
      inputRef.value = "";
    });
    sethoverImageName("");
  };

  const handleMuilDelete = (item) => {
    const mulImage = multiImage.filter((image) => image !== item);
    setMultiImage(mulImage);
  };

  //image upload end

  // data post in backend
  const handleDataPost = async (data) => {
    setLoading(true)
    const hasEmptySizeOrColor = data.size_variation.some(
      (variation) =>
        variation.size === "" ||
        variation.size === null ||
        variation.size === undefined ||
        variation.quantity === "" ||
        variation.quantity === null ||
        variation.quantity === undefined
    );

    if (hasEmptySizeOrColor) {
      toast.error(
        "Error: Please fill in the size and quantity for all size variations.", {
        autoClose: 1000
      }
      );
      setLoading(false)
      return; // Stop the function
    }
    toast.error("Please wait a moment", {
      autoClose: 1000
    });
    let product_video;
    if (data?.product_video?.[0]) {
      const productVideoValidate = data?.product_video?.[0];
      const result = VideoValidate(productVideoValidate); //check image type
      if (result == false) {
        toast.error("Must be a mp4 type video in product video field");
        setLoading(false)
        return;
      }
    }
    if (data?.product_video?.[0]) {
      const videoUpload = await VideoUploader(data?.product_video?.[0]);
      product_video = videoUpload[0];
    }

    if (!imageName) {
      toast.error("Error: Please fill the main image.", {
        autoClose: 1000
      });
      setLoading(false)
      return; // Stop the function
    }

    if (!hoverImageName) {
      toast.error("Error: Please fill the hover image.", {
        autoClose: 1000
      });
      setLoading(false)
      return; // Stop the function
    }

    if (multiImage?.length == 0) {
      toast.error(
        "Error: Please fill atleast one image in another image field.", {
        autoClose: 1000
      }
      );
      setLoading(false)
      return; // Stop the function
    }
    const combinedVariation = oldVariation.concat(data?.size_variation || []);

    const slug =
      colorName + " " + (data?.title ? data?.title : updateModalValue?.title);

    const sendData = {
      _id: updateModalValue?._id,
      phone: user?.phone,
      title: data?.title ? data?.title : updateModalValue?.title,
      related: slugify(data?.title ? data?.title : updateModalValue?.title, {
        lower: true,
        replacement: "-",
      }),
      slug: slugify(slug, {
        lower: true,
        replacement: "-",
      }),
      description: description
        ? description
        : updateModalValue?.description,
      price: data?.price ? data?.price : updateModalValue?.price,
      discount_price: data?.discount_price ? data?.discount_price : null,
      size_variation: combinedVariation?.map((item) => ({
        size: item?.size,
        quantity: item?.quantity,
        price: item?.price,
        discount_price: item?.discount_price,
      })),
      thumbnail_image: imageName,
      hover_image: hoverImageName,
      images: multiImage?.map((item) => ({
        image: item?.image,
      })),
      colorId: colorId,
      menuId: menuIdForCategory
    };
    if (product_video) {
      sendData.product_video = product_video;
    }
    if (menuIdForCategory !== "" && menuIdForCategory !== undefined) {
      sendData.menuId = menuIdForCategory;
    }
    if (categoryIdForSubCategory !== "" && categoryIdForSubCategory !== undefined) {
      sendData.categoryId = categoryIdForSubCategory;
    }
    if (subcategory !== "" && subcategory !== undefined) {
      sendData.subCategoryId = subcategory;
    }
    if (collection !== "" && collection !== undefined) {
      sendData.collectionId = collection;
    }
    if (style !== "" && style !== undefined) {
      sendData.styleId = style;
    }
    if (feature !== "" && feature !== undefined) {
      sendData.featureId = feature;
    }
    updateProduct(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Product Update successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        setImageName("");
        sethoverImageName("");
        setMultiImage([]);
        refetch();
        setLoading(false)
        setIsUpdateModalOpen(false);
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000
        });
        setLoading(false)
      }
    });
  };

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
                    <label className="font-semibold" htmlFor="title">
                      {" "}
                      Product Name<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      defaultValue={updateModalValue?.title}
                      {...register("title", {
                        required: "Product Name is required",
                      })}
                      id="title"
                      type="text"
                      className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                    />
                    {errors.title && (
                      <p className="text-red-600">{errors.title?.message}</p>
                    )}
                  </div>

                  <div className="mt-3">
                    <label className="font-semibold" htmlFor="color">
                      Select Color<span className="text-red-500">*</span>{" "}
                    </label>
                    <Select
                      id="color"
                      name="color"
                      isClearable
                      required
                      defaultValue={{
                        _id: colorNameId,
                        color: colorNameValue,
                      }}
                      options={colors?.data}
                      getOptionLabel={(x) => x?.color}
                      getOptionValue={(x) => x?._id}
                      onChange={(selectedOption) =>
                        setColorIdValue(selectedOption)
                      }
                    ></Select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="font-semibold" htmlFor="description">
                    Description<span className="text-red-500">*</span>
                  </label>
                  <ReactQuill className='mt-4' theme="snow" value={description} onChange={setDescription} />
                </div>

                <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
                  <div>
                    <label className="font-semibold" htmlFor="price">
                      Price<span className="text-red-500">*</span>
                    </label>
                    <input
                      defaultValue={updateModalValue?.price}
                      {...register("price", {
                        required: "Price must be required",
                      })}
                      id="price"
                      type="number"
                      className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                    />
                    {errors.price && (
                      <p className="text-red-600">{errors.price?.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-semibold" htmlFor="discount_price">
                      Discount Price
                    </label>
                    <input
                      defaultValue={updateModalValue?.discount_price}
                      {...register("discount_price")}
                      id="discount_price"
                      type="number"
                      className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                    />
                  </div>
                </div>

                {/* old Variation */}

                <h1 className="font-semibold text-xl mt-4">
                  Product Variation:{" "}
                </h1>
                {oldVariation && (
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
                )}

                {/* Add Variation */}
                <h1 className="font-semibold text-xl mt-8">
                  Add Product Variation:{" "}
                </h1>

                <div className="mt-4 border p-5 border-gray-300 rounded-md">
                  <label className="font-semibold" htmlFor="ads_topBadge">
                    Size Variations:{" "}
                  </label>
                  {fields.map((variation, index) => (
                    <div key={variation.id} className="grid grid-cols-2 gap-4">
                      <Controller
                        name={`size_variation[${index}].size`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            placeholder="Size..."
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                          />
                        )}
                      />
                      <Controller
                        name={`size_variation[${index}].quantity`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            placeholder="Quantity..."
                            type="number"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                          />
                        )}
                      />
                      <Controller
                        name={`size_variation[${index}].price`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            placeholder="Price..."
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                          />
                        )}
                      />
                      <Controller
                        name={`size_variation[${index}].discount_price`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            placeholder="Discount Price..."
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                          />
                        )}
                      />
                      <button
                        type="button"
                        className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]"
                        onClick={() => append({})}
                      >
                        Add Variation
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-red-500 rounded-xl hover:bg-red-600"
                        onClick={() => remove(index)}
                      >
                        Remove Variation
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-3">
                  <div>
                    <label className="font-semibold" htmlFor="menuId">
                      Menu Type<span className="text-red-500">*</span>{" "}
                    </label>
                    <Select
                      id="menuId"
                      name="menuId"
                      isClearable
                      required
                      defaultValue={{
                        _id: menuNameId,
                        menu: menuNameValue,
                      }}
                      aria-label="Select a menu"
                      options={menus?.data}
                      getOptionLabel={(x) => x?.menu}
                      getOptionValue={(x) => x?._id}
                      onChange={(selectedOption) =>
                        handleMenuToCategory(selectedOption)
                      }
                    ></Select>
                  </div>

                  {isOpenCategory && (
                    <div>
                      <label className="font-semibold" htmlFor="categoryId">
                        Category Type
                      </label>
                      {
                        isChangeMenu == true ?
                          <Select
                            id="categoryId"
                            name="categoryId"
                            isClearable
                            aria-label="Select a category"
                            options={categories?.data}
                            getOptionLabel={(x) => x?.category}
                            getOptionValue={(x) => x?._id}
                            onChange={(selectedOption) =>
                              handleCategoryToSubCategory(selectedOption)
                            }
                          ></Select>
                          :
                          <Select
                            id="categoryId"
                            name="categoryId"
                            isClearable
                            defaultValue={{
                              _id: categoryNameId,
                              category: categoryNameValue,
                            }}
                            aria-label="Select a category"
                            options={categories?.data}
                            getOptionLabel={(x) => x?.category}
                            getOptionValue={(x) => x?._id}
                            onChange={(selectedOption) =>
                              handleCategoryToSubCategory(selectedOption)
                            }
                          ></Select>
                      }
                    </div>
                  )}

                  {isOpenSubCategory && (
                    <div>
                      <label className="font-semibold" htmlFor="subCategoryId">
                        Sub Category Type
                      </label>
                      {
                        isChangeCategory == true || isChangeMenu == true ?
                          <Select
                            id="subCategoryId"
                            name="subCategoryId"
                            aria-label="Select a sub category"
                            isClearable
                            options={subCategories?.data}
                            getOptionLabel={(x) => x?.sub_category}
                            getOptionValue={(x) => x?._id}
                            onChange={(selectedOption) =>
                              setSubCategory(selectedOption?._id)
                            }
                          ></Select>
                          :
                          <Select
                            id="subCategoryId"
                            name="subCategoryId"
                            isClearable
                            defaultValue={{
                              _id: subCategoryNameId,
                              sub_category: subCategoryNameValue,
                            }}
                            aria-label="Select a sub category"
                            options={subCategories?.data}
                            getOptionLabel={(x) => x?.sub_category}
                            getOptionValue={(x) => x?._id}
                            onChange={(selectedOption) =>
                              setSubCategory(selectedOption?._id)
                            }
                          ></Select>
                      }
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-3">
                  <div>
                    <label className="font-semibold" htmlFor="collectionId">
                      Collection Type
                    </label>
                    <Select
                      id="collectionId"
                      name="collectionId"
                      isClearable
                      defaultValue={{
                        _id: collectionNameId,
                        collection_name: collectionNameValue,
                      }}
                      aria-label="Select a Collection"
                      options={collections?.data}
                      getOptionLabel={(x) => x?.collection_name}
                      getOptionValue={(x) => x?._id}
                      onChange={(selectedOption) =>
                        setCollection(selectedOption?._id)
                      }
                    ></Select>
                  </div>

                  <div>
                    <label className="font-semibold" htmlFor="styleId">
                      Style Type
                    </label>
                    <Select
                      id="styleId"
                      name="styleId"
                      isClearable
                      defaultValue={{
                        _id: styleNameId,
                        style: styleNameValue,
                      }}
                      aria-label="Select a Style"
                      options={styles?.data}
                      getOptionLabel={(x) => x?.style}
                      getOptionValue={(x) => x?._id}
                      onChange={(selectedOption) =>
                        setStyle(selectedOption?._id)
                      }
                    ></Select>
                  </div>

                  <div>
                    <label className="font-semibold" htmlFor="featureId">
                      Feature Type
                    </label>
                    <Select
                      id="featureId"
                      name="featureId"
                      isClearable
                      defaultValue={{
                        _id: featureNameId,
                        feature: featureNameValue,
                      }}
                      aria-label="Select a Feature"
                      options={features?.data}
                      getOptionLabel={(x) => x?.feature}
                      getOptionValue={(x) => x?._id}
                      onChange={(selectedOption) =>
                        setFeature(selectedOption?._id)
                      }
                    ></Select>
                  </div>
                </div>

                {/* Image add */}
                <div className="mt-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {/* <Backlink link="/register/hotel/hotel-details-completion" text="Back" /> */}
                    <div>
                      <p className="font-semibold">Upload main image<span className="text-red-500">*</span>{" "}</p>
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
                      <p className="font-semibold">Upload hover image<span className="text-red-500">*</span>{" "}</p>
                      {/*   */}
                      <div className="border border-gray-300 p-3 rounded-sm">
                        {hoverImageName ? (
                          <div className="h-[70px] w-[100px] rounded-md relative">
                            <img
                              src={hoverImageName}
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
                              onClick={handleDeleteHoverImg}
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                        <input
                          type="file"
                          onChange={(e) =>
                            handleHoverImageOnChange(e.target.files)
                          }
                          className="file-input w-full max-w-xs mt-3"
                          ref={(ref) => (fileInputRefsHover.current[0] = ref)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold" htmlFor="product_video">
                        {" "}
                        Product Video{" "}
                        <span className="text-red-500">If Need</span>
                      </label>
                      <input
                        {...register("product_video")}
                        id="product_video"
                        type="file"
                        className="block w-full p-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="font-semibold">Add other photos<span className="text-red-500">*</span>{" "}</p>
                  <div className="border border-gray-300 rounded-sm p-3">
                    <div className="">
                      {multiImage.length >= 0 ? (
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
                                onClick={() => handleMuilDelete(image?.image)}
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

                <div className="flex justify-end mt-6">
                  <button
                    type="Submit"
                    className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#00B7E9] rounded-xl hover:bg-[#00B7E9]"
                  >
                    {loading ? <MiniSpinner /> : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductUpdate;
