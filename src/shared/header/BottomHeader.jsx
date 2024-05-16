import { useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import MiniSpinner from "../loader/MiniSpinner";
import { useGetMenuQuery } from "../../redux/feature/menu/menuApi";

export default function BottomHeader2() {
  const { data: menuData, isLoading } = useGetMenuQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMenu, setIsMenu] = useState("");
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [isCategory, setIsCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <MiniSpinner />
      </div>
    );
  }

  return (
    <div className="text-[#008140] font-medium">
      <div className="es_container">
        <div className="flex items-center justify-between py-2">
          <div className="left flex items-center md:gap-x-8 xl:gap-x-12  xl:ms-0 px-5">
            <nav className="number md:ms-20 xl:ms-0 flex items-center ">
              <Link to={"/"} className="text-[15px]">
                Home
              </Link>
            </nav>
            <nav className="email flex items-center">
              <NavLink to={"/all"} className="text-[15px]">
                All Products
              </NavLink>
            </nav>
            <div>
              <div
                onMouseEnter={() => {
                  setIsCategoryOpen(true);
                  setSubCategories([]);
                  setIsCategory("");
                  setIsMenu("");
                }}
                onMouseLeave={() => {
                  setIsCategoryOpen(false);
                  setIsCategory("");
                  setIsMenu("");
                }}
                className=" rounded-full hidden lg:block "
              >
                <div className="relative">
                  <NavLink to={"/all"} className="text-[15px]">
                    Categories
                  </NavLink>
                  {/* ------ category section top header ------ start */}
                  {isCategoryOpen && (
                    <div className="absolute top-6 left-0 z-10 col-span-2 hidden lg:block rounded bg-white  border shadow-md py-3">
                      <div className="rounded-md flex">
                        <nav className="w-[220px] border-r overflow-hidden">
                          <ul className="space-y-[1px] list-none max-h-[300px] overflow-y-auto scrollbar-thin">
                            {menuData?.data?.map((menu) => (
                              <Link
                                onClick={() => {
                                  setIsCategoryOpen(false);
                                  setIsCategory("");
                                  setIsMenu("");
                                }}
                                key={menu?.category?._id}
                                to={`/all?category=${menu?.category?.category_slug}`}
                              >
                                <li
                                  onMouseOver={() => {
                                    setSubCategories(menu?.subCategoryData);
                                    setIsMenu(menu?.category?.category_slug);
                                    setIsCategory("");
                                  }}
                                >
                                  <details className="group">
                                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                      <span
                                        className={`text-sm font-medium group-hover:text-[#14CD6D]" ${
                                          isMenu ===
                                            menu?.category?.category_slug &&
                                          "text-[#14CD6D]"
                                        }`}
                                      >
                                        {menu?.category?.category_name}
                                      </span>

                                      {menu?.subCategoryData?.length > 0 && (
                                        <span
                                          className={`shrink-0 transition duration-300 group-hover:-rotate-90 ${
                                            isMenu ===
                                              menu?.category?.category_slug &&
                                            "-rotate-90"
                                          }`}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-5 w-5 group-hover:text-[#14CD6D]" ${
                                              isMenu ===
                                                menu?.category?.category_slug &&
                                              "text-[#14CD6D]"
                                            }`}
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
                                      )}
                                    </summary>
                                  </details>
                                </li>
                              </Link>
                            ))}
                          </ul>
                        </nav>
                        {subCategories?.length > 0 && (
                          <nav className="w-[220px] border-r overflow-hidden">
                            <ul className="space-y-[1px] list-none max-h-[300px] overflow-y-auto scrollbar-thin">
                              {subCategories?.map((subCategory) => (
                                <Link
                                  onClick={() => {
                                    setIsCategoryOpen(false);
                                    setIsCategory("");
                                    setIsMenu("");
                                  }}
                                  to={`/all?category=${isMenu}?sub_category=${subCategory?.sub_category_slug}`}
                                  key={subCategory?.sub_category_name}
                                >
                                  <li>
                                    <details className="group">
                                      <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-1 text-gray-500 hover:bg-gray-100 hover:text-[#14CD6D]">
                                        <span
                                          className={`text-sm font-medium group-hover:text-[#14CD6D]" ${
                                            isCategory ===
                                              subCategory?.sub_category_slug &&
                                            "text-[#14CD6D]"
                                          }`}
                                        >
                                          {subCategory?.sub_category_name}
                                        </span>
                                      </summary>
                                    </details>
                                  </li>
                                </Link>
                              ))}
                            </ul>
                          </nav>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {menuData?.data?.map(
              (menu) =>
                menu?.category?.show_title === "active" && (
                  <div
                    key={menu?.category?._id}
                    onMouseEnter={() => {
                      setIsSubCategoryOpen(true);
                      setIsCategory("");
                      setSubCategories(menu?.subCategoryData);
                      setIsMenu(menu?.category?.category_slug);
                    }}
                    onMouseLeave={() => {
                      setIsSubCategoryOpen(false);
                      setIsMenu("");
                    }}
                  >
                    <div className="relative">
                      <NavLink
                        to={`/all?category=${menu?.category?.category_slug}`}
                        className="text-[15px] "
                      >
                        {menu?.category?.category_name}
                      </NavLink>
                      {menu?.subCategoryData?.length > 0 &&
                        isMenu === menu?.category?.category_slug &&
                        isSubCategoryOpen && (
                          <div className="absolute top-full left-0 z-10 bg-white border w-[170px] max-h-[300px] overflow-y-auto scrollbar-thin shadow-md py-3">
                            {menu?.subCategoryData?.map((subCategory) => (
                              <Link
                                onClick={() => {
                                  setIsSubCategoryOpen(false);
                                  setIsCategory("");
                                  setIsMenu("");
                                }}
                                to={`/all?category=${menu?.category?.category_slug}&sub_category=${subCategory?.sub_category_slug}`}
                                key={subCategory?._id}
                              >
                                <div className="px-4 py-1 text-gray-500 hover:bg-gray-100 hover:text-[#14CD6D]">
                                  {subCategory?.sub_category_name}
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
