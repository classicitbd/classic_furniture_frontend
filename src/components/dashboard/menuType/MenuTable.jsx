import UpdateMenuType from "./UpdateMenuType";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteMenuMutation } from "../../../redux/feature/menu/menuApi";
import NoDataFound from "../../common/noDataFound/NoDataFound";
// import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from "react-icons/fi";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { useState } from "react";
import { toast } from "react-toastify";

const MenuTable = ({ menuTypes, isLoading, refetch }) => {
  const [menuUpdateModal, setMenuUpdateModal] = useState(false);
  const [menuUpdateModalValue, setMenuUpdateModalValue] = useState(false);

  const [deleteMenuType] = useDeleteMenuMutation(); //delete Menu type

  if (isLoading) {
    <BigSpinner />;
  }

  const updateMenuModal = (menu) => {
    setMenuUpdateModal(true);
    setMenuUpdateModalValue(menu);
  };

  // delete a Menu
  const handleDeleteMenu = (menu) => {
    deleteMenuType(menu).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Menu Delete successfully !",
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
      {menuTypes?.data?.length > 0 ? (
        <div className="mt-5 overflow-x-auto rounded">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Type Name
                </th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {menuTypes?.data?.map((menu) => (
                <tr key={menu?._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {menu?.menu}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    <MdDeleteForever
                      onClick={() => handleDeleteMenu(menu)}
                      className="cursor-pointer text-red-500 hover:text-red-300"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => updateMenuModal(menu)}
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

      {/* Update menu */}
      {menuUpdateModal && (
        <UpdateMenuType
          setMenuUpdateModal={setMenuUpdateModal}
          menuUpdateModalValue={menuUpdateModalValue}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default MenuTable;
