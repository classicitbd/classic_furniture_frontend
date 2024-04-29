
import { useState } from "react";
// import { AiFillHome } from "react-icons/ai";
import { FaChevronDown, FaListUl, FaUsers } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { TbCategoryPlus } from "react-icons/tb";
import { MdControlPointDuplicate } from "react-icons/md";
import { IoColorPaletteOutline, IoCartOutline, IoAddCircleSharp, IoSettingsOutline } from "react-icons/io5"
import { FcBarChart, FcPieChart } from "react-icons/fc";
import { BsKanban } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { eraseCookie } from "../../utils/cookie-storage";
import { authKey } from "../../constants/storageKey";


const SideNavBar = () => {
    const usePathname = useLocation();
    const pathname = usePathname?.pathname;

    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isProductOpen, setIsProductOpen] = useState(false);

    const handleLogOut = () => {
        eraseCookie(authKey);
        window.location.reload();
    }

    const navBar = (
        <>
            <div className="flex flex-col mt-6">

                <Link className={
                    pathname === "/admin"
                        ? "nab_item text-[#3EA2FA] xl:bg-gray-300 border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3"
                        : "text-[#717171] nab_item xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3 hover:text-[#3EA2FA]"
                } to="/admin">
                    <div className="flex items-center gap-3 font-semibold lg:text-[18px]">
                        <FcPieChart size={30} />
                        Dashboard
                    </div>
                </Link>

                <Link className={
                    pathname === "/admin/order"
                        ? "nab_item text-[#3EA2FA] xl:bg-gray-300 border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3"
                        : "text-[#717171] nab_item xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3 hover:text-[#3EA2FA]"
                } to="/admin/order">
                    <div className="flex items-center gap-3 font-semibold lg:text-[18px]">
                        <FcBarChart size={30} />
                        Order
                    </div>
                </Link>

                <div className="text-white nab_item xl:mt-1 lg:mt-3">
                    <div className=" flex items-center justify-between font-semibold xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2">
                        <button onClick={() => setIsUserOpen(!isUserOpen)} className="hover:text-[#3EA2FA] text-[#717171] flex items-center gap-4 lg:text-[18px]">
                            <BiSolidCategory size={25} className="text-blue-500" />Category <FaChevronDown className={`${isUserOpen ? "rotate-180 transition-all duration-300" : "transition-all duration-300"}`} size={20} /> </button>
                    </div>
                    {
                        isUserOpen && <div className="p-1 bg-white ml-4">


                            <div
                                className={
                                    pathname === "/admin/category"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold">
                                    <Link
                                        to="/admin/category"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <TbCategoryPlus />
                                        Category
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/admin/sub_category"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold mt-2">
                                    <Link
                                        to="/admin/sub_category"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <MdControlPointDuplicate />
                                        Sub Category
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/admin/color"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold mt-2">
                                    <Link
                                        to="/admin/color"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <IoColorPaletteOutline />
                                        Color
                                    </Link>
                                </div>
                            </div>

                        </div>
                    }
                </div>

                <div className="text-white nab_item xl:mt-1 lg:mt-3">
                    <div className=" flex items-center justify-between xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2 lg:p-0 font-semibold">
                        <button onClick={() => setIsProductOpen(!isProductOpen)} className="hover:text-[#3EA2FA] text-[#717171] flex items-center gap-4 lg:text-[18px]">
                            <IoCartOutline size={25} className="text-green-500" />Products <FaChevronDown className={`${isProductOpen ? "rotate-180 transition-all duration-300" : "transition-all duration-300"}`} size={20} /> </button>
                    </div>
                    {
                        isProductOpen && <div className="p-1 bg-white mt-2 ml-4">

                            <div
                                className={
                                    pathname === "/admin/product"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold">
                                    <Link
                                        to="/admin/product"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <FaListUl />
                                        List
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/admin/product/create"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold mt-2">
                                    <Link
                                        to="/admin/product/create"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <IoAddCircleSharp />
                                        Create
                                    </Link>
                                </div>
                            </div>

                        </div>
                    }
                </div>

                <Link className={
                    pathname === "/admin/banner"
                        ? "nab_item text-[#3EA2FA] xl:bg-gray-300 border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3"
                        : "text-[#717171] nab_item xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3 hover:text-[#3EA2FA]"
                } to="/admin/banner">
                    <div className="flex items-center gap-3 font-semibold lg:text-[18px]">
                        <BsKanban size={25} className="text-sky-500" />
                        Banner
                    </div>
                </Link>

                <Link className={
                    pathname === "/admin/customer"
                        ? "nab_item text-[#3EA2FA] xl:bg-gray-300 border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3"
                        : "text-[#717171] nab_item xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3 hover:text-[#3EA2FA]"
                } to="/admin/customer">
                    <div className="flex items-center gap-3 font-semibold lg:text-[18px]">
                        <FaUsers size={25} className="text-yellow-500" />
                        Customer
                    </div>
                </Link>

                <Link className={
                    pathname === "/admin/setting"
                        ? "nab_item text-[#3EA2FA] xl:bg-gray-300 border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3"
                        : "text-[#717171] nab_item xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3 hover:text-[#3EA2FA]"
                } to="/admin/setting">
                    <div className="flex items-center gap-3 font-semibold lg:text-[18px]">
                        <IoSettingsOutline className="text-red-500" size={25} />
                        Setting
                    </div>
                </Link>

                <button onClick={() => handleLogOut()} type="button" className="flex items-center gap-3 font-semibold lg:text-[18px] text-red-500 xl:p-2 lg:p-0 xl:mt-1 lg:mt-3">
                    <FiLogOut size={25} />
                    Log Out
                </button>

            </div>
        </>
    );

    return (
        <div className="hidden lg:block pl-3">

            <div>{navBar}</div>

        </div>
    );
};

export default SideNavBar;