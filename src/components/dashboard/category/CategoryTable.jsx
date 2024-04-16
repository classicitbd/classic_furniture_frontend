import { toast } from "react-toastify";
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../../redux/feature/category/categoryApi";
import { MdDeleteForever } from "react-icons/md";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { useState } from "react";
import UpdateCategory from "./UpdateCategory";
import { FiEdit } from "react-icons/fi";

const CategoryTable = ({ refetch, categoryTypes }) => {
  const [categoryUpdateModal, setCategoryUpdateModal] = useState(false);
  const [categoryUpdateModalValue, setCategoryUpdateModalValue] =
    useState(false);

  // delete a Category
  const handleDeleteCategory = (category) => {
    deleteCategoryType(category).then((result) => {
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

  const [deleteCategoryType] = useDeleteCategoryMutation(); //delete Category type


  const updateCategoryModal = (category) => {
    setCategoryUpdateModal(true);
    setCategoryUpdateModalValue(category);
  };

  const [updateCategoryStatusForMainPage] =
    useUpdateCategoryMutation(); //Update Category status for explore

  const updateCategoryStatusForMainPageFalse = (_id, show_card) => {
    const sendData = {
      _id,
      show_card,
    };
    updateCategoryStatusForMainPage(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Status Update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
      }
    });
  };

  const updateCategoryStatusForMainPageTrues = (_id, show_card) => {
    const sendData = {
      _id,
      show_card,
    };
    updateCategoryStatusForMainPage(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Status Update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
      }
    });
  };

  const updateCategoryStatusForMainTitleFalse = (_id, show_title) => {
    const sendData = {
      _id,
      show_title,
    };
    updateCategoryStatusForMainPage(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Status Update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
      }
    });
  };

  const updateCategoryStatusForMainTitleTrues = (_id, show_title) => {
    const sendData = {
      _id,
      show_title,
    };
    updateCategoryStatusForMainPage(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Status Update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
      }
    });
  };

  return (
    <div>
      {/* Table for showing data */}
      {categoryTypes?.data?.length > 0 ? (
        <div className="mt-5 overflow-x-auto rounded">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Type Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Image
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Menu Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Show Card
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Show Title
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
                    <img
                      src={category?.category_image}
                      alt={category.category}
                      className="w-12 rounded-full"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {category?.menuId?.menu}
                  </td>
                  {category?.show_card == "active" ? (
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        onClick={() =>
                          updateCategoryStatusForMainPageFalse(
                            category?._id,
                            "in-active"
                          )
                        }
                        className="btn bg-green-500 text-white border rounded-md px-2 py-1"
                      >
                        Select
                      </button>
                    </td>
                  ) : (
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        onClick={() =>
                          updateCategoryStatusForMainPageTrues(
                            category?._id,
                            "active"
                          )
                        }
                        className="btn bg-red-500 text-white border rounded-md px-2 py-1"
                      >
                        Selected ?
                      </button>
                    </td>
                  )}
                  {category?.show_title == "active" ? (
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        onClick={() =>
                          updateCategoryStatusForMainTitleFalse(
                            category?._id,
                            "in-active"
                          )
                        }
                        className="btn bg-green-500 text-white border rounded-md px-2 py-1"
                      >
                        Select
                      </button>
                    </td>
                  ) : (
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        onClick={() =>
                          updateCategoryStatusForMainTitleTrues(
                            category?._id,
                            "active"
                          )
                        }
                        className="btn bg-red-500 text-white border rounded-md px-2 py-1"
                      >
                        Selected ?
                      </button>
                    </td>
                  )}
                  <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    <MdDeleteForever
                      onClick={() => handleDeleteCategory(category)}
                      className="cursor-pointer text-red-500 hover:text-red-300"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => updateCategoryModal(category)}
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
      {/* Update Category */}
      {categoryUpdateModal && (
        <UpdateCategory
          setCategoryUpdateModal={setCategoryUpdateModal}
          categoryUpdateModalValue={categoryUpdateModalValue}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default CategoryTable;
