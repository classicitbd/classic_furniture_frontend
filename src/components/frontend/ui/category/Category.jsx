import { Link } from "react-router-dom";
import { categoryData } from "../../../../data/category-data";
import { useState } from "react";

const Category = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  return (
    <section>
      <article className="text-wrap py-[30px]">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center align-baseline px-[10px]">
          LUXURY HANDCRAFTED FOOTWEAR & FASHION RETAIL
        </h2>
        <p className="text-center">Step into the fusion of fine materials</p>
      </article>
      <nav className="py-[40px] bg-[#000000]">
        <ul className="flex flex-col md:flex-row items-center justify-between gap-[10px] md:gap-[20px] text-lg md:text-xl lga:text-2xl max-w-4xl px-[20px] mx-auto">
          {categoryData.map((item, i) => (
            <li key={item.id}>
              <Link
                className={`${
                  categoryData.length === item.id && "text-error-300"
                } uppercase text-white`}
                style={{
                  opacity: hoveredCategory === i ? 1 : 0.75,
                  transition: "opacity 0.2s ease-in-out", // Optional: Add a transition for a smoother effect
                }}
                onMouseEnter={() => setHoveredCategory(i)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {item.category}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default Category;
