
import { useState } from "react";
import { BiLogOut, BiSolidCategoryAlt } from "react-icons/bi";
import { IoIosSettings, IoLogoYoutube, IoMdHome } from "react-icons/io";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import {
    TbCategoryPlus,
} from "react-icons/tb";
import {
    MdOutlineAddShoppingCart,
    MdPeople,
} from "react-icons/md";
import { IoCart, IoColorPaletteOutline } from "react-icons/io5";
import { FaCartFlatbed } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../../utils/baseURL";
import BigSpinner from "../loader/BigSpinner";
import { eraseCookie } from "../../utils/cookie-storage";
import { authKey } from "../../constants/storageKey";

const SideNavBar = () => {
    const usePathname = useLocation();
    const pathName = usePathname?.pathname;
    const {
        data: siteSetting = [],
        isLoading
    } = useQuery({
        queryKey: [
            '/api/v1/siteSetting',
        ],
        queryFn: async () => {
            const res = await fetch(
                `${BASE_URL}/siteSetting`
            );
            const data = await res.json();
            return data;
        },
    }); // get all site setting
    const [isTasksOpen, setIsTasksOpen] = useState(
        pathName === "/admin/category" ||
        pathName === "/admin/sub-category" ||
        pathName === "/admin/color"
    );

    const [isProductOpen, setIsProductOpen] = useState(
        pathName === "/admin/product" ||
        pathName === "/admin/product/create"
    );

    const handleLogOut = () => {
        eraseCookie(authKey);
        window.location.reload();
    }

    if (isLoading) {
        return <BigSpinner />
    }

    return (
        <div className="flex flex-col flex-shrink-0 antialiased text-white bg-primaryColor min-h-screen">
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <div className="flex flex-wrap items-center justify-center mt-1 border-b pb-3">
                    <Link to="/">
                        <img src={siteSetting?.data?.[0]?.logo} alt="logo" />
                    </Link>
                </div>
                <ul className="flex flex-col pb-4 space-y-1 list-none">
                    <li>
                        <Link
                            to="/admin"
                            className={
                                pathName == "/admin"
                                    ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                                    : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                            }
                        >
                            <span className="ml-3">
                                <IoMdHome size={20} className="text-white" />
                            </span>
                            <span className=" tracking-wide truncate ml-2">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/order"
                            className={
                                pathName == "/admin/order"
                                    ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                                    : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                            }
                        >
                            <span className="ml-3">
                                <FaCartFlatbed size={20} className="text-white" />
                            </span>
                            <span className=" tracking-wide truncate ml-2">Order</span>
                        </Link>
                    </li>


                    <li>
                        <details
                            open={isTasksOpen}
                            className="group [&_summary::-webkit-details-marker]:hidden"
                        >
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700">
                                <span className="text-sm font-medium"> Tasks </span>

                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
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
                            <ul className="mt-2 space-y-1 list-none">
                                <li>
                                    <Link
                                        to="/admin/category"
                                        className={
                                            pathName == "/admin/category"
                                                ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                                                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                                        }
                                    >
                                        <span className="inline-flex justify-center items-center ml-6">
                                            <BiSolidCategoryAlt />
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">
                                            Category
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/sub_category"
                                        className={
                                            pathName == "/admin/sub_category"
                                                ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                                                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                                        }
                                    >
                                        <span className="inline-flex justify-center items-center ml-6">
                                            <TbCategoryPlus />
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">
                                            Sub Category
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/color"
                                        className={
                                            pathName == "/admin/color"
                                                ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                                                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                                        }
                                    >
                                        <span className="inline-flex justify-center items-center ml-6">
                                            <IoColorPaletteOutline />
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">
                                            Color
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details
                            open={isProductOpen}
                            className="group [&_summary::-webkit-details-marker]:hidden"
                        >
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700">
                                <span className="text-sm font-medium"> Products </span>

                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
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
                            <ul className="mt-2 space-y-1 list-none">
                                <li>
                                    <Link
                                        to="/admin/product"
                                        className={
                                            pathName == "/admin/product"
                                                ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                                                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                                        }
                                    >
                                        <span className="inline-flex justify-center items-center ml-6">
                                            <IoCart />
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">
                                            Product List
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/product/create"
                                        className={
                                            pathName == "/admin/product/create"
                                                ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                                                : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                                        }
                                    >
                                        <span className="inline-flex justify-center items-center ml-6">
                                            <MdOutlineAddShoppingCart />
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">
                                            Add Product
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <Link
                            to="/admin/video_tab"
                            className={
                                pathName == "/admin/video_tab"
                                    ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                                    : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                            }
                        >
                            <span className="ml-3">
                                <IoLogoYoutube size={20} className="text-white" />
                            </span>
                            <span className=" tracking-wide truncate ml-2">Video</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/customer"
                            className={
                                pathName == "/admin/customer"
                                    ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                                    : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                            }
                        >
                            <span className="ml-3">
                                <MdPeople size={20} className="text-white" />
                            </span>
                            <span className=" tracking-wide truncate ml-2">Users</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/banner"
                            className={
                                pathName == "/admin/banner"
                                    ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                                    : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                            }
                        >
                            <span className="ml-3">
                                <TfiLayoutSliderAlt size={20} className="text-white" />
                            </span>
                            <span className=" tracking-wide truncate ml-2">Banner</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/setting"
                            className={
                                pathName == "/admin/setting"
                                    ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-secondary2 pr-6 bg-successColor"
                                    : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6"
                            }
                        >
                            <span className="ml-3">
                                <IoIosSettings size={20} className="text-white" />
                            </span>
                            <span className=" tracking-wide truncate ml-2">Setting</span>
                        </Link>
                    </li>

                    <li>
                        <button
                            onClick={() => handleLogOut()}
                            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-successColor text-white hover:text-white border-r-4 border-transparent hover:border-secondary2 pr-6 w-full"
                        >
                            <span className="ml-3">
                                <BiLogOut size={20} className="text-red-500" />
                            </span>
                            <span className=" tracking-wide truncate ml-1 text-red-500">Log Out</span>
                        </button>
                    </li>

                </ul>
            </div>
            {/* </div> */}
        </div>
    );
}
export default SideNavBar;

