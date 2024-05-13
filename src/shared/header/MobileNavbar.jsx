import { useState, useEffect, useRef } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { RiHome6Line } from "react-icons/ri";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineYoutube } from "react-icons/ai";

export default function MobileNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Implement logout logic here
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around py-3 lg:hidden mb-2 rounded-lg mx-4 h-12">
      <Link to="/" className="text-black">
        <RiHome6Line size={24} />
      </Link>
      <Link to="/all  " className="text-black">
        <BiCategoryAlt size={24} />
      </Link>
      <Link to="/checkout">
        <div className="bg-primaryLightColor w-12 h-12 bottom-3 flex items-center justify-center rounded-full relative text-white shadow-lg shadow-slate-600">
          <BsCart2 size={24} />
          <sup className="text-white w-5 h-5 flex items-center justify-center absolute -top-1 -right-1 bg-red-600 rounded-full">
            2
          </sup>
        </div>
      </Link>
      <Link to="/product-video" className="text-black">
        <AiOutlineYoutube size={24} />
      </Link>
      <div className="relative" ref={dropdownRef}>
        <FaRegUserCircle
          size={24}
          className="text-black cursor-pointer"
          onClick={toggleDropdown}
        />
        {showDropdown && (
          <div className="absolute bottom-10 -right-1 bg-white shadow-lg rounded-lg py-2">
            <Link to="/sign-in" className="block px-6 py-2 text-gray-800">
              Login
            </Link>
            <Link to="/sign-up" className="block px-6 py-2 text-gray-800">
              Register
            </Link>
            {/* Add other dropdown items here */}
            <hr className="my-2" />
            {/* <Link to="/admin" className="block px-6 py-2 text-gray-800">
              Dashboard
            </Link> */}
            <Link to="/user-profile" className="block px-6 py-2 text-gray-800">
              Profile
            </Link>
            <hr className="my-2" />
            <button
              onClick={handleLogout}
              className="block w-full text-left px-6 py-2 text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
