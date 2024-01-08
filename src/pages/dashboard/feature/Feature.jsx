import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import AddFeature from "../../../components/dashboard/featurte/AddFeature";
import FeatureTable from "../../../components/dashboard/featurte/FeatureTable";

const Feature = () => {

    const { data: features = [], isLoading, refetch } = useQuery({
        queryKey: ['/api/v1/feature'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/feature`)
            const data = await res.json();
            return data;
        }
    }) // get Feature type

    return (
        <>
            {/* Feature Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Feature</h3>
                <div className="flex items-center gap-2">
                    <Link to='/dashboard'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/dashboard/feature'><p className="font-semibold">Feature</p></Link>
                </div>
            </div>

            {/* Add Feature Type And Show In Table */}
            <AddFeature refetch={refetch} />

            {/* update delete and show deails in table */}
            <FeatureTable features={features} isLoading={isLoading} refetch={refetch} />

        </>
    );
};

export default Feature;