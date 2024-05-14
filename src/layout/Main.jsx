import { Outlet } from "react-router-dom";
import Footer from "../shared/footer/Footer";
import TopHeader from "../shared/header/TopHeader";
import Header from "../shared/header/Header";
import BottomHeader from "../shared/header/BottomHeader";

const Main = () => {
  return (
    <>
      <div className="hidden lg:block">
        <TopHeader />
      </div>
      <div className="sticky top-0 z-50 bg-white">
        <div className="lg:pt-4 pt-0">
          <Header />
        </div>
        <div className="hidden lg:block">
          <BottomHeader />
        </div>
      </div>
      <div className="min-h-screen bg-[#F2F4F8]">
        {" "}
        <Outlet />
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Main;
