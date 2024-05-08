import { useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import MiniSpinner from "../loader/MiniSpinner";
import { useGetMenuQuery } from "../../redux/feature/menu/menuApi";

export default function BottomHeader() {
  const { data: menuData, isLoading } = useGetMenuQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  // console.log(menuData);
  const [isMenu, setIsMenu] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCategory, setIsCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  // const [isTitleSubCategory, setIsTitleSubCategory] = useState("");
  // const [isTitleCategoryOpen, setIsTitleCategoryOpen] = useState(false);
  // const [isTitleMenu, setIsTitleMenu] = useState("");

  // const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  // const handleMouseEnter = () => {
  //   setShowSubCategoryModal(true);
  // };

  // const handleMouseLeave = () => {
  //   setShowSubCategoryModal(false);
  // };
  if (isLoading) {
    return (
      <div className=" flex flex-col items-center justify-center">
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
              <Link to={"/"} className="text-[15px] ">
                Home
              </Link>
            </nav>
            <nav className="email flex items-center">
              <NavLink to={"/all"} className="text-[15px]">
                All Products
              </NavLink>
            </nav>
            <nav className=" ">
              <div
                onMouseEnter={() => {
                  setIsCategoryOpen(true);
                  setSubCategories([]);
                  setIsCategory("");
                  setIsMenu("");
                }}
                className=" rounded-full hidden lg:block "
              >
                <NavLink to={"/category"} className="text-[15px]">
                  Categories
                </NavLink>
              </div>
            </nav>
            {/* ------ category section top header ------ start */}
            {isCategoryOpen && (
              <div
                onMouseLeave={() => {
                  setIsCategoryOpen(false);
                  setIsCategory("");
                  setIsMenu("");
                }}
                className="absolute top-[160px] start-[26%] z-10 col-span-2 hidden lg:block rounded bg-white  border shadow-md py-3"
              >
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
                          to={`/category/${menu?.category?.category_slug}`}
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
                                    isMenu === menu?.category?.category_slug &&
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
                            to={`/category/${isMenu}/${subCategory?.sub_category_slug}`}
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

            {/* category show by title  */}

            {menuData?.data
              ?.filter((menu) => menu?.category?.show_title === "active")
              .map((menu) => (
                // show title sub category start
                <nav className="email flex items-center" key={menu?._id}>
                  <div>
                    <NavLink
                      to={`/category/${menu?.category?.category_slug}`}
                      className="text-[15px]"
                    >
                      {menu?.category?.category_name}
                    </NavLink>
                  </div>
                </nav>
              ))}

            {/* <nav className="email flex items-center">
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {menuData?.data?.map(
                  (menu) =>
                    menu?.category?.show_title === "active" && (
                      <NavLink
                        key={menu?._id}
                        to={`/category/${menu?.category?.category_slug}`}
                        className="  px-4 py-1"
                      >
                        {menu?.category?.category_name}
                      </NavLink>
                    )
                )}
                {showSubCategoryModal && (
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="bg-[#ffffff]  modal-content w-full  grid grid-cols-1 gap-4 p-4 rounded shadow-lg"
                  >
                    {subCategories?.map((subCategory) => (
                      <Link
                        onClick={() => {
                          setIsCategoryOpen(false);
                          setIsCategory("");
                          setIsMenu("");
                        }}
                        to={`/category/${subCategory?.sub_category_slug}`}
                        key={subCategory?.sub_category_name}
                      >
                        <p className="text-[15px]  text-gray-500 hover:bg-gray-100 hover:text-[#14CD6D] ">
                          {subCategory?.sub_category_name}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav> */}

            {/* {menuData?.data?.map(
              (menu) =>
                menu?.category?.show_title === "active" && (
                  // show title sub category start
                  <nav className="email  flex items-center " key={menu?._id}>
                    <div
                      onMouseEnter={() => {
                        setIsTitleCategoryOpen(true);
                        setIsTitleSubCategory("");
                        setIsTitleMenu("");
                      }}
                      className=" mx-3 px-1 rounded-full hidden lg:block"
                    >
                      <NavLink
                        to={`/category/${menu?.category?.category_slug}`}
                        className=" text-[15px]"
                      >
                        {menu?.category?.category_name}
                      </NavLink>

                      {isTitleCategoryOpen && (
                        <div
                          onMouseLeave={() => {
                            setIsTitleCategoryOpen(false);
                            setIsTitleSubCategory("");
                            setIsTitleMenu("");
                          }}
                          className="absolute top-[160px] start-[28%] z-10 col-span-2 hidden lg:block rounded bg-white  border shadow-md py-3"
                        >
                          <div className=" rounded-md flex">
                            <nav className="w-[250px] border-r overflow-hidden">
                              <ul className="space-y-[1px] list-none max-h-[300px] overflow-y-auto scrollbar-thin">
                                {menu?.subCategoryData?.map((subCategory) => (
                                  <Link
                                    onClick={() => {
                                      setIsTitleCategoryOpen(false);
                                      setIsTitleSubCategory("");
                                      setIsTitleMenu("");
                                    }}
                                    to={`/category/${menu?.category?.category_slug}/${subCategory?.sub_category_slug}`}
                                    key={subCategory?.sub_category_name}
                                  >
                                    <li>
                                      <details className="group">
                                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-1 text-gray-500 hover:bg-gray-100 hover:text-[#14CD6D]">
                                          <span
                                            className={`text-sm font-medium group-hover:text-[#14CD6D]" ${
                                              isTitleSubCategory ===
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
                          </div>
                        </div>
                      )}
                    </div>
                  </nav>
                )
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
