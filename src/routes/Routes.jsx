import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";
import Verified from "../pages/verified/Verified";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: (
      <p className="text-center min-h-screen">Something went wrong!</p>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/verify-user",
    element: <Verified />,
  },
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    path: "/reset-password",
    element: <ForgetPassword />,
  },
]);

export default router;
