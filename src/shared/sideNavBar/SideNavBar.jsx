
import { useState } from "react";
// import { AiFillHome } from "react-icons/ai";
import { FaChevronDown, FaListUl, FaUsers } from "react-icons/fa";
import { BiMaleFemale, BiSolidCategory } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { TbCategoryPlus } from "react-icons/tb";
import { MdControlPointDuplicate, MdOutlineFeaturedPlayList } from "react-icons/md";
import { IoColorPaletteOutline, IoCartOutline, IoAddCircleSharp, IoSettingsOutline } from "react-icons/io5"
import { MdOutlineCollectionsBookmark } from "react-icons/md"
import { RxFontStyle } from "react-icons/rx";
import { PiSlideshowBold } from "react-icons/pi";
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

    const navBar = (
        <>
            <div className="flex flex-col mt-6">

                <Link className={
                    pathname === "/istiak"
                        ? "nab_item text-[#3EA2FA] xl:bg-gray-300 border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3"
                        : "text-[#717171] nab_item xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3 hover:text-[#3EA2FA]"
                } to="/istiak">
                    <div className="flex items-center gap-3 font-semibold lg:text-[18px]">
                        <FcPieChart size={30} />
                        Dashboard
                    </div>
                </Link>

                <Link className={
                    pathname === "/istiak/order"
                        ? "nab_item text-[#3EA2FA] xl:bg-gray-300 border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3"
                        : "text-[#717171] nab_item xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3 hover:text-[#3EA2FA]"
                } to="/istiak/order">
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
                        isUserOpen && <div className="p-1 bg-white mt-2 ml-4">

                            <div
                                className={
                                    pathname === "/istiak/menu"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold">
                                    <Link
                                        to="/istiak/menu"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <BiMaleFemale />
                                        Menu
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/istiak/category"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold mt-2">
                                    <Link
                                        to="/istiak/category"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <TbCategoryPlus />
                                        Category
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/istiak/sub_category"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold mt-2">
                                    <Link
                                        to="/istiak/sub_category"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <MdControlPointDuplicate />
                                        Sub Category
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/istiak/color"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold mt-2">
                                    <Link
                                        to="/istiak/color"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <IoColorPaletteOutline />
                                        Color
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/istiak/collection"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold mt-2">
                                    <Link
                                        to="/istiak/collection"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <MdOutlineCollectionsBookmark />
                                        Collection
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/istiak/feature"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold mt-2">
                                    <Link
                                        to="/istiak/feature"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <MdOutlineFeaturedPlayList />
                                        Feature
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/istiak/style"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold mt-2">
                                    <Link
                                        to="/istiak/style"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <RxFontStyle />
                                        Style
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
                                    pathname === "/istiak/product"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold">
                                    <Link
                                        to="/istiak/product"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2 lg:text-[18px]"
                                    >
                                        <FaListUl />
                                        List
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/istiak/product/create"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between font-semibold mt-2">
                                    <Link
                                        to="/istiak/product/create"
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
                    pathname === "/istiak/slider"
                        ? "nab_item text-[#3EA2FA] xl:bg-gray-300 border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3"
                        : "text-[#717171] nab_item xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3 hover:text-[#3EA2FA]"
                } to="/istiak/slider">
                    <div className="flex items-center gap-3 font-semibold lg:text-[18px]">
                        <PiSlideshowBold size={30} className="text-sky-500" />
                        Slider
                    </div>
                </Link>

                <Link className={
                    pathname === "/istiak/banner"
                        ? "nab_item text-[#3EA2FA] xl:bg-gray-300 border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3"
                        : "text-[#717171] nab_item xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3 hover:text-[#3EA2FA]"
                } to="/istiak/banner">
                    <div className="flex items-center gap-3 font-semibold lg:text-[18px]">
                        <BsKanban size={25} className="text-sky-500" />
                        Banner
                    </div>
                </Link>

                <Link className={
                    pathname === "/istiak/customer"
                        ? "nab_item text-[#3EA2FA] xl:bg-gray-300 border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3"
                        : "text-[#717171] nab_item xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3 hover:text-[#3EA2FA]"
                } to="/istiak/customer">
                    <div className="flex items-center gap-3 font-semibold lg:text-[18px]">
                        <FaUsers size={25} className="text-yellow-500" />
                        Customer
                    </div>
                </Link>

                <Link className={
                    pathname === "/istiak/setting"
                        ? "nab_item text-[#3EA2FA] xl:bg-gray-300 border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3"
                        : "text-[#717171] nab_item xl:hover:bg-gray-300 xl:bg-white border-0 rounded-lg xl:p-2 lg:p-0 xl:mt-1 lg:mt-3 hover:text-[#3EA2FA]"
                } to="/istiak/setting">
                    <div className="flex items-center gap-3 font-semibold lg:text-[18px]">
                        <IoSettingsOutline className="text-red-500" size={25} />
                        Setting
                    </div>
                </Link>

            </div>
        </>
    );

    const handleLogOut = () =>{
        eraseCookie(authKey);
        window.location.reload();
    }

    return (
        <div className="hidden lg:block pl-5">

            <div>{navBar}</div>

            <button onClick={() => handleLogOut()} type="button" className="flex items-center gap-3 font-semibold lg:text-[18px] mt-4 p-2 text-red-500">
                    <FiLogOut size={25} />
                    Log Out
            </button>

        </div>
    );
};

export default SideNavBar;