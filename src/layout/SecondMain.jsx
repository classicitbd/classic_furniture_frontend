import { Outlet } from "react-router-dom";
import Footer from "../shared/footer/Footer";
import Header from "../shared/header/Header";
import BottomHeader from "../shared/header/BottomHeader";

const SecondMain = () => {
  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <div className="pt-4">
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

export default SecondMain;
