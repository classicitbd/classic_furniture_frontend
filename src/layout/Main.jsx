import { Outlet } from "react-router-dom";
import Footer from "../shared/footer/Footer";

const Main = () => {
  return (
    <>
      <header>
        <h1>This is my Header</h1>
      </header>
      <Outlet />
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Main;
