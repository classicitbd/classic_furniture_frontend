import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menu, setMenu] = useState("");
  const handleHover = (menu) => {
    setMenu(menu);
    setIsDropdownOpen(true);
  };
  return (
    <div className="bg-black text-white hidden sm:block">
      {/* ------ navbar with dropdown ------ start */}
      <div
        onMouseLeave={() => {
          setIsDropdownOpen(false);
          setMenu("");
        }}
      >
        <nav className="">
          <ul className="flex items-center justify-center gap-7 py-2">
            <li>
              <button
                onMouseEnter={() => handleHover("men")}
                className={`text-xl font-light focus:outline-none ${
                  menu === "men" ? "opacity-80" : ""
                } transition-opacity duration-300`}
              >
                Men
                <span
                  className={`transition-all duration-500 h-[1px] block bg-white ${
                    menu === "men" ? "w-full" : "w-0"
                  }`}
                ></span>
              </button>
            </li>
            <li>
              <Link className="border-r border-gray-600"></Link>
            </li>
            <li>
              <button
                onMouseEnter={() => handleHover("women")}
                className={`text-xl font-light focus:outline-none ${
                  menu === "women" ? "opacity-80" : ""
                } transition-opacity duration-300`}
              >
                Women
                <span
                  className={`transition-all duration-500 h-[1px] block bg-white ${
                    menu === "women" ? "w-full" : "w-0"
                  }`}
                ></span>
              </button>
            </li>
            <li>
              <Link className="border-r border-gray-600"></Link>
            </li>
            <li className="group">
              <button
                onMouseEnter={() => handleHover("unisex")}
                className={`text-xl font-light focus:outline-none ${
                  menu === "unisex" ? "opacity-80" : ""
                } transition-opacity duration-300 group`}
              >
                Unisex
                <span
                  className={`transition-all duration-500 h-[1px] block bg-white ${
                    menu === "unisex" ? "w-full" : "w-0"
                  }`}
                ></span>
              </button>
            </li>
          </ul>
          <div
            onMouseEnter={() => setIsDropdownOpen(true)}
            className={`w-full bg-black h-[300px] ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          ></div>
        </nav>
      </div>

      {/* ------ navbar with dropdown ------ end */}
    </div>
  );
};

export default Navbar;
