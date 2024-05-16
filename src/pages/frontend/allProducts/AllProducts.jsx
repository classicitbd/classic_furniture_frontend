import { useGetProductQuery } from "../../../redux/feature/product/productApi";
// import { data } from "autoprefixer";
import { IoFilterOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loader from "../../../shared/loader/Loader";
import { useGetCategoryQuery } from "../../../redux/feature/category/categoryApi";
import { useGetColorQuery } from "../../../redux/feature/color/colorApi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import AllProductCard from "./AllProductCard";

export default function AllProducts() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [categoryShow, setCategoryShow] = useState(true);
  const [colorShow, setColorShow] = useState(true);

  const { data: products, isLoading } = useGetProductQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });
  const { data: categories } = useGetCategoryQuery(undefined);
  const { data: colors } = useGetColorQuery(undefined);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let gridCols = "grid-cols-1";
  if (windowWidth >= 440) gridCols = "grid-cols-2";
  if (windowWidth >= 768) gridCols = "md:grid-cols-3";
  if (windowWidth >= 1024) gridCols = "lg:grid-cols-3";
  if (windowWidth >= 1440) gridCols = "2xl:grid-cols-4";
  if (isLoading) return <Loader />;

  return (
    <div className="">
      <main className=" es_container mx-auto  ">
        {/* <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10 ">
        </div> */}

        <section className="py-6 mx-4 ">
          <div className="p-4    bg-white sm:px-6 rounded ">
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-center ">
                <p className="sm:text-xl font-semibold text-primaryDeepColor">
                  Products
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span
                  className="text-gray-800 mr-2 items-center gap-2 flex bg-gray-100 p-2 rounded lg:hidden "
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <IoFilterOutline size={20} /> <span>Filter</span>
                </span>
                {/* <p>Show:</p>
                <select className="border border-primaryLightColor rounded-md px-2 py-1">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select> */}

                <p>Sort By: Price </p>
                <select className="border border-primaryLightColor rounded-md px-2 py-1">
                  <option value="Default">Default</option>
                  <option value="Low to High">Low to High</option>
                  <option value="High to Low">High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="lg:col-span-3 bg-white rounded xl:mr-16 lg:mr-10 px-6 py-4  my-6 hidden lg:block">
              <div className="mb-4">
                <span className="flex justify-between items-center">
                  <h3 className="text-[16px] font-semibold py-2 text-gray-700">
                    Categories
                  </h3>
                  <span
                    onClick={() => setCategoryShow(!categoryShow)}
                    className=" text-gray-700"
                  >
                    {categoryShow ? <FaAngleDown /> : <FaAngleUp />}
                  </span>
                </span>
                {categoryShow && (
                  <ul
                    role="list"
                    className="space-y-4 pl-2 pb-6 text-sm font-medium text-gray-600 max-h-[360px] overflow-y-auto scrollbar-thin "
                  >
                    {categories?.data?.map((category) => (
                      <li key={category?.category_name}>
                        <Link
                          to={`/all?category=${category?.category_slug}`}
                          className="hover:text-primaryLightColor duration-200"
                        >
                          {category?.category_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <hr />

              {/* Color */}
              <div className="my-4">
                <span className="flex justify-between items-center">
                  <h3 className="text-[16px] font-semibold py-2 text-gray-700">
                    Color
                  </h3>
                  <span
                    onClick={() => setColorShow(!colorShow)}
                    className=" text-gray-700"
                  >
                    {colorShow ? <FaAngleDown /> : <FaAngleUp />}
                  </span>
                </span>
                {colorShow && (
                  <ul
                    role="list"
                    className="space-y-4 pl-2 pb-6 text-sm font-medium text-gray-600 max-h-[360px] overflow-y-auto scrollbar-thin "
                  >
                    {colors?.data?.map((color) => (
                      <li key={color?.color_name}>
                        <Link
                          to={`/all?color=${color?.color_slug}`}
                          className="hover:text-primaryLightColor duration-200"
                        >
                          {color?.color_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="lg:col-span-9 col-span-12">
              <div
                className={`grid ${gridCols} gap-4 lg:px-0 px-6 pb-6    rounded`}
              >
                {products?.data?.map((product) => (
                  <AllProductCard key={product?._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {mobileFiltersOpen === true && <>{/* Mobile filter */}</>}
      </main>
    </div>
  );
}
