
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaChevronDown, FaChevronUp, FaUsers } from "react-icons/fa";
import { BiMaleFemale, BiSolidCategory  } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { TbCategoryPlus } from "react-icons/tb";


const SideNavBar = () => {
    const usePathname = useLocation();
    const pathname = usePathname?.pathname;

    const [isUserOpen, setIsUserOpen] = useState(false);

    const navBar = (
        <>
            <div className="flex flex-col">

                <div
                    className={
                        pathname === "/dashboard"
                            ? "nab_item text-black"
                            : "text-[#717171] nab_item"
                    }
                >
                    <div className="flex items-center justify-between text-[18px] font-semibold">
                        <Link  onClick={() => setIsUserOpen(false)} to="/dashboard" className="hover:text-black flex items-center gap-2">
                            <AiFillHome />
                            Home
                        </Link>
                    </div>
                </div>

                <div className="text-white nab_item">
                    <div className=" flex items-center justify-between mt-3 text-[18px] font-semibold">
                        <button onClick={() => setIsUserOpen(!isUserOpen)} className="hover:text-black text-[#717171] flex items-center gap-2">
                            <BiSolidCategory  />Category {isUserOpen ? <FaChevronUp /> : <FaChevronDown />} </button>
                    </div>
                    {
                        isUserOpen && <div className="p-1 bg-white mt-2">

                            <div
                                className={
                                    pathname === "/dashboard/menu"
                                        ? "nab_item text-black"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between text-[18px] font-semibold">
                                    <Link
                                        to="/dashboard/menu"
                                        className="hover:text-black flex items-center gap-2"
                                    >
                                        <BiMaleFemale  />
                                        Menu Add
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={
                                    pathname === "/dashboard/category"
                                        ? "nab_item text-black"
                                        : "text-[#717171] nab_item"
                                }
                            >
                                <div className="flex items-center justify-between text-[18px] font-semibold mt-2">
                                    <Link
                                        to="/dashboard/category"
                                        className="hover:text-black flex items-center gap-2"
                                    >
                                        <TbCategoryPlus  />
                                        Category Add
                                    </Link>
                                </div>
                            </div>

                        </div>
                    }
                </div>

                <div
                    className={
                        pathname === "/dashboard/allCustomer"
                            ? "nab_item text-black"
                            : "text-[#717171] nab_item"
                    }
                >
                    <div className="flex items-center justify-between text-[18px] font-semibold mt-2">
                        <Link to="/dashboard/allCustomer" className="hover:text-black flex items-center gap-2">
                            <FaUsers  />
                            All Customer
                        </Link>
                    </div>
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