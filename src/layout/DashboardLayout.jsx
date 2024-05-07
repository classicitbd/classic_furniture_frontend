import { Outlet } from "react-router-dom";
import SideNavBar from "../shared/sideNavBar/SideNavBar";
import DashboardNavbars from "../shared/Navbar/DashboardNavbars";
import { useState } from "react";

const DashboardLayout = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMinibarOpen, setMinibarOpen] = useState(false);

    return (

        <div className="flex h-screen">
            <div
                className={`hidden lg:block max-h-screen transition-all overflow-hidden overflow-y-auto scrollbar-thin duration-300 ease-in-out bg-white ${isSidebarOpen ? "w-64" : "w-0"
                    }`}
            >
                <SideNavBar />
            </div>
            {/* ------ mobile menu ------ start */}
            <div
                className={`h-screen w-10/12 sm:w-4/12 fixed inset-y-0 left-0 z-50 bg-bgray-50 overflow-y-auto transition-transform duration-500 transform ${isMinibarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-screen flex-col justify-between border-e">
                    <SideNavBar />
                </div>
            </div>
            {/* ------ mobile menu ------ end */}

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navigation */}
                <header className="shadow border-b border-gray-300 bg-[#FFFFFF]">
                    {/* Top navigation content goes here */}
                    <DashboardNavbars
                        setSidebarOpen={setSidebarOpen}
                        isSidebarOpen={isSidebarOpen}
                        isMinibarOpen={isMinibarOpen}
                        setMinibarOpen={setMinibarOpen}
                    />
                </header>

                {/* Main content area */}
                <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 max-h-[120vh] bg-gray-200">
                    {/* Page content goes here */}
                    <Outlet />
                </div>
            </div>
        </div>

    );
};

export default DashboardLayout;