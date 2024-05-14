import { useContext, useEffect, useState } from "react";
import UserForm from "./UserForm";
import OrderTab from "../../../components/frontend/ui/order/OrderTab";
import { getCookie } from "../../../utils/cookie-storage";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [active, setActive] = useState("order");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getData = getCookie("user");
  //   if (getData) {
  //     const userData = JSON.parse(getData);
  //     setUser(userData);
  //   }
  // }, []);

  if (!user) {
    return navigate("/all");
  }

  return (
    <div className="bg-white border-t mt-4">
      <section className="shadow">
        <nav
          className="w-full md:w-[768px] mx-auto flex justify-center gap-6 pb-3 pt-1.5 border-b"
          aria-label="Tabs"
        >
          <button
            onClick={() => setActive("profile")}
            className={`shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-b hover:border-b-success-400 ${
              active === "profile" &&
              "border-b-success-400 text-primaryDeepColor"
            }`}
          >
            My Profile
          </button>

          <button
            onClick={() => setActive("order")}
            className={`shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-b hover:border-b-success-400 ${
              active === "order" && "border-b-success-400 text-primaryDeepColor"
            }`}
          >
            My Order
          </button>
          {/* <button
            onClick={() => setActive("change-password")}
            className={`shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-b hover:border-b-success-400 ${
              active === "change-password" && "border-b-success-400"
            }`}
          >
            Change Password
          </button> */}
        </nav>
      </section>
      {/* <section className="my-5 px-2">
        {active === "profile" && (
          <div className="w-full md:w-[768px] mx-auto bg-textColor px-5 py-10 rounded-md">
            <UserForm user={user} />
          </div>
        )}

        {active === "order" && (
          <div className="w-full md:w-[1024px] mx-auto">
            <OrderTab user={user} setActive={setActive} />
          </div>
        )}
      </section> */}
    </div>
  );
};

export default UserDashboard;
