import { useEffect, useRef } from 'react';
import { FaHome, FaShoppingBag, FaUser } from 'react-icons/fa';
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
      <ul className='flex flex-col gap-4 p-10'>
        <li
          onClick={() => handleMenuItemClick('/')}
          className='flex items-center gap-1 text-xl menu-item'
        >
          <FaHome className='text-xl' /> Home
        </li>
        <li
          onClick={() => handleMenuItemClick('/sign-up')}
          className='flex items-center gap-1 text-xl menu-item'
        >
          <FaUser className='text-xl' /> Sign-up
        </li>
        <li
          onClick={() => handleMenuItemClick('/sign-out')}
          className='flex items-center gap-1 text-xl menu-item'
        >
          <FaShoppingBag className='text-xl' /> Logout
        </li>
      </ul>

    </div>
  );
};

export default MobileMenu;
