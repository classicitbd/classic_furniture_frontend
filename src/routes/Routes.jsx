import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
// import Signup from "../pages/signup/Signup";
// import Signin from "../pages/signin/Signin";
import DashboardLayout from "../layout/DashboardLayout";
import HomePage from "../pages/dashboard/homePage/HomePage";
import Menu from "../pages/dashboard/menu/Menu";
// import Verified from "../pages/verified/Verified";

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
  // {
  //   path: "/sign-up",
  //   element: <Signup />,
  // },
  // {
  //   path: "/verify-user",
  //   element: <Verified />,
  // },
  // {
  //   path: "/sign-in",
  //   element: <Signin />,
  // },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: (
      <p className="text-center min-h-screen">Something went wrong!</p>
    ),
    children: [
      {
        path: "/dashboard",
        element: <HomePage />,
      },
      {
        path: "/dashboard/menu",
        element: <Menu />
      }
    ],
  }
]);

export default router;
