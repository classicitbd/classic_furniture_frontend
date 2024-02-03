import { Link } from "react-router-dom";
import { PiHouseBold } from "react-icons/pi";
import AddMenuType from "../../../components/dashboard/menuType/AddMenuType";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import MenuTable from "../../../components/dashboard/menuType/MenuTable";
import BigSpinner from "../../../shared/loader/BigSpinner";

const Menu = () => {

    const { data: menuTypes = [], isLoading, refetch } = useQuery({
        queryKey: ['/api/v1/menu'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/menu`)
            const data = await res.json();
            return data;
        }
    }) // get Menu type

    if (isLoading) {
        return <BigSpinner />;
    }

    return (
        <>
            {/* Menu Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Menu</h3>
                <div className="flex items-center gap-2">
                    <Link to='/istiak'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/istiak/menu'><p className="font-semibold">Menu</p></Link>
                </div>
            </div>

            {/* Add Menu Type */}
            <AddMenuType refetch={refetch} />

            {/* update and delete menu type And Show In Table */}
            <MenuTable menuTypes={menuTypes} isLoading={isLoading} refetch={refetch} />

        </>
    );
};

export default Menu;