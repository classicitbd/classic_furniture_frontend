import { FaRegUser, FaShoppingCart, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeaderSkeleton = () => {
  return (
    <div className=" text-white shadow-sm">
      <div className="es_container">
        <div className="mr-6">
          <div className=" items-center justify-between gap-2 py-2 hidden lg:flex">
            <div className=" h-10 bg-gray-200 w-32 animate-pulse"></div>
            <div className="search flex-1">
              <div className="flex flex-1 justify-between lg:max-w-5xl items-center">
                <div className="relative flex items-center w-full">
                  <input
                    id="search"
                    type="search"
                    className="w-full px-3 py-2 focus:outline-none border focus:ring-1 focus:ring-primaryDeepColor border-gray-300 rounded text-gray-800"
                    name="search"
                    autoComplete="off"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    disabled
                  />
                  <div className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-200 text-gray-800 rounded-r-md ">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 512 512"
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        strokeWidth={32}
                        d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64z"
                      />
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        strokeWidth={32}
                        d="M338.29 338.29 448 448"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-right flex gap-4 text-black ">
              <Link
                to="/product-video"
                className="offer lg:flex items-center gap-3"
              >
                <span className="icon">
                  <FaYoutube className="text-red-600 text-[34px] " />
                </span>
                <div className="lg:flex flex-col text-black hidden xl:block ">
                  <p className="text-[14px] leading-[14px] font-medium hidden lg:block">
                    Video
                  </p>
                  <p className="text-ftMuteColor text-[13px] font-light ">
                    Product Video
                  </p>
                </div>
              </Link>
              <Link
                className="cart flex items-center gap-2 relative text-black"
                to="/checkout"
              >
                <span className="icon">
                  <FaShoppingCart className="text-[#47504c] text-[26px]" />
                </span>
                <div className="flex flex-col text-black ">
                  <p className="text-[14px] leading-[14px] font-medium hidden xl:block">
                    Cart
                  </p>
                  <span className="text-ftMuteColor text-[13px] font-light hidden lg:block">
                    Products
                  </span>
                </div>
              </Link>

              <div className="relative cursor-pointer ">
                <FaRegUser className=" text-[26px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSkeleton;
