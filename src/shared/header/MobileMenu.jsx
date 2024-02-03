import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/baseURL";
import { Link } from "react-router-dom";

const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [menu, setMenu] = useState("");
  const [gender, setGender] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [categoryAndSubCategory, setCategoryAndSubCategory] = useState([]);

  const { data: menuTypes = [], isLoading } = useQuery({
    queryKey: ["/api/v1/menu"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/menu`);
      const data = await res.json();
      return data;
    },
  }); // get Menu type

  useEffect(() => {
    fetch(`${BASE_URL}/category`)
      .then((res) => res.json())
      .then((data) => setCategoryData(data?.data));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/sub_category`)
      .then((res) => res.json())
      .then((data) => setSubCategoryData(data?.data));
  }, []);

  useEffect(() => {
    const getCategoryData = categoryData.filter(
      (category) => category?.menuId?._id === menu
    );

    let categoryAndSubCategoryData = [];

    getCategoryData.forEach((category) => {
      const getSubCategoryData = subCategoryData.filter(
        (subCategory) =>
          category?._id === subCategory?.categoryId?._id &&
          subCategory?.menuId?._id === menu
      );
      categoryAndSubCategoryData.push({
        category,
        subCategories: getSubCategoryData,
      });
    });

    setCategoryAndSubCategory([...categoryAndSubCategoryData]);
  }, [menu, categoryData, subCategoryData]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="px-4">
      <ul className="space-y-1">
        {menuTypes?.data?.map((menu) => (
          <li key={menu?._id}>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary
                onClick={() => {
                  setGender(menu?.slug);
                  setMenu(menu?._id);
                }}
                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="text-base font-medium">{menu?.menu}</span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-2">
                {categoryAndSubCategory?.map((category) => (
                  <li className="w-[200px]" key={category?.category?._id}>
                    <Link
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      to={`/all?gender=${gender}&category=${category?.category?.slug}`}
                      className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 py-1 px-2 w-full text-left rounded-sm text-base font-medium opacity-80 hover:opacity-100"
                    >
                      {category?.category?.category}
                    </Link>
                    <ul className="space-y-[2px] mt-2">
                      {category?.subCategories?.map((subItem) => (
                        <li key={subItem?._id}>
                          <Link
                            onClick={() =>
                              setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            to={`/all?gender=${gender}&category=${category?.category?.slug}&sub_category=${subItem?.slug}`}
                            className=" text-black py-1 px-2 w-full text-left rounded-sm text-sm font-sans tracking-tight leading-5 opacity-80 hover:opacity-100"
                          >
                            {subItem?.sub_category}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
