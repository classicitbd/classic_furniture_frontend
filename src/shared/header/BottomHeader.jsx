// import { useState } from "react";
// import "./header.css";
// import { Link, NavLink } from "react-router-dom";
// import { useGetCategoryQuery } from "../../redux/feature/category/categoryApi";
// import MiniSpinner from "../loader/MiniSpinner";
// import { useGetSub_CategoryQuery } from "../../redux/feature/subCategory/subCategoryApi";

// export default function BottomHeader() {
//   const [showCategoryModal, setShowCategoryModal] = useState(false);
//   const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
//   const { data: categories, isLoading } = useGetCategoryQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });

//   const { data: subCategories } = useGetSub_CategoryQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });
//   const handleMouseEnter = () => {
//     setShowCategoryModal(true);
//   };

//   const handleMouseLeave = () => {
//     setShowCategoryModal(false);
//   };

//   if (isLoading) {
//     return (
//       <div className=" flex flex-col items-center justify-center">
//         <MiniSpinner />
//       </div>
//     );
//   }
//   return (
//     <div className="text-[#008140] font-medium">
//       <div className="es_container">
//         <div className="flex items-center justify-between py-2">
//           <div className="left flex items-center md:gap-x-8 xl:gap-x-12  xl:ms-0 px-5">
//             <nav className="number md:ms-20 xl:ms-0 flex items-center ">
//               <Link to={"/"} className="text-[15px] ">
//                 Home
//               </Link>
//             </nav>
//             <nav className="email flex items-center">
//               <NavLink to={"/all"} className="text-[15px]">
//                 All Products
//               </NavLink>
//             </nav>
//             <nav className=" ">
//               <div
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <NavLink to={"/category"} className="text-[15px]">
//                   Category
//                 </NavLink>

//                 {showCategoryModal && (
//                   <div
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}
//                     className="bg-[#ffffff] shadow  modal-content lg:ml-64 ml-0  grid grid-cols-1 gap-4 p-4 rounded"
//                   >
//                     {categories?.data?.map((category) => (
//                       <Link
//                         key={category?._id}
//                         to={`/category/${category?.category_slug}`}
//                         className="text-blue-500 hover:underline"
//                         onMouseEnter={() => setShowSubCategoryModal(true)}
//                         onMouseLeave={() => setShowSubCategoryModal(false)}
//                       >
//                         {category?.category_name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//                 {showSubCategoryModal && (
//                   <div
//                     onMouseEnter={() => setShowSubCategoryModal(true)}
//                     onMouseLeave={() => setShowSubCategoryModal(false)}
//                     className="bg-[#ffffff] shadow  modal-content  ml-0  grid grid-cols-1 gap-4 p-4 rounded"
//                   >
//                     {subCategories?.data?.map((subCategory) => (
//                       <nav
//                         className="email flex items-center"
//                         key={subCategory?._id}
//                       >
//                         <Link
//                           to={`all/category/${subCategory?.category_id?.category_slug}/${subCategory?.sub_category_slug}`}
//                           className=" text-[15px]"
//                         >
//                           {subCategory?.sub_category_name}
//                         </Link>
//                       </nav>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </nav>
//             <nav className="email flex items-center">
//               <NavLink to={"/campaign"} className=" text-[15px]">
//                 Campaigns
//               </NavLink>
//             </nav>
//             <nav className="email flex items-center">
//               <NavLink to={"/campaign"} className=" text-[15px]">
//                 Living
//               </NavLink>
//             </nav>
//             <nav className="email flex items-center">
//               <NavLink to={"/campaign"} className=" text-[15px]">
//                 Bedroom
//               </NavLink>
//             </nav>
//             <nav className="email flex items-center">
//               <NavLink to={"/campaign"} className=" text-[15px]">
//                 Dining
//               </NavLink>
//             </nav>
//             <nav className="email flex items-center">
//               <NavLink to={"/campaign"} className=" text-[15px]">
//                 Office
//               </NavLink>
//             </nav>

//             <nav className="email flex items-center">
//               <NavLink to={"/campaign"} className=" text-[15px]">
//                 Industry & Hospital
//               </NavLink>
//             </nav>
//             <nav className="email flex items-center md:me-10 xl:me-0">
//               <NavLink to={"/campaign"} className=" text-[15px]">
//                 Doors
//               </NavLink>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import MiniSpinner from "../loader/MiniSpinner";
import { useGetMenuQuery } from "../../redux/feature/menu/menuApi";

export default function BottomHeader() {
  // const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const { data: menuData, isLoading } = useGetMenuQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(menuData);
  const [isMenu, setIsMenu] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCategory, setIsCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
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
                className=" mx-3 px-1 rounded-full hidden lg:block "
              >
                <NavLink to={"/category"} className="text-[15px]">
                  Category
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
                className="absolute top-[160px] start-[28%] z-10 col-span-2 hidden lg:block rounded bg-white border shadow-md py-3"
              >
                <div className="rounded-md flex">
                  <nav className="w-[250px] border-r overflow-hidden">
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
                                  className={`text-sm font-medium group-hover:text-secondary ${
                                    isMenu === menu?.category?.category_slug &&
                                    "text-secondary"
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
                                      className={`h-5 w-5 group-hover:text-secondary ${
                                        isMenu ===
                                          menu?.category?.category_slug &&
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
                    <nav className="w-[250px] border-r overflow-hidden">
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
                            <li
                            // onMouseOver={() => {
                            //   setSubSubCategories(subCategory?.child_categories);
                            //   setIsCategory(
                            //     subCategory?.sub_category?.sub_category_slug
                            //   );
                            // }}
                            >
                              <details className="group">
                                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                  <span
                                    className={`text-sm font-medium group-hover:text-secondary ${
                                      isCategory ===
                                        subCategory?.sub_category_slug &&
                                      "text-secondary"
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
    </div>
  );
}

{
  /*             <nav className="email flex items-center">
              <NavLink to={"/campaign"} className=" text-[15px]">
                Campaigns
              </NavLink>
            </nav>
            <nav className="email flex items-center">
              <NavLink to={"/campaign"} className=" text-[15px]">
                Living
              </NavLink>
            </nav>
            <nav className="email flex items-center">
              <NavLink to={"/campaign"} className=" text-[15px]">
                Bedroom
              </NavLink>
            </nav>
            <nav className="email flex items-center">
              <NavLink to={"/campaign"} className=" text-[15px]">
                Dining
              </NavLink>
            </nav>
            <nav className="email flex items-center">
              <NavLink to={"/campaign"} className=" text-[15px]">
                Office
              </NavLink>
            </nav>

            <nav className="email flex items-center">
              <NavLink to={"/campaign"} className=" text-[15px]">
                Industry & Hospital
              </NavLink>
            </nav>
            <nav className="email flex items-center md:me-10 xl:me-0">
              <NavLink to={"/campaign"} className=" text-[15px]">
                Doors
              </NavLink>
                </nav> */
}
