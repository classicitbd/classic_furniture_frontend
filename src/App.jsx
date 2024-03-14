import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "./utils/baseURL";
import ChatIcon from "./components/common/chatIcon/ChatIcon";
import CallIcon from "./components/common/callIcon/CallIcon";
import TabIcon from "./components/common/tabIcon/TabIcon";
import CallModal from "./components/common/modal/CallModal";

function App() {
  const [open, setOpen] = useState(true);
  const [openCallModal, setOpenCallModal] = useState(false);
  const [favicon, setFavicon] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    fetch(`${BASE_URL}/siteSetting`)
      .then((res) => res.json())
      .then((data) => {
        setFavicon(data?.data[0]?.favicon);
        setPhone(data?.data[0]?.emergency_contact);
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

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-2">
        <div
          className={`${
            open ? "scale-0" : "scale-100"
          } transition-all duration-300 ease-in-out space-y-2`}
        >
          <a
            target="_blank"
            href="https://m.me/113419485028827"
            rel="noreferrer"
            className="flex items-center justify-center bg-white rounded-full p-2 shadow-md hover:bg-blue-100 transition duration-300 ease-in-out"
          >
            <ChatIcon />
          </a>
          <a
            onClick={() => setOpenCallModal(true)}
            className="flex items-center justify-center bg-white rounded-full p-2 shadow-md hover:bg-blue-100 transition duration-300 ease-in-out"
          >
            <CallIcon />
          </a>
        </div>

        <div>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center bg-white p-4 rounded-full shadow-md hover:bg-blue-100 transition duration-300 ease-in-out"
          >
            <TabIcon />
          </button>
        </div>
      </div>
      {openCallModal && (
        <CallModal phone={phone} setOpenCallModal={setOpenCallModal} />
      )}
    </>
  );
}

export default App;
