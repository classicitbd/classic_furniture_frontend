import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import BigSpinner from "./shared/loader/BigSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<BigSpinner />} />
      <ToastContainer />
    </>
  );
}

export default App;
