// import react icons
import { GiBeachBag } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoArrowRight, GoPlus } from "react-icons/go";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormSearch from "../../components/frontend/form/FormSearch";
import ProductNotFound from "../../components/common/productNotFound/ProductNotFound";
import { CiTrash } from "react-icons/ci";
import { FiMinus } from "react-icons/fi";
import { isLoggedin } from "../../service/Auth.service";
import { eraseCookie } from "../../utils/cookie-storage";
import { authKey } from "../../constants/storageKey";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../redux/feature/cart/cartSlice";

import ConfirmationModal from "../../components/common/modal/ConfirmationModal";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import MobileMenu from "./MobileMenu";
const Header = () => {
  const [menu, setMenu] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSearchFieldOpen, setSearchFieldOpen] = useState(false);
  const [data, setData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.products);
  const subTotal = useSelector((state) => state.cart.subtotal);
  const dispatch = useDispatch();
  const isUser = isLoggedin();

  const { data: category = [] } = useQuery({
    queryKey: [`/api/v1/category/menuId?menuId=${menu}`],
    queryFn: async () => {
      if (menu !== "") {
        const res = await fetch(`${BASE_URL}/menu/${menu}`);
        const data = await res.json();
        return data;
      } else {
        // Return a default value when menu is empty
        return { data: [] };
      }
    },
    suspense: false,
  }); // get category and sub category

  const { data: products = [] } = useQuery({
    queryKey: [`/api/v1/product`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/product`);
      const data = await res.json();
      return data;
    },
  }); // get All Product

  const handleLogOut = () => {
    eraseCookie(authKey);
    navigate("/");
    window.location.reload();
  };

  const openModal = (product) => {
    setData(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    if (data) {
      dispatch(removeFromCart(data));
    }
    setModalOpen(false);
  };

  const closeConfirmModal = () => {
    setModalOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  console.log();
  return (
    <>
      <section className="bg-primaryColor text-[#fff] py-5 border-b border-bgray-700">
        {/* ------ header top section ------ start */}

        <div className="shadow-md">
          <div className="grid grid-cols-3 px-10 relative">
            {/* ------ header left side ------ start */}
            <div className="flex gap-10 items-center">
              <div className={`block md:hidden font-bold text-2xl h-[46px]`}>
                <Link to={"/"}>
                  <img
                    src="/assets/images/logo/logo.png"
                    alt=""
                    className="h-[46px] object-contain"
                  />
                </Link>
              </div>
              <div className={`hidden sm:block font-bold text-2xl h-[46px]`}>
                <Link to={"/"}>
                  <img
                    src="/assets/images/logo/logo.png"
                    alt=""
                    className="h-[46px] object-contain"
                  />
                </Link>
              </div>
            </div>
            {/* ------ header left side ------ start */}

            {/* ------ header middle side ------ start */}
            {/* ------ menu bar ------ start */}
            {/* <div className=" text-[#000] hidden sm:block"> */}
            {/* ------ navbar with dropdown ------ start */}
            {/* <nav className="relative py-2">
                <ul className="flex items-center justify-center gap-20">
                  {menuTypes?.data?.map((menuItem) => (
                    <li className="group" key={menuItem?._id}>
                      <button
                        onMouseEnter={() => handleHover(menuItem)}
                        className={`font-normal focus:outline-none text-[#fff] py-3 uppercase ${
                          menu === menuItem?._id ? "opacity-80" : ""
                        } transition-opacity duration-300`}
                      >
                        <p className="flex items-center gap-2">
                          <span className="text-lg">{menuItem?.menu}</span>
                          <MdOutlineKeyboardArrowDown
                            className={`text-lg group-hover:rotate-180 transition-all duration-300 ease-linear`}
                          />
                        </p>
                        <span
                          className={`transition-all duration-500 h-[1px] block bg-[#176B87] ${
                            menu === menuItem?._id ? "w-full" : "w-0"
                          }`}
                        ></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav> */}
            {/* ------ navbar with dropdown ------ end */}
            {/* </div> */}
            {/* ------ menu bar ------ end */}

            <div className={`h-[46px] justify-center hidden sm:flex`}>
              <Link to={"/"}>
                <img
                  src="/assets/images/logo/logo-text.png"
                  alt=""
                  className="h-[46px] object-contain"
                />
              </Link>
            </div>
            <div className="block md:hidden"></div>

            {/* ------ header middle side ------ end */}

            {/* ------ header right side ------ start */}

            <div className="flex items-center justify-end gap-4">
              <div
                className={`transition-all duration-500 ease-in-out absolute ${
                  isSearchFieldOpen
                    ? "top-[5px] right-[210px] md:right-[260px]"
                    : "-top-32 right-[210px] md:right-[260px]"
                }`}
              >
                <FormSearch />
              </div>
              <button
                onClick={() => setSearchFieldOpen(!isSearchFieldOpen)}
                className="relative inline-flex items-center justify-center p-2 md:p-3 md:overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow ring-1 ring-textColor"
              >
                <IoSearchOutline className="w-6 h-6 text-logoColor" />
              </button>
              <button
                onClick={toggleDrawer}
                className="relative inline-flex items-center justify-center p-2 md:p-3 md:overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow border border-textColor"
              >
                <GiBeachBag className="w-6 h-6 text-logoColor" />
                <span className="absolute z-20 top-1/2 right-1/2 bg-error-300 w-5 h-5 flex items-center justify-center text-white rounded-full">
                  {carts?.length}
                </span>
              </button>
              {isUser ? (
                <div className="relative">
                  <div className="inline-flex items-center overflow-hidden">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 rounded-full border border-textColor px-1 py-1 md:px-2 md:py-2"
                    >
                      <span className="hidden md:block">Sign Out</span>
                      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-primaryColor">
                        <FaRegUser className="w-5 h-5 text-logoColor" />
                      </span>
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <div
                      className="absolute w-40 end-0 z-10 mt-2 rounded-md border border-gray-100 bg-white shadow-lg"
                      role="menu"
                    >
                      <div className="p-2">
                        <Link
                          to="/user-profile"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          role="menuitem"
                        >
                          My Profile
                        </Link>
                        <form>
                          <button
                            type="submit"
                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                            role="menuitem"
                            onClick={handleLogOut}
                          >
                            Log Out
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/sign-in"
                  className="flex items-center gap-2 rounded-full border border-textColor px-1 py-1 md:px-2 md:py-2"
                >
                  <span className="hidden md:block">sign in</span>
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-primaryColor">
                    <FaRegUser className="w-5 h-5 text-logoColor" />
                  </span>
                </Link>
              )}
              <button onClick={toggleMobileMenu} className="block md:hidden">
                <RxHamburgerMenu className="text-2xl" />
              </button>
            </div>
            {/* ------ header right side ------ end */}
          </div>
        </div>

        {/* ------ header top section ------ end */}

        {/* ------ cart drawer ------ start */}

        <div
          className={`min-h-screen scrollbar-hide overflow-y-scroll w-[100vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[20vw] fixed inset-y-0 right-0 z-50 bg-bgray-50 transition-transform duration-500 transform pb-10 ${
            isDrawerOpen ? "-translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <button className="text-4xl" onClick={toggleDrawer}>
              <GoArrowRight className="p-1 bg-bgray-50 text-black shadow rounded-full text-3xl" />
            </button>
            <p>
              <strong>Total:</strong> <span className="text-orange"></span>
            </p>
          </div>
          <div className="py-1 px-4">
            {carts?.length > 0 ? (
              <section className="bg-white text-black mx-auto rounded sticky">
                <div className="space-y-2 overflow-y-scroll max-h-[80vh] scrollbar-thin">
                  {carts.map((product, i) => (
                    <div
                      className="flex items-center gap-2 border-b pb-3"
                      key={i}
                    >
                      <div className="w-[70px] h-[70px] border rounded mr-3">
                        <img
                          src={product?.thumbnail_image}
                          alt={product?.title}
                          className="object-fill rounded"
                        />
                      </div>
                      <div className="flex flex-col flex-1 space-y-2">
                        <h2 className="text-sm tracking-tight leading-5">
                          {product?.title}
                        </h2>
                        <p className="flex gap-2 items-center">
                          <span className="text-sm tracking-tight leading-5">
                            {product?.color}
                          </span>
                          <span className="text-sm tracking-tight leading-5">
                            {product?.size}
                          </span>
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm">BDT {product?.price}.00</p>
                        <div
                          className={`flex items-center justify-center border rounded-md px-2`}
                        >
                          {carts.find(
                            (selectedItem) =>
                              selectedItem.size === product?.size &&
                              selectedItem.productId === product?.productId
                          )?.quantity === 1 && (
                            <button
                              onClick={() => {
                                openModal(product);
                              }}
                              className="text-error-200 px-1 py-1 border rounded hover:bg-bgray-300"
                            >
                              <CiTrash />
                            </button>
                          )}
                          {carts.find(
                            (selectedItem) =>
                              selectedItem.size === product?.size &&
                              selectedItem.productId === product?.productId
                          )?.quantity > 1 && (
                            <button
                              onClick={() =>
                                dispatch(decrementQuantity(product))
                              }
                              className="text-bgray-700 px-1 py-1 border rounded hover:bg-bgray-300"
                            >
                              <FiMinus />
                            </button>
                          )}
                          <span className="px-2 py-1">{product?.quantity}</span>
                          <button
                            onClick={() => {
                              if (
                                products?.data
                                  ?.find(
                                    (singleProduct) =>
                                      singleProduct?._id === product?.productId
                                  )
                                  .size_variation.find(
                                    (sizeItem) =>
                                      sizeItem.size === product?.size
                                  ).quantity === product?.quantity
                              ) {
                                toast.error(
                                  "Max Stock Selected/Shortage of Stock",
                                  {
                                    autoClose: 3000,
                                  }
                                );
                              } else dispatch(incrementQuantity(product));
                            }}
                            className="text-bgray-700 px-2 py-2 border rounded hover:bg-bgray-300"
                          >
                            <GoPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link
                    to={`/all`}
                    onClick={toggleDrawer}
                    className="block w-full text-center py-3 text-white bg-black hover:bg-opacity-70 rounded mt-4"
                  >
                    Shop More
                  </Link>
                </div>

                <div className="overflow-x-auto mt-5">
                  <table className="min-w-1/2 ml-auto divide-y-2 divide-gray-200 bg-white text-sm">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="whitespace-nowrap px-4 py- font-medium text-gray-900">
                          Sub-Total
                        </td>
                        <td className="whitespace-nowrap px-4 py- text-gray-700">
                          BDT
                        </td>
                        <td className="whitespace-nowrap px-4 py- text-gray-700">
                          ৳{subTotal}.00
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
                        <td className="whitespace-nowrap px-4 py- text-gray-700 font-medium">
                          ৳{subTotal}.00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-col gap-y-1 bg-white">
                  <Link
                    onClick={toggleDrawer}
                    to={`/checkout`}
                    className="w-full text-center py-3 bg-black text-white rounded"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </section>
            ) : (
              <ProductNotFound />
            )}
          </div>
        </div>

        {/* ------ cart drawer ------ end */}

        {/* ------ mobile menu ------ start */}

        <div
          className={`h-screen w-full fixed inset-y-0 left-0 z-50 bg-bgray-50 overflow-y-auto transition-transform duration-500 transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end px-5 py-2">
            <button className="" onClick={toggleMobileMenu}>
              <GoArrowRight className="border text-3xl bg-bgray-100 text-bgray-900 shadow rounded-full rotate-180" />
            </button>
          </div>
          <div className="flex h-screen flex-col justify-between border-e">
            <MobileMenu
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        </div>

        {/* ------ mobile menu ------ end */}
        {/* ------ confirm modal ------ start */}

        <ConfirmationModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            <div className="flex justify-end">
              <button
                className="bg-bgray-900 hover:bg-bgray-700 text-white font-bold py-1 px-2 -mt-4 mb-2 -mr-4 rounded"
                onClick={closeConfirmModal}
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>
            <div>
              <p className="border-b pb-4 text-black">
                Are you sure you want to remove this item from cart?
              </p>
              <div className="flex justify-end mt-5">
                <button
                  onClick={() => handleConfirm()}
                  className="bg-bgray-900 px-7 py-3 text-white font-medium tracking-tight leading-5 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </ConfirmationModal>

        {/* ------ confirm modal ------ end */}

        <div
          onMouseEnter={() => setIsMenuOpen(true)}
          className={`w-full absolute bg-[#fdfcfc] border-b shadow-md border-t border-t-gray-600 mt-1 ${
            isMenuOpen ? "top-[59px]" : "-top-32"
          }`}
          onMouseLeave={() => {
            setIsMenuOpen(false);
            setMenu("");
          }}
        >
          {/* ------ category section ------ start */}
          {/* <div className="border-r px-4 py-[5px]">
            <ul className="flex gap-5 py-10 container">
              {category?.data?.map((category) => (
                <li className="w-[200px]" key={category?.category?._id}>
                  <Link
                    to={`/all?gender=${gender}&category=${category?.category?.slug}`}
                    className="text-[#000] py-1 px-2 w-full text-left rounded-sm text-base font-medium opacity-80 hover:opacity-100"
                  >
                    {category?.category?.category}
                  </Link>
                  <ul className="space-y-[2px] mt-2">
                    {category?.subcategories?.map((subItem) => (
                      <li key={subItem?._id}>
                        <Link
                          to={`/all?gender=${gender}&category=${category?.category?.slug}&sub_category=${subItem?.slug}`}
                          className=" text-[#000] py-1 px-2 w-full text-left rounded-sm text-sm font-sans tracking-tight leading-5 opacity-80 hover:opacity-100"
                        >
                          {subItem?.sub_category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div> */}
          {/* ------ category section ------ end */}
        </div>
      </section>
    </>
  );
};

export default Header;
