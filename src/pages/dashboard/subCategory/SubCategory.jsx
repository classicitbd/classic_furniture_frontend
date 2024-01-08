import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import AddSubCategory from "../../../components/dashboard/subCategory/AddSubCategory";
import SubCategoryTable from "../../../components/dashboard/subCategory/SubCategoryTable";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";

const SubCategory = () => {

    const { data: subCategoryTypes = [], isLoading, refetch } = useQuery({
        queryKey: ['/api/v1/sub_category'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/sub_category`)
            const data = await res.json();
            return data;
        }
    }) // get Sub Category type

    return (
        <>
            {/* Sub Category Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Sub Category</h3>
                <div className="flex items-center gap-2">
                    <Link to='/dashboard'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/dashboard/sub_category'><p className="font-semibold">Sub Category</p></Link>
                </div>
            </div>

            {/* Add Sub Category Type And Show In Table */}
            <AddSubCategory refetch={refetch} />

            {/* update delete and show deails in table */}
            <SubCategoryTable subCategoryTypes={subCategoryTypes} isLoading={isLoading} refetch={refetch} />

        </>
    );
};

export default SubCategory;