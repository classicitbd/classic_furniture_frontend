/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Breadcrumb = ({ product }) => {
  const breadcrumbData = [
    {
      label: product?.menuCategory?.title,
      link: `all?gender=${product?.menuCategory?.title.toLowerCase()}`,
    },
    {
      label: product.category.title,
      link: `all?gender=${product.menuCategory.title.toLowerCase()}&category=${product.category.title.toLowerCase()}`,
    },
    {
      label: product?.sub_category?.title,
      link: `all?gender=${product?.menuCategory?.title.toLowerCase()}&category=${product?.category?.title.toLowerCase()}&sub_category=${product?.sub_category?.title.toLowerCase()}`,
    },
  ];
  return (
    <nav className="text-gray-600 text-sm">
      <ol className="list-none p-0 inline-flex">
        {breadcrumbData.map((item, i) => (
          <li key={item.label} className="flex items-center">
            <Link
              to={`http://localhost:3000/${item?.link}`}
              className={`text-bgray-900 hover:text-bgray-500 text-xl px-4 ${
                i === breadcrumbData?.length - 1 ? "underline" : ""
              }`}
            >
              {item?.label}
            </Link>
            <span
              className={`mx-2 ${
                i === breadcrumbData?.length - 1 ? "hidden" : "block"
              }`}
            >
              |
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
