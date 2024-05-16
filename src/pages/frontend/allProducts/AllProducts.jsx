import { useGetProductQuery } from "../../../redux/feature/product/productApi";
// import { data } from "autoprefixer";
import { IoFilterOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loader from "../../../shared/loader/Loader";
import { useGetCategoryQuery } from "../../../redux/feature/category/categoryApi";
import { useGetColorQuery } from "../../../redux/feature/color/colorApi";
import { FaArrowCircleDown, FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function AllProducts() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [categoryShow, setCategoryShow] = useState(false);
  const [colorShow, setColorShow] = useState(false);

  const { data: products, isLoading } = useGetProductQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });
  const { data: categories } = useGetCategoryQuery(undefined);
  const { data: colors } = useGetColorQuery(undefined);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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
                <p>Show:</p>
                <select className="border border-primaryLightColor rounded-md px-2 py-1">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="lg:col-span-3 bg-white rounded xl:mr-16 lg:mr-10 px-6 py-4  my-6 hidden lg:block">
              <div className="">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {categories?.data?.map((category) => (
                    <li key={category?.category_name}>
                      <a href={category.href}>{category?.category_name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-9 col-span-12">
              <div
                className={`grid ${gridCols} gap-4 lg:px-0 px-6 pb-6    rounded`}
              >
                {products?.data?.map((product) => (
                  <div key={product?._id} className="group mt-6 bg-white ">
                    <Link to={`/${product?.product_slug}`}>
                      <div
                        title="View Details"
                        className="border  group-hover:border-[#008140] transition-all duration-500 rounded-md group-hover:scale-100 shadow"
                      >
                        <div className="w-full relative">
                          <img
                            src={product?.product_thumbnail}
                            alt="Product Image"
                            className="w-full rounded-t-md h-[200px] "
                          />
                          {product?.product_discount_price && (
                            <div className="bg-red-600 text-white inline px-1  rounded-tr-lg rounded-bl-lg text-[12px] absolute top-0 right-0 m-2">
                              OFF{" "}
                              {product?.product_price -
                                product?.product_discount_price}
                              TK
                            </div>
                          )}
                        </div>
                        {/* Product Details */}
                        <div className="px-3 pt-3 pb-2">
                          {/* Product Prices */}
                          <div className="product_price_inner flex items-center gap-2 py-2">
                            <strong className="offer_price text-[#FF0000] text-[16px] font-bold">
                              ৳{" "}
                              {product?.product_discount_price
                                ? product?.product_discount_price
                                : product?.product_price}
                            </strong>
                            {product?.product_discount_price && (
                              <span className="old_price line-through text-[12px] text-[#0f172a99] font-medium">
                                ৳ {product?.product_price}
                              </span>
                            )}
                          </div>
                          {/* Product Color */}

                          <p className="text-[14px] font-semibold text-gray-600 py-1.5">
                            {product?.product_color_id?.color_name}
                          </p>

                          <div className="product_title py-4">
                            <p
                              title={product?.product_name}
                              className={` text-[17px] text-[#041826] leading-5 font-medium group-hover:text-ftPrimaryColor duration-200 transition-all ${
                                window.innerWidth < 640
                                  ? "max-w-[10rem] overflow-hidden whitespace-nowrap overflow-ellipsis"
                                  : ""
                              }`}
                            >
                              {window.innerWidth >= 1024
                                ? product.product_name.length > 18
                                  ? `${product.product_name.slice(0, 18)}...`
                                  : product.product_name
                                : product.product_name.length > 23
                                ? `${product.product_name.slice(0, 23)}...`
                                : product.product_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
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
