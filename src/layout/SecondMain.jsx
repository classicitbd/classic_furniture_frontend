import { Outlet } from "react-router-dom";
import Footer from "../shared/footer/Footer";
import Header from "../shared/header/Header";

const SecondMain = () => {
  return (
    <>
      <header className="sticky top-0 bg-primaryColor z-30">
        <Header />
      </header>
      <Outlet />
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default SecondMain;
