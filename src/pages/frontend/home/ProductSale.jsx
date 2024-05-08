import {
  FaAngleDown,
  FaAngleRight,
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Header from "../../../shared/header/Header";

export default function ProductSale() {
  const [showAll, setShowAll] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const initialDisplayCount = 10;
  const [displayedProducts, setdisplayedProducts] = useState([]);
  const [showMoreCount, setShowMoreCount] = useState(10);
  const [cartQuantity, setCartQuantity] = useState(0);
  const productSale = [
    {
      id: 1,
      product_id: "P001",
      title: "Horitoki Special all",
      new_price: 49.99,
      old_price: 59.99,
      image: "https://i.ibb.co/hDJMYkx/bedroom.jpg",
      rating: 4.5,
    },
    {
      id: 2,
      product_id: "P002",
      title: "Traditional Red and Gold",
      new_price: 39.99,
      old_price: 49.99,
      image: "https://i.ibb.co/L8PDJSh/hospital.jpg",
      rating: 4.2,
    },
    {
      id: 3,
      product_id: "P003",
      title: "Traditional Red and Gold",
      new_price: 79.99,
      old_price: 99.99,
      image: "https://i.ibb.co/Dp5dSG9/living.jpg",
      rating: 4.7,
    },
    {
      id: 4,
      product_id: "P004",
      title: "Stylish Black ",
      new_price: 99.99,
      old_price: 69.99,
      image: "https://i.ibb.co/GpxJwJf/office.jpg",
      rating: 4.4,
    },
    {
      id: 5,
      product_id: "P005",
      title: "Vintage Denim ",
      new_price: 29.99,
      old_price: 39.99,
      image: "https://i.ibb.co/hDJMYkx/bedroom.jpg",
      rating: 4.0,
    },
    {
      id: 6,
      product_id: "P006",
      title: "Casual Striped",
      new_price: 19.99,
      old_price: 24.99,
      image: "https://i.ibb.co/GPrR0Xj/dining.jpg",
      rating: 4.3,
    },
    {
      id: 7,
      product_id: "P007",
      title: "Bohemian Style",
      new_price: 34.99,
      old_price: 44.99,
      image: "https://i.ibb.co/GpxJwJf/office.jpg",
      rating: 4.6,
    },
    {
      id: 8,
      product_id: "P008",
      title: "Classic Aviator ",
      new_price: 14.99,
      old_price: 19.99,
      image: "https://i.ibb.co/Dp5dSG9/living.jpg",
      rating: 4.8,
    },
    {
      id: 9,
      product_id: "P009",
      title: "Chic Floral",
      new_price: 9.99,
      old_price: 6.99,
      image: "https://i.ibb.co/L8PDJSh/hospital.jpg",
      rating: 4.1,
    },
    {
      id: 10,
      product_id: "P010",
      title: "Retro Style Leather",
      new_price: 54.99,
      old_price: 64.99,
      image: "https://i.ibb.co/vHngdhG/doors.jpg",
      rating: 4.9,
    },
    {
      id: 15,
      product_id: "P009",
      title: "Chic Floral",
      new_price: 9.99,
      old_price: 6.99,
      image: "https://i.ibb.co/GPrR0Xj/dining.jpg",
      rating: 4.1,
    },
    {
      id: 16,
      product_id: "P010",
      title: "Retro Style Leather",
      new_price: 54.99,
      old_price: 64.99,
      image: "https://i.ibb.co/hDJMYkx/bedroom.jpg",
      rating: 4.9,
    },
  ];

  useEffect(() => {
    setdisplayedProducts(productSale?.slice(0, initialDisplayCount));
  }, []);

  const handleViewAll = () => {
    setShowAll(!showAll);
    setdisplayedProducts(productSale.slice(0, 20));
    setShowMoreCount(20);
  };

  const handleShowMore = () => {
    const newCount = showMoreCount + 20;
    setdisplayedProducts(productSale.slice(0, newCount));
    setShowMoreCount(newCount);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let gridCols = "grid-cols-2";
  if (windowWidth >= 640) gridCols = "sm:grid-cols-2";
  if (windowWidth >= 768) gridCols = "md:grid-cols-3";
  if (windowWidth >= 1024) gridCols = "lg:grid-cols-4";
  if (windowWidth >= 1280) gridCols = "2xl:grid-cols-5";

  const handleAddToCart = () => {
    setCartQuantity((prevQuantity) => prevQuantity + 1);
  };

  console.log("cartQuantity", cartQuantity);

  return (
    <>
      <div className="es_container mx-auto md:px-20 xl:px-0 px-5 pt-10">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-xl my-6 font-semibold text-[#008140]">
              New Arival
            </h1>
            <div
              onClick={handleViewAll}
              className="cursor-pointer font-medium flex items-center gap-1"
            >
              <span>View All</span>{" "}
              {showAll ? <FaAngleDown /> : <FaAngleRight />}
            </div>
          </div>
        </div>
        <div className={`grid gap-4 ${gridCols}`}>
          {displayedProducts.map((product) => (
            <div key={product.id} className="group">
              <span>
                <div
                  title="View Details"
                  className="border border-transparent group-hover:border-black transition-all duration-500 rounded-md group-hover:scale-100 shadow"
                >
                  <div className="w-full relative">
                    <img
                      src={product?.image}
                      alt={product?.title}
                      className="w-full h-[120px] md:h-[180px] rounded-lg "
                    />
                    <div className="bg-red-600 text-white inline px-1 rounded text-[12px] absolute top-0 right-0 m-2">
                      OFF 100%
                    </div>
                  </div>
                  <div className=" px-2 py-5">
                    <div className="product_rating flex">
                      {[...Array(Math.floor(product.rating))].map(
                        (_, index) => (
                          <FaStar key={index} className="text-yellowColor" />
                        )
                      )}
                      {product.rating % 1 >= 0.5 && (
                        <FaStarHalfAlt className="text-yellowColor" />
                      )}
                    </div>

                    <div className="product_title mt-2">
                      <p
                        title={product.title}
                        className={`text-[14px] text-[#041826] leading-5 font-medium group-hover:text-ftPrimaryColor duration-200 transition-all ${
                          windowWidth < 640
                            ? "max-w-[10rem] overflow-hidden whitespace-nowrap overflow-ellipsis"
                            : ""
                        }`}
                      >
                        {windowWidth >= 1024
                          ? product.title.length > 30
                            ? `${product.title.slice(0, 30)}...`
                            : product.title
                          : product.title.length > 23
                          ? `${product.title.slice(0, 23)}...`
                          : product.title}
                      </p>
                    </div>

                    <div
                      className={`product_price_inner flex items-center gap-2 py-2`}
                    >
                      <strong className="offer_price text-ftPrimaryColor text-[16px] font-bold ">
                        ৳ {product.new_price}
                      </strong>
                      <span className="old_price line-through text-[14px] text-[#0f172a99] font-medium">
                        ৳ {product.old_price}
                      </span>
                    </div>

                    <div className="flex w-full items-center justify-between gap-4 text-[#008140] pe-8">
                      <button
                        type="button"
                        title="Buy Now"
                        className="bg-ftPrimaryColor py-2  rounded text-center font-semibold text-[16px]"
                        icon={IoCartOutline}
                      >
                        Buy Now
                      </button>
                      <FaShoppingCart
                        onClick={handleAddToCart}
                        title="Add To cart"
                        className="text-xl"
                      />
                    </div>
                  </div>
                </div>
              </span>
            </div>
          ))}
        </div>
        <div className="hidden">
          <Header cartQuantity={cartQuantity} />
        </div>
        {displayedProducts.length >= 20 &&
          displayedProducts.length < productSale.length && (
            <div className="text-center ">
              <button
                onClick={handleShowMore}
                className="mt-4 bg-[#008140] hover:bg-[#183f2c] text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                Show More
              </button>
            </div>
          )}
      </div>
    </>
  );
}
