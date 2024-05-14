import { Link } from "react-router-dom";
import { FaRegUser, FaShoppingCart, FaYoutube } from "react-icons/fa";
import "./header.css";
import logo from "../../assets/images/furniture-logo.png";
import MobileNavbar from "./MobileNavbar";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { eraseCookie } from "../../utils/cookie-storage";
import { authKey } from "../../constants/storageKey";
import { useSelector } from "react-redux";
import { BsCart2 } from "react-icons/bs";
export default function Header() {
  const { user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const cart = useSelector((state) => state?.furnitureCart?.products);
  const subtotal = useSelector((state) => state?.furnitureCart?.subtotal);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    eraseCookie(authKey);
    window.location.reload();
  };
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div className=" text-white shadow-sm">
      <div className="es_container">
        <div className="mr-6">
          <div className=" items-center justify-between gap-2 py-2 hidden lg:flex">
            <Link className="cart flex items-center gap-2  md:ms-20  xl:ms-0">
              <span className="icon hidden lg:block">
                <img className="w-16" src={logo} alt="" />
              </span>
              <div className="flex flex-col text-[#008140] ">
                <span className="text-ftMuteColor text-[20px] font-bold hidden lg:block">
                  Classic Furniture
                </span>
              </div>
            </Link>
            <div className="search flex-1">
              <form className="flex flex-1 justify-between lg:max-w-5xl items-center">
                <div className="relative flex items-center w-full">
                  <input
                    id="search"
                    type="search"
                    placeholder="Search Here"
                    className="w-full px-3 py-2 focus:outline-none border border-gray-300 rounded-l-md text-gray-800"
                    name="search"
                    defaultValue=""
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-200 text-gray-800 rounded-r-md hover:bg-gray-300"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 512 512"
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        strokeWidth={32}
                        d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64z"
                      />
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        strokeWidth={32}
                        d="M338.29 338.29 448 448"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            <div className="header-right flex gap-4 text-black ">
              <Link
                to="/product-video"
                className="offer lg:flex items-center gap-3"
              >
                <span className="icon">
                  <FaYoutube className="text-red-600 text-[34px] " />
                </span>
                <div className="lg:flex flex-col text-black hidden xl:block ">
                  <p className="text-[14px] leading-[14px] font-medium hidden lg:block">
                    Video
                  </p>
                  <p className="text-ftMuteColor text-[13px] font-light ">
                    Product Video
                  </p>
                </div>
              </Link>
              <Link className="cart flex items-center gap-2 relative text-black">
                <span className="icon">
                  <sup className="text-white w-5 h-5 flex items-center justify-center absolute -top-1 -left-2 bg-red-600 rounded-full">
                    {cart?.length}
                  </sup>
                  <FaShoppingCart className="text-[#47504c] text-[26px]" />
                </span>
                <div className="flex flex-col text-black ">
                  <p className="text-[14px] leading-[14px] font-medium hidden xl:block">
                    Cart
                  </p>
                  <span className="text-ftMuteColor text-[13px] font-light hidden lg:block">
                    Products
                  </span>
                </div>
              </Link>

              <div className="relative" ref={dropdownRef}>
                <FaRegUser className=" text-[26px]" onClick={toggleDropdown} />

                {showDropdown && (
                  <div className="absolute top-10 -right-3 bg-white shadow-lg rounded-lg py-2">
                    {user?.user_phone ? (
                      <>
                        <Link
                          to="/user-profile"
                          className="block px-6 py-2 text-gray-800"
                        >
                          Profile
                        </Link>
                        {/* Add other dropdown items here */}
                        <hr className="my-2" />

                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-6 py-2 text-red-600"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/sign-in"
                          className="block px-6 py-2 text-gray-800"
                        >
                          Login
                        </Link>
                        <Link
                          to="/sign-up"
                          className="block px-6 py-2 text-gray-800"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}

        {cart?.length > 0 && subtotal && (
          <Link to="/check-out">
            <div className="bg-primaryLightColor w-24 h-20 rounded-l-lg text-white absolute top-[50vh] right-0  cursor-pointer  z-[999] ">
              <div className="flex gap-2 text-white font-semibold items-center justify-center pt-2">
                <BsCart2 className="" />{" "}
                <p className="text-[12px]">
                  {" "}
                  {cart.length} Item{cart.length > 1 ? "s" : ""}
                </p>
              </div>
              <p className="bg-white rounded-lg w-5/6 mx-auto py-1.5 text-[11px] items-center justify-center flex text-primaryLightColor font-semibold mt-2">
                ৳ {subtotal}
              </p>
            </div>
          </Link>
        )}
        <MobileNavbar />
      </div>
    </div>
  );
}
