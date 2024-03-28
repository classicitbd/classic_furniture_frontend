import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const ProductCard = ({ product, loading }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="">
      {product || loading ? (
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
                transition: "transform 0.7s",
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
            <p>
              <span
                className={`px-4 ${
                  product?.discount_price ? "line-through" : ""
                }`}
              >
                BDT {product?.price}.00
              </span>
              {product?.discount_price && (
                <span className="text-error-300">
                  BDT {product?.discount_price}.00
                </span>
              )}
            </p>
          </article>
        </Link>
      ) : (
        // Skeleton for loading
        <div className="skeleton-card">
          <Skeleton height={200} />
          <article className="pb-[10px]">
            <Skeleton height={20} width={150} />
            <Skeleton height={15} width={120} />
            <Skeleton height={15} width={80} />
          </article>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
