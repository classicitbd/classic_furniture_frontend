import { Outlet } from "react-router-dom";
import SideNavBar from "../shared/sideNavBar/SideNavBar";
import DashboardNavbar from "../shared/Navbar/dashboardNavbar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen w-full h-full bg-white">
            <div className="fixed top-0 left-0 w-full z-50 bg-black text-white">
                <DashboardNavbar />
            </div>
            <div className="grid lg:grid-cols-12 grid-cols-4">
                <div className="lg:col-span-2">
                    <div className="fixed top-10 left-0 z-50 mt-12">
                        <SideNavBar></SideNavBar>
                    </div>
                </div>
                <div className="lg:col-span-10 col-span-4 min-h-screen w-full ll bg-gray-100 mt-[70px] rounded-tl-3xl rounded-tr-3xl">
                    <div className="lg:mx-[30px] mx-4 mt-4"
                    >
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;