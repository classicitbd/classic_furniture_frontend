import { useState, useEffect } from "react";
import { FaAngleDown, FaAngleRight, FaShoppingCart, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import Header from '../../../shared/header/Header';
const CategoryWiseProduct = () => {
    const [products, setProducts] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const initialDisplayCount = 10;
    const [displayedProducts, setdisplayedProducts] = useState([]);
    const [showMoreCount, setShowMoreCount] = useState(10);
    const [cartQuantity, setCartQuantity] = useState(0);
    console.log("products", products);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("./product.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data?.furniture);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        setdisplayedProducts(products?.living?.slice(0, initialDisplayCount));
    }, []);

    const handleViewAll = () => {
        setShowAll(!showAll);
        setdisplayedProducts(products?.living?.slice(0, 20));
        setShowMoreCount(20);
    };

    const handleShowMore = () => {
        const newCount = showMoreCount + 20;
        setdisplayedProducts(products?.living?.slice(0, newCount));
        setShowMoreCount(newCount);
    };


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    let gridCols = "grid-cols-2";
    if (windowWidth >= 640) gridCols = "sm:grid-cols-2";
    if (windowWidth >= 768) gridCols = "md:grid-cols-3";
    if (windowWidth >= 1024) gridCols = "lg:grid-cols-4";
    if (windowWidth >= 1280) gridCols = "2xl:grid-cols-5";



    const handleAddToCart = () => {
        setCartQuantity(prevQuantity => prevQuantity + 1);
    };

    console.log("cartQuantity", cartQuantity);

    return (
        <div className="es_container mx-auto md:px-20 xl:px-0 px-5 py-10">
                <div>
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl my-6 font-semibold text-[#008140]">Living Room Furniture</h1>
                        <div onClick={handleViewAll} className="cursor-pointer font-medium flex items-center gap-1"><span>View All</span> {showAll ? <FaAngleDown /> : <FaAngleRight />}</div>
                    </div>
                </div>
                <div className={`grid gap-4 ${gridCols}`}>
                    {products?.living?.map((product) => (
                        <div key={product.id} className="group">
                            <span>
                                <div title='View Details' className=" border border-transparent group-hover:border-black transition-all duration-500 rounded-md group-hover:scale-105 shadow">
                                    <div className="w-full relative">
                                        <img
                                            src={product?.image}
                                            alt={product?.name}
                                            className="w-full  rounded-lg "
                                        />
                                        <div className='bg-red-600 text-white inline px-1 rounded text-[12px] absolute top-0 right-0 m-2'>
                                            OFF {product?.discount_percentage}%
                                        </div>
                                    </div>
                                    <div className=" px-2 py-5">
                                        <div className="product_rating flex">
                                            {[...Array(Math.floor(product?.rating))].map(
                                                (_, index) => (
                                                    <FaStar key={index} className="text-yellowColor" />
                                                ),
                                            )}
                                            {product?.rating % 1 >= 0.5 && (
                                                <FaStarHalfAlt className="text-yellowColor" />
                                            )}
                                        </div>

                                        <div className="product_title mt-2">
                                            <p
                                                title={product.title}
                                                className={`text-[14px] text-[#041826] leading-5 font-medium group-hover:text-ftPrimaryColor duration-200 transition-all ${windowWidth < 640 ? 'max-w-[10rem] overflow-hidden whitespace-nowrap overflow-ellipsis' : ''
                                                    }`}
                                            >
                                                {windowWidth >= 1024
                                                    ? product?.name?.length > 30
                                                        ? `${product?.name?.slice(0, 30)}...`
                                                        : product?.name
                                                    : product?.name?.length > 23
                                                        ? `${product?.name?.slice(0, 23)}...`
                                                        : product?.name}
                                            </p>
                                        </div>

                                        <div
                                            className={`product_price_inner flex items-center gap-2 py-2`}
                                        >
                                            <strong className="offer_price text-ftPrimaryColor text-[16px] font-bold ">
                                                ৳ {product?.new_price}
                                            </strong>
                                            <span className="old_price line-through text-[14px] text-[#0f172a99] font-medium">
                                                ৳ {product?.old_price}
                                            </span>
                                        </div>

                                        <div className="flex w-full items-center justify-between gap-4 text-[#008140] pe-8">
                                            <button
                                                type='button'
                                                title='Buy Now'
                                                className="bg-ftPrimaryColor py-2  rounded text-center font-semibold text-[16px]"
                                                icon={IoCartOutline}
                                            >Buy Now</button>
                                            <FaShoppingCart onClick={handleAddToCart} title='Add To cart' className='text-xl' />
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
                {displayedProducts?.length >= 20 && displayedProducts?.length < products?.living?.length && (
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
                <div>
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl my-6 font-semibold text-[#008140]">Bedroom Furniture</h1>
                        <div onClick={handleViewAll} className="cursor-pointer font-medium flex items-center gap-1"><span>View All</span> {showAll ? <FaAngleDown /> : <FaAngleRight />}</div>
                    </div>
                </div>
                <div className={`grid gap-4 ${gridCols}`}>
                    {products?.bedroom?.map((product) => (
                        <div key={product.id} className="group">
                            <span>
                                <div title='View Details' className=" border border-transparent group-hover:border-black transition-all duration-500 rounded-md group-hover:scale-105 shadow">
                                    <div className="w-full relative">
                                        <img
                                            src={product?.image}
                                            alt={product?.name}
                                            className="w-full  rounded-lg "
                                        />
                                        <div className='bg-red-600 text-white inline px-1 rounded text-[12px] absolute top-0 right-0 m-2'>
                                            OFF {product?.discount_percentage}%
                                        </div>
                                    </div>
                                    <div className=" px-2 py-5">
                                        <div className="product_rating flex">
                                            {[...Array(Math.floor(product?.rating))].map(
                                                (_, index) => (
                                                    <FaStar key={index} className="text-yellowColor" />
                                                ),
                                            )}
                                            {product?.rating % 1 >= 0.5 && (
                                                <FaStarHalfAlt className="text-yellowColor" />
                                            )}
                                        </div>

                                        <div className="product_title mt-2">
                                            <p
                                                title={product.title}
                                                className={`text-[14px] text-[#041826] leading-5 font-medium group-hover:text-ftPrimaryColor duration-200 transition-all ${windowWidth < 640 ? 'max-w-[10rem] overflow-hidden whitespace-nowrap overflow-ellipsis' : ''
                                                    }`}
                                            >
                                                {windowWidth >= 1024
                                                    ? product?.name?.length > 30
                                                        ? `${product?.name?.slice(0, 30)}...`
                                                        : product?.name
                                                    : product?.name?.length > 23
                                                        ? `${product?.name?.slice(0, 23)}...`
                                                        : product?.name}
                                            </p>
                                        </div>

                                        <div
                                            className={`product_price_inner flex items-center gap-2 py-2`}
                                        >
                                            <strong className="offer_price text-ftPrimaryColor text-[16px] font-bold ">
                                                ৳ {product?.new_price}
                                            </strong>
                                            <span className="old_price line-through text-[14px] text-[#0f172a99] font-medium">
                                                ৳ {product?.old_price}
                                            </span>
                                        </div>

                                        <div className="flex w-full items-center justify-between gap-4 text-[#008140] pe-8">
                                            <button
                                                type='button'
                                                title='Buy Now'
                                                className="bg-ftPrimaryColor py-2  rounded text-center font-semibold text-[16px]"
                                                icon={IoCartOutline}
                                            >Buy Now</button>
                                            <FaShoppingCart onClick={handleAddToCart} title='Add To cart' className='text-xl' />
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
                {displayedProducts?.length >= 20 && displayedProducts?.length < products?.living?.length && (
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

            </div>

    );
};

export default CategoryWiseProduct;
