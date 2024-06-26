import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCategoryQuery } from "../../../redux/feature/category/categoryApi";

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

  // if (isLoading) return <Loader />;

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
        {isLoading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <div
                className="bg-gray-50 p-5 rounded-md hover:shadow-xl transition"
                key={index}
              >
                <div className="text-center">
                  <div className="animate-pulse bg-gray-200 w-full h-36 mx-auto" />
                  <div className="w-full  ">
                    <div className="w-3/5 mt-2 mx-auto h-2 animate-pulse  rounded bg-gray-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {categories?.data
              ?.filter((category) => category?.show_card === "active")
              .map((category) => (
                <div
                  key={category?._id}
                  className="bg-white shadow p-5 rounded-md hover:shadow-xl transition"
                >
                  <Link to={`/all?category=${category?.category_slug}`}>
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
          </>
        )}
      </div>
    </div>
  );
};

export default PopularCategory;
