/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */
import { toast } from "react-toastify";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { MdDeleteForever } from "react-icons/md";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { useDeleteFeatureMutation } from "../../../redux/feature/feature/feature";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import UpdateFeature from "./UpdateFeature";

const FeatureTable = ({refetch, isLoading, features }) => {

  const [featureUpdateModal, setFeatureUpdateModal] = useState(false);
    const [featureUpdateModalValue, setSubCategoryUpdateModalValue] = useState(false);

    const [deleteFeature] = useDeleteFeatureMutation();  //delete Feature type

    if (isLoading) {
        <BigSpinner />
    }

    // delete a Feature
    const handleDeleteFeature = (feature) => {
        deleteFeature(feature).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Feature Delete successfully !", {
                    autoClose: 1000
                });
                refetch();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }

    const updateColorModal = (feature) =>{
        setFeatureUpdateModal(true);
        setSubCategoryUpdateModalValue(feature)
    }

    return (
        <div>
            {/* Table for showing data */}
                    {
    features?.data?.length > 0 ?
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
            {features?.data?.map((feature) => (
              <tr key={feature?._id}>
                <td className="whitespace-nowrap px-4 py-2 font-semibold">
                  {feature?.feature}
                </td>
                <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-end gap-4">
                    <MdDeleteForever onClick={() =>handleDeleteFeature(feature)} className='cursor-pointer text-red-500 hover:text-red-300' size={25} />
                    <FiEdit onClick={() =>updateColorModal(feature)} className='cursor-pointer text-gray-500 hover:text-gray-300' size={25} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
:
<NoDataFound />
}
{/* Update Feature */}
            {
                featureUpdateModal && <UpdateFeature setFeatureUpdateModal={setFeatureUpdateModal} featureUpdateModalValue={featureUpdateModalValue} refetch={refetch} />
            }
        </div>
    );
};

export default FeatureTable;