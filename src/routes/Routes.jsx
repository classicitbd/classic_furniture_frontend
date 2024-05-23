import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Category from "../pages/dashboard/category/Category";
import SubCategory from "../pages/dashboard/subCategory/SubCategory";
import Color from "../pages/dashboard/color/Color";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";
import Verified from "../pages/verified/Verified";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword";
import NewPassword from "../pages/newPassword/NewPassword";
import Home from "../pages/frontend/home/Home";
import Slider from "../pages/dashboard/slider/Slider";
import ProductList from "../pages/dashboard/product/productList/ProductList";
import ProductCreate from "../pages/dashboard/product/productCreate/ProductCreate";
import Customer from "../pages/dashboard/customer/Customer";
import Order from "../pages/dashboard/order/Order";
import CheckoutPage from "../pages/frontend/checkout/CheckoutPage";
import NotFound from "../shared/notFound/NotFound";
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
import SecondMain from "../layout/SecondMain";
import PrivacyPolicyPage from "../pages/frontend/privacypolicy/PrivacyPolicyPage";
import TermAndConditionPage from "../pages/frontend/termandconditions/TermAndConditionPage";
import CancellationPolicyPage from "../pages/frontend/cancellationPolicy/CancellationPolicyPage";
import RefundPolicyPage from "../pages/frontend/refundPolicy/RefundPolicy";
import PrivateRoute from "./privateRoute/PrivateRoute";
import PrivateDashboardRoute from "./privateDashboardRoute/PrivateDashboardRoute";
import AllProducts from "../pages/frontend/allProducts/AllProducts";
import Youtube from "../pages/dashboard/youtube/Youtube";
import ProductYoutubeVideoPage from "../pages/frontend/productYoutubeVideo/ProductYoutubeVideoPage";
import ProductDetailsPage from "../pages/frontend/details/ProductDetailsPage";
import OrderTracking from "../pages/frontend/order_tracking/OrderTracking";
import OrderTrackingDetails from "../pages/frontend/orderTrackingDetails/OrderTrackingDetails";
import PaymentSuccess from "../pages/frontend/payment-success/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SecondMain />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:slug",
        element: <ProductDetailsPage />,
      },
      {
        path: "/all",
        element: <AllProducts />,
      },
      {
        path: "/product-video",
        element: <ProductYoutubeVideoPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/order-success/:tranId",
        element: <SuccessPage />,
      },
      {
        path: "/payment-fail/:tranId",
        element: <FailPage />,
      },
      {
        path: "/payment-success/:tranId",
        element: <PaymentSuccess />,
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
        path: "/materials-care",
        element: <MaterialAndCarePage />,
      },
      {
        path: "/about-us",
        element: <AboutusPage />,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicyPage />,
      },
      {
        path: "/cancellation-policy",
        element: <CancellationPolicyPage />,
      },
      {
        path: "/term-&-condition",
        element: <TermAndConditionPage />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/return-policy",
        element: <ReturnExchangePage />,
      },
      {
        path: "/order-tracking",
        element: <OrderTracking />,
      },
      {
        path: "/order-tracking-details",
        element: <OrderTrackingDetails />,
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
    path: "/admin",
    element: (
      <PrivateRoute>
        <PrivateDashboardRoute>
          <DashboardLayout />
        </PrivateDashboardRoute>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/admin",
        element: <HomePage />,
      },
      {
        path: "/admin/order",
        element: <Order />,
      },
      {
        path: "/admin/slider",
        element: <Slider />,
      },
      {
        path: "/admin/banner",
        element: <Banner />,
      },
      {
        path: "/admin/category",
        element: <Category />,
      },
      {
        path: "/admin/sub_category",
        element: <SubCategory />,
      },
      {
        path: "/admin/color",
        element: <Color />,
      },
      {
        path: "/admin/product",
        element: <ProductList />,
      },
      {
        path: "/admin/product/create",
        element: <ProductCreate />,
      },
      {
        path: "/admin/customer",
        element: <Customer />,
      },
      {
        path: "/admin/video_tab",
        element: <Youtube />,
      },
      {
        path: "/admin/setting",
        element: <SiteSetting />,
      },
    ],
  },
]);

export default router;
