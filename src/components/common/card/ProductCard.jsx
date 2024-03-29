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
      <Link to={`/${product?.slug}`}>
        <div
          className="flex group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <img
            loading="lazy"
            src={product?.thumbnail_image}
            style={{
              width: "100%",
              height: "350px",
              transition: "transform 0.5s",
              transform: isHovered ? "translateX(-100%)" : "translateX(0)",
            }}
            alt={product?.title}
          />
          <img
            loading="lazy"
            src={product?.hover_image}
            style={{
              width: "100%",
              height: "350px",
              position: "absolute",
              top: 0,
              left: "100%",
              transition: "transform 0.7s",
              transform: isHovered ? "translateX(-100%)" : "translateX(0)",
            }}
            alt={product?.title}
          />
        </div>
        <article className="py-[10px]">
          <h2 className="text-center h-10">{product?.title}</h2>
          <p className="text-center py-3 text-bgray-700">
            {product?.colorId?.color}
          </p>
          <p className="px-4">
            <span>৳</span>
            <span
              className={`pl-2 ${
                product?.discount_price ? "line-through" : ""
              }`}
            >
              {product?.price}
            </span>
            {product?.discount_price && (
              <span className="text-error-300">{product?.discount_price}</span>
            )}
          </p>
        </article>
      </Link>
    </div>
  );
};

export default ProductCard;
