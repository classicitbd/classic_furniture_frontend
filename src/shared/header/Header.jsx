import { SlPhone } from "react-icons/sl";
import { MdAccessTime } from "react-icons/md";
import { GiBeachBag } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoArrowRight } from "react-icons/go";
import bdLogo from "/assets/images/bd-logo.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormSearch from "../../components/frontend/form/FormSearch";
import ProductNotFound from "../../components/common/productNotFound/ProductNotFound";
const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const products = [];

  const toggleDropdown = () => {
    setIsDropdownOpen(true);
  };
  return (
    <>
      <section className="bg-black text-white pt-2">
        {/* ------ header top section ------ start */}

        <div
          onMouseEnter={() => setIsDropdownOpen(false)}
          className="border-b pb-3 border-gray-600"
        >
          <div className="container flex items-center justify-between">
            <div
              className={`${
                scroll ? "hidden" : "hidden md:flex items-center gap-3"
              } `}
            >
              <div className="w-[40px] h-[40px] rounded-full border border-white bg-white">
                <img
                  src={bdLogo}
                  alt="bd-logo"
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-x-[10px]">
                <p className="flex items-center gap-1">
                  <span>
                    <SlPhone />
                  </span>
                  <span>+88 01796 682951</span>
                </p>
                <p className="flex items-center gap-1">
                  <span>
                    <MdAccessTime />
                  </span>
                  <span>10:00AM - 10:00PM</span>
                </p>
              </div>
            </div>
            <div className="block md:hidden">
              <RxHamburgerMenu className="text-2xl" />
            </div>
            <Link
              to={"/"}
              className={`${
                scroll
                  ? "hidden sm:block font-bold text-2xl w-[394px]"
                  : "hidden"
              }`}
            >
              Classic It
            </Link>
            <div>
              <Link
                to={"/"}
                className={`font-bold text-2xl ${
                  scroll ? "block sm:hidden" : "block"
                }`}
              >
                Classic It
              </Link>
              <div
                className={`${scroll ? "hidden sm:block" : "hidden"} w-[500px]`}
              >
                <FormSearch />
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 lg:w-[394px]">
              <Link
                to="#"
                onClick={toggleDrawer}
                className="relative inline-flex items-center justify-center p-2 md:p-3 md:overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow ring-1 ring-purple-500"
              >
                <GiBeachBag className="w-6 h-6 text-white" />
                <span className="absolute z-20 top-1/2 right-1/2 bg-error-300 w-5 h-5 flex items-center justify-center text-white rounded-full">
                  {1}
                </span>
              </Link>
              <Link
                to="/sign-in"
                className="flex items-center gap-2 rounded-full border px-1 py-1 md:px-2 md:py-2"
              >
                <span className="hidden md:block">sign in</span>
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white">
                  <FaRegUser className="w-5 h-5 text-black" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ------ header top section ------ end */}

        {/* ------ navbar with dropdown ------ start */}

        <div
          onMouseLeave={() => setIsDropdownOpen(false)}
          className={`hidden md:block`}
        >
          <nav className="border-b border-gray-600 relative group">
            <ul className="flex items-center justify-center gap-7 py-3">
              <li className="group">
                <button
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  className="text-2xl menu font-light focus:outline-none"
                >
                  Men
                </button>
              </li>
              <li>
                <Link className="border-r border-gray-600"></Link>
              </li>
              <li>
                <button className="text-2xl menu font-light">Women</button>
              </li>
              <li>
                <Link className="border-r border-gray-600"></Link>
              </li>
              <li
                className="group"
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                <button className="text-2xl menu font-light">Unisex</button>
              </li>
            </ul>
            <div
              onMouseEnter={() => setIsDropdownOpen(true)}
              className={`absolute top-18 left-0 w-full bg-black h-[300px] ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            ></div>
          </nav>
        </div>

        {/* ------ navbar with dropdown ------ end */}

        {/* ------ cart drawer ------ start */}

        <div
          className={`min-h-screen w-[100vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[20vw] fixed inset-y-0 right-0 z-50 bg-bgray-50 overflow-y-auto transition-transform duration-500 transform ${
            isDrawerOpen ? "-translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <button className="text-4xl" onClick={toggleDrawer}>
              <GoArrowRight className="p-1 bg-bgray-900 shadow rounded-full" />
            </button>
            <p>
              <strong>Total:</strong> <span className="text-orange">{10}৳</span>
            </p>
          </div>
          <div className="py-1 px-4">
            {products?.length > 0 ? (
              <div className="flex flex-col gap-y-1 bg-white">
                <h1>products</h1>
              </div>
            ) : (
              <ProductNotFound />
            )}
          </div>
        </div>

        {/* ------ cart drawer ------ end */}
      </section>
    </>
  );
};

export default Header;

// {
//   products?.map((mobile) => (
//     <div className="border shadow-sm rounded" key={mobile.id}>
//       <div className="flex items-center pr-5 gap-3">
//         {/* thumbnail */}
//         <img
//           className="w-18 h-20"
//           src={mobile?.thumbnail}
//           alt={mobile?.title}
//         />
//         {/* title & price */}
//         <div className="md:px-5">
//           <h2 className="w-full text-base md:text-md font-normal md:font-semibold">
//             {mobile.title}
//           </h2>
//           <p className="text-orange font-bold">{mobile.price}৳</p>
//         </div>
//         {/* color & size */}
//         <div className="w-full flex items-center justify-center flex-col gap-[2px] md:gap-2 md:flex-row">
//           {/* color */}
//           <div
//             className={`w-8 h-8 flex justify-center items-center gap-2 p-[2px] border-2 border-primaryColor rounded `}
//           >
//             <span
//               className={`w-6 h-6 rounded-full ${
//                 mobile.selectColor === "Black"
//                   ? "bg-black"
//                   : mobile.selectColor === "Blue"
//                   ? "bg-blue-600"
//                   : "bg-red-600"
//               }`}
//             ></span>
//           </div>
//           {/* size */}
//           <div className={`border-2 border-primaryColor rounded px-[2px]`}>
//             <p className="text-center">{mobile?.selectSize}"</p>
//           </div>
//         </div>
//         {/* quantity calculation */}
//         <div className="flex flex-col md:flex-row items-center mx:pr-3">
//           <span
//             onClick={() => {
//               if (mobile.quantity > 1) {
//                 dispatch(removeOne(mobile));
//               }
//             }}
//             className={`${
//               mobile.quantity > 1 ? "cursor-pointer" : "cursor-not-allowed"
//             } text-2xl md:text-3xl`}
//           >
//             <FiMinus className="p-1 group-hover:bg-blue-gray-50 shadow rounded" />{" "}
//           </span>
//           <span className="text-lg md:text-2xl border mx-1 px-3 rounded-sm">
//             {mobile.quantity}
//           </span>
//           <span
//             onClick={() => dispatch(addToCart(mobile))}
//             className="text-2xl md:text-3xl cursor-pointer"
//           >
//             <GoPlus className="p-1 group-hover:bg-blue-gray-50 shadow rounded" />
//           </span>
//         </div>
//         {/* item remover */}
//         <span
//           onClick={() => dispatch(removeFromCart(mobile))}
//           className="text-2xl md:text-3xl group cursor-pointer"
//         >
//           <IoMdClose className="p-1 text-white bg-error-300  group-hover:bg-error-200 shadow rounded" />
//         </span>
//       </div>
//     </div>
//   ));
// }

// ${scroll ? "hidden" : "hidden md:block"}
