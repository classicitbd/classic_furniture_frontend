import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// import react icons
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxReload } from "react-icons/rx";
import { BiSolidDiscount } from "react-icons/bi";

import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import { GoArrowRight } from "react-icons/go";

const AllProducts = () => {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [discount, setDiscount] = useState(true);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [subCategoryTypes, setSubCategoryTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  // Add similar state variables for collection, color, features, and styles
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();

  // get all products
  const { data: products = [] } = useQuery({
    queryKey: ["/api/v1/product"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/all?`);
      const data = await res.json();
      return data;
    },
  });

  // get Category type
  const { data = [] } = useQuery({
    queryKey: ["/api/v1/category"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/category`);
      const data = await res.json();
      return data;
    },
  });

  // get Sub Category type
  const { data: subData = [] } = useQuery({
    queryKey: ["/api/v1/sub_category"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/sub_category`);
      const data = await res.json();
      return data;
    },
  });

  // get Collection type
  const { data: collections = [] } = useQuery({
    queryKey: ["/api/v1/collection"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/collection`);
      const data = await res.json();
      return data;
    },
  });

  // get Style type
  const { data: styles = [] } = useQuery({
    queryKey: ["/api/v1/style"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/style`);
      const data = await res.json();
      return data;
    },
  });

  // get Color type
  const { data: colors = [] } = useQuery({
    queryKey: ["/api/v1/color"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/color`);
      const data = await res.json();
      return data;
    },
  });

  // get Feature type
  const { data: features = [] } = useQuery({
    queryKey: ["/api/v1/feature"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/feature`);
      const data = await res.json();
      return data;
    },
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    // Update the query parameters
    const queryParams = new URLSearchParams(queryParameters);
    queryParams.set("category", category);

    // Update the URL using navigate
    navigate(`/all?${queryParams.toString()}`);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);

    // Update the query parameters
    const queryParams = new URLSearchParams(queryParameters);
    queryParams.set("subCategory", subCategory);

    // Update the URL using navigate
    navigate(`/all?${queryParams.toString()}`);
  };
  // Add similar functions for collection, color, features, and styles

  const handleResetFilter = () => {
    setDiscount(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    // Get all query parameters
    const allQueryParams = {};
    for (const [key, value] of queryParameters.entries()) {
      allQueryParams[key] = value;
    }

    console.log("All Query Parameters:", allQueryParams);

    // You can perform any other logic based on all query parameters here
  }, [queryParameters]);

  useEffect(() => {
    const uniqueMap = new Map();
    subData?.data?.forEach((item) => {
      uniqueMap.set(item.sub_category, item);
    });

    // Convert Map values back to an array
    const uniqueData = Array.from(uniqueMap.values());
    setSubCategoryTypes(uniqueData);
  }, [subData]);

  useEffect(() => {
    const uniqueMap = new Map();
    data?.data?.forEach((item) => {
      uniqueMap.set(item.category, item);
    });

    // Convert Map values back to an array
    const uniqueData = Array.from(uniqueMap.values());
    setCategoryTypes(uniqueData);
  }, [data]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container flex justify-between py-4 border-b border-bgray-500 sticky top-[61px] sm:top-[64px] z-30 bg-white">
        <div>
          <h1>Products {products?.data?.length}</h1>
        </div>

        <ul className="flex items-center gap-3 sm:gap-5 text-sm">
          <li>
            <Link
              className="hidden sm:block"
              onClick={handleResetFilter}
              to={`http://localhost:3000/all`}
            >
              Reset Filter
            </Link>
            <Link
              onClick={handleResetFilter}
              to={`http://localhost:3000/all`}
              className="block sm:hidden"
            >
              <RxReload />
            </Link>
          </li>
          <li>
            <span className="w-[1px] h-4 bg-bgray-400 text-green inline-block"></span>
          </li>
          <li>
            <Link
              to={`http://localhost:3000/all?discount=true`}
              onClick={() => setDiscount(true)}
              className={`${discount ? "text-error-200" : ""} hidden sm:block`}
            >
              On Sale
            </Link>
            <Link
              to={`http://localhost:3000/all?discount=true`}
              onClick={() => setDiscount(true)}
              className={`${discount ? "text-error-200" : ""} block sm:hidden`}
            >
              <BiSolidDiscount />
            </Link>
          </li>
          <li>
            <span className="w-[1px] h-4 bg-bgray-400 inline-block"></span>
          </li>
          <li>
            <button
              onClick={() => {
                setFilterDropdownOpen(!filterDropdownOpen);
                setSortDropdownOpen(false);
              }}
              className="sm:flex items-center gap-1 hidden"
            >
              <HiOutlineAdjustmentsVertical />
              <span>Filters</span>
            </button>
            <button
              onClick={() => {
                setSortDropdownOpen(false);
                toggleFilter(!isFilterOpen);
              }}
              className="flex items-center gap-1 sm:hidden"
            >
              <HiOutlineAdjustmentsVertical />
            </button>
            <div
              className={`absolute top-[50px] left-0 w-full border bg-[#FFFFFF] ${
                filterDropdownOpen ? "block" : "hidden"
              }`}
            >
              <div className="grid grid-cols-6 min-h-[460px] border-b">
                {/* ------ category section ------ start */}
                {/* <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Categories</button>
                    </li>
                    {categoryTypes?.map((category) => (
                      <li key={category._id}>
                        <Link
                          to={`/all?category=${category?.slug}`}
                          className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm"
                        >
                          {category?.category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div> */}
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Categories</button>
                    </li>
                    {categoryTypes?.map((category) => (
                      <li key={category._id}>
                        <button
                          onClick={() =>
                            handleCategoryClick(category?.slug)
                          }
                          className={`${
                            selectedCategory === category?.category
                              ? "bg-bgray-100"
                              : ""
                          } hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm`}
                        >
                          {category?.category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ------ category section ------ end */}
                {/* ------ sub category section ------ start */}
                {/* <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Sub Categories</button>
                    </li>
                    {subCategoryTypes?.map((subCategory) => (
                      <li key={subCategory?._id}>
                        <Link
                          to={`/`}
                          className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm"
                        >
                          {subCategory?.sub_category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div> */}
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Sub Categories</button>
                    </li>
                    {subCategoryTypes?.map((subCategory) => (
                      <li key={subCategory?._id}>
                        <button
                          onClick={() =>
                            handleSubCategoryClick(subCategory?.slug)
                          }
                          className={`${
                            selectedSubCategory === subCategory?.sub_category
                              ? "bg-bgray-100"
                              : ""
                          } hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm`}
                        >
                          {subCategory?.sub_category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ------ sub category section ------ end */}
                {/* ------ collections section ------ start */}
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Collections</button>
                    </li>
                    {collections?.data?.map((collection) => (
                      <li key={collection?._id}>
                        <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                          {collection?.collection_name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ------ collections section ------ end */}
                {/* ------ styles section ------ start */}
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Styles</button>
                    </li>
                    {styles?.data?.map((style) => (
                      <li key={style?._id}>
                        <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                          {style?.style}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ------ styles section ------ end */}
                {/* ------ color section ------ start */}
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Colors</button>
                    </li>
                    {colors?.data?.map((color) => (
                      <li key={color?._id}>
                        <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                          {color?.color}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ------ color section ------ end */}
                {/* ------ features section ------ start */}
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Features</button>
                    </li>
                    {features?.data?.map((feature) => (
                      <li key={feature?._id}>
                        <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                          {feature?.feature}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ------ features section ------ end */}
              </div>
              <div
                onClick={() => setFilterDropdownOpen(false)}
                className="flex justify-center py-2 cursor-pointer"
              >
                <button className="text-center">Hide Filter</button>
              </div>
            </div>
          </li>
          <li>
            <span className="w-[1px] h-4 bg-bgray-400 inline-block"></span>
          </li>

          {/* ------ sorby section ------ start */}
          <li className="relative">
            <button
              className="flex items-center gap-1"
              onClick={() => {
                setSortDropdownOpen(!sortDropdownOpen);
                setFilterDropdownOpen(false);
              }}
            >
              <span
                className={
                  sortDropdownOpen
                    ? "text-bgray-900j font-medium"
                    : "text-bgray-700 font-medium"
                }
              >
                Sort by:
              </span>
              <RiArrowDropDownLine
                className={`text-xl ${
                  sortDropdownOpen ? "rotate-180" : ""
                } transition-all duration-300`}
              />
            </button>
            <ul
              className={`absolute top-10 -right-3 sm:-right-20 w-[160px] border ${
                sortDropdownOpen ? "block" : "hidden"
              }`}
            >
              <li className="bg-bgray-300 hover:bg-bgray-400 py-1 px-2">
                <button onClick={() => setSortDropdownOpen(false)}>
                  Newest
                </button>
              </li>
              <li className="bg-bgray-200 hover:bg-bgray-400 py-1 px-2">
                <button onClick={() => setSortDropdownOpen(false)}>
                  Price Low to high
                </button>
              </li>
              <li className="bg-bgray-300 hover:bg-bgray-400 py-1 px-2">
                <button onClick={() => setSortDropdownOpen(false)}>
                  Price High to Low
                </button>
              </li>
            </ul>
          </li>
          {/* ------ sorby section ------ end */}
        </ul>
        {/* ------ filter drawer ------ start */}

        <div
          className={`h-screen w-full fixed inset-y-0 left-0 top-[69px] z-10 bg-bgray-50 overflow-y-auto transition-transform duration-500 transform ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end px-5 py-2">
            <button className="text-4xl" onClick={toggleFilter}>
              <GoArrowRight className="p-1 border bg-bgray-100 text-bgray-900 shadow rounded-full rotate-180" />
            </button>
          </div>
          <div className="flex h-screen flex-col justify-between border-e">
            <div className="px-4">
              <ul className="space-y-1">
                {/* ------ category section ------ start */}
                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium"> Categories </span>

                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                      {categoryTypes?.map((category) => (
                        <li key={category._id}>
                          <button className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            {category?.category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>

                {/* ------ category section ------ end */}
                {/* ------ sub category section ------ start */}
                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium">
                        {" "}
                        Sub Categories{" "}
                      </span>

                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                      {subCategoryTypes?.map((subCategory) => (
                        <li key={subCategory?._id}>
                          <button className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            {subCategory?.sub_category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>

                {/* ------ sub category section ------ end */}
                {/* ------ collection section ------ start */}
                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium"> Collections</span>

                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                      {collections?.data?.map((collection) => (
                        <li key={collection?._id}>
                          <button className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            {collection?.collection_name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>

                {/* ------ collection section ------ end */}
                {/* ------ styles section ------ start */}
                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium"> Styles</span>

                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                      {styles?.data?.map((style) => (
                        <li key={style?._id}>
                          <button className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            {style?.style}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>

                {/* ------ styles section ------ end */}
                {/* ------ colors section ------ start */}
                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium">Colors</span>

                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                      {colors?.data?.map((color) => (
                        <li key={color?._id}>
                          <button className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            {color?.color}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>

                {/* ------ colors section ------ end */}
                {/* ------ features section ------ start */}
                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium">Features</span>

                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                      {features?.data?.map((feature) => (
                        <li key={feature?._id}>
                          <button className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            {feature?.feature}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>

                {/* ------ features section ------ end */}
              </ul>
            </div>
          </div>
        </div>

        {/* ------ filter drawer ------ end */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {products?.data?.map((product) => (
          <div
            key={product?._id}
            className="border group rounded overflow-hidden bg-[#F0F0F0]"
          >
            <Link to={`/products/details/${product?.slug}`}>
              <div className="flex">
                <img
                  src={product?.thumbnail_image}
                  className="w-full translate-x-0 group-hover:-translate-x-full transition-all duration-700"
                  alt={product?.id}
                />
                <img
                  src={product?.hover_image}
                  className="w-full translate-x-0 group-hover:-translate-x-full  transition-all duration-700"
                  alt={product?.id}
                />
              </div>
              <article className="pb-[10px]">
                <h2 className="text-center">
                  {product?.title} {product?.colorId?.color}
                </h2>
                <p className="text-center py-3 text-bgray-700">
                  {product?.colorId?.color}
                </p>
                <p className="px-4">BDT {product?.price}.00</p>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
