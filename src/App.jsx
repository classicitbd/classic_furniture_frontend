import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "./utils/baseURL";
import ChatIcon from "./components/common/chatIcon/ChatIcon";
import CallIcon from "./components/common/callIcon/CallIcon";
// import TabIcon from "./components/common/tabIcon/TabIcon";
import CallModal from "./components/common/modal/CallModal";

function App() {
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


  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />

      {/* <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-2">
        <div
          className={`transition-all duration-300 ease-in-out space-y-2 flex flex-col`}
        >
          <a
            target="_blank"
            href="https://m.me/113419485028827"
            rel="noreferrer"
            className="flex items-center justify-center bg-white rounded-full p-4 shadow-md hover:bg-blue-100 transition duration-300 ease-in-out"
          >
            <ChatIcon />
          </a>
          <button
            onClick={() => setOpenCallModal(true)}
            className="shrink-0 flex items-center justify-center bg-white rounded-full p-4 shadow-md hover:bg-blue-100 transition duration-300 ease-in-out"
          >
            <CallIcon />
          </button>
        </div>
      </div>
      {openCallModal && (
        <CallModal phone={phone} setOpenCallModal={setOpenCallModal} />
      )} */}
    </>
  );
}

export default App;
