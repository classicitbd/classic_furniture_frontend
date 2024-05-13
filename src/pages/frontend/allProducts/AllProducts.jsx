import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import { useGetProductQuery } from "../../../redux/feature/product/productApi";
// import { data } from "autoprefixer";
import { Link } from "react-router-dom";
import Loader from "../../../shared/loader/Loader";

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

export default function AllProducts() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { data: products, isLoading } = useGetProductQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  //   const handleAddToCart = () => {
  //     setCartQuantity((prevQuantity) => prevQuantity + 1);
  //   };

  if (isLoading) return <Loader />;

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
                    <h3 className="sr-only">All Products</h3>
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
              All Products
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
            <div className="grid grid-cols-12 gap-4 lg:px-4 px-0">
              {/* Filters */}
              <div className="col-span-2">
                <form className="hidden lg:block">
                  {/* <h3 className="sr-only">Categories</h3> */}
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
                <div className="es_container mx-auto md:px-10 xl:px-0 px-2">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h1 className="text-xl font-semibold text-[#008140]">
                        Products
                      </h1>
                      <div
                        // onClick={handleViewAll}
                        className="cursor-pointer font-medium flex items-center gap-1"
                      >
                        <span>View All</span>{" "}
                        {/* {showAll ? <FaAngleDown /> : <FaAngleRight />} */}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 sm:gap-4 gap-2">
                    {products?.data?.map((product) => (
                      <div key={product?._id} className="group">
                        <Link to={`/${product?.product_slug}`}>
                          <div
                            title="View Details"
                            className="border border-transparent group-hover:border-[#008140] transition-all duration-500 rounded-md group-hover:scale-100 shadow"
                          >
                            <div className="w-full relative">
                              <img
                                src={product?.product_thumbnail}
                                alt="Product Image"
                                className="w-full rounded-t-md h-[200px] object-cover"
                              />
                              {product?.product_discount_price && (
                                <div className="bg-red-600 text-white inline px-1  rounded-tr-lg rounded-bl-lg text-[12px] absolute top-0 right-0 m-2">
                                  OFF{" "}
                                  {product?.product_price -
                                    product?.product_discount_price}
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
                              {product?.product_quantity ? (
                                <div className=" text-sm text-gray-500">
                                  <p> In-Stock</p>
                                </div>
                              ) : (
                                <div className=" text-xs text-gray-500">
                                  <p> Out Of Stock</p>
                                </div>
                              )}
                              {/* Rating Stars */}
                              {/* <div className="product_rating flex">
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
                          </div> */}
                              {/* Product Title */}
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
                                    ? product.product_name.length > 30
                                      ? `${product.product_name.slice(
                                          0,
                                          30
                                        )}...`
                                      : product.product_name
                                    : product.product_name.length > 23
                                    ? `${product.product_name.slice(0, 23)}...`
                                    : product.product_name}
                                </p>
                              </div>

                              {/* Buy Now Button */}
                              {/* <div className="flex w-full items-center  gap-2 text-[#008140] cursor-pointer">
                    <FaShoppingCart
                      // onClick={() => handleAddToCart(product)}
                      title="Add To cart"
                      className="text-lg "
                    />
                    <button
                      type="button"
                      title="Buy Now"
                      className="bg-ftPrimaryColor py-2 rounded   text-center font-semibold text-[16px]"
                      // onClick={() => handleAddToCart(product)}
                    >
                      Buy Now
                    </button>
                  </div> */}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  {/* <div className="hidden">
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
                    )} */}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
