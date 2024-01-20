import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import UserForm from "./UserForm";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import OrderTab from "../../../components/frontend/ui/order/OrderTab";

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
      <section className="hidden sm:block bg-white shadow">
        <nav
          className="w-[768px] mx-auto flex justify-center gap-6 border-b"
          aria-label="Tabs"
        >
          <button
            onClick={() => setActive("profile")}
            className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            My Profile
          </button>

          <button
            onClick={() => setActive("order")}
            className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            My Order
          </button>
        </nav>
      </section>
      <section className="my-5">
        {active === "profile" && (
          <div className="w-[768px] mx-auto">
            <UserForm user={informations?.data} refetch={refetch} />
          </div>
        )}

        {active === "order" && (
          <div className="w-[1280px] mx-auto">
            <OrderTab />
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
