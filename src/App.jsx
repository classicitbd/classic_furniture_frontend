import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "./utils/baseURL";

function App() {
  const [favicon, setFavicon] = useState("");
  useEffect(() => {
    fetch(`${BASE_URL}/siteSetting`)
      .then((res) => res.json())
      .then((data) => {
        setFavicon(data?.data[0]?.favicon);
      });
  }, []);

  // effect to update favicon
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = favicon;
  }, [favicon]);

  useEffect(() => {
    var chatbox = document.getElementById("fb-customer-chat");
    chatbox.setAttribute("page_id", "");
    chatbox.setAttribute("attribution", "biz_inbox");
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
