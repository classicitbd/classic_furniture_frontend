import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import AddCategory from "../../../components/dashboard/category/AddCategory";
import CategoryTable from "../../../components/dashboard/category/CategoryTable";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";

const Category = () => {

    const { data: categoryTypes = [], isLoading, refetch } = useQuery({
        queryKey: ['/api/v1/category'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/category`)
            const data = await res.json();
            return data;
        }
    }) // get Category type

    return (
        <>
            {/* Category Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Category</h3>
                <div className="flex items-center gap-2">
                    <Link to='/dashboard'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/dashboard/category'><p className="font-semibold">Category</p></Link>
                </div>
            </div>

            {/* Add Category Type*/}
            <AddCategory refetch={refetch} isLoading={isLoading} />

            {/* delete and update And Show In Table  */}
            <CategoryTable categoryTypes={categoryTypes} isLoading={isLoading} refetch={refetch} />

        </>
    );
};

export default Category;