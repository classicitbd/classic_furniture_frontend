import { FaHome, FaShoppingCart, FaYoutube, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MobileNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around py-3 lg:hidden mb-2 rounded-lg mx-4">
      <Link to="/" className="text-black">
        <FaHome size={24} />
      </Link>
      <Link to="/products" className="text-black">
        <FaShoppingCart size={24} />
      </Link>
      <Link to="/cart" className="bg-primaryDeepColor rounded-full text-white">
        <FaShoppingCart size={24} />
      </Link>
      <Link to="/youtube" className="text-black">
        <FaYoutube size={24} />
      </Link>
      <Link to="/profile" className="text-black">
        <FaUser size={24} />
      </Link>
    </div>
  );
}
