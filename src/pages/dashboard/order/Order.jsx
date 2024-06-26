import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import OrderTable from "../../../components/dashboard/order/OrderTable";

const Order = () => {
    return (
        <>
            {/* Order List Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Order List</h3>
                <div className="flex items-center gap-2">
                    <Link to='/admin'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/admin/order'><p className="font-semibold">Order List</p></Link>
                </div>
            </div>

            {/* Show Order data in table */}
            <OrderTable />
        </>
    );
};

export default Order;