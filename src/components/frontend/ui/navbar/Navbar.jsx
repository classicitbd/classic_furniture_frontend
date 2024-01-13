import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menu, setMenu] = useState("");
  const {
    data: menuTypes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/api/v1/menu"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/menu`);
      const data = await res.json();
      return data;
    },
  }); // get Menu type
  const { data: category = [] } = useQuery({
    queryKey: [`/api/v1/category/menuId?menuId=${menu}`],
    queryFn: async () => {
      if (menu !== "") {
        const res = await fetch(`${BASE_URL}/category/menuId?menuId=${menu}`);
        const data = await res.json();
        return data;
      } else {
        // Return a default value when menu is empty
        return { data: [] };
      }
    },
  }); // get Menu type
  const handleHover = (menu) => {
    setMenu(menu);
    setIsDropdownOpen(true);
  };
  console.log(category);
  return (
    <div className="bg-black text-white hidden sm:block">
      {/* ------ navbar with dropdown ------ start */}
      <div
        onMouseLeave={() => {
          setIsDropdownOpen(false);
          setMenu("");
        }}
      >
        <nav className="relative">
          <ul className="flex items-center justify-center gap-7 py-2">
            {menuTypes?.data?.map((menuItem) => (
              <li key={menu?._id}>
                <button
                  onMouseEnter={() => handleHover(menuItem?._id)}
                  className={`text-xl font-light focus:outline-none ${
                    menu === menuItem?._id ? "opacity-80" : ""
                  } transition-opacity duration-300`}
                >
                  {menuItem?.menu}
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
            className={`w-full absolute bg-black border-t border-t-gray-600 mt-1 ${
              isDropdownOpen ? "top-10 z-10" : ""
            }`}
          >
            {/* ------ category section ------ start */}
            <div className="border-r px-4 py-[5px]">
              <ul className="space-y-1 flex items-center gap-5">
                {category?.data?.map((category) => (
                  <li key={category._id}>
                    <button className="text-white py-1 px-2 w-full text-left rounded-sm">
                      {category?.category}
                    </button>
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
