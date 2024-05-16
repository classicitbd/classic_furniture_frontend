import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  FaAngleDown,
  FaAngleRight,
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
// import images from '../../../assets/images/furniture-logo.png'
import Header from "../../../shared/header/Header";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CategoryProducts() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // products
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
    const newCount = showMoreCount + 10;
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
  if (windowWidth >= 1440) gridCols = "2xl:grid-cols-5";

  const handleAddToCart = () => {
    setCartQuantity((prevQuantity) => prevQuantity + 1);
  };

  console.log("cartQuantity", cartQuantity);

  // products end

  return (
    <div className="">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className=" es_container mx-auto md:px-20 xl:px-0 px-5">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10 ">
            <h1 className="text-2xl font-medium tracking-tight text-gray-500">
              Categories
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            {/* <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4"> */}
            <div className="grid grid-cols-12 gap-4">
              {/* Filters */}
              <div className="col-span-2">
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href}>{category.name}</a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between  py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-10 col-span-12">
                <div className="es_container mx-auto md:px-20 xl:px-0 px-5">
                  <div>
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl mb-6 font-semibold text-[#008140]">
                        Products
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
                            className=" border border-transparent group-hover:border-black transition-all duration-500 rounded-md group-hover:scale-105 shadow"
                          >
                            <div className="w-full relative">
                              <img
                                src={product?.image}
                                alt={product?.title}
                                className="w-full  rounded-lg h-[120px] md:h-[180px]"
                              />
                              <div className="bg-red-600 text-white inline px-1  rounded-tr-lg rounded-bl-lg text-[12px] absolute top-0 right-0 m-2">
                                OFF 100%
                              </div>
                            </div>
                            <div className=" px-2 py-5">
                              <div className="product_rating flex">
                                {[...Array(Math.floor(product.rating))].map(
                                  (_, index) => (
                                    <FaStar
                                      key={index}
                                      className="text-yellowColor"
                                    />
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
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
