import { Link } from "react-router-dom";

const Breadcrumb = ({ product }) => {
  const breadcrumbData = [
    {
      label: product?.menuId?.menu,
      link: `gender=${product?.menuId?.slug}`,
    },
    {
      label: product?.categoryId?.category,
      link: `gender=${product?.menuId?.slug}&category=${product?.categoryId?.slug}`,
    },
    {
      label: product?.subCategoryId?.sub_category,
      link: `gender=${product?.menuId?.slug}&category=${product?.categoryId?.slug}&sub_category=${product?.subCategoryId?.slug}`,
    },
  ];

  return (
    <nav className="text-gray-600 text-sm">
      <ol className="list-none p-0 inline-flex">
        {breadcrumbData.map((item, i) => (
          <li key={item.label} className="flex items-center">
            <Link
              to={`/all?${item?.link}`}
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
