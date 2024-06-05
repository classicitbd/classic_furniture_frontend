import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaRegUser, FaShoppingCart, FaYoutube } from "react-icons/fa";
import "./header.css";
import MobileNavbar from "./MobileNavbar";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { eraseCookie } from "../../utils/cookie-storage";
import { authKey } from "../../constants/storageKey";
import { useSelector } from "react-redux";
import { BsCart2 } from "react-icons/bs";
import { BASE_URL } from "../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import HeaderSkeleton from "../loader/homeLoading/HeaderSkeleton";
export default function Header() {
  const { data: settings = [], isLoading } = useQuery({
    queryKey: [`/api/v1/siteSetting`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = await res.json();
      return data?.data;
    },
  });

  const { user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const cart = useSelector((state) => state.furnitureCart.products);
  const quantity = useSelector((state) => state?.furnitureCart?.quantity);
  const subtotal = useSelector((state) => state?.furnitureCart?.subtotal);
  const [value, setValue] = useState("");
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleSearch = (text) => {
    // Update the query parameters
    const queryParams = new URLSearchParams(queryParameters);
    queryParams.set("keyword", text);

    // Update the URL using navigate
    navigate(`/all?${queryParams.toString()}`);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(value);
    setValue("");
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
  // const [loading, setLoaing] = useState(true);

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <div className=" text-white shadow-sm">
      <div className="es_container">
        <div className="mr-6">
          <div className=" items-center justify-between gap-2 py-2 hidden lg:flex">
            <Link
              to="/"
              className="cart flex items-center gap-2  md:ms-20  xl:ms-0"
            >
              <span className="icon hidden lg:block">
                <img className="" src={settings[0]?.logo} alt="" />
              </span>
            </Link>
            <div className="search flex-1">
              <form
                className="flex flex-1 justify-between lg:max-w-5xl items-center"
                onSubmit={handleSubmit}
              >
                <div className="relative flex items-center w-full">
                  <input
                    id="search"
                    type="search"
                    placeholder="Search Here"
                    className="w-full px-3 py-2 focus:outline-none border focus:ring-1 focus:ring-primaryDeepColor border-gray-300 rounded text-gray-800"
                    name="search"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
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
              <Link
                className="cart flex items-center gap-2 relative text-black"
                to="/checkout"
              >
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

              <div className="relative cursor-pointer " ref={dropdownRef}>
                <FaRegUser className=" text-[26px]" onClick={toggleDropdown} />

                {showDropdown && (
                  <div
                    className="absolute top-10 -right-3 bg-white shadow-lg rounded-lg py-2"
                    onClick={() => setShowDropdown(false)}
                  >
                    {user?.user_phone ? (
                      <>
                        <Link
                          to="/user-profile"
                          className="block px-6 py-2 text-gray-800 hover:bg-primaryLightColor duration-300 hover:text-white"
                        >
                          Profile
                        </Link>
                        {/* Add other dropdown items here */}
                        <hr className="my-2" />

                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-6 py-2 text-red-600  hover:bg-primaryLightColor duration-300 hover:text-white"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/sign-in"
                          className="block px-6 py-2 text-gray-800  hover:bg-primaryLightColor duration-300 hover:text-white"
                        >
                          Login
                        </Link>
                        <Link
                          to="/sign-up"
                          className="block px-6 py-2 text-gray-800  hover:bg-primaryLightColor duration-300 hover:text-white"
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

        {quantity > 0 && subtotal && cart?.length > 0 && (
          <Link to="/checkout">
            <div className="bg-primaryLightColor w-[90px] h-[90px] rounded-l-lg text-white absolute top-[50vh] right-0  cursor-pointer  z-[999] hidden lg:block">
              <p className="text-[12px] flex items-center justify-center pt-2 font-semibold">
                {cart?.length} product{cart?.length > 1 ? "s" : ""}
              </p>
              <div className="flex gap-1 text-white font-semibold items-center justify-center">
                <BsCart2 className="font-semibold" />{" "}
                <p className="text-[12px]">
                  {" "}
                  {quantity} item{quantity > 1 ? "s" : ""}
                </p>
              </div>
              <p className="bg-white rounded-lg w-5/6 mx-auto py-1.5 text-[11px] items-center justify-center flex text-primaryLightColor font-semibold mt-2">
                ৳ {subtotal}
              </p>
            </div>
          </Link>
        )}
        <MobileNavbar quantity={quantity} />
      </div>
    </div>
  );
}
