import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [menu, setMenu] = useState("");
  const { data: menuTypes = [] } = useQuery({
    queryKey: ["/api/v1/menu"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/menu`);
      const data = await res.json();
      return data;
    },
    suspense: false,
  }); // get Menu type

  const { data: category = [] } = useQuery({
    queryKey: [`/api/v1/category/menuId?menuId=${menu}`],
    queryFn: async () => {
      if (menu !== "") {
        const res = await fetch(`${BASE_URL}/menu/${menu}`);
        const data = await res.json();
        return data;
      } else {
        // Return a default value when menu is empty
        return { data: [] };
      }
    },
    suspense: false,
  }); // get category and sub category

  const handleHover = (menu) => {
    setGender(menu?.slug);
    setMenu(menu?._id);
    setIsDropdownOpen(true);
  };

  return (
    <div className="bg-primaryColor text-textColor hidden sm:block">
      {/* ------ navbar with dropdown ------ start */}
      <div
        onMouseLeave={() => {
          setIsDropdownOpen(false);
          setMenu("");
        }}
      >
        <nav className="relative">
          <ul className="flex items-center justify-center gap-16 py-2">
            {menuTypes?.data?.map((menuItem) => (
              <li className="group" key={menuItem?._id}>
                <button
                  onMouseEnter={() => handleHover(menuItem)}
                  className={`text-lg font-light focus:outline-none uppercase ${
                    menu === menuItem?._id ? "opacity-80" : ""
                  } transition-opacity duration-300`}
                >
                  <p className="flex items-center gap-2">
                    <span className="text-lg">{menuItem?.menu}</span>
                    <MdOutlineKeyboardArrowDown
                      className={`text-lg group-hover:rotate-180 transition-all duration-300 ease-linear`}
                    />
                  </p>
                  <span
                    className={`transition-all duration-500 h-[1px] block bg-white ${
                      menu === menuItem?._id ? "w-full" : "w-0"
                    }`}
                  ></span>
                </button>
              </li>
            ))}
          </ul>
          <div
            onMouseEnter={() => setIsDropdownOpen(true)}
            className={`w-full absolute bg-primaryColor border-t border-t-gray-600 mt-1 ${
              isDropdownOpen ? "top-10 z-10" : ""
            }`}
          >
            {/* ------ category section ------ start */}
            <div className="border-r px-4 py-[5px]">
              <ul className="flex gap-5 py-10 container">
                {category?.data?.map((category) => (
                  <li className="w-[200px]" key={category?.category?._id}>
                    <Link
                      to={`/all?gender=${gender}&category=${category?.category?.slug}`}
                      className="text-textColor py-1 px-2 w-full text-left rounded-sm text-base font-medium opacity-100 hover:opacity-80"
                    >
                      {category?.category?.category}
                    </Link>
                    <ul className="space-y-[2px] mt-2">
                      {category?.subcategories?.map((subItem) => (
                        <li key={subItem?._id}>
                          <Link
                            to={`/all?gender=${gender}&category=${category?.category?.slug}&sub_category=${subItem?.slug}`}
                            className=" text-textColor py-1 px-2 w-full text-left rounded-sm text-sm font-sans tracking-tight leading-5 opacity-100 hover:opacity-80"
                          >
                            {subItem?.sub_category}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            {/* ------ category section ------ end */}
          </div>
        </nav>
      </div>
      {/* ------ navbar with dropdown ------ end */}
    </div>
  );
};

export default Navbar;
