import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";

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
    path: "/sign-in",
    element: <Signin />,
  },
]);

export default router;
