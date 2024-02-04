import { Outlet } from "react-router-dom";
import Footer from "../shared/footer/Footer";

const Main = () => {
  return (
    <>
      <Outlet />
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Main;
