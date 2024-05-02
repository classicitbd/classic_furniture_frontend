import { useEffect, useRef } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import "./header.css"
import logo from "../../assets/images/furniture-logo.png"

const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const handleMenuItemClick = (route) => {
    navigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`text-xl menu-container ${isMobileMenuOpen ? 'menu-visible' : 'menu-hidden'}`} ref={menuRef}>
      <div className='flex items-center justify-between'>

        <Link className="cart flex items-center gap-2">
          <span className="icon">
            <img className='w-16 ps-3' src={logo} alt="" />
          </span>
          <div className="flex flex-col text-[#008140] ">
            <span className="text-ftMuteColor text-[20px] font-bold hidden lg:block">
              Classic Furniture
            </span>
          </div>
        </Link>
        <button type='button' className='text-xl px-4 p-3' onClick={() => setIsMobileMenuOpen(false)}>
          <FaRegTimesCircle className='text-xl text-white bg-blue-700 rounded-full bottom-none' />
        </button>

      </div>

      <div className='border-b-2'></div>

      <ul className='flex flex-col gap-2 px-5 my-4'>

        <li
          onClick={() => handleMenuItemClick('/')}
          className='flex items-center gap-1 text-lg menu-item'
        >
          Home
        </li>
        <li
          onClick={() => handleMenuItemClick('/all')}
          className='flex items-center gap-1 text-lg menu-item'
        >
          All Products
        </li>
        <li
          onClick={() => handleMenuItemClick('/category')}
          className='flex items-center gap-1 text-lg menu-item'
        >
          Category
        </li>
        <li
          onClick={() => handleMenuItemClick('/campaign')}
          className='flex items-center gap-1 text-lg menu-item'
        >
          Campaign
        </li>
        <li
          onClick={() => handleMenuItemClick('/sign-out')}
          className='flex items-center gap-1 text-lg menu-item'
        >
          Logout
        </li>
      </ul>

    </div>
  );
};

export default MobileMenu;
