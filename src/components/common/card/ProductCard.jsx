import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const ProductCard = ({ product, loading }) => {
  return (
    <div>
      {product || loading ? (
        <Link to={`/${product?.slug}`}>
          <div className="flex">
            <img
              loading="lazy"
              src={product?.thumbnail_image}
              className="w-full translate-x-0 group-hover:-translate-x-full transition-all duration-700"
              alt={product?.title}
            />
            <img
              loading="lazy"
              src={product?.hover_image}
              className="w-full translate-x-0 group-hover:-translate-x-full transition-all duration-700"
              alt={product?.title}
            />
          </div>
          <article className="pb-[10px]">
            <h2 className="text-center">{product?.title}</h2>
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
