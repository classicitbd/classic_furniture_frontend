import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import LogoVidio from "../../../components/dashboard/setting/LogoVidio";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import BigSpinner from "../../../shared/loader/BigSpinner";
import StoreDetails from "../../../components/dashboard/setting/StoreDetails";
import AboutUs from "../../../components/dashboard/setting/AboutUs";
import InformationUpdate from "../../../components/dashboard/setting/InformationUpdate";

const SiteSetting = () => {

    const { data: settings = [], isLoading, refetch } = useQuery({
        queryKey: [`/api/v1/siteSetting`],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/siteSetting`)
            const data = await res.json();
            return data;
        }
    }) // get Site Settings
    
    if (isLoading){
       return <BigSpinner />
    }

    const initialData = settings?.data[0]

    return (
        <>

            {/* Site setting navbar */}

            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Site Seeting</h3>
                <div className="flex items-center gap-2">
                    <Link to='/istiak'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/istiak/seeting'><p className="font-semibold">Site Seeting</p></Link>
                </div>
            </div>

            <div className="md:mt-10 mt-8 bg-white">
                <div className="p-5">
                    <h4 className="font-semibold text-[20px] mt-2">Software Information</h4>
                    <hr className="mt-2 mb-4" />
                    <LogoVidio refetch={refetch} initialData={initialData} />
                </div>
            </div>

            <div className="md:mt-10 mt-8 bg-white">
                <div className="p-5">
                    <h4 className="font-semibold text-[20px] mt-2">Store Information</h4>
                    <hr className="mt-2 mb-4" />
                    <StoreDetails refetch={refetch} initialData={initialData} />
                </div>
            </div>

            <div className="md:mt-10 mt-8 bg-white mb-8">
                <div className="p-5">
                    <h4 className="font-semibold text-[20px] mt-2">Our Story</h4>
                    <hr className="mt-2 mb-4" />
                    <AboutUs refetch={refetch} initialData={initialData} />
                </div>
            </div>

            <div className="md:mt-10 mt-8 bg-white mb-8">
                <div className="p-5">
                    <h4 className="font-semibold text-[20px] mt-2">Update Information</h4>
                    <hr className="mt-2 mb-4" />
                    <InformationUpdate refetch={refetch} initialData={initialData} />
                </div>
            </div>

        </>
    );
};

export default SiteSetting;