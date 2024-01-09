import { Link } from "react-router-dom";
import { subCategoryData } from "../../../../data/sub-category-data";

const SubCategory = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {subCategoryData.map((product) => (
        <div className="relative group overflow-hidden" key={product?.id}>
          <Link to={`/all?sub_category=${product?.slug}`}>
            <img
              className="transition-transform transform duration-700 group-hover:scale-110"
              src={product?.thumbnail}
              alt={product?.title}
            />
          </Link>
          <h1
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7))",
            }}
            className="absolute uppercase text-white bottom-0 px-5 py-3 w-full text-xl lg:text-3xl font-semibold"
          >
            {product?.title}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default SubCategory;
