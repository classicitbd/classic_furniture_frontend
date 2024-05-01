import { Outlet } from "react-router-dom";
import Footer from "../shared/footer/Footer";
import TopHeader from "../shared/header/TopHeader";
import Header from "../shared/header/Header";

const Main = () => {
  return (
    <>
      <div className="hidden lg:block">
        <TopHeader />
      </div>
      <div className="py-4"
      >
        <Header />
      </div>
      <Outlet />
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Main;
