"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo/logo.png";
import SearchForm from "@/components/frontend/form/SearchForm";
import { useContext, useEffect, useRef, useState } from "react";
// react icons
import { TfiReload } from "react-icons/tfi";
import { CiLogin, CiHeart } from "react-icons/ci";
import { GoArrowRight, GoPlus, GoIssueTrackedBy } from "react-icons/go";
import { GiShoppingCart, GiHamburgerMenu } from "react-icons/gi";
import { FiUser, FiGift, FiMinus } from "react-icons/fi";
import { FcFlashOn } from "react-icons/fc";
import { BiSolidMessageAltAdd } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { FaCartArrowDown, FaTrashAlt } from "react-icons/fa";

import MobileMenu from "../shared/MobileMenu";
import EmptyCart from "@/components/common/EmptyCart";
import PcBuilderButton from "@/components/common/PcBuilderButton";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  removeFromCart,
} from "@/redux/feature/cart/cartSlice";
import { AuthContext } from "@/context/context";
import { useGetWishlistQuery } from "@/redux/feature/wishlist/wishlistApi";
import { numberWithCommas } from "@/utils/thousandSeparate";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";

const Navbar = ({ menuData }) => {
  // Assuming you are using functional components with hooks
  const [isMenu, setIsMenu] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCategory, setIsCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchFieldOpen, setSearchFieldOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);
  const compareProducts = useSelector((state) => state.compare.products);
  const cartProducts = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const { user, logout } = useContext(AuthContext);
  const { data } = useGetWishlistQuery(user?.user_phone);

  const { data: settingData = [], isLoading } = useQuery({
    queryKey: ["socialMedia"],
    queryFn: async () => {
      const res = await fetch(${BASE_URL}/site_setting);
      const data = res.json();
      return data;
    },
  });

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
        // setSearchFieldOpen(false);
        // setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <section className="bg-primaryColor  shadow-md py-1">
        {/* ------ main navbar container ------ start */}
        <nav className="container mx-auto px-2">
          <div className="relative flex h-16 items-center justify-between">
            {/* ------ navbar left side ------ start */}
            <div className="inset-y-0 flex items-center lg:hidden mr-5">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <GiHamburgerMenu />
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
              {!isLoading ? (
                <div
                  onMouseEnter={() => {
                    setIsCategoryOpen(false);
                    setSubCategories([]);
                    setSubSubCategories([]);
                    setIsCategory("");
                    setIsMenu("");
                  }}
                  className="flex flex-shrink-0 items-center "
                >
                  <Link href="/">
                    <Image
                      width={500}
                      height={65}
                      className="w-[150px] sm:w-[250px] object-contain"
                      src={settingData?.data[0]?.logo}
                      alt="Your Company"
                      loading="lazy"
                    />
                  </Link>
                </div>
              ) : (
                <div
                  onMouseEnter={() => {
                    setIsCategoryOpen(false);
                    setSubCategories([]);
                    setSubSubCategories([]);
                    setIsCategory("");
                    setIsMenu("");
                  }}
                  className="flex flex-shrink-0 items-center "
                >
                  <Link href="/">
                    <Image
                      width={500}
                      height={65}
                      className="w-[150px] sm:w-[250px] object-contain"
                      src={logo}
                      alt="Your Company"
                      loading="lazy"
                    />
                  </Link>
                </div>
              )}
              {pathname !== "/" && (
                <button
                  onMouseEnter={() => {
                    setIsCategoryOpen(true);
                    setSubCategories([]);
                    setSubSubCategories([]);
                    setIsCategory("");
                    setIsMenu("");
                  }}
                  className="text-secondary mx-3 px-1 rounded-full hidden lg:block bg-gray-500"
                >
                  <GiHamburgerMenu className="inline -mt-1 mr-2" />
                  All Categories
                </button>
              )}
              <div
                onMouseEnter={() => {
                  setIsCategoryOpen(false);
                  setSubCategories([]);
                  setSubSubCategories([]);
                  setIsCategory("");
                  setIsMenu("");
                }}
                className={`hidden flex-1 max-w-xl ${
                  pathname === "/" ? "ml-7 lg:block" : "xl:block"
                }`}
              >
                <SearchForm />
              </div>

              <div
                ref={menuRef}
                className={`${
                  isSearchFieldOpen
                    ? "absolute top-20 z-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    : "hidden"
                } w-full sm:px-20 mx-auto flex-1`}
              >
                <SearchForm />
              </div>
            </div>
            {/* ------ navbar left side ------ end */}
            {/* ------ navbar right side ----- start */}
            <div className="lg:space-x-4 inset-y-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <PcBuilderButton path="/pc-builder">Pc Builder</PcBuilderButton>
              <button
                onClick={() => setSearchFieldOpen(!isSearchFieldOpen)}
                className={`relative inline-flex items-center justify-center p-2 md:p-3 md:overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow ${
                  pathname === "/" ? "lg:hidden" : "xl:hidden"
                }`}
              >
                <IoSearchOutline className="text-lg md:text-xl text-secondary" />
              </button>
              <Link
                href={/compare}
                className="relative px-3 py-1 text-secondary focus:outline-none sm:flex flex-col items-center rounded-md shadow group hidden"
              >
                <TfiReload className="text-xl" />
                <span className="text-xs text-textColor group-hover:text-successColor transition-all duration-300 ease-in-out">
                  Compare
                </span>
                {compareProducts?.length > 0 && (
                  <span className="absolute right-[14px] -top-1.5 w-5 h-5 bg-secondary rounded-full text-textColor text-xs flex items-center justify-center font-normal">
                    {compareProducts?.length}
                  </span>
                )}
              </Link>
              <Link
                href={/wishlist}
                className="relative px-3 py-1 text-secondary focus:outline-none hidden sm:flex flex-col items-center rounded-md shadow group"
              >
                <CiHeart className="text-2xl font-bold" />
                <span className="text-xs text-textColor group-hover:text-successColor transition-all duration-300 ease-in-out">
                  Wishlist
                </span>
                {data?.data?.length > 0 && (
                  <span className="absolute right-[10px] -top-1.5 w-5 h-5 bg-secondary rounded-full text-textColor text-xs flex items-center justify-center font-normal">
                    {data?.data?.length}
                  </span>
                )}
              </Link>
              {pathname === "/checkout" ? (
                <button
                  type="button"
                  className="relative px-3 py-1 text-gray-500 focus:outline-none flex flex-col items-center rounded-md shadow group"
                >
                  <GiShoppingCart className="text-lg md:text-xl lg:text-2xl font-bold" />
                  <span className="text-xs text-textColor group-hover:text-successColor transition-all duration-300 ease-in-out">
                    Cart
                  </span>
                  {cartProducts?.length > 0 && (
                    <span className="absolute right-[0px] -top-1.5 w-5 h-5 bg-secondary rounded-full text-textColor text-xs flex items-center justify-center font-normal">
                      {cartProducts?.length}
                    </span>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={toggleDrawer}
                  className="relative px-3 py-1 text-secondary focus:outline-none flex flex-col items-center rounded-md shadow group"
                >
                  <GiShoppingCart className="text-lg md:text-xl lg:text-2xl font-bold" />
                  <span className="text-xs text-textColor group-hover:text-successColor transition-all duration-300 ease-in-out">
                    Cart
                  </span>
                  {cartProducts?.length > 0 && (
                    <span className="absolute right-[0px] -top-1.5 w-5 h-5 bg-secondary rounded-full text-textColor text-xs flex items-center justify-center font-normal">
                      {cartProducts?.length}
                    </span>
                  )}
                </button>
              )}

              <div className="relative ml-3 hidden sm:block">
                <div>
                  {user ? (
                    <div
                      ref={menuRef}
                      type="button"
                      onClick={() => toggleDropdown()}
                      className="relative flex rounded-full bg-gray-800 text-sm outline-none ring-2 ring-white focus:ring-offset-1 focus:ring-offset-gray-800 cursor-pointer"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <Image
                        width={50}
                        height={50}
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="user profile"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <Link
                      href="/signin"
                      className="relative px-3 py-1 text-secondary focus:outline-none flex flex-col items-center rounded-md shadow group"
                    >
                      <CiLogin className="text-2xl font-bold" />
                      <span className="text-xs text-textColor group-hover:text-successColor transition-all duration-300 ease-in-out">
                        Login
                      </span>
                    </Link>
                  )}
                </div>
                <div
                  className={`absolute ${
                    isDropdownOpen ? "right-0" : "hidden"
                  } z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <Link
                    href="/customers-dashboard/account"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/customers-dashboard"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-1"
                  >
                    My Order
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
            {/* ------ navbar right side ----- end */}
          </div>
        </nav>
        {/* ------ main navbar container ------ end */}
        {/* ------ mobile navbar bottom ------ start */}
        <div className="fixed bottom-0 left-0 px-2 py-2 lg:hidden bg-primary flex justify-between w-full gap-3">
          <Link href="/offer" className="flex flex-col items-center">
            <FiGift className="text-white-light" />
            <span className="text-[10px] font-normal text-white-light">
              Offer
            </span>
          </Link>
          <Link href="/flash-sale" className="flex flex-col items-center">
            <FcFlashOn className="animate-pulse" />
            <span className="text-[10px] font-normal text-white-light">
              Flash Sale
            </span>
          </Link>
          <Link href="/order-tracking" className="flex flex-col items-center">
            <GoIssueTrackedBy className="text-textColor" />
            <span className="text-[10px] font-normal text-white-light text-center">
              Order Tracking
            </span>
          </Link>
          <Link href="/pc-builder" className="flex flex-col items-center">
            <BiSolidMessageAltAdd className="text-white" />
            <span className="text-[10px] font-normal text-white">
              Pc builder
            </span>
          </Link>
          {user ? (
            <Link
              href="/customers-dashboard"
              className="flex flex-col items-center"
            >
              <FiUser className="text-white" />
              <span className="text-[10px] font-normal text-white">
                Account
              </span>
            </Link>
          ) : (
            <Link href="/signin" className="flex flex-col items-center">
              <FiUser className="text-white" />
              <span className="text-[10px] font-normal text-white">
                Account
              </span>
            </Link>
          )}
        </div>
        {/* ------ mobile navbar bottom ------ end */}
        {/* ------ mobile menu ------ start */}
        <div
          className={`h-screen w-11/12 sm:w-4/12 fixed inset-y-0 left-0 z-50 bg-bgray-50 overflow-y-auto transition-transform duration-500 transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end px-5 py-2">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <GoArrowRight className="border text-3xl bg-bgray-100 text-bgray-900 shadow rounded-full rotate-180" />
            </button>
          </div>
          <div className="flex h-screen flex-col justify-between border-e">
            <MobileMenu
              menuData={menuData}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        </div>
        {/* ------ mobile menu ------ end */}

        {/* ------ cart drawer ------ start */}

        <div
          className={`scrollbar-hide w-[100vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[20vw] fixed h-screen inset-y-0 right-0 z-50 bg-bgray-50 transition-transform duration-500 transform pt-3 pb-10 ${
            isDrawerOpen ? "-translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 pt-1 pb-2 border-b">
            <button className="text-4xl" onClick={toggleDrawer}>
              <GoArrowRight className="p-1 bg-bgray-50 text-black shadow rounded-full text-3xl" />
            </button>
            <p className="text-black font-medium">
              <FaCartArrowDown className="inline" /> Cart(
              {cartProducts?.length})
            </p>
          </div>
          <section className="py-1 pl-4">
            {cartProducts?.length > 0 ? (
              <div className="text-black mx-auto rounded overflow-y-auto max-h-[60vh] scrollbar-track-inherit scrollbar-thin">
                <div>
                  {cartProducts?.map((product, i) => (
                    <div
                      className="flex items-center gap-2 border-b bg-white py-1"
                      key={i}
                    >
                      <div className="w-[70px] h-[70px] border rounded mr-3">
                        <Image
                          width={100}
                          height={100}
                          loading="lazy"
                          src={product?.product_thumbnail}
                          alt={product?.product_name}
                          className="object-fill rounded"
                        />
                      </div>
                      <div className="flex flex-col flex-1 space-y-2">
                        <h2 className="text-sm tracking-tight leading-5 mb-0 font-medium">
                          {product?.product_name}
                        </h2>
                        <div className="flex justify-between items-center mr-2">
                          <p className="text-sm mb-0">
                            ৳ {numberWithCommas(product?.product_price)}
                          </p>
                          <div className={flex items-center justify-center}>
                            <button
                              onClick={() =>
                                dispatch(decrementQuantity(product))
                              }
                              className="text-bgray-700 px-1 py-1 border rounded hover:bg-bgray-300"
                            >
                              <FiMinus />
                            </button>
                            <span className="px-2 border">
                              {product?.quantity}
                            </span>
                            <button
                              onClick={() => dispatch(addToCart(product))}
                              className="text-bgray-700 px-1 py-1 border rounded hover:bg-bgray-300"
                            >
                              <GoPlus />
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              dispatch(removeFromCart(product));
                            }}
                            className="text-error-200 px-1 py-1 border rounded hover:bg-bgray-300"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyCart toggleDrawer={toggleDrawer} />
            )}
          </section>
          {cartProducts?.length > 0 && (
            <section>
              <div className="overflow-x-auto py-5 bg-white">
                <table className="min-w-1/2 mx-auto divide-y-2 divide-gray-200 text-sm">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 font-medium text-gray-900">
                        Sub-Total
                      </td>
                      <td className="whitespace-nowrap px-4 text-gray-700">
                        BDT
                      </td>
                      <td className="whitespace-nowrap px-4 text-end">
                        ৳{numberWithCommas(totalPrice)}
                      </td>
                    </tr>

                    <tr>
                      <td className="whitespace-nowrap px-4 py- font-medium text-gray-900">
                        Delivery Charge
                      </td>

                      <td className="whitespace-nowrap px-4 py- text-gray-700">
                        BDT
                      </td>
                      <td className="whitespace-nowrap px-4 py- text-gray-700">
                        to be calculated
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py- font-medium text-gray-900">
                        Estimated Total
                      </td>

                      <td className="whitespace-nowrap px-4 py- text-gray-700 font-medium">
                        BDT
                      </td>
                      <td className="whitespace-nowrap px-4 py- text-gray-700 font-medium text-end">
                        ৳{numberWithCommas(totalPrice)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-4">
                <Link
                  onClick={toggleDrawer}
                  href={/cart}
                  className="block w-full text-center py-2 bg-primaryColor text-white rounded text-sm"
                >
                  View Cart
                </Link>
                <Link
                  href={/}
                  onClick={toggleDrawer}
                  className="block w-full text-center py-2 text-white bg-primary rounded mt-1 text-sm"
                >
                  Continue Shipping
                </Link>
              </div>
            </section>
          )}
        </div>

        {/* ----- cart drawer ----- end */}

        {/* ------ category section top header ------ start */}
        {isCategoryOpen && (
          <div
            onMouseLeave={() => {
              setIsCategoryOpen(false);
              setIsCategory("");
              setIsMenu("");
            }}
            className="absolute top-[72px] start-[20%] z-10 col-span-2 hidden lg:block rounded bg-white border shadow-md py-3"
          >
            <div className="rounded-md flex">
              <nav className="w-[250px] border-r overflow-hidden">
                <ul className="space-y-[1px] list-none max-h-[300px] overflow-y-auto scrollbar-thin">
                  {menuData?.data?.map((menu) => (
                    <Link
                      onClick={() => {
                        setIsCategoryOpen(false);
                        setIsCategory("");
                        setIsMenu("");
                      }}
                      key={menu?.category?._id}
                      href={/category/${menu?.category?.category_slug}}
                    >
                      <li
                        onMouseOver={() => {
                          setSubCategories(
                            menu?.subCategoryAndChildCategoryData
                          );
                          setSubSubCategories([]);
                          setIsMenu(menu?.category?.category_slug);
                          setIsCategory("");
                        }}
                      >
                        <details className="group">
                          <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            <span
                              className={`text-sm font-medium group-hover:text-secondary ${
                                isMenu === menu?.category?.category_slug &&
                                "text-secondary"
                              }`}
                            >
                              {menu?.category?.category_name}
                            </span>

                            {menu?.subCategoryAndChildCategoryData?.length >
                              0 && (
                              <span
                                className={`shrink-0 transition duration-300 group-hover:-rotate-90 ${
                                  isMenu === menu?.category?.category_slug &&
                                  "-rotate-90"
                                }`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-5 w-5 group-hover:text-secondary ${
                                    isMenu === menu?.category?.category_slug &&
                                    "text-secondary"
                                  }`}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </summary>
                        </details>
                      </li>
                    </Link>
                  ))}
                </ul>
              </nav>
              {subCategories?.length > 0 && (
                <nav className="w-[250px] border-r overflow-hidden">
                  <ul className="space-y-[1px] list-none max-h-[300px] overflow-y-auto scrollbar-thin">
                    {subCategories?.map((subCategory) => (
                      <Link
                        onClick={() => {
                          setIsCategoryOpen(false);
                          setIsCategory("");
                          setIsMenu("");
                        }}
                        href={/category/${isMenu}/${subCategory?.sub_category?.sub_category_slug}}
                        key={subCategory?.sub_category?.sub_category_name}
                      >
                        <li
                          onMouseOver={() => {
                            setSubSubCategories(subCategory?.child_categories);
                            setIsCategory(
                              subCategory?.sub_category?.sub_category_slug
                            );
                          }}
                        >
                          <details className="group">
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                              <span
                                className={`text-sm font-medium group-hover:text-secondary ${
                                  isCategory ===
                                    subCategory?.sub_category
                                      ?.sub_category_slug && "text-secondary"
                                }`}
                              >
                                {subCategory?.sub_category?.sub_category_name}
                              </span>

                              {subCategory?.child_categories?.length > 0 && (
                                <span
                                  className={`shrink-0 transition duration-300 group-hover:-rotate-90 ${
                                    isCategory ===
                                      subCategory?.sub_category
                                        ?.sub_category_slug && "-rotate-90"
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-5 w-5 group-hover:text-secondary ${
                                      isCategory ===
                                        subCategory?.sub_category
                                          ?.sub_category_slug &&
                                      "text-secondary"
                                    }`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </summary>
                          </details>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </nav>
              )}

              {subSubCategories?.length > 0 && (
                <nav className="w-[250px] overflow-hidden">
                  <ul className="space-y-[1px] list-none max-h-[300px] overflow-y-auto scrollbar-thin">
                    {subSubCategories?.map((subSubCategory) => (
                      <Link
                        onClick={() => {
                          setIsCategoryOpen(false);
                          setIsCategory("");
                          setIsMenu("");
                        }}
                        key={subSubCategory?._id}
                        href={/category/${isMenu}/${isCategory}/${subSubCategory?.child_category_slug}}
                      >
                        <li>
                          <details className="group">
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                              <span className="text-sm font-medium group-hover:text-secondary">
                                {subSubCategory?.child_category_name}
                              </span>

                              <span className="shrink-0 transition duration-300 -rotate-90 hidden group-hover:block">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 group-hover:text-secondary"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            </summary>
                          </details>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        )}
        {/* ------ category section top header ------ end */}
      </section>
    </>
  );
};

export default Navbar;