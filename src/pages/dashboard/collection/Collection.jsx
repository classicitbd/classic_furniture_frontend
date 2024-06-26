import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import AddCollection from "../../../components/dashboard/collection/AddCollection";
import BigSpinner from "../../../shared/loader/BigSpinner";
import CollectionTables from "../../../components/dashboard/collection/CollectionTables";

const Collection = () => {

    const { data: collections = [], isLoading, refetch } = useQuery({
        queryKey: ['/api/v1/collection'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/collection`)
            const data = await res.json();
            return data;
        }
    }) // get Collection type

    if (isLoading) {
        return <BigSpinner />;
    }

    return (
        <>
            {/* Collection Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Collection</h3>
                <div className="flex items-center gap-2">
                    <Link to='/admin'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/admin/collection'><p className="font-semibold">Collection</p></Link>
                </div>
            </div>

            {/* Add Color Type And Show In Table */}
            <AddCollection refetch={refetch} />

            {/* update delete and show deails in table */}
            <CollectionTables collections={collections} refetch={refetch} />

        </>
    );
};

export default Collection;