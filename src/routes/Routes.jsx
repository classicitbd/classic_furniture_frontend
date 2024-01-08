import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import DashboardLayout from "../layout/DashboardLayout";
import HomePage from "../pages/dashboard/homePage/HomePage";
import Menu from "../pages/dashboard/menu/Menu";
import Category from "../pages/dashboard/category/Category";
import SubCategory from "../pages/dashboard/subCategory/SubCategory";
import Color from "../pages/dashboard/color/Color";
import Collection from "../pages/dashboard/collection/Collection";
import Feature from "../pages/dashboard/feature/Feature";
import Style from "../pages/dashboard/style/Style";

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
      },
      {
        path: "/dashboard/category",
        element: <Category />
      },
      {
        path: "/dashboard/sub_category",
        element: <SubCategory />
      },
      {
        path: "/dashboard/color",
        element: <Color />
      },
      {
        path: "/dashboard/collection",
        element: <Collection />
      },
      {
        path: "/dashboard/feature",
        element: <Feature />
      },
      {
        path: "/dashboard/style",
        element: <Style />
      },
    ],
  }
]);

export default router;
