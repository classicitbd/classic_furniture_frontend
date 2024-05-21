import { useGetCategoryQuery } from "../../../redux/feature/category/categoryApi";
import { useGetColorQuery } from "../../../redux/feature/color/colorApi";
import { IoClose, IoFilterOutline } from "react-icons/io5";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../../shared/loader/Loader";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import AllProductCard from "./AllProductCard";
import { BASE_URL } from "../../../utils/baseURL";
import ProductCardSkeleton from "../../../shared/loader/ProductCardSkeleton";
import ProductNotFound from "../../../components/common/productNotFound/ProductNotFound";
import PriceRangeSlider from "./PriceRangeSlider";
import { RxReload } from "react-icons/rx";
import FrontPagination from "./FrontPagination";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

export default function AllProducts() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [categoryShow, setCategoryShow] = useState(true);
  const [colorShow, setColorShow] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [queryParameters] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(200000);
  // const [maxPriceRange, setMaxPriceRange] = useState(200000);
  const [totalData, setTotalData] = useState(0);
  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const { data: categories } = useGetCategoryQuery(undefined);
  const { data: colors } = useGetColorQuery(undefined);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const allQueryParams = {};
    for (const [key, value] of queryParameters.entries()) {
      allQueryParams[key] = value;
    }

    const queryString = Object.keys(allQueryParams)
      .filter((key) => allQueryParams[key] !== undefined)
      .map((key) => `${key}=${allQueryParams[key]}`)
      .join("&");

    setLoading(true);
    fetch(
      `${BASE_URL}/product${
        queryString.length > 0
          ? `/filter_product?${queryString}&page=${page}&limit=${rows}`
          : `/filter_product?page=${page}&limit=${rows}`
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.data?.products);
        setDefaultProducts(data?.data?.products);
        // setMaxPriceRange(data?.data?.maxPriceRange);
        setTotalData(data?.data?.totalData);
        setLoading(false);
      })
      .catch((error) => console.error(error));

    setMobileFiltersOpen(false);
  }, [queryParameters, page, rows]);

  const handlePriceChange = ([min, max]) => {
    setMinPrice(min);
    setMaxPrice(max);

    const queryParams = new URLSearchParams(queryParameters);
    queryParams.set("min_price", min);
    queryParams.set("max_price", max);

    navigate(`/all?${queryParams.toString()}`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setMobileFiltersOpen(false);

    const queryParams = new URLSearchParams(queryParameters);
    queryParams.set("category", category);

    navigate(`/all?${queryParams.toString()}`);
  };

  const handleColorsClick = (color) => {
    setSelectedColor(color);

    const queryParams = new URLSearchParams(queryParameters);
    queryParams.set("color", color);

    navigate(`/all?${queryParams.toString()}`);
    setMobileFiltersOpen(false);
  };

  const sortedProducts = (value) => {
    if (value === "price-asc") {
      const ascProduct = [...products].sort(
        (a, b) => a.product_price - b.product_price
      );
      return setProducts(ascProduct);
    } else if (value === "price-desc") {
      const dscProduct = [...products].sort(
        (a, b) => b.product_price - a.product_price
      );
      return setProducts(dscProduct);
    } else {
      return setProducts(defaultProducts);
    }
  };

  const handleResetFilter = () => {
    setSelectedCategory(null);
    setSelectedColor(null);
    setMaxPrice(200000);
    setMinPrice(1);
    setProducts(defaultProducts);
    navigate("/all");
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMobileFiltersOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const startIndex = (page - 1) * rows + 1;
  const endIndex = startIndex + Number(rows) - 1;

  let gridCols = "grid-cols-1";
  if (windowWidth >= 440) gridCols = "grid-cols-2";
  if (windowWidth >= 768) gridCols = "md:grid-cols-3";
  if (windowWidth >= 1024) gridCols = "lg:grid-cols-3";
  if (windowWidth >= 1440) gridCols = "2xl:grid-cols-4";

  return (
    <div>
      <main className="es_container mx-auto">
        <section className="py-6 mx-4">
          <div className="p-4 bg-white sm:px-6 rounded">
            <div className="flex sm:justify-between items-center">
              <div className="flex items-center justify-center">
                <p className="sm:text-xl font-semibold text-primaryDeepColor hidden sm:flex">
                  Products {products?.length}
                </p>
              </div>
              <div
                className="flex items-center sm:w-auto w-full justify-between sm:justify-center flex-wrap
               gap-4"
              >
                <div className="flex gap-2 items-center justify-center ">
                  <span
                    className="text-gray-800 mr-2 items-center gap-2 flex bg-gray-100 p-2 rounded lg:hidden"
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  >
                    <IoFilterOutline size={20} /> <span>Filter</span>
                  </span>
                  <span>
                    {queryParameters.size > 0 && (
                      <>
                        <span
                          className="hidden bg-gray-100  shadow p-1 rounded sm:block"
                          onClick={handleResetFilter}
                        >
                          Reset Filter
                        </span>
                        <span
                          onClick={handleResetFilter}
                          className="block sm:hidden"
                        >
                          <RxReload />
                        </span>
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <p className="hidden sm:flex">Sort By </p>
                  <select
                    className="border  border-primaryLightColor rounded-md px-2 py-1 text-[12px]"
                    onChange={(e) => sortedProducts(e.target.value)}
                  >
                    <option className="text-[12px]" value="Default">
                      Price: Default
                    </option>
                    <option className="text-[12px]" value="price-asc">
                      Price: Low to High
                    </option>
                    <option className="text-[12px]" value="price-desc">
                      Price: High to Low
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="p-4 bg-white sm:px-6 rounded my-2"></div> */}

          <div className="grid grid-cols-12 gap-4">
            <div className="lg:col-span-3 bg-white rounded xl:mr-16 lg:mr-10 px-6 py-4 my-6 hidden lg:block">
              <div className="my-4">
                <h3 className="text-[16px] font-semibold py-2 text-gray-700">
                  Price Range
                </h3>
                {/* {loading ? (
                  <MiniSpinner />
                ) : (
                  <PriceRangeSlider
                    maxPrice={maxPrice}
                    minPrice={minPrice}
                    onChange={handlePriceChange}
                  />
                )} */}

                <PriceRangeSlider
                  minPrice={1}
                  maxPrice={200000}
                  onPriceChange={handlePriceChange}
                />
              </div>
              <div className="mb-4">
                <span
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setCategoryShow(!categoryShow)}
                >
                  <h3 className="text-[16px] font-semibold py-2 text-gray-700">
                    Categories
                  </h3>
                  <span className="text-gray-700">
                    {categoryShow ? <FaAngleDown /> : <FaAngleUp />}
                  </span>
                </span>
                {categoryShow && (
                  <ul
                    role="list"
                    className="space-y-4 pl-2 pb-6 text-sm font-medium text-gray-600 max-h-[35vh] overflow-y-auto scrollbar-thin"
                  >
                    {categories?.data?.map((category) => (
                      <li key={category?.category_name}>
                        <button
                          onClick={() =>
                            handleCategoryClick(category?.category_slug)
                          }
                          className={`${
                            selectedCategory === category?.category_slug
                              ? "text-primaryLightColor"
                              : " "
                          } hover:text-primaryLightColor duration-200`}
                        >
                          {category?.category_name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <hr />

              <div className="my-4">
                <span
                  className="flex justify-between items-center "
                  onClick={() => setColorShow(!colorShow)}
                >
                  <h3 className="text-[16px] font-semibold py-2 text-gray-700 ">
                    Color
                  </h3>
                  <span className="text-gray-700">
                    {colorShow ? <FaAngleDown /> : <FaAngleUp />}
                  </span>
                </span>
                {colorShow && (
                  <ul
                    role="list"
                    className="space-y-4 pl-2 pb-6 text-sm font-medium text-gray-600 max-h-[35vh] overflow-y-auto scrollbar-thin"
                  >
                    {colors?.data?.map((color) => (
                      <li key={color?.color_name}>
                        <button
                          onClick={() => handleColorsClick(color?.color_name)}
                          className={`${
                            selectedColor === color?.color_name
                              ? "text-primaryLightColor"
                              : " "
                          } hover:text-primaryLightColor duration-200`}
                        >
                          {color?.color_name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="lg:col-span-9 col-span-12 pr-2">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-4">
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                </div>
              ) : (
                <div>
                  {products?.length > 0 ? (
                    <div
                      className={`grid ${gridCols} gap-4 lg:px-0 px-6 pb-6 rounded`}
                    >
                      {products?.map((product) => (
                        <AllProductCard key={product?._id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <ProductNotFound />
                  )}
                </div>
              )}
              {totalData > 0 && (
                <div className="flex justify-between items-center py-5">
                  {/* Pagination */}
                  <FrontPagination
                    rows={rows}
                    page={page}
                    setPage={setPage}
                    setRows={setRows}
                    totalData={totalData}
                  />
                  <div className="text-xs">
                    <span className="mr-1 font-semibold text-primary">
                      Showing
                    </span>
                    <span className="font-medium text-gray-700 text-xs mr-1">
                      {startIndex === 0 ? 1 : startIndex} -{" "}
                      {endIndex > totalData ? totalData : endIndex}
                    </span>
                    of {totalData > 0 ? totalData : 0}{" "}
                    {totalData > 1 ? "records" : "record"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {mobileFiltersOpen && (
          <>
            <div
              ref={sidebarRef}
              className={`fixed inset-0 z-50 w-64 min-h-screen bg-white transition-transform duration-500 transform ease-in-out overflow-y-auto scrollbar-thin px-4 ${
                mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
              } lg:hidden`}
            >
              <span className="flex justify-end  py-4">
                <IoClose
                  size={24}
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                />
              </span>

              <div className="mb-4">
                <span
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setCategoryShow(!categoryShow)}
                >
                  <h3 className="text-[16px] font-semibold py-2 text-gray-700">
                    Categories
                  </h3>
                  <span className="text-gray-700">
                    {categoryShow ? <FaAngleDown /> : <FaAngleUp />}
                  </span>
                </span>
                {categoryShow && (
                  <ul
                    role="list"
                    className="space-y-4 pl-2 pb-6 text-sm font-medium text-gray-600 "
                  >
                    {categories?.data?.map((category) => (
                      <li key={category?.category_name}>
                        <button
                          onClick={() =>
                            handleCategoryClick(category?.category_slug)
                          }
                          className={`${
                            selectedCategory === category?.category_slug
                              ? "text-primaryLightColor"
                              : " "
                          } hover:text-primaryLightColor duration-200`}
                        >
                          {category?.category_name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <hr />

              <div className="my-4">
                <span
                  className="flex justify-between items-center "
                  onClick={() => setColorShow(!colorShow)}
                >
                  <h3 className="text-[16px] font-semibold py-2 text-gray-700 ">
                    Color
                  </h3>
                  <span className="text-gray-700">
                    {colorShow ? <FaAngleDown /> : <FaAngleUp />}
                  </span>
                </span>
                {colorShow && (
                  <ul
                    role="list"
                    className="space-y-4 pl-2 pb-6 text-sm font-medium text-gray-600"
                  >
                    {colors?.data?.map((color) => (
                      <li key={color?.color_name}>
                        <button
                          onClick={() => {
                            handleColorsClick(color?.color_name);
                          }}
                          className={`${
                            selectedColor === color?.color_name
                              ? "text-primaryLightColor"
                              : " "
                          } hover:text-primaryLightColor duration-200`}
                        >
                          {color?.color_name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div
              className="fixed inset-0 bg-black opacity-50 z-30"
              onClick={() => setMobileFiltersOpen(false)}
            ></div>
          </>
        )}
      </main>
    </div>
  );
}
