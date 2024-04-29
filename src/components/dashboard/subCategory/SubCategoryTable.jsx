import { useDeleteSub_CategoryMutation } from "../../../redux/feature/subCategory/subCategoryApi";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { useState } from "react";
import UpdateSubCategory from "./UpdateSubCategory";
import { FiEdit } from "react-icons/fi";

const SubCategoryTable = ({ refetch, subCategoryTypes }) => {
  const [subCategoryUpdateModal, setSubCategoryUpdateModal] = useState(false);
  const [subCategoryUpdateModalValue, setSubCategoryUpdateModalValue] =
    useState(false);

  const [deleteSubCategoryType] = useDeleteSub_CategoryMutation(); //delete Sub Category type

  const updateSubCategoryModal = (subCategory) => {
    setSubCategoryUpdateModal(true);
    setSubCategoryUpdateModalValue(subCategory);
  };

  // delete a Sub Category
  const handleDeleteCategory = (category) => {
    deleteSubCategoryType(category).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Category Delete successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  return (
    <div>
      {/* Table for showing data */}
      {subCategoryTypes?.data?.length > 0 ? (
        <div className="mt-5 overflow-x-auto rounded">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Type Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Serial
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Category Name
                </th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {subCategoryTypes?.data?.map((subCategory) => (
                <tr key={subCategory?._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {subCategory?.sub_category_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {subCategory?.sub_category_serial}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                    {subCategory?.sub_category_status}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {subCategory?.category_id?.category_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    <MdDeleteForever
                      onClick={() => handleDeleteCategory(subCategory)}
                      className="cursor-pointer text-red-500 hover:text-red-300"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => updateSubCategoryModal(subCategory)}
                      className="cursor-pointer text-gray-500 hover:text-gray-300"
                      size={25}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataFound />
      )}
      {/* Update Sub Category */}
      {subCategoryUpdateModal && (
        <UpdateSubCategory
          setSubCategoryUpdateModal={setSubCategoryUpdateModal}
          subCategoryUpdateModalValue={subCategoryUpdateModalValue}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default SubCategoryTable;
