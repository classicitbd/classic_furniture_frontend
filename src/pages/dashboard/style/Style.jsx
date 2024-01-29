import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import AddStyle from "../../../components/dashboard/style/AddStyle";
import StyleTable from "../../../components/dashboard/style/StyleTable";

const Style = () => {

    const { data: styles = [], isLoading, refetch } = useQuery({
        queryKey: ['/api/v1/style'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/style`)
            const data = await res.json();
            return data;
        }
    }) // get Style type

    return (
        <>
            {/* Style Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Style</h3>
                <div className="flex items-center gap-2">
                    <Link to='/istiak'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/istiak/style'><p className="font-semibold">Style</p></Link>
                </div>
            </div>

            {/* Add Style Type And Show In Table */}
            <AddStyle refetch={refetch} />

            {/* update delete and show deails in table */}
            <StyleTable styles={styles} isLoading={isLoading} refetch={refetch} />

        </>
    );
};

export default Style;