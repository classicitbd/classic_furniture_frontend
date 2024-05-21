import { useContext, useState } from "react";
import UserForm from "./UserForm";
import OrderTab from "../../../components/frontend/ui/order/OrderTab";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import Loader from "../../../shared/loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import ChangePassword from "./ChangePassword";

const UserDashboard = () => {
  const { user, loading } = useContext(AuthContext);

  const {
    data: userData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/getMe/${user?.user_phone}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/getMe/${user?.user_phone}`);
      const data = await res.json();
      return data;
    },
  });

  const [active, setActive] = useState("profile");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getData = getCookie("user");
  //   if (getData) {
  //     const userData = JSON.parse(getData);
  //     setUser(userData);
  //   }
  // }, []);

  if (isLoading || loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (!user) {
    return navigate("/sign-in");
  }
  return (
    <div className=" border-t mt-4">
      <section className="shadow bg-white">
        <nav
          className="w-full md:w-[768px] mx-auto flex justify-center gap-6 pb-3 pt-1.5 border-b"
          aria-label="Tabs"
        >
          <button
            onClick={() => setActive("profile")}
            className={`shrink-0 rounded-lg sm:px-2 py-2 px-1 text-[12px] sm:text-sm font-medium text-gray-600 hover:bg-[#DEF6EE]  duration-200 hover:text-gray-800 border-b hover:border-b-success-400 ${
              active === "profile" &&
              "border-b-success-400 text-primaryDeepColor bg-[#DEF6EE]"
            }`}
          >
            My Profile
          </button>
          <button
            onClick={() => setActive("change-password")}
            className={`shrink-0 rounded-lg sm:px-2 py-2 pl-1 text-[12px] sm:text-sm font-medium text-gray-500 hover:bg-[#DEF6EE] duration-200 hover:text-gray-700 border-b hover:border-b-success-400 ${
              active === "change-password" &&
              "border-b-success-400 text-primaryDeepColor bg-[#DEF6EE]"
            }`}
          >
            Change Password
          </button>

          <button
            onClick={() => setActive("order")}
            className={`shrink-0 rounded-lg sm:px-2 py-2 pl-1 text-[12px] sm:text-sm font-medium text-gray-600 hover:bg-[#DEF6EE] duration-200 hover:text-gray-800 border-b hover:border-b-success-400 ${
              active === "order" &&
              "border-b-success-400 text-primaryDeepColor bg-[#DEF6EE]"
            }`}
          >
            My Order
          </button>
        </nav>
      </section>
      <section className="my-5 px-2">
        {active === "profile" && (
          <div className="w-full md:w-[768px] mx-auto bg-textColor px-5 py-10 rounded-md">
            <UserForm user={userData?.data} refetch={refetch} />
          </div>
        )}
        {active === "change-password" && (
          <div className="w-full md:w-[768px] mx-auto">
            <ChangePassword user={userData?.data} setActive={setActive} />
          </div>
        )}

        {active === "order" && (
          <div className="es_container">
            <OrderTab user={userData?.data} setActive={setActive} />
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
