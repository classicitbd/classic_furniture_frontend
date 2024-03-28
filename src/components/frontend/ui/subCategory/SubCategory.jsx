import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import ProductCardSkeleton from "../../../../shared/loader/ProductCardSkeleton";

const SubCategory = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: [`/api/v1/category`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/category`);
      const data = await res.json();
      return data;
    },
  }); // get All subcategory

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {categories?.data
        ?.filter((item) => item.show_card === "active")
        ?.slice(0, 3)
        ?.map((category) => (
          <div className="relative group overflow-hidden" key={category?._id}>
            <Link to={`/all?category=${category?.slug}`}>
              <img
                loading="lazy"
                className="transition-transform transform duration-1500 ease-in-out group-hover:scale-110"
                src={category?.category_image}
                alt={category?.category}
              />
              <h1
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7))",
                }}
                className="absolute uppercase text-white bottom-0 px-5 py-3 w-full text-xl lg:text-3xl font-semibold"
              >
                {category?.category}
              </h1>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SubCategory;
