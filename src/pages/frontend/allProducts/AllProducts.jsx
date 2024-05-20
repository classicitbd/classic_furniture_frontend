import { useGetProductQuery } from "../../../redux/feature/product/productApi";
import { IoClose, IoFilterOutline } from "react-icons/io5";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../../shared/loader/Loader";
import { useGetCategoryQuery } from "../../../redux/feature/category/categoryApi";
import { useGetColorQuery } from "../../../redux/feature/color/colorApi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import AllProductCard from "./AllProductCard";
import { BASE_URL } from "../../../utils/baseURL";
import ProductCardSkeleton from "../../../shared/loader/ProductCardSkeleton";
import ProductNotFound from "../../../components/common/productNotFound/ProductNotFound";
import PriceRangeSlider from "./PriceRangeSlider";

export default function AllProducts() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [categoryShow, setCategoryShow] = useState(true);
  const [colorShow, setColorShow] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [queryParameters] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  const navigate = useNavigate();
  const handlePriceChange = ([min, max]) => {
    setMinPrice(min);
    setMaxPrice(max);

    const queryParams = new URLSearchParams(queryParameters);
    queryParams.set("min_price", min);
    queryParams.set("max_price", max);

    // Update the URL using navigate
    navigate(`/all?${queryParams.toString()}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const { data: products, isLoading } = useGetProductQuery(undefined, {
  //   refetchOnMountOrArgChange: true,
  //   pollingInterval: 60000,
  // });
  const { data: categories } = useGetCategoryQuery(undefined);
  const { data: colors } = useGetColorQuery(undefined);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sidebarRef = useRef(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setMobileFiltersOpen(false);
    // Update the query parameters
    const queryParams = new URLSearchParams(queryParameters);
    queryParams.set("category", category);

    // Update the URL using navigate
    navigate(`/all?${queryParams.toString()}`);
  };
  const handleColorsClick = (color) => {
    setSelectedColor(color);

    // Update the query parameters
    const queryParams = new URLSearchParams(queryParameters);
    queryParams.set("color", color);

    // Update the URL using navigate
    navigate(`/all?${queryParams.toString()}`);
    setMobileFiltersOpen(false);
  };
  const handleSortClick = (sort) => {
    setSelectedSort(sort);

    // Update the query parameters
    const queryParams = new URLSearchParams(queryParameters);
    queryParams.set("sort", sort);

    // Update the URL using navigate
    navigate(`/all?${queryParams.toString()}`);
  };
  useEffect(() => {
    // Get all query parameters
    const allQueryParams = {};
    for (const [key, value] of queryParameters.entries()) {
      allQueryParams[key] = value;
    }

    const queryString = Object.keys(allQueryParams)
      .filter((key) => allQueryParams[key] !== undefined)
      .map((key) => `${key}=${allQueryParams[key]}`)
      .join("&");
    // console.log(queryString);
    setLoading(true);
    fetch(
      `${BASE_URL}/product${
        queryString.length > 0
          ? `/filter_product?${queryString}`
          : "/filter_product"
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));

    setMobileFiltersOpen(false);
    // You can perform any other logic based on all query parameters here
  }, [queryParameters]);

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
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-center">
                <p className="sm:text-xl font-semibold text-primaryDeepColor hidden sm:flex">
                  Products {products?.products?.length}
                </p>
              </div>
              <div
                className="flex items-center justify-center flex-wrap
               gap-4"
              >
                <span
                  className="text-gray-800 mr-2 items-center gap-2 flex bg-gray-100 p-2 rounded lg:hidden"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <IoFilterOutline size={20} /> <span>Filter</span>
                </span>
                <p className="hidden sm:flex">Sort By </p>
                <select className="border border-primaryLightColor rounded-md px-2 py-1 text-[12px]">
                  <option value="Default">Price: Default</option>
                  <option value="Low to High">Price: Low to High</option>
                  <option value="High to Low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="lg:col-span-3 bg-white rounded xl:mr-16 lg:mr-10 px-6 py-4 my-6 hidden lg:block">
              <div className="my-4">
                <h3 className="text-[16px] font-semibold py-2 text-gray-700">
                  Price Range
                </h3>
                <PriceRangeSlider
                  minPrice={0}
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
                          // className="hover:text-primaryLightColor duration-200"
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

              {/* Color */}
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
                          onClick={() => handleColorsClick(color?.color_slug)}
                          className={`${
                            selectedColor === color?.color_slug
                              ? "text-primaryLightColor"
                              : " "
                          }
                          hover:text-primaryLightColor duration-200`}
                        >
                          {color?.color_name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="lg:col-span-9 col-span-12 max-h-screen overflow-y-scroll scrollbar-hide pr-2">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-4">
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                </div>
              ) : (
                <div>
                  {products?.products?.length > 0 ? (
                    <div
                      className={`grid ${gridCols} gap-4 lg:px-0 px-6 pb-6 rounded`}
                    >
                      {products?.products?.map((product) => (
                        <AllProductCard key={product?._id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <ProductNotFound />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {mobileFiltersOpen && (
          <>
            <div
              ref={sidebarRef}
              className={`fixed inset-0 z-40 w-64 min-h-screen bg-white  transition-transform duration-500 transform ease-in-out ${
                mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
              } lg:hidden`}
            >
              <span className="flex justify-end  px-4 py-4">
                <IoClose
                  size={24}
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                />
              </span>
              <div className="bg-white px-4 pt-2 pb-4">
                <div className="mb-4">
                  <span className="flex justify-between items-center">
                    <h3 className="text-[16px] font-semibold py-2 text-gray-700">
                      Categories
                    </h3>
                  </span>
                  <ul
                    role="list"
                    className="space-y-4 pl-2 pb-6 text-sm font-medium text-gray-600 max-h-[360px] overflow-y-auto scrollbar-thin"
                  >
                    {categories?.data?.map((category) => (
                      <li key={category?.category_name}>
                        <Link
                          to={`/all?category=${category?.category_slug}`}
                          className="hover:text-primaryLightColor duration-200"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          {category?.category_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
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
