import { IoMdGift } from 'react-icons/io'
import { CiUser } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import { FaBars, FaShoppingCart } from 'react-icons/fa'
import { useState } from 'react'
import "./header.css"
import logo from "../../assets/images/furniture-logo.png"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }
  return (
    <div className="bg-ftSecoundColor text-white shadow-sm">
      <div className="es_container">

        <div className="flex items-center justify-between gap-2 py-2">
          <Link className="cart flex items-center gap-2  md:ms-20  xl:ms-0">
            <span className="icon hidden lg:block">
              <img className='w-16' src={logo} alt="" />
            </span>
            <div className="flex flex-col text-[#008140] ">
              <span className="text-ftMuteColor text-[20px] font-bold hidden lg:block">
                Classic Furniture
              </span>
            </div>
          </Link>
          <div className="search flex-1">
            <form className="flex flex-1 justify-between lg:max-w-5xl items-center">
              <div className='block lg:hidden text-black me-5  max-w-[200px]'>
                <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} /> <FaBars className='text-2xl text-[#817777]' onClick={handleMobileMenu} />
              </div>

              <div className="relative flex items-center w-full">
                <input
                  id="search"
                  type="search"
                  placeholder="Search Here"
                  className="w-full px-3 py-2 focus:outline-none border border-gray-300 rounded-l-md text-gray-800"
                  name="search"
                  defaultValue=""
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-200 text-gray-800 rounded-r-md hover:bg-gray-300"
                >
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
                </button>
              </div>
            </form>
          </div>
          <div className="header-right flex gap-4 text-black ">
            <div className="offer lg:flex items-center gap-3">
              <span className="icon">
                <IoMdGift className="text-ftPrimaryColor text-[26px] text-[#008140]" />
              </span>
              <Link className="lg:flex flex-col text-black hidden xl:block ">
                <p className="text-[14px] leading-[14px] font-medium hidden lg:block">Offer</p>
                <span className="text-ftMuteColor text-[13px] font-light ">
                  Latest Offer
                </span>
              </Link>
            </div>
            <Link className="cart flex items-center gap-2 text-black">
              <span className="icon">
                <FaShoppingCart className="text-[#47504c] text-[26px]" />
              </span>
              <div className="flex flex-col text-black ">
                <p className="text-[14px] leading-[14px] font-medium hidden xl:block">Cart</p>
                <span className="text-ftMuteColor text-[13px] font-light hidden lg:block">
                  Products
                </span>
              </div>
            </Link>
            <Link to={"/sign-up"} className="account flex items-center gap-2 text-black">
              <span className="icon">
                <CiUser className="text-ftPrimaryColor text-[26px]" />
              </span>
              <Link ><div className="flex flex-col text-black  md:me-20  xl:me-0">
                <p className="text-[14px] leading-[14px] font-medium hidden lg:block">
                  Account
                </p>
                <span className="text-ftMuteColor text-[13px] font-light text-black hidden lg:block">
                  Register or Login
                </span>
              </div></Link>

            </Link>


          </div>
        </div>
      </div>
    </div>
  )
}
