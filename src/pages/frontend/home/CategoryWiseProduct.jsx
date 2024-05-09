import { useState, useEffect } from "react";
import { useGetCategoryWiseProductQuery } from "../../../redux/feature/categoryWiseProduct/categoryWiseProductApi";
import MiniSpinner from "../../../shared/loader/MiniSpinner";
import { Link } from "react-router-dom";
const CategoryWiseProduct = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { data: products, isLoading } = useGetCategoryWiseProductQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 3000,
    }
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let gridCols = "grid-cols-2";
  if (windowWidth >= 640) gridCols = "sm:grid-cols-2";
  if (windowWidth >= 768) gridCols = "md:grid-cols-3";
  if (windowWidth >= 1024) gridCols = "lg:grid-cols-4";
  if (windowWidth >= 1280) gridCols = "2xl:grid-cols-5";

  //   const handleAddToCart = () => {
  //     setCartQuantity((prevQuantity) => prevQuantity + 1);
  //   };

  //   console.log("cartQuantity", cartQuantity);

  if (isLoading)
    return (
      <div>
        <MiniSpinner />
      </div>
    );
  return (
    <div className="es_container mx-auto md:px-20 xl:px-0 px-5 py-10">
      {/* 1st map for title */}

      {/* Bedroom Furniture Section (similar structure as Living Room) */}
      <div>
        {products?.data?.map(
          (category) =>
            category?.productsData?.length > 0 && (
              <div key={category?.category?._id}>
                <div className="flex justify-between items-center mt-5">
                  <h1 className="text-2xl py-6 font-semibold text-primaryLightColor">
                    {category?.category?.category_name}
                  </h1>
                </div>
                {/* 2nd Map for products */}
                <div className={`grid gap-4 ${gridCols}`}>
                  {category?.productsData?.map((product) => (
                    <div key={product?._id} className="group">
                      <Link to={`/${product?.product_slug}`}>
                        <div
                          title="View Details"
                          className="border border-transparent group-hover:border-[#008140] transition-all duration-500 rounded-md group-hover:scale-100 shadow"
                        >
                          <div className="w-full relative">
                            <img
                              src={product?.product_thumbnail}
                              alt="Product Image"
                              className="w-full rounded-t-md h-[200px] object-cover"
                            />
                            {product?.product_discount_price && (
                              <div className="bg-red-600 text-white inline px-1 rounded text-[12px] absolute top-0 right-0 m-2">
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
                            {product?.product_quantity ? (
                              <div className=" text-sm text-gray-500">
                                <p> In-Stock</p>
                              </div>
                            ) : (
                              <div className=" text-xs text-gray-500">
                                <p> Out Of Stock</p>
                              </div>
                            )}
                            {/* Rating Stars */}
                            {/* <div className="product_rating flex">
                            {[...Array(Math.floor(product.rating))].map(
                              (_, index) => (
                                <FaStar
                                  key={index}
                                  className="text-yellowColor"
                                />
                              )
                            )}
                            {product.rating % 1 >= 0.5 && (
                              <FaStarHalfAlt className="text-yellowColor" />
                            )}
                          </div> */}
                            {/* Product Title */}
                            <div className="product_title py-4">
                              <p
                                title={product?.product_name}
                                className={`text-[17px] text-[#041826] leading-5 font-medium group-hover:text-ftPrimaryColor duration-200 transition-all ${
                                  window.innerWidth < 640
                                    ? "max-w-[10rem] overflow-hidden whitespace-nowrap overflow-ellipsis"
                                    : ""
                                }`}
                              >
                                {window.innerWidth >= 1024
                                  ? product.product_name.length > 30
                                    ? `${product.product_name.slice(0, 30)}...`
                                    : product.product_name
                                  : product.product_name.length > 23
                                  ? `${product.product_name.slice(0, 23)}...`
                                  : product.product_name}
                              </p>
                            </div>

                            {/* Buy Now Button
                          <div className="flex w-full items-center  gap-2 text-[#008140] cursor-pointer">
                            <FaShoppingCart
                              title="Add To cart"
                              className="text-lg "
                            />
                            <button
                              type="button"
                              title="Buy Now"
                              className="bg-ftPrimaryColor py-2 rounded   text-center font-semibold text-[16px]"
                            >
                              Buy Now
                            </button>
                          </div> */}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default CategoryWiseProduct;
