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
        const res = await fetch(`${BASE_URL}/menu/${menu}`);
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
  console.log(category?.data);
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
          <ul className="flex items-center justify-center gap-16 py-2">
            {menuTypes?.data?.map((menuItem) => (
              <li key={menuItem?._id}>
                <button
                  onMouseEnter={() => handleHover(menuItem?._id)}
                  className={`text-lg font-light focus:outline-none uppercase ${
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
              <ul className="space-y-1 flex gap-5 py-10 container">
                {category?.data?.map((category) => (
                  <li className="w-[150px]" key={category?.category?._id}>
                    <Link
                      to={`/all?category=${category?.category?.slug}`}
                      className="text-white py-1 px-2 w-full text-left rounded-sm text-base"
                    >
                      {category?.category?.category}
                    </Link>
                    <ul>
                      {category?.subcategories?.map((subItem) => (
                        <li key={subItem?._id}>
                          <Link
                            to={`/all?category=${category?.category?.slug}&subcategory=${subItem?.slug}`}
                            className="text-white py-1 px-2 w-full text-left rounded-sm text-sm font-light tracking-tight"
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
