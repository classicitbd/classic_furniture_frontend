import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import BannerImage from "../../../components/dashboard/banner/BannerImage";
import BannerTable from "../../../components/dashboard/banner/BannerTable";

const Banner = () => {

    const { data: banners = [], isLoading, refetch } = useQuery({
        queryKey: ['/api/v1/banner'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/banner`)
            const data = await res.json();
            return data;
        }
    }) // get all Banner

    if (isLoading) {
        return <BigSpinner />
    }

    return (
        <>
            {/* Banner Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Banner</h3>
                <div className="flex items-center gap-2">
                    <Link to='/istiak'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/istiak/nanner'><p className="font-semibold">Banner</p></Link>
                </div>
            </div>

            {/* Show Banner */}
            <BannerImage banners={banners} />

            {/* Show all image in a table */}
            <BannerTable banners={banners} refetch={refetch} />

        </>
    );
};

export default Banner;