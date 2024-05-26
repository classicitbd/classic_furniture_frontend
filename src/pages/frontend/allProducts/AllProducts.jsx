import { useGetCategoryQuery } from "../../../redux/feature/category/categoryApi";
import { useGetColorQuery } from "../../../redux/feature/color/colorApi";
import { IoClose } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import AllProductCard from "./AllProductCard";
import { BASE_URL } from "../../../utils/baseURL";
import ProductCardSkeleton from "../../../shared/loader/ProductCardSkeleton";
import ProductNotFound from "../../../components/common/productNotFound/ProductNotFound";
import FrontPagination from "./FrontPagination";
import MobileSearchFiled from "./MobileSearchFiled";
import FilterAndResetSection from "./FilterAndResetSection";
import LeftSideCategoryAndColorSection from "./LeftSideCategoryAndColorSection";

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
  // eslint-disable-next-line no-unused-vars
  const [minPrice, setMinPrice] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [maxPrice, setMaxPrice] = useState(200000);
  const [value, setValue] = useState("");

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

  const handleSearch = (text) => {
    // Update the query parameters
    const queryParams = new URLSearchParams(queryParameters);
    queryParams.set("keyword", text);

    // Update the URL using navigate
    navigate(`/all?${queryParams.toString()}`);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(value);
    setValue("");
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
          {/*  */}
          {/* search filed only for less than large screen */}
          <MobileSearchFiled
            handleSubmit={handleSubmit}
            value={value}
            setValue={setValue}
          />

          {/* Filter Reset Button */}
          <FilterAndResetSection
            products={products}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            handleResetFilter={handleResetFilter}
            queryParameters={queryParameters}
            sortedProducts={sortedProducts}
          />

          <div className="grid grid-cols-12 gap-4">
            {/* Aside Sidebar */}
            <div className="lg:col-span-3 bg-white rounded xl:mr-16 lg:mr-10 px-6 py-4 mt-6 hidden lg:block">
              {/* Left Side Category And Color Section */}
              <LeftSideCategoryAndColorSection
                categories={categories}
                categoryShow={categoryShow}
                setCategoryShow={setCategoryShow}
                colorShow={colorShow}
                setColorShow={setColorShow}
                colors={colors}
                handleCategoryClick={handleCategoryClick}
                handleColorsClick={handleColorsClick}
                selectedCategory={selectedCategory}
                selectedColor={selectedColor}
                handlePriceChange={handlePriceChange}
              />
            </div>
            {/* All Products Main Section */}
            <div className="lg:col-span-9 col-span-12">
              {/* Small device product number */}
              <div className="col-span-12 sm:hidden  bg-white rounded p-3 my-3">
                <p className="sm:text-xl font-semibold text-primaryDeepColor ">
                  Products {products?.length}
                </p>
              </div>{" "}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-4">
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                </div>
              ) : (
                <div className="lg:min-h-[70vh] sm:min-h-[67vh] min-h-[60vh]">
                  {products?.length > 0 ? (
                    <div
                      className={`grid ${gridCols} gap-4 lg:px-0 sm:px-6 px-2 pb-6 rounded`}
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
              {/* Pagination */}
              {totalData > 0 && (
                <div className="flex justify-between flex-wrap-reverse items-center bg-white sm:px-4 px-2 rounded-md">
                  <FrontPagination
                    rows={rows}
                    page={page}
                    setPage={setPage}
                    setRows={setRows}
                    totalData={totalData}
                  />
                  <div className="text-xs sm:pt-0 py-2">
                    <span className="mr-1  font-semibold text-primary">
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
        {/* Mobile Filter Section */}
        {mobileFiltersOpen && (
          <>
            <div
              ref={sidebarRef}
              className={`fixed inset-0 z-50 w-64 h-[94vh] bg-white transition-transform duration-500 transform ease-in-out overflow-y-auto scrollbar-thin px-4 ${
                mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
              } lg:hidden`}
            >
              <span className="flex justify-end  pt-4">
                <IoClose
                  size={24}
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                />
              </span>
              {/* Left Side category and color section for mobile */}
              <LeftSideCategoryAndColorSection
                categories={categories}
                categoryShow={categoryShow}
                setCategoryShow={setCategoryShow}
                colorShow={colorShow}
                setColorShow={setColorShow}
                colors={colors}
                handleCategoryClick={handleCategoryClick}
                handleColorsClick={handleColorsClick}
                selectedCategory={selectedCategory}
                selectedColor={selectedColor}
                handlePriceChange={handlePriceChange}
              />
            </div>
            <div
              className="fixed inset-0 bg-black opacity-25 z-30"
              onClick={() => setMobileFiltersOpen(false)}
            ></div>
          </>
        )}
      </main>
    </div>
  );
}
