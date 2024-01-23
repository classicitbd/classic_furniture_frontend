import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";

const Category = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categoryTypes, setCategoryTypes] = useState([]);
  // get Category type
  const { data = [] } = useQuery({
    queryKey: ["/api/v1/category"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/category`);
      const data = await res.json();
      return data;
    },
  });

  useEffect(() => {
    const uniqueMap = new Map();
    data?.data?.forEach((item) => {
      uniqueMap.set(item.category, item);
    });

    // Convert Map values back to an array
    const uniqueData = Array.from(uniqueMap.values());
    setCategoryTypes(uniqueData);
  }, [data?.data]);
  return (
    <section>
      <article className="text-wrap py-[30px]">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center align-baseline px-[10px]">
          LUXURY HANDCRAFTED FOOTWEAR & FASHION RETAIL
        </h2>
        <p className="text-center">Step into the fusion of fine materials</p>
      </article>
      <nav className="py-[40px] bg-primaryColor">
        <ul className="flex flex-col md:flex-row items-center justify-between gap-[10px] md:gap-[20px] text-lg md:text-xl lga:text-2xl max-w-4xl px-[20px] mx-auto">
          {categoryTypes?.map((item, i) => (
            <li key={item._id}>
              <Link
                to={`/all?category=${item?.slug}`}
                className={`text-lg ${
                  categoryTypes?.length === i && "text-error-300"
                } uppercase text-textColor`}
                style={{
                  opacity: hoveredCategory === i ? 0.75 : 1,
                  transition: "opacity 0.2s ease-in-out", // Optional: Add a transition for a smoother effect
                }}
                onMouseEnter={() => setHoveredCategory(i)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {item.category}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={`/all?discount_price=true`}
              className={`text-error-200 text-lg hover:text-error-300 uppercase`}
            >
              Discount Section
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Category;
