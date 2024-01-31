import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import OrderTab from "../../../components/frontend/ui/order/OrderTab";
import ChangePassword from "./ChangePassword";
import { getCookie } from "../../../utils/cookie-storage";
import Header from "../../../shared/header/Header";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("order");
  const navigate = useNavigate();

  // const { data: informations = [], refetch } = useQuery({
  //   queryKey: [`/api/v1/getMe/${user?.phone}`],
  //   queryFn: async () => {
  //     const res = await fetch(`${BASE_URL}/getMe/${user?.phone}`);
  //     const data = await res.json();
  //     return data;
  //   },
  // }); // get USER INFO

  useEffect(() => {
    const getData = getCookie("user");
    if (getData) {
      const userData = JSON.parse(getData);
      setUser(userData);
    }
  }, []);

  if (!user) {
    return navigate("/all");
  }

  return (
    <>
      <div className="sticky top-0 bg-primaryColor z-30">
        <Header />
      </div>
      <section className="bg-white shadow">
        <nav
          className="w-full md:w-[768px] mx-auto flex justify-center gap-6 border-b"
          aria-label="Tabs"
        >
          <button
            onClick={() => setActive("profile")}
            className={`shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-b hover:border-b-success-400 ${
              active === "profile" && "border-b-success-400"
            }`}
          >
            My Profile
          </button>

          <button
            onClick={() => setActive("order")}
            className={`shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-b hover:border-b-success-400 ${
              active === "order" && "border-b-success-400"
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
      <section className="my-5 px-2">
        {active === "profile" && (
          <div className="w-full md:w-[768px] mx-auto bg-textColor px-5 py-10 rounded-md">
            <UserForm user={user} setUser={setUser} />
          </div>
        )}
        {/* {active === "change-password" && (
          <div className="w-full md:w-[768px] mx-auto">
            <ChangePassword user={user} />
          </div>
        )} */}

        {active === "order" && (
          <div className="w-full md:w-[1024px] mx-auto">
            <OrderTab user={user} setActive={setActive} />
          </div>
        )}
      </section>
    </>
  );
};

export default UserDashboard;
