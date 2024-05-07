
import { CgProfile } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { BiSolidLeftArrowSquare } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const DashboardNavbars = ({
  isSidebarOpen,
  setSidebarOpen,
  setMinibarOpen,
  isMinibarOpen,
}) => {

  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-primaryColor border-l">
      <div className="pl-1 pr-3 lg:px-5">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="flex-shrink-0 mr-5 hidden lg:block"
            >
              {isSidebarOpen ? (
                <BiSolidLeftArrowSquare className="text-2xl text-white" />
              ) : (
                <IoMdClose className="text-2xl text-white" />
              )}
            </button>
          </div>

          <div className="shrink-0">
            <div className="flex items-center">
              <div className="relative ml-3">
                <div className="flex items-center gap-4">
                  <button
                    className="relative flex max-w-xs items-center rounded-full text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                  >
                    <CgProfile size={30} />
                  </button>
                  <div className="w-[170px] h-[40px] hidden lg:block">
                    <h2 className="text-white text-sm font-semibold">{user?.user_name}</h2>
                    <p className="text-white text-sm font-normal">{user?.user_phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex lg:hidden">
            <button
              type="button"
              onClick={() => setMinibarOpen(!isMinibarOpen)}
              className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-black hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {isMinibarOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbars;