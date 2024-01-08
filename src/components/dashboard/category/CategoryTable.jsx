/* eslint-disable no-irregular-whitespace */
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import { toast } from "react-toastify";
import { useDeleteCategoryMutation } from "../../../redux/feature/category/categoryApi";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { MdDeleteForever } from "react-icons/md";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { useState } from "react";
import UpdateCategory from "./UpdateCategory";
import { FiEdit } from "react-icons/fi";

const CategoryTable = () => {

    const [categoryUpdateModal, setCategoryUpdateModal] = useState(false);
    const [categoryUpdateModalValue, setCategoryUpdateModalValue] = useState(false);

    const { data: categoryTypes = [], isLoading, refetch } = useQuery({
        queryKey: ['/api/v1/category'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/category`)
            const data = await res.json();
            return data;
        }
    }) // get Category type
    
    // delete a Category
    const handleDeleteCategory = (category) => {
        deleteCategoryType(category).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Category Delete successfully !", {
                    autoClose: 1000
                });
                refetch();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }

    const [deleteCategoryType] = useDeleteCategoryMutation();  //delete Category type

    if (isLoading) {
        <BigSpinner />
    }

    const updateCategoryModal = (category) =>{
        setCategoryUpdateModal(true);
        setCategoryUpdateModalValue(category)
    }


    return (
        <div>
            {/* Table for showing data */}
                    {
    categoryTypes?.data?.length > 0 ?
<div className="mt-5 overflow-x-auto rounded">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                Type Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                Menu Name
              </th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {categoryTypes?.data?.map((category) => (
              <tr key={category?._id}>
                <td className="whitespace-nowrap px-4 py-2 font-semibold">
                  {category?.category}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-semibold">
                  {category?.menuId?.menu}
                </td>
                <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    <MdDeleteForever onClick={() =>handleDeleteCategory(category)} className='cursor-pointer text-red-500 hover:text-red-300' size={25} />
                    <FiEdit onClick={() =>updateCategoryModal(category)} className='cursor-pointer text-gray-500 hover:text-gray-300' size={25} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
:
<NoDataFound />
}
{/* Update Category */}
            {
                categoryUpdateModal && <UpdateCategory setCategoryUpdateModal={setCategoryUpdateModal} categoryUpdateModalValue={categoryUpdateModalValue} refetch={refetch} />
            }
        </div>
    );
};

export default CategoryTable;