/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */
import { toast } from "react-toastify";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { MdDeleteForever } from "react-icons/md";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { useDeleteColorMutation } from "../../../redux/feature/color/colorApi";

const ColorTable = ({refetch, isLoading, colors }) => {

    const [deleteColor] = useDeleteColorMutation();  //delete Color type

    if (isLoading) {
        <BigSpinner />
    }

    // delete a Color
    const handleDeleteColor = (color) => {
        deleteColor(color).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Color Delete successfully !", {
                    autoClose: 1000
                });
                refetch();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }

    return (
        <div>
            {/* Table for showing data */}
                    {
    colors?.data?.length > 0 ?
<div className="mt-5 overflow-x-auto rounded">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                Color Name
              </th>
              <th className="px-4 py-2 text-end">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {colors?.data?.map((color) => (
              <tr key={color?._id}>
                <td className="whitespace-nowrap px-4 py-2 font-semibold">
                  {color?.color}
                </td>
                <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-end">
                    <MdDeleteForever onClick={() =>handleDeleteColor(color)} className='cursor-pointer text-red-500 hover:text-red-300' size={25} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
:
<NoDataFound />
}

        </div>
    );
};

export default ColorTable;