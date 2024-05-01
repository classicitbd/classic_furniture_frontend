import { useEffect, useRef } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./header.css"

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
      <div className='flex justify-end'>
        <button type='button' className='text-xl px-4 p-3' onClick={() => setIsMobileMenuOpen(false)}>
          <FaRegTimesCircle className='text-2xl'/>
        </button>

      </div>

      <ul className='flex flex-col gap-4 px-5'>
        <li
          onClick={() => handleMenuItemClick('/')}
          className='flex items-center gap-1 text-xl menu-item hover:bg-[#008140]'
        >
          Home
        </li>
        <li
          onClick={() => handleMenuItemClick('/about')}
          className='flex items-center gap-1 text-xl menu-item hover:bg-[#008140]'
        >
          About
        </li>
        <li
          onClick={() => handleMenuItemClick('/sign-out')}
          className='flex items-center gap-1 text-xl menu-item hover:bg-[#008140]'
        >
           Logout
        </li>
      </ul>

    </div>
  );
};

export default MobileMenu;
