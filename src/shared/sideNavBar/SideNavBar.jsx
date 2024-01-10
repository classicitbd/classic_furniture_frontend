
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaChevronDown, FaChevronUp, FaListUl } from "react-icons/fa";
import { BiMaleFemale, BiSolidCategory  } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { TbCategoryPlus } from "react-icons/tb";
import { MdControlPointDuplicate, MdOutlineFeaturedPlayList } from "react-icons/md";
import { IoColorPaletteOutline, IoCartOutline, IoAddCircleSharp } from "react-icons/io5"
import { MdOutlineCollectionsBookmark } from "react-icons/md"
import { RxFontStyle } from "react-icons/rx";
import { PiSlideshowBold } from "react-icons/pi";


const SideNavBar = () => {
    const usePathname = useLocation();
    const pathname = usePathname?.pathname;

    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isProductOpen, setIsProductOpen] = useState(false);

    const navBar = (
        <>
            <div className="flex flex-col">

                <div
                    className={
                        pathname === "/dashboard"
                            ? "nab_item text-[#3EA2FA]"
                            : "text-[#717171] nab_item"
                    }
                >
                    <div className="flex items-center justify-between text-[18px] font-semibold">
                        <Link  onClick={() => setIsUserOpen(false)} to="/dashboard" className="hover:text-[#3EA2FA] flex items-center gap-2">
                            <AiFillHome />
                            Home
                        </Link>
                    </div>
                </div>

                <div className="text-white nab_item">
                    <div className=" flex items-center justify-between mt-3 text-[18px] font-semibold">
                        <button onClick={() => setIsUserOpen(!isUserOpen)} className="hover:text-[#3EA2FA] text-[#717171] flex items-center gap-2">
                            <BiSolidCategory  />Category {isUserOpen ? <FaChevronUp /> : <FaChevronDown />} </button>
                    </div>
                    {
                        isUserOpen && <div className="p-1 bg-white mt-2">

                            <div
                                className={
                                    pathname === "/dashboard/menu"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between text-[18px] font-semibold">
                                    <Link
                                        to="/dashboard/menu"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2"
                                    >
                                        <BiMaleFemale  />
                                        Menu
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/dashboard/category"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between text-[18px] font-semibold mt-2">
                                    <Link
                                        to="/dashboard/category"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2"
                                    >
                                        <TbCategoryPlus  />
                                        Category
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/dashboard/sub_category"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between text-[18px] font-semibold mt-2">
                                    <Link
                                        to="/dashboard/sub_category"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2"
                                    >
                                        <MdControlPointDuplicate />
                                        Sub Category
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/dashboard/color"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between text-[18px] font-semibold mt-2">
                                    <Link
                                        to="/dashboard/color"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2"
                                    >
                                        <IoColorPaletteOutline />
                                        Color
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/dashboard/collection"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between text-[18px] font-semibold mt-2">
                                    <Link
                                        to="/dashboard/collection"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2"
                                    >
                                        <MdOutlineCollectionsBookmark  />
                                        Collection
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/dashboard/feature"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between text-[18px] font-semibold mt-2">
                                    <Link
                                        to="/dashboard/feature"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2"
                                    >
                                        <MdOutlineFeaturedPlayList   />
                                        Feature
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/dashboard/style"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between text-[18px] font-semibold mt-2">
                                    <Link
                                        to="/dashboard/style"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2"
                                    >
                                        <RxFontStyle />
                                        Style
                                    </Link>
                                </div>
                            </div>

                        </div>
                    }
                </div>

                <div
                    className={
                        pathname === "/dashboard/slider"
                            ? "nab_item text-[#3EA2FA]"
                            : "text-[#717171] nab_item"
                    }
                >
                    <div className="flex items-center justify-between text-[18px] font-semibold mt-2">
                        <Link to="/dashboard/slider" className="hover:text-[#3EA2FA] flex items-center gap-2">
                            <PiSlideshowBold  />
                            Slider
                        </Link>
                    </div>
                </div>

                <div className="text-white nab_item">
                    <div className=" flex items-center justify-between mt-3 text-[18px] font-semibold">
                        <button onClick={() => setIsProductOpen(!isProductOpen)} className="hover:text-[#3EA2FA] text-[#717171] flex items-center gap-2">
                            <IoCartOutline  />Products {isUserOpen ? <FaChevronUp /> : <FaChevronDown />} </button>
                    </div>
                    {
                        isProductOpen && <div className="p-1 bg-white mt-2">

                            <div
                                className={
                                    pathname === "/dashboard/product"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between text-[18px] font-semibold">
                                    <Link
                                        to="/dashboard/product"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2"
                                    >
                                        <FaListUl   />
                                        List
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/dashboard/product/create"
                                        ? "nab_item text-[#3EA2FA]"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between text-[18px] font-semibold mt-2">
                                    <Link
                                        to="/dashboard/product/create"
                                        className="hover:text-[#3EA2FA] flex items-center gap-2"
                                    >
                                        <IoAddCircleSharp   />
                                        Create
                                    </Link>
                                </div>
                            </div>

                        </div>
                    }
                </div>
                
            </div>
        </>
    );

    return (
        <div className="hidden lg:block pl-5">

                <div>{navBar}</div>

        </div>
    );
};

export default SideNavBar;