import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "./utils/baseURL";
import ChatIcon from "./components/common/chatIcon/ChatIcon";

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

  // useEffect(() => {
  //   window.fbAsyncInit = function () {
  //     window.FB.init({
  //       xfbml: true,
  //       version: "v10.0",
  //     });
  //   };

  //   (function (d, s, id) {
  //     var js,
  //       fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {
  //       return;
  //     }
  //     js = d.createElement(s);
  //     js.id = id;
  //     js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   })(document, "script", "facebook-jssdk");
  // }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
      {/* <div
        id="messenger-links"
        className="messenger-links fixed bottom-0 right-0"
      >
        <a
          title="Mobile"
          href="https://m.me/1967734639964391/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-facebook-messenger"></i>
        </a>
      </div> */}
      <div className="fixed bottom-4 right-4 text-white z-50">
        <a
          target="_blank"
          href="https://m.me/113419485028827"
          rel="noreferrer"
          className="flex items-center bg-white rounded-full p-2.5 shadow-md hover:bg-blue-100 transition duration-300 ease-in-out"
        >
          <ChatIcon />
        </a>
      </div>
    </>
  );
}

export default App;
