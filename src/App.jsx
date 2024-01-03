import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import BigSpinner from "./shared/loader/BigSpinner";

function App() {
  return <RouterProvider router={router} fallbackElement={<BigSpinner />} />;
}

export default App;
