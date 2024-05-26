import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import PriceRangeSlider from "./PriceRangeSlider";
import { useState } from "react";

const LeftSideCategoryAndColorSection = ({
  categories,
  categoryShow,
  setCategoryShow,
  colorShow,
  setColorShow,
  colors,
  handleCategoryClick,
  handleColorsClick,
  selectedCategory,
  selectedColor,
  handlePriceChange,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [minPrice, setMinPrice] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [maxPrice, setMaxPrice] = useState(200000);
  return (
    <div>
      <div className="my-4">
        <h3 className="text-[16px] font-semibold py-2 text-gray-700">
          Price Range
        </h3>

        <PriceRangeSlider
          minPrice={1}
          maxPrice={200000}
          onPriceChange={handlePriceChange}
        />
      </div>
      <div className="mb-4">
        <span
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setCategoryShow(!categoryShow)}
        >
          <h3 className="text-[16px] font-semibold py-2 text-gray-700">
            Categories
          </h3>
          <span className="text-gray-700">
            {categoryShow ? <FaAngleDown /> : <FaAngleUp />}
          </span>
        </span>
        {categoryShow && (
          <ul
            role="list"
            className="space-y-4 pl-2 pb-6 text-sm font-medium text-gray-600 max-h-[35vh] overflow-y-auto scrollbar-thin"
          >
            {categories?.data?.map((category) => (
              <li key={category?.category_name}>
                <button
                  onClick={() => handleCategoryClick(category?.category_slug)}
                  className={`${
                    selectedCategory === category?.category_slug
                      ? "text-primaryLightColor"
                      : " "
                  } hover:text-primaryLightColor duration-200`}
                >
                  {category?.category_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <hr />

      <div className="my-4">
        <span
          className="flex justify-between items-center "
          onClick={() => setColorShow(!colorShow)}
        >
          <h3 className="text-[16px] font-semibold py-2 text-gray-700 ">
            Color
          </h3>
          <span className="text-gray-700">
            {colorShow ? <FaAngleDown /> : <FaAngleUp />}
          </span>
        </span>
        {colorShow && (
          <ul
            role="list"
            className="space-y-4 pl-2 pb-6 text-sm font-medium text-gray-600 max-h-[35vh] overflow-y-auto scrollbar-thin"
          >
            {colors?.data?.map((color) => (
              <li key={color?.color_name}>
                <button
                  onClick={() => handleColorsClick(color?.color_slug)}
                  className={`${
                    selectedColor === color?.color_name
                      ? "text-primaryLightColor"
                      : " "
                  } hover:text-primaryLightColor duration-200`}
                >
                  {color?.color_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LeftSideCategoryAndColorSection;
