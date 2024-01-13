import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import CustomerTable from "../../../components/dashboard/customer/CustomerTable";

const Customer = () => {
    return (
        <>
            {/* Customer List Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Customer List</h3>
                <div className="flex items-center gap-2">
                    <Link to='/dashboard'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/dashboard/customer'><p className="font-semibold">Customer List</p></Link>
                </div>
            </div>

            {/* Show customer data in table */}
            <CustomerTable />
        </>
    );
};

export default Customer;