import { FaBars, FaUserCircle } from "react-icons/fa";
import { useContext, useRef, useState } from "react";
import logo from "../../assets/dashboard/logo.png";
import SideNavbarMenuItem from "../sideNavBar/SideNavbarMenuItem";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const DashboardNavbar = () => {
  const { user } = useContext(AuthContext);

  const [sidebarShow, setSidebarShow] = useState(false);
  const sidebarRef = useRef(null);

  return (
    <div className="bg-black p-4">
      <div className="lg:flex lg:items-center lg:gap-[50px]">
        <div className="flex justify-between items-center w-full">
          {/* show for mobile device bars */}
          <div className="flex items-center gap-[20px] lg:hidden">
            {/* menubar */}
            <div
              className="relative cursor-pointer"
              onClick={() => setSidebarShow(!sidebarShow)}
              ref={sidebarRef}
            >
              <FaBars className="text-white cursor-pointer text-[24px]" />
              <div
                className={
                  sidebarShow
                    ? "-left-5 absolute top-full mt-6 duration-300"
                    : "-left-96 absolute top-full mt-6 duration-300"
                }
              >
                <div className="min-w-[200px] h-full z-50 shadow-xl py-[20px] px-[15px] bg-white text-black border-r border-[#f4f4f4]">
                  <SideNavbarMenuItem />
                </div>
              </div>
            </div>
          </div>

          {/* Logo  hidden in mobile device*/}
          <div className="hidden md:flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          {/* profile */}
          <div className="lg:flex lg:items-center lg:gap-[10px] mr-0 lg:mr-[24px]">
            <div className="cursor-pointer">
              <FaUserCircle size={35} />
            </div>
            <div className="w-[170px] h-[40px] hidden lg:block">
              <h2 className="text-white text-sm font-semibold">{user?.name}</h2>
              <p className="text-white text-sm font-normal">{user?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
