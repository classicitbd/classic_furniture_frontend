import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import AddColor from "../../../components/dashboard/color/AddColor";
import ColorTable from "../../../components/dashboard/color/ColorTable";
import BigSpinner from "../../../shared/loader/BigSpinner";

const Color = () => {

    const { data: colors = [], isLoading, refetch } = useQuery({
        queryKey: ['/api/v1/color'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/color`)
            const data = await res.json();
            return data;
        }
    }) // get Color type

    if (isLoading) {
        return <BigSpinner />
    }

    return (
        <>
            {/* Color Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Color</h3>
                <div className="flex items-center gap-2">
                    <Link to='/admin'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/admin/color'><p className="font-semibold">Color</p></Link>
                </div>
            </div>

            {/* Add Color Type And Show In Table */}
            <AddColor refetch={refetch} />

            {/* update delete and show deails in table */}
            <ColorTable colors={colors} refetch={refetch} />

        </>
    );
};

export default Color;