import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCategoryQuery } from "../../../redux/feature/category/categoryApi";
import MiniSpinner from "../../../shared/loader/MiniSpinner";

const PopularCategory = () => {
  const { data: categories, isLoading } = useGetCategoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

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
  if (windowWidth >= 640) gridCols = "sm:grid-cols-2";
  if (windowWidth >= 768) gridCols = "md:grid-cols-3";
  if (windowWidth >= 1024) gridCols = "lg:grid-cols-4";
  if (windowWidth >= 1440) gridCols = "2xl:grid-cols-6";

  if (isLoading)
    return (
      <div>
        <MiniSpinner />
      </div>
    );
  return (
    <div className="es_container mx-auto md:px-20 xl:px-0 px-5">
      <div>
        <div className="flex justify-between items-center py-6 ">
          <h1 className="text-2xl py-6 font-semibold text-primaryLightColor">
            Popular Categories
          </h1>
        </div>
      </div>
      <div className={`grid gap-4 ${gridCols}`}>
        {categories?.data
          ?.filter((category) => category?.show_card === "active")
          .map((category) => (
            <div
              key={category?._id}
              className="bg-white shadow p-5 rounded-md hover:shadow-xl transition"
            >
              <Link to={"/category"}>
                <div className="text-center">
                  <img
                    className="w-full h-36 mx-auto"
                    src={category?.category_logo}
                    alt={category.category_name}
                  />
                  <p className="mt-4 sm:text-[14px] text-xs ">
                    {category?.category_name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PopularCategory;
