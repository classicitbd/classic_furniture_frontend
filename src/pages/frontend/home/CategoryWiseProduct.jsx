import { useState, useEffect } from "react";
import { FaAngleDown, FaAngleRight, FaShoppingCart, FaStar, FaStarHalfAlt } from 'react-icons/fa'
const CategoryWiseProduct = () => {
    const [showAll, setShowAll] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [products, setProducts] = useState(null);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [displayedBedroomProducts, setDisplayedBedroomProducts] = useState([]);
    const [displayedDiningProducts, setDisplayedDiningProducts] = useState([]);
    const [displayedOfficeProducts, setDisplayedOfficeProducts] = useState([]);
    const [displayedHospitalProducts, setDisplayedHospitalProducts] = useState([]);
    const [displayedDoorsProducts, setDisplayedDoorsProducts] = useState([]);
    const [showMoreCount, setShowMoreCount] = useState(15);
    const initialDisplayCount = 10;
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
        if (products) {
            const livingSlice = products?.living?.slice(0, initialDisplayCount) || [];
            const bedroomSlice = products?.bedroom?.slice(0, initialDisplayCount) || [];
            const diningSlice = products?.dining?.slice(0, initialDisplayCount) || [];
            const officeSlice = products?.office?.slice(0, initialDisplayCount) || [];
            const hospitalSlice = products?.hospital?.slice(0, initialDisplayCount) || [];
            const doorsSlice = products?.doors?.slice(0, initialDisplayCount) || [];
            setDisplayedProducts(livingSlice);
            setDisplayedBedroomProducts(bedroomSlice);
            setDisplayedDiningProducts(diningSlice);
            setDisplayedOfficeProducts(officeSlice);
            setDisplayedHospitalProducts(hospitalSlice);
            setDisplayedDoorsProducts(doorsSlice);
        }
    }, [products]);

    const handleViewAll = () => {
        setShowAll(!showAll);
        const livingSlice = products?.living?.slice(0, 15) || [];
        const bedroomSlice = products?.bedroom?.slice(0, 15) || [];
        const diningSlice = products?.dining?.slice(0, 15) || [];
        const officeSlice = products?.office?.slice(0, 15) || [];
        const hospitalSlice = products?.hospital?.slice(0, 15) || [];
        const doorsSlice = products?.doors?.slice(0, 15) || [];
        setDisplayedProducts(livingSlice);
        setDisplayedBedroomProducts(bedroomSlice);
        setDisplayedDiningProducts(diningSlice);
        setDisplayedOfficeProducts(officeSlice);
        setDisplayedHospitalProducts(hospitalSlice);
        setDisplayedDoorsProducts(doorsSlice);
        setShowMoreCount(10);
    };

    const handleShowMore = () => {
        const newCount = showMoreCount + 15;
        const livingSlice = products?.living?.slice(0, newCount) || [];
        const bedroomSlice = products?.bedroom?.slice(0, newCount) || [];
        const diningSlice = products?.dining?.slice(0, newCount) || [];
        const officeSlice = products?.office?.slice(0, newCount) || [];
        const hospitalSlice = products?.hospital?.slice(0, newCount) || [];
        const doorsSlice = products?.doors?.slice(0, newCount) || [];
        setDisplayedProducts(livingSlice || []);
        setDisplayedBedroomProducts(bedroomSlice || []);
        setDisplayedDiningProducts(diningSlice || []);
        setDisplayedOfficeProducts(officeSlice || []);
        setDisplayedHospitalProducts(hospitalSlice || []);
        setDisplayedDoorsProducts(doorsSlice || []);
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
            {/* Living Room Furniture Section */}
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl my-6 font-semibold text-[#008140]">Living Room Furniture</h1>
                    <div onClick={handleViewAll} className="cursor-pointer font-medium flex items-center gap-1">
                        <span>View All</span> {showAll ? <FaAngleDown /> : <FaAngleRight />}
                    </div>
                </div>
                <div className={`grid gap-4 ${gridCols}`}>
                    {displayedProducts.map((product) => (
                        <div key={product.id} className="group">
                            <div title="View Details" className="border border-transparent group-hover:border-[#008140] transition-all duration-500 rounded-md group-hover:scale-100 shadow">
                                <div className="w-full relative">
                                    <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                                    {product.discount_percentage && (
                                        <div className="bg-red-600 text-white inline px-1 rounded text-[12px] absolute top-0 right-0 m-2">
                                            OFF {product.discount_percentage}%
                                        </div>
                                    )}
                                </div>
                                <div className="px-2 py-5">
                                    <div className="product_rating flex">
                                        {[...Array(Math.floor(product.rating))].map((_, index) => (
                                            <FaStar key={index} className="text-yellowColor" />
                                        ))}
                                        {product.rating % 1 >= 0.5 && <FaStarHalfAlt className="text-yellowColor" />}
                                    </div>
                                    <div className="product_title mt-2">
                                        <p
                                            title={product.name}
                                            className={`text-[14px] text-[#041826] leading-5 font-medium group-hover:text-ftPrimaryColor duration-200 transition-all ${window.innerWidth < 640 ? 'max-w-[10rem] overflow-hidden whitespace-nowrap overflow-ellipsis' : ''
                                                }`}
                                        >
                                            {window.innerWidth >= 1024
                                                ? product.name.length > 30
                                                    ? `${product.name.slice(0, 30)}...`
                                                    : product.name
                                                : product.name.length > 23
                                                    ? `${product.name.slice(0, 23)}...`
                                                    : product.name}
                                        </p>
                                    </div>
                                    <div className="product_price_inner flex items-center gap-2 py-2">
                                        <strong className="offer_price text-ftPrimaryColor text-[16px] font-bold">
                                            ৳ {product.new_price}
                                        </strong>
                                        <span className="old_price line-through text-[14px] text-[#0f172a99] font-medium">
                                            ৳ {product.old_price}
                                        </span>
                                    </div>
                                    <div className="flex w-full items-center justify-between gap-4 text-[#008140]">
                                        <button
                                            type="button"
                                            title="Buy Now"
                                            className="bg-ftPrimaryColor py-2 rounded text-center font-semibold text-[16px]"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Buy Now
                                        </button>
                                        <FaShoppingCart
                                            onClick={() => handleAddToCart(product)}
                                            title="Add To cart"
                                            className="text-xl cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Show More Button for Living Room Products */}
                {displayedProducts.length >= 15 && displayedProducts.length < products?.living?.length && (
                    <div className="text-center mt-4">
                        <button
                            onClick={handleShowMore}
                            className="bg-[#008140] hover:bg-[#183f2c] text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>

            {/* Bedroom Furniture Section (similar structure as Living Room) */}
            <div>
                <div className="flex justify-between items-center mt-5">
                    <h1 className="text-xl py-6 font-semibold text-[#008140]">Bedroom Furniture</h1>
                    <div onClick={handleViewAll} className="cursor-pointer font-medium flex items-center gap-1">
                        <span>View All</span> {showAll ? <FaAngleDown /> : <FaAngleRight />}
                    </div>
                </div>
                <div className={`grid gap-4 ${gridCols}`}>
                    {displayedBedroomProducts?.map((product) => (
                        <div key={product.id} className="group">
                            <div title="View Details" className="border border-transparent group-hover:border-[#008140] transition-all duration-500 rounded-md group-hover:scale-100 shadow">
                                <div className="w-full relative">
                                    <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                                    {/* Assuming this displays discount difference */}
                                    <div className="bg-red-600 text-white inline px-1 rounded text-[12px] absolute top-0 right-0 m-2">
                                        OFF {product.old_price - product.new_price}TK
                                    </div>
                                </div>
                                {/* Product Details */}
                                <div className="px-2 py-5">
                                    {/* Rating Stars */}
                                    <div className="product_rating flex">
                                        {[...Array(Math.floor(product.rating))].map((_, index) => (
                                            <FaStar key={index} className="text-yellowColor" />
                                        ))}
                                        {product.rating % 1 >= 0.5 && <FaStarHalfAlt className="text-yellowColor" />}
                                    </div>
                                    {/* Product Title */}
                                    <div className="product_title mt-2">
                                        <p
                                            title={product.name}
                                            className={`text-[14px] text-[#041826] leading-5 font-medium group-hover:text-ftPrimaryColor duration-200 transition-all ${window.innerWidth < 640 ? 'max-w-[10rem] overflow-hidden whitespace-nowrap overflow-ellipsis' : ''
                                                }`}
                                        >
                                            {window.innerWidth >= 1024
                                                ? product.name.length > 30
                                                    ? `${product.name.slice(0, 30)}...`
                                                    : product.name
                                                : product.name.length > 23
                                                    ? `${product.name.slice(0, 23)}...`
                                                    : product.name}
                                        </p>
                                    </div>
                                    {/* Product Prices */}
                                    <div className="product_price_inner flex items-center gap-2 py-2">
                                        <strong className="offer_price text-ftPrimaryColor text-[16px] font-bold">
                                            ৳ {product.new_price}
                                        </strong>
                                        <span className="old_price line-through text-[14px] text-[#0f172a99] font-medium">
                                            ৳ {product.old_price}
                                        </span>
                                    </div>
                                    {/* Buy Now Button */}
                                    <div className="flex w-full items-center justify-between gap-4 text-[#008140]">
                                        <button
                                            type="button"
                                            title="Buy Now"
                                            className="bg-ftPrimaryColor py-2 rounded text-center font-semibold text-[16px]"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Buy Now
                                        </button>
                                        {/* Add to Cart Icon */}
                                        <FaShoppingCart
                                            onClick={() => handleAddToCart(product)}
                                            title="Add To cart"
                                            className="text-xl cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Show More Button for Bedroom Products */}
                {displayedBedroomProducts.length >= 15 && displayedBedroomProducts?.length < products?.bedroom?.length && (
                    <div className="text-center mt-4">
                        <button
                            onClick={handleShowMore}
                            className="bg-[#008140] hover:bg-[#183f2c] text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
            {/* Dining Room Furniture Section (similar structure as Living Room) */}
            <div>
                <div className="flex justify-between items-center mt-5">
                    <h1 className="text-xl py-6 font-semibold text-[#008140]">Dining Room Furniture</h1>
                    <div onClick={handleViewAll} className="cursor-pointer font-medium flex items-center gap-1">
                        <span>View All</span> {showAll ? <FaAngleDown /> : <FaAngleRight />}
                    </div>
                </div>
                <div className={`grid gap-4 ${gridCols}`}>
                    {displayedDiningProducts?.map((product) => (
                        <div key={product.id} className="group">
                            <div title="View Details" className="border border-transparent group-hover:border-[#008140] transition-all duration-500 rounded-md group-hover:scale-100 shadow">
                                <div className="w-full relative">
                                    <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                                    {/* Assuming this displays discount difference */}
                                    <div className="bg-red-600 text-white inline px-1 rounded text-[12px] absolute top-0 right-0 m-2">
                                        OFF {product.old_price - product.new_price}TK
                                    </div>
                                </div>
                                {/* Product Details */}
                                <div className="px-2 py-5">
                                    {/* Rating Stars */}
                                    <div className="product_rating flex">
                                        {[...Array(Math.floor(product.rating))].map((_, index) => (
                                            <FaStar key={index} className="text-yellowColor" />
                                        ))}
                                        {product.rating % 1 >= 0.5 && <FaStarHalfAlt className="text-yellowColor" />}
                                    </div>
                                    {/* Product Title */}
                                    <div className="product_title mt-2">
                                        <p
                                            title={product.name}
                                            className={`text-[14px] text-[#041826] leading-5 font-medium group-hover:text-ftPrimaryColor duration-200 transition-all ${window.innerWidth < 640 ? 'max-w-[10rem] overflow-hidden whitespace-nowrap overflow-ellipsis' : ''
                                                }`}
                                        >
                                            {window.innerWidth >= 1024
                                                ? product.name.length > 30
                                                    ? `${product.name.slice(0, 30)}...`
                                                    : product.name
                                                : product.name.length > 23
                                                    ? `${product.name.slice(0, 23)}...`
                                                    : product.name}
                                        </p>
                                    </div>
                                    {/* Product Prices */}
                                    <div className="product_price_inner flex items-center gap-2 py-2">
                                        <strong className="offer_price text-ftPrimaryColor text-[16px] font-bold">
                                            ৳ {product.new_price}
                                        </strong>
                                        <span className="old_price line-through text-[14px] text-[#0f172a99] font-medium">
                                            ৳ {product.old_price}
                                        </span>
                                    </div>
                                    {/* Buy Now Button */}
                                    <div className="flex w-full items-center justify-between gap-4 text-[#008140]">
                                        <button
                                            type="button"
                                            title="Buy Now"
                                            className="bg-ftPrimaryColor py-2 rounded text-center font-semibold text-[16px]"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Buy Now
                                        </button>
                                        {/* Add to Cart Icon */}
                                        <FaShoppingCart
                                            onClick={() => handleAddToCart(product)}
                                            title="Add To cart"
                                            className="text-xl cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Show More Button for Bedroom Products */}
                {displayedDiningProducts.length >= 15 && displayedDiningProducts?.length < products?.dining?.length && (
                    <div className="text-center mt-4">
                        <button
                            onClick={handleShowMore}
                            className="bg-[#008140] hover:bg-[#183f2c] text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>

            {/* Dining Room Furniture Section (similar structure as Living Room) */}
            <div>
                <div className="flex justify-between items-center mt-5">
                    <h1 className="text-xl py-6 font-semibold text-[#008140]">Office Furniture</h1>
                    <div onClick={handleViewAll} className="cursor-pointer font-medium flex items-center gap-1">
                        <span>View All</span> {showAll ? <FaAngleDown /> : <FaAngleRight />}
                    </div>
                </div>
                <div className={`grid gap-4 ${gridCols}`}>
                    {displayedOfficeProducts?.map((product) => (
                        <div key={product.id} className="group">
                            <div title="View Details" className="border border-transparent group-hover:border-[#008140] transition-all duration-500 rounded-md group-hover:scale-100 shadow">
                                <div className="w-full relative">
                                    <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                                    {/* Assuming this displays discount difference */}
                                    <div className="bg-red-600 text-white inline px-1 rounded text-[12px] absolute top-0 right-0 m-2">
                                        OFF {product.old_price - product.new_price}TK
                                    </div>
                                </div>
                                {/* Product Details */}
                                <div className="px-2 py-5">
                                    {/* Rating Stars */}
                                    <div className="product_rating flex">
                                        {[...Array(Math.floor(product.rating))].map((_, index) => (
                                            <FaStar key={index} className="text-yellowColor" />
                                        ))}
                                        {product.rating % 1 >= 0.5 && <FaStarHalfAlt className="text-yellowColor" />}
                                    </div>
                                    {/* Product Title */}
                                    <div className="product_title mt-2">
                                        <p
                                            title={product.name}
                                            className={`text-[14px] text-[#041826] leading-5 font-medium group-hover:text-ftPrimaryColor duration-200 transition-all ${window.innerWidth < 640 ? 'max-w-[10rem] overflow-hidden whitespace-nowrap overflow-ellipsis' : ''
                                                }`}
                                        >
                                            {window.innerWidth >= 1024
                                                ? product.name.length > 30
                                                    ? `${product.name.slice(0, 30)}...`
                                                    : product.name
                                                : product.name.length > 23
                                                    ? `${product.name.slice(0, 23)}...`
                                                    : product.name}
                                        </p>
                                    </div>
                                    {/* Product Prices */}
                                    <div className="product_price_inner flex items-center gap-2 py-2">
                                        <strong className="offer_price text-ftPrimaryColor text-[16px] font-bold">
                                            ৳ {product.new_price}
                                        </strong>
                                        <span className="old_price line-through text-[14px] text-[#0f172a99] font-medium">
                                            ৳ {product.old_price}
                                        </span>
                                    </div>
                                    {/* Buy Now Button */}
                                    <div className="flex w-full items-center justify-between gap-4 text-[#008140]">
                                        <button
                                            type="button"
                                            title="Buy Now"
                                            className="bg-ftPrimaryColor py-2 rounded text-center font-semibold text-[16px]"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Buy Now
                                        </button>
                                        {/* Add to Cart Icon */}
                                        <FaShoppingCart
                                            onClick={() => handleAddToCart(product)}
                                            title="Add To cart"
                                            className="text-xl cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Show More Button for Bedroom Products */}
                {displayedOfficeProducts?.length >= 15 && displayedOfficeProducts?.length < products?.office?.length && (
                    <div className="text-center mt-4">
                        <button
                            onClick={handleShowMore}
                            className="bg-[#008140] hover:bg-[#183f2c] text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
            {/* Dining Room Furniture Section (similar structure as Living Room) */}
            <div>
                <div className="flex justify-between items-center mt-5">
                    <h1 className="text-xl py-6 font-semibold text-[#008140]">Industries & Hospital</h1>
                    <div onClick={handleViewAll} className="cursor-pointer font-medium flex items-center gap-1">
                        <span>View All</span> {showAll ? <FaAngleDown /> : <FaAngleRight />}
                    </div>
                </div>
                <div className={`grid gap-4 ${gridCols}`}>
                    {displayedHospitalProducts?.map((product) => (
                        <div key={product.id} className="group">
                            <div title="View Details" className="border border-transparent group-hover:border-[#008140] transition-all duration-500 rounded-md group-hover:scale-100 shadow">
                                <div className="w-full relative">
                                    <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                                    {/* Assuming this displays discount difference */}
                                    <div className="bg-red-600 text-white inline px-1 rounded text-[12px] absolute top-0 right-0 m-2">
                                        OFF {product.old_price - product.new_price}TK
                                    </div>
                                </div>
                                {/* Product Details */}
                                <div className="px-2 py-5">
                                    {/* Rating Stars */}
                                    <div className="product_rating flex">
                                        {[...Array(Math.floor(product.rating))].map((_, index) => (
                                            <FaStar key={index} className="text-yellowColor" />
                                        ))}
                                        {product.rating % 1 >= 0.5 && <FaStarHalfAlt className="text-yellowColor" />}
                                    </div>
                                    {/* Product Title */}
                                    <div className="product_title mt-2">
                                        <p
                                            title={product.name}
                                            className={`text-[14px] text-[#041826] leading-5 font-medium group-hover:text-ftPrimaryColor duration-200 transition-all ${window.innerWidth < 640 ? 'max-w-[10rem] overflow-hidden whitespace-nowrap overflow-ellipsis' : ''
                                                }`}
                                        >
                                            {window.innerWidth >= 1024
                                                ? product.name.length > 30
                                                    ? `${product.name.slice(0, 30)}...`
                                                    : product.name
                                                : product.name.length > 23
                                                    ? `${product.name.slice(0, 23)}...`
                                                    : product.name}
                                        </p>
                                    </div>
                                    {/* Product Prices */}
                                    <div className="product_price_inner flex items-center gap-2 py-2">
                                        <strong className="offer_price text-ftPrimaryColor text-[16px] font-bold">
                                            ৳ {product.new_price}
                                        </strong>
                                        <span className="old_price line-through text-[14px] text-[#0f172a99] font-medium">
                                            ৳ {product.old_price}
                                        </span>
                                    </div>
                                    {/* Buy Now Button */}
                                    <div className="flex w-full items-center justify-between gap-4 text-[#008140]">
                                        <button
                                            type="button"
                                            title="Buy Now"
                                            className="bg-ftPrimaryColor py-2 rounded text-center font-semibold text-[16px]"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Buy Now
                                        </button>
                                        {/* Add to Cart Icon */}
                                        <FaShoppingCart
                                            onClick={() => handleAddToCart(product)}
                                            title="Add To cart"
                                            className="text-xl cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Show More Button for Bedroom Products */}
                {displayedHospitalProducts?.length >= 15 && displayedHospitalProducts?.length < products?.hospital?.length && (
                    <div className="text-center mt-4">
                        <button
                            onClick={handleShowMore}
                            className="bg-[#008140] hover:bg-[#183f2c] text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
            {/* Dining Room Furniture Section (similar structure as Living Room) */}
            <div>
                <div className="flex justify-between items-center mt-5">
                    <h1 className="text-xl py-6 font-semibold text-[#008140]">Doors</h1>
                    <div onClick={handleViewAll} className="cursor-pointer font-medium flex items-center gap-1">
                        <span>View All</span> {showAll ? <FaAngleDown /> : <FaAngleRight />}
                    </div>
                </div>
                <div className={`grid gap-4 ${gridCols}`}>
                    {displayedDoorsProducts?.map((product) => (
                        <div key={product.id} className="group">
                            <div title="View Details" className="border border-transparent group-hover:border-[#008140] transition-all duration-500 rounded-md group-hover:scale-100 shadow">
                                <div className="w-full relative">
                                    <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                                    {/* Assuming this displays discount difference */}
                                    <div className="bg-red-600 text-white inline px-1 rounded text-[12px] absolute top-0 right-0 m-2">
                                        OFF {product.old_price - product.new_price}TK
                                    </div>
                                </div>
                                {/* Product Details */}
                                <div className="px-2 py-5">
                                    {/* Rating Stars */}
                                    <div className="product_rating flex">
                                        {[...Array(Math.floor(product.rating))].map((_, index) => (
                                            <FaStar key={index} className="text-yellowColor" />
                                        ))}
                                        {product.rating % 1 >= 0.5 && <FaStarHalfAlt className="text-yellowColor" />}
                                    </div>
                                    {/* Product Title */}
                                    <div className="product_title mt-2">
                                        <p
                                            title={product.name}
                                            className={`text-[14px] text-[#041826] leading-5 font-medium group-hover:text-ftPrimaryColor duration-200 transition-all ${window.innerWidth < 640 ? 'max-w-[10rem] overflow-hidden whitespace-nowrap overflow-ellipsis' : ''
                                                }`}
                                        >
                                            {window.innerWidth >= 1024
                                                ? product.name.length > 30
                                                    ? `${product.name.slice(0, 30)}...`
                                                    : product.name
                                                : product.name.length > 23
                                                    ? `${product.name.slice(0, 23)}...`
                                                    : product.name}
                                        </p>
                                    </div>
                                    {/* Product Prices */}
                                    <div className="product_price_inner flex items-center gap-2 py-2">
                                        <strong className="offer_price text-ftPrimaryColor text-[16px] font-bold">
                                            ৳ {product.new_price}
                                        </strong>
                                        <span className="old_price line-through text-[14px] text-[#0f172a99] font-medium">
                                            ৳ {product.old_price}
                                        </span>
                                    </div>
                                    {/* Buy Now Button */}
                                    <div className="flex w-full items-center justify-between gap-4 text-[#008140]">
                                        <button
                                            type="button"
                                            title="Buy Now"
                                            className="bg-ftPrimaryColor py-2 rounded text-center font-semibold text-[16px]"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Buy Now
                                        </button>
                                        {/* Add to Cart Icon */}
                                        <FaShoppingCart
                                            onClick={() => handleAddToCart(product)}
                                            title="Add To cart"
                                            className="text-xl cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Show More Button for Bedroom Products */}
                {displayedDoorsProducts?.length >= 15 && displayedDoorsProducts?.length < products?.doors?.length && (
                    <div className="text-center mt-4">
                        <button
                            onClick={handleShowMore}
                            className="bg-[#008140] hover:bg-[#183f2c] text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
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
