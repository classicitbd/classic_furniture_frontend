import Link from "next/link";
import Slider from "./Slider";
import { useState } from "react";
const HeroSection = ({ menuData, bannerData }) => {
  const [isMenu, setIsMenu] = useState("");
  const [isCategory, setIsCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  return (
    <div
      onMouseLeave={() => {
        setSubCategories([]);
        setSubSubCategories([]);
        setIsMenu("");
        setIsCategory("");
      }}
      className="lg:container mx-auto grid grid-cols-10 gap-0 lg:gap-4 lg:my-5 relative"
    >
      <div className="col-span-2 hidden lg:block rounded-xl bg-white border shadow-md">
        <nav className="overflow-hidden">
          <ul className="space-y-[1px] list-none h-[25vh] md:h-[40vh] lg:h-[50vh] overflow-y-auto scrollbar-thin py-2">
            {menuData?.map((menu) => (
              <Link
                key={menu?.category?._id}
                href={/category/${menu?.category?.category_slug}}
              >
                <li
                  onMouseOver={() => {
                    setSubCategories(menu?.subCategoryAndChildCategoryData);
                    setSubSubCategories([]);
                    setIsMenu(menu?.category?.category_slug);
                    setIsCategory("");
                  }}
                >
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between rounded px-4 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <button
                        className={`text-sm font-medium group-hover:text-secondary ${
                          isMenu === menu?.category?.category_slug &&
                          "text-secondary"
                        }`}
                      >
                        {menu?.category?.category_name}
                      </button>

                      {menu?.subCategoryAndChildCategoryData?.length > 0 && (
                        <span
                          className={`shrink-0 transition duration-300 group-hover:-rotate-90 ${
                            isMenu === menu?.category?.category_slug &&
                            "-rotate-90"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 group-hover:text-secondary ${
                              isMenu === menu?.category?.category_slug &&
                              "text-secondary"
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
          <div className="absolute top-0 start-[20%] z-10 bg-white shadow-md border h-full rounded-md flex">
            <nav className="w-[250px] border-r">
              <ul className="my-1 space-y-[1px] list-none h-[25vh] md:h-[40vh] lg:h-[50vh] overflow-y-auto scrollbar-thin">
                {subCategories?.map((subCategory) => (
                  <Link
                    to={/category/${isMenu}/${subCategory?.sub_category?.sub_category_slug}}
                    key={subCategory?.sub_category?._id}
                  >
                    <li
                      onMouseOver={() => {
                        setSubSubCategories(subCategory?.child_categories);
                        setIsCategory(
                          subCategory?.sub_category?.sub_category_slug
                        );
                      }}
                    >
                      <details className="group">
                        <summary className="flex cursor-pointer items-center justify-between rounded px-4 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                          <button
                            className={`text-sm font-medium group-hover:text-secondary ${
                              isCategory ===
                                subCategory?.sub_category?.sub_category_slug &&
                              "text-secondary"
                            }`}
                          >
                            {subCategory?.sub_category?.sub_category_name}
                          </button>

                          {subCategory?.child_categories?.length > 0 && (
                            <span
                              className={`shrink-0 transition duration-300 group-hover:-rotate-90 ${
                                isCategory ===
                                  subCategory?.sub_category
                                    ?.sub_category_slug && "-rotate-90"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 group-hover:text-secondary ${
                                  isCategory ===
                                    subCategory?.sub_category
                                      ?.sub_category_slug && "text-secondary"
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
            {subSubCategories?.length > 0 && (
              <nav className="w-[250px]">
                <ul className="my-1 space-y-[1px] list-none h-[25vh] md:h-[40vh] lg:h-[50vh] overflow-y-auto scrollbar-thin">
                  {subSubCategories?.map((subSubCategory) => (
                    <Link
                      key={subSubCategory?._id}
                      href={/category/${isMenu}/${isCategory}/${subSubCategory?.child_category_slug}}
                    >
                      <li>
                        <details className="group">
                          <summary className="flex cursor-pointer items-center justify-between rounded px-4 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            <button className="text-sm font-medium group-hover:text-secondary">
                              {subSubCategory?.child_category_name}
                            </button>

                            <span className="shrink-0 transition duration-300 -rotate-90 hidden group-hover:block">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 group-hover:text-secondary"
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
                          </summary>
                        </details>
                      </li>
                    </Link>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>
      <div
        onMouseEnter={() => {
          setSubCategories([]);
          setSubSubCategories([]);
          setIsMenu("");
          setIsCategory("");
        }}
        onMouseLeave={() => {
          setSubCategories([]);
          setSubSubCategories([]);
          setIsMenu("");
          setIsCategory("");
        }}
        className="col-span-10 lg:col-span-8"
      >
        <Slider bannerData={bannerData} />
      </div>
    </div>
  );
};

export default HeroSection;