import { useState } from "react";
import "./header.css"
import { Link, NavLink } from 'react-router-dom'


export default function BottomHeader() {
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const handleMouseEnter = () => {
        setShowCategoryModal(true);
    };

    const handleMouseLeave = () => {
        setShowCategoryModal(false);
    };

    return (
        <div className="text-green-900 font-medium">
            <div className="es_container">
                <div className="flex items-center justify-between py-2">
                    <div className="left flex items-center gap-x-8">
                        <nav className="number md:ms-20 xl:ms-0 flex items-center ">
                            <Link
                                to={"/"}
                                className="text-[14px] "
                            >
                                Home
                            </Link>
                        </nav>
                        <nav className="email flex items-center">
                            <NavLink
                                to={"/all"}
                                className="  text-[14px]"
                            >
                                All Products
                            </NavLink>
                        </nav>
                        <nav className="email flex items-center">
                            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <NavLink to={"/category"} className="text-[14px]">Category</NavLink>
                                {showCategoryModal && (
                                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="bg-[#ffffff] shadow  modal-content w-full grid grid-cols-6 gap-4 p-4 rounded">
                                        {Array.from({ length: 16 }).map((_, index) => (
                                            <Link key={index} to={`/category/${index}`} className="text-blue-500 hover:underline">
                                                Categories {index + 1}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </nav>
                        <nav className="email flex items-center">
                            <NavLink
                                to={"/campaign"}
                                className=" text-[14px]"
                            >
                                Campaigns
                            </NavLink>
                        </nav>

                    </div>

                </div>
            </div>


        </div>
    )
}
