import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/footer/Footer";
import Header from "../shared/header/Header";
import BottomHeader from "../shared/header/BottomHeader";
import TopHeader from "../shared/header/TopHeader";

const SecondMain = () => {

  const usePathname = useLocation();
  const pathname = usePathname?.pathname;

  return (
    <>
      {
        pathname == '/' &&
        <div className="hidden lg:block">
          <TopHeader />
        </div>
      }
      <div className="sticky top-0 z-50 bg-white">
        <div className="lg:pt-4 pt-0">
          <Header />
        </div>
        <div className="hidden lg:block">
          <BottomHeader />
        </div>
      </div>
      <div className="min-h-screen bg-[#F2F4F8] scrollbar-hide">
        {" "}
        <Outlet />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default SecondMain;
