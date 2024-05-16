import { Link } from "react-router-dom";

const AllProductCard = ({ product }) => {
  return (
    <div key={product?._id} className="group mt-6 bg-white ">
      <Link to={`/${product?.product_slug}`}>
        <div
          title="View Details"
          className="border  group-hover:border-[#008140] transition-all duration-500 rounded-md group-hover:scale-100 shadow"
        >
          <div className="w-full relative">
            <img
              src={product?.product_thumbnail}
              alt="Product Image"
              className="w-full rounded-t-md h-[200px] "
            />
            {product?.product_discount_price && (
              <div className="bg-red-600 text-white inline px-1  rounded-tr-lg rounded-bl-lg text-[12px] absolute top-0 right-0 m-2">
                OFF {product?.product_price - product?.product_discount_price}
                TK
              </div>
            )}
          </div>
          {/* Product Details */}
          <div className="px-3 pt-3 pb-2">
            {/* Product Prices */}
            <div className="product_price_inner flex items-center gap-2 py-2">
              <strong className="offer_price text-[#FF0000] text-[16px] font-bold">
                ৳{" "}
                {product?.product_discount_price
                  ? product?.product_discount_price
                  : product?.product_price}
              </strong>
              {product?.product_discount_price && (
                <span className="old_price line-through text-[12px] text-[#0f172a99] font-medium">
                  ৳ {product?.product_price}
                </span>
              )}
            </div>
            {/* Product Color */}

            <p className="text-[14px] font-semibold text-gray-600 py-1.5">
              {product?.product_color_id?.color_name}
            </p>

            <div className="product_title py-4">
              <p
                title={product?.product_name}
                className={` text-[17px] text-[#041826] leading-5 font-medium group-hover:text-ftPrimaryColor duration-200 transition-all ${
                  window.innerWidth < 640
                    ? "max-w-[10rem] overflow-hidden whitespace-nowrap overflow-ellipsis"
                    : ""
                }`}
              >
                {window.innerWidth >= 1024
                  ? product.product_name.length > 18
                    ? `${product.product_name.slice(0, 18)}...`
                    : product.product_name
                  : product.product_name.length > 23
                  ? `${product.product_name.slice(0, 23)}...`
                  : product.product_name}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AllProductCard;
