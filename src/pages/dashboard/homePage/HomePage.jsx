import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import BigSpinner from "../../../shared/loader/BigSpinner";
import Tabs from "../../../components/dashboard/homePage/Tabs";
import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import WeekSell from "../../../components/dashboard/homePage/WeekSell";
import YearSell from "../../../components/dashboard/homePage/YearSell";

const HomePage = () => {

    const { data: datas = [], isLoading } = useQuery({
        queryKey: ['/api/v1/dashboard'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/dashboard`)
            const data = await res.json();
            return data;
        }
    }) // get dashboard type

    const data = datas?.data;

    const tabs = {
        allCustomerCount: data?.allCustomerCount,
        allProductCount: data?.allProductCount,
        todaySellCount: data?.todaySellCount,
        thisMonthSellCount: data?.thisMonthSellCount
    }

    if (isLoading){
       return <BigSpinner />
    }


    return (
        <div>

            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Dashboard</h3>
                <div className="flex items-center gap-2">
                    <Link to='/istiak'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/istiak'><p className="font-semibold">Dashboard</p></Link>
                </div>
            </div>

            {/* Tabs */}
            <Tabs tabs={tabs} />

            {/* Week sell chart and year sell chart */}
            <div className="grid md:grid-cols-12 grid-cols-1 gap-5 mt-4">
                <div className="md:col-span-7 bg-white border border-gray-300 rounded-lg">
                    <YearSell thisYearSellData={data?.thisYearSellData}  />
                </div>
                <div className="md:col-span-5 bg-white border border-gray-300 rounded-lg">
                    <WeekSell thisWeekSellData={data?.thisWeekSellData} />
                </div>
            </div>


        </div>
    );
};

export default HomePage;