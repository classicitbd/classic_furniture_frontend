import { Link } from "react-router-dom";
import { PiHouseBold } from "react-icons/pi";
import AddMenuType from "../../../components/dashboard/addMenuType/AddMenuType";

const Menu = () => {
    return (
        <>
            {/* Menu Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Menu</h3>
                <div className="flex items-center gap-2">
                    <Link to='/dashboard'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/dashboard/menu'><p className="font-semibold">Menu</p></Link>
                </div>
            </div>

            {/* Add Menu Type */}
            <AddMenuType />

        </>
    );
};

export default Menu;