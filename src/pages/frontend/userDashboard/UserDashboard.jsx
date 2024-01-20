import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import UserForm from "./UserForm";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import OrderTab from "../../../components/frontend/ui/order/OrderTab";
import ChangePassword from "./ChangePassword";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [active, setActive] = useState("order");

  const { data: informations = [], refetch } = useQuery({
    queryKey: [`/api/v1/getMe/${user?.email}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/getMe/${user?.email}`);
      const data = await res.json();
      return data;
    },
  }); // get USER INFO

  return (
    <div className="">
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
          <button
            onClick={() => setActive("change-password")}
            className={`shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-b hover:border-b-success-400 ${
              active === "change-password" && "border-b-success-400"
            }`}
          >
            Change Password
          </button>
        </nav>
      </section>
      <section className="my-5">
        {active === "profile" && (
          <div className="w-full md:w-[768px] mx-auto">
            <UserForm user={informations?.data} refetch={refetch} />
          </div>
        )}
        {active === "change-password" && (
          <div className="w-full md:w-[768px] mx-auto">
            <ChangePassword user={user} />
          </div>
        )}

        {active === "order" && (
          <div className="w-full md:w-[1024px] mx-auto">
            <OrderTab user={user} setActive={setActive} />
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
