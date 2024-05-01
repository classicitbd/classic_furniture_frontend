// import { FaSearch } from 'react-icons/fa'
import { IoMdGift } from 'react-icons/io'
import { CiUser } from 'react-icons/ci'
import { RiShoppingBagFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'
import "./header.css"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <div className="bg-ftSecoundColor text-white shadow-sm">
      <div className="es_container">

        <div className="flex items-center justify-between gap-4 py-2">
          <Link to={'/'} className="logo">
            <h1 className='text-[#008140] font-extrabold text-2xl hidden lg:block ms-20 xl:ms-0'> Classic Furniture</h1>
          </Link>
          <div className="search flex-1">


            <form className="flex flex-1 justify-between lg:max-w-5xl items-center">
              <div className='block lg:hidden text-black me-5  max-w-[200px]'>
                <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} /> <FaBars className='text-2xl text-[#817777]' onClick={handleMobileMenu} />
              </div>
              <input
                id="search"
                type="search"
                placeholder="Search Here"
                className="w-full px-3 py-2 focus:outline-none rounded-md text-black"
                name="search"
                defaultValue=""
              />
              <button
                className="px-5 text-white rounded-r bg-ftPrimaryColor hover:bg-opacity-80"
                type="search"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  className="text-whiteColor text-xl text-black"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    strokeMiterlimit={10}
                    strokeWidth={32}
                    d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64z"
                  />
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeMiterlimit={10}
                    strokeWidth={32}
                    d="M338.29 338.29 448 448"
                  />
                </svg>
              </button>
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
                <RiShoppingBagFill className="text-[#47504c] text-[26px]" />
              </span>
              <div className="flex flex-col text-black ">
                <p className="text-[14px] leading-[14px] font-medium hidden xl:block">Cart</p>
                <span className="text-ftMuteColor text-[13px] font-light hidden lg:block">
                  Products
                </span>
              </div>
            </Link>
            <Link className="account flex items-center gap-2 text-black">
              <span className="icon">
                <CiUser className="text-ftPrimaryColor text-[26px]" />
              </span>
              <Link to={"/sign-up"}><div className="flex flex-col text-black  md:me-20  xl:me-0">
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
