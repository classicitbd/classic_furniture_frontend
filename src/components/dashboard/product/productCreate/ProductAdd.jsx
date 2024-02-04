import { Controller, useFieldArray, useForm } from "react-hook-form";
import BigSpinner from "../../../../shared/loader/BigSpinner";
import { BASE_URL } from "../../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useContext } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import ImageUploader from "./ImageUploader";
import slugify from "slugify";
import { useAddProductMutation } from "../../../../redux/feature/product/productApi";
import { AuthContext } from "../../../../context/AuthProvider";
import VideoUploader from "../../setting/VideoUploader";
import ReactQuill from "react-quill";
import { VideoValidate } from "../../../../utils/VideoValidation";

const ProductAdd = () => {
  const { user } = useContext(AuthContext);

  // select field data
  const [colorName, setColorName] = useState("");
  const [colorId, setColorId] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [style, setStyle] = useState("");
  const [feature, setFeature] = useState("");
  const [description, setDescription] = useState('');

  const [isMenuIdForCategory, setIsMenuIdForCategory] = useState(false);
  const [menuIdForCategory, setMenuIdForCategory] = useState('');

  const [isCategoryIdForSubCategory, setIsCategoryIdForSubCategory] = useState(false);
  const [categoryIdForSubCategory, setCategoryIdForSubCategory] = useState("");
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const [isOpenSubCategory, setIsOpenSubCategory] = useState(false);

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

  const [addProduct] = useAddProductMutation(); //Add product

  const {
    data: colors = [],
    isLoading: colorLoading,
    refetch,
  } = useQuery({
    queryKey: ["/api/v1/color"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/color`);
      const data = await res.json();
      return data;
    },
  }); // get Color type

  const { data: menus = [], isLoading: menuLoading } = useQuery({
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
    setIsCategoryIdForSubCategory(false);
    setIsOpenSubCategory(false);
    setIsMenuIdForCategory(false);
    setIsOpenCategory(false);
    setTimeout(() => {
    setMenuIdForCategory(menu?._id);
    setIsMenuIdForCategory(true);
    setIsOpenCategory(true);
    }, 100)
  };

  const setColorIdValue = (color) => {
    setColorName(color?.color);
    setColorId(color?._id);
  };

  const handleCategoryToSubCategory = (category) => {
    setIsCategoryIdForSubCategory(false);
    setIsOpenSubCategory(false);
    setTimeout(() => {
    setCategoryIdForSubCategory(category?._id);
    setIsCategoryIdForSubCategory(true);
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

  // image upload start
  const fileInputRefs = useRef([]);
  const fileInputRefsHover = useRef([]);
  const multiInputRefs = useRef([]);
  const [imageName, setImageName] = useState("");
  const [hoverImageName, sethoverImageName] = useState("");
  const [multiImage, setMultiImage] = useState([]);
  const allImage = multiImage?.map((image) => ({ image: image }));

  const handleOnChange = async (fieldName) => {
    if (fieldName[0]) {
      if (!imageName) {
        toast.error("Please wait a minute", {
          autoClose: 1000,
        });
        const image = await ImageUploader(fieldName[0]);
        if (image[1] == "OK") {
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
      if (!hoverImageName) {
        toast.error("Please wait a minute", {
          autoClose: 1000,
        });
        const image = await ImageUploader(fieldName[0]);
        if (image[1] == "OK") {
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
          if (image[1] == "OK") {
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
          if (image[1] == "OK") {
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
    if(!description){
      toast.error(
        "Error: Please fill in the product description box."
      );
    }
    let product_video;
    let errorEncountered;

    if (data?.product_video?.[0]) {
      const productVideoValidate = data?.product_video?.[0];
      const result = VideoValidate(productVideoValidate); //check image type
      if (result == false) {
        errorEncountered = true;
      }
    }
    if (errorEncountered == true){
      toast.error("Must be a mp4 type video in product video field")
    }
    toast.error("Please wait a minute");

    if (data?.product_video?.[0]) {
      const videoUpload = await VideoUploader(data?.product_video?.[0]);
      product_video = videoUpload[0];
    }
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
        "Error: Please fill in the size and quantity for all size variations."
      );
      return; // Stop the function
    }

    if (!imageName) {
      toast.error("Error: Please fill the main image.");
      return; // Stop the function
    }

    if (!hoverImageName) {
      toast.error("Error: Please fill the hover image.");
      return; // Stop the function
    }

    if (allImage?.length == 0) {
      toast.error(
        "Error: Please fill atleast one image in another image field."
      );
      return; // Stop the function
    }

    const slug = colorName + " " + data?.title;

    const sendData = {
      phone: user?.phone,
      title: data?.title,
      related: slugify(data.title, {
        lower: true,
        replacement: "-",
      }),
      slug: slugify(slug, {
        lower: true,
        replacement: "-",
      }),
      description: description,
      price: data?.price,
      discount_price: data?.discount_price,
      size_variation: data?.size_variation?.map((item) => ({
        size: item?.size,
        quantity: item?.quantity,
        price: item?.price,
        discount_price: item?.discount_price,
      })),
      thumbnail_image: imageName,
      hover_image: hoverImageName,
      product_video: product_video,
      images: allImage?.map((item) => ({
        image: item?.image,
      })),
      colorId: colorId,
      subCategoryId: subcategory,
      menuId: menuIdForCategory,
      categoryId: categoryIdForSubCategory,
    };

    if (collection.trim() !== "") {
      sendData.collectionId = collection;
    }

    if (style.trim() !== "") {
      sendData.styleId = style;
    }

    if (feature.trim() !== "") {
      sendData.featureId = feature;
    }

    addProduct(sendData).then((result) => {
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
        sethoverImageName("");
        setMultiImage([]);
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  if (colorLoading || menuLoading ) {
    return <BigSpinner />;
  }

  return (
    <>
      <div className="md:mt-12 mt-8 bg-white">
        <div className="p-5">
          <h4 className="font-semibold text-[20px] mt-2">
            Product Information
          </h4>
          <hr className="mt-2 mb-4" />

          <form onSubmit={handleSubmit(handleDataPost)}>
            <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
              <div>
                <label className="font-semibold" htmlFor="title">
                  {" "}
                  Product Name<span className="text-red-500">*</span>{" "}
                </label>
                <input
                  placeholder="Product Name...."
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
                  {" "}
                  Select Color<span className="text-red-500">*</span>{" "}
                </label>
                <Select
                  id="color"
                  name="color"
                  required
                  aria-label="Select a sub category"
                  options={colors?.data}
                  getOptionLabel={(x) => x?.color}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => setColorIdValue(selectedOption)}
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
                  placeholder="0.000"
                  {...register("price", { required: "Price must be required" })}
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
                  placeholder="0.000"
                  {...register("discount_price")}
                  id="discount_price"
                  type="number"
                  className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            <div className="mt-10 border p-5 border-gray-300 rounded-md">
              <label className="font-semibold" htmlFor="ads_topBadge">
                Size Variations:{" "}
              </label>
              {fields.map((variation, index) => (
                <div
                  key={variation.id}
                  className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-2"
                >
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
                    className="mt-2 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]"
                    onClick={() => append({})}
                  >
                    +
                  </button>
                  {index > 0 && (
                    <button
                      type="button"
                      className="mt-2 text-white transition-colors duration-300 transform bg-red-500 rounded-xl hover:bg-red-600"
                      onClick={() => remove(index)}
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-3">
              <div>
                <label className="font-semibold" htmlFor="menuId">
                  Menu Type
                </label>
                <Select
                  id="menuId"
                  name="menuId"
                  required
                  aria-label="Select a menu"
                  options={menus?.data}
                  getOptionLabel={(x) => x?.menu}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) =>
                    handleMenuToCategory(selectedOption)
                  }
                ></Select>
              </div>

              {isOpenCategory && isMenuIdForCategory && (
                <div>
                  <label className="font-semibold" htmlFor="categoryId">
                    Category Type
                  </label>
                  <Select
                    id="categoryId"
                    name="categoryId"
                    required
                    aria-label="Select a category"
                    options={categories?.data}
                    getOptionLabel={(x) => x?.category}
                    getOptionValue={(x) => x?._id}
                    onChange={(selectedOption) =>
                      handleCategoryToSubCategory(selectedOption)
                    }
                  ></Select>
                </div>
              )}

              {isOpenSubCategory && isCategoryIdForSubCategory && (
                <div>
                  <label className="font-semibold" htmlFor="subCategoryId">
                    Sub Category Type
                  </label>
                  <Select
                    id="subCategoryId"
                    required
                    name="subCategoryId"
                    aria-label="Select a sub category"
                    options={subCategories?.data}
                    getOptionLabel={(x) => x?.sub_category}
                    getOptionValue={(x) => x?._id}
                    onChange={(selectedOption) =>
                      setSubCategory(selectedOption?._id)
                    }
                  ></Select>
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
                  aria-label="Select a Style"
                  options={styles?.data}
                  getOptionLabel={(x) => x?.style}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => setStyle(selectedOption?._id)}
                ></Select>
              </div>

              <div>
                <label className="font-semibold" htmlFor="featureId">
                  Feature Type
                </label>
                <Select
                  id="featureId"
                  name="featureId"
                  aria-label="Select a Feature"
                  options={features?.data}
                  getOptionLabel={(x) => x?.feature}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => setFeature(selectedOption?._id)}
                ></Select>
              </div>
            </div>

            {/* Image add */}
            <div className="mt-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {/* <Backlink link="/register/hotel/hotel-details-completion" text="Back" /> */}
                <div>
                  <p className="font-semibold">Upload main image</p>
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
                  <p className="font-semibold">Upload hover image</p>
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
                      onChange={(e) => handleHoverImageOnChange(e.target.files)}
                      className="file-input w-full max-w-xs mt-3"
                      ref={(ref) => (fileInputRefsHover.current[0] = ref)}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold" htmlFor="product_video">
                    {" "}
                    Product Video
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

            <div className="mt-2">
              <p className="font-semibold">Add other photos</p>
              <div className="border border-gray-300 rounded-sm p-3">
                <div className="">
                  {multiImage.length >= 0 ? (
                    <div className="rounded-md flex items-center justify-start gap-3">
                      {allImage.map((image, index) => (
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
                Create Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductAdd;
