import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <Link to={`/${product?.product_slug}`}>
        <div
          className="flex group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <img
            loading="lazy"
            src={product?.product_thumbnail}
            style={{
              width: "100%",
              height: "350px",
              transition: "transform 0.5s",
              transform: isHovered ? "translateX(-100%)" : "translateX(0)",
            }}
            alt={product?.product_name}
          />
          <img
            loading="lazy"
            src={product?.product_images[0]?.image}
            style={{
              width: "100%",
              height: "350px",
              position: "absolute",
              top: 0,
              left: "100%",
              transition: "transform 0.7s",
              transform: isHovered ? "translateX(-100%)" : "translateX(0)",
            }}
            alt={product?.product_name}
          />
        </div>
        <article className="p-4">
          <h2 className="font-semibold text-lg text-gray-700 ">
            {product?.product_name}
          </h2>
          <p className=" py-3 text-bgray-700">
            {product?.product_color_id?.color_name}
          </p>
          <p className="">
            <span
              className={`pr-1 ${
                product?.product_discount_price ? "line-through" : ""
              }`}
            >
              {product?.product_price}
            </span>
            <span>৳</span>
            {product?.product_discount_price && (
              <>
                <span className="text-error-300 ml-2">
                  {product?.product_discount_price}
                  <span className="ml-1">৳</span>
                </span>
                <span className="bg-red-600 text-xs  ml-2 rounded-tr-lg rounded-bl-lg text-white px-2 ">
                  Save{" "}
                  {product?.product_price - product?.product_discount_price} ৳
                </span>
              </>
            )}
          </p>
        </article>
      </Link>
    </div>
  );
};

export default ProductCard;
