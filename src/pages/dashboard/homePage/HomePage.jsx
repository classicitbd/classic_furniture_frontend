
import { PiHouseBold } from "react-icons/pi";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { authKey } from "../../../constants/storageKey";
import BigSpinner from "../../../shared/loader/BigSpinner";
import DashboardTabs from "../../../components/dashboard/dashboard/DashboardTabs";
import YearSell from "../../../components/dashboard/dashboard/YearSell";
import ThisWeekSell from "../../../components/dashboard/dashboard/ThisWeekSell";
import MonthSell from "../../../components/dashboard/dashboard/MonthSell";
import { Link } from "react-router-dom";
import { getCookie } from "../../../utils/cookie-storage";

const HomePage = () => {
    // get token from local storage
    const token = getCookie(authKey);

    const { data: dashboardData = [], isLoading } = useQuery({
        queryKey: [`/api/v1/dashboard`],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/dashboard`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            return data;
        },
    }); // get all Child_category
    if (isLoading) {
        return <BigSpinner />;
    }
    return (
        <>
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Dashboard</h3>
                <Link to="/admin">
                    <p>
                        <PiHouseBold size={25} color="#000F24" />
                    </p>
                </Link>
            </div>

            {/* show all data  */}
            <DashboardTabs tabs={dashboardData?.data} />

            {/* Week sell chart and month sell chart */}
            <div className="grid md:grid-cols-12 grid-cols-1 gap-5 mt-4">
                <div className="md:col-span-7 bg-white border border-gray-300 rounded-lg">
                    <YearSell thisYearSellData={dashboardData?.data?.thisYearSellData} />
                </div>
                <div className="md:col-span-5 bg-white border border-gray-300 rounded-lg">
                    <ThisWeekSell
                        thisWeekSellData={dashboardData?.data?.thisWeekSellData}
                    />
                </div>
            </div>

            {/* Week sell chart and year sell chart */}
            <div className=" bg-white border border-gray-300 rounded-lg mt-6">
                <MonthSell thisMonthSellData={dashboardData?.data?.thisMonthSellData} />
            </div>
        </>
    );
};

export default HomePage;
