import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import DashboardLayout from "../layout/DashboardLayout";
// import HomePage from "../pages/dashboard/homePage/HomePage";
import Menu from "../pages/dashboard/menu/Menu";
import Category from "../pages/dashboard/category/Category";
import SubCategory from "../pages/dashboard/subCategory/SubCategory";
import Color from "../pages/dashboard/color/Color";
import Collection from "../pages/dashboard/collection/Collection";
import Feature from "../pages/dashboard/feature/Feature";
import Style from "../pages/dashboard/style/Style";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";
import Verified from "../pages/verified/Verified";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import NewPassword from "../pages/newPassword/NewPassword";
import Home from "../pages/frontend/home/Home";
import Slider from "../pages/dashboard/slider/Slider";
import DetailsPage from "../pages/frontend/details/DetailsPage";
import ProductList from "../pages/dashboard/product/productList/ProductList";
import ProductCreate from "../pages/dashboard/product/productCreate/ProductCreate";
import Customer from "../pages/dashboard/customer/Customer";
import AllProducts from "../pages/frontend/allProducts/AllProducts";
import Order from "../pages/dashboard/order/Order";
import CheckoutPage from "../pages/frontend/checkout/CheckoutPage";
import NotFound from "../shared/notFound/NotFound";
import PrivateDashboardRoute from "./privateDashboardRoute/PrivateDashboardRoute";
import SiteSetting from "../pages/dashboard/setting/SiteSetting";
import SuccessPage from "../components/frontend/ui/successPage/SuccessPage";
import FailPage from "../components/frontend/ui/failPage/FailPage";
import HomePage from "../pages/dashboard/homePage/HomePage";
import UserDashboard from "../pages/frontend/userDashboard/UserDashboard";
import ContactPage from "../pages/frontend/contact/ContactPage";
import ShippingInfoPage from "../pages/frontend/shippingInfo/ShippingInfoPage";
import ReturnExchangePage from "../pages/frontend/returnExchangePage/ReturnExchangePage";
import MaterialAndCarePage from "../pages/frontend/materialAndCare/MaterialAndCarePage";
import AboutusPage from "../pages/frontend/aboutus/AboutusPage";
import Banner from "../pages/dashboard/banner/Banner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:slug",
        element: <DetailsPage />,
      },
      {
        path: "/all",
        element: <AllProducts />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/payment-success/:tranId",
        element: <SuccessPage />,
      },
      {
        path: "/payment-fail/:tranId",
        element: <FailPage />,
      },
      {
        path: "/user-profile",
        element: <UserDashboard />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/shipping-info",
        element: <ShippingInfoPage />,
      },
      {
        path: "/return-exchange",
        element: <ReturnExchangePage />,
      },
      {
        path: "/materials-care",
        element: <MaterialAndCarePage />,
      },
      {
        path: "/about-us",
        element: <AboutusPage />,
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
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <NewPassword />,
  },
  {
    path: "/istiak",
    element: (
      <PrivateDashboardRoute>
        <DashboardLayout />
      </PrivateDashboardRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/istiak",
        element: <HomePage />,
      },
      {
        path: "/istiak/order",
        element: <Order />,
      },
      {
        path: "/istiak/slider",
        element: <Slider />,
      },
      {
        path: "/istiak/banner",
        element: <Banner />,
      },
      {
        path: "/istiak/menu",
        element: <Menu />,
      },
      {
        path: "/istiak/category",
        element: <Category />,
      },
      {
        path: "/istiak/sub_category",
        element: <SubCategory />,
      },
      {
        path: "/istiak/color",
        element: <Color />,
      },
      {
        path: "/istiak/collection",
        element: <Collection />,
      },
      {
        path: "/istiak/feature",
        element: <Feature />,
      },
      {
        path: "/istiak/style",
        element: <Style />,
      },
      {
        path: "/istiak/slider",
        element: <Slider />,
      },
      {
        path: "/istiak/product",
        element: <ProductList />,
      },
      {
        path: "/istiak/product/create",
        element: <ProductCreate />,
      },
      {
        path: "/istiak/customer",
        element: <Customer />,
      },
      {
        path: "/istiak/setting",
        element: <SiteSetting />,
      },
    ],
  },
]);

export default router;
