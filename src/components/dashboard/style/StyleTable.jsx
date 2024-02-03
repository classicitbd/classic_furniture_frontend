import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { useDeleteStyleMutation } from "../../../redux/feature/style/styleApi";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import UpdateStyle from "./UpdateStyle";

const FeatureTable = ({ refetch, styles }) => {
  const [styleUpdateModal, setStyleUpdateModal] = useState(false);
  const [styleUpdateModalValue, setStyleUpdateModalValue] = useState(false);

  const [deleteStyle] = useDeleteStyleMutation(); //delete Style type

  // delete a Style
  const handleDeleteStyle = (style) => {
    deleteStyle(style).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Feature Delete successfully !",
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

  const updateColorModal = (feature) => {
    setStyleUpdateModal(true);
    setStyleUpdateModalValue(feature);
  };

  return (
    <div>
      {/* Table for showing data */}
      {styles?.data?.length > 0 ? (
        <div className="mt-5 overflow-x-auto rounded">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Feature Name
                </th>
                <th className="px-4 py-2 text-end">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {styles?.data?.map((style) => (
                <tr key={style?._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {style?.style}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-end gap-4">
                    <MdDeleteForever
                      onClick={() => handleDeleteStyle(style)}
                      className="cursor-pointer text-red-500 hover:text-red-300"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => updateColorModal(style)}
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
      {/* Update Style */}
      {styleUpdateModal && (
        <UpdateStyle
          setStyleUpdateModal={setStyleUpdateModal}
          styleUpdateModalValue={styleUpdateModalValue}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default FeatureTable;
