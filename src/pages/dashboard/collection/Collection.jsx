import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import AddCollection from "../../../components/dashboard/collection/AddCollection";
import CollectionTable from "../../../components/dashboard/collection/collectionTable";

const Collection = () => {

    const { data: collections = [], isLoading, refetch } = useQuery({
        queryKey: ['/api/v1/collection'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/collection`)
            const data = await res.json();
            return data;
        }
    }) // get Collection type

    return (
        <>
            {/* Collection Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Collection</h3>
                <div className="flex items-center gap-2">
                    <Link to='/dashboard'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/dashboard/collection'><p className="font-semibold">Collection</p></Link>
                </div>
            </div>

            {/* Add Color Type And Show In Table */}
            <AddCollection refetch={refetch} />

            {/* update delete and show deails in table */}
            <CollectionTable collections={collections} isLoading={isLoading} refetch={refetch} />

        </>
    );
};

export default Collection;