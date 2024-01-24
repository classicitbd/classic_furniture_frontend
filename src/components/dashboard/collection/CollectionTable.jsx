import { toast } from "react-toastify";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { MdDeleteForever } from "react-icons/md";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { useDeleteCollectionMutation } from "../../../redux/feature/collection/collectionApi";
import { useState } from "react";
import UpdateCollection from "./UpdateCollection";
import { FiEdit } from "react-icons/fi";

const CollectionTable = ({ refetch, isLoading, collections }) => {
  const [subCategoryUpdateModal, setCollectionUpdateModal] = useState(false);
  const [collectionUpdateModalValue, setSubCategoryUpdateModalValue] =
    useState(false);

  const [deleteCollection] = useDeleteCollectionMutation(); //delete Collection type

  if (isLoading) {
    <BigSpinner />;
  }

  const updateCollectionModal = (collection) => {
    setCollectionUpdateModal(true);
    setSubCategoryUpdateModalValue(collection);
  };

  // delete a Collection
  const handleDeleteCollection = (collection) => {
    deleteCollection(collection).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Collection Delete successfully !",
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
      {collections?.data?.length > 0 ? (
        <div className="mt-5 overflow-x-auto rounded">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Collection Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Collection Image
                </th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {collections?.data?.map((collection) => (
                <tr key={collection?._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {collection?.collection_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    <img
                      src={collection?.collection_image}
                      alt={collection.collection_name}
                      className="w-12 rounded-full"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    <MdDeleteForever
                      onClick={() => handleDeleteCollection(collection)}
                      className="cursor-pointer text-red-500 hover:text-red-300"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => updateCollectionModal(collection)}
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
      {/* Update Collection */}
      {subCategoryUpdateModal && (
        <UpdateCollection
          setCollectionUpdateModal={setCollectionUpdateModal}
          collectionUpdateModalValue={collectionUpdateModalValue}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default CollectionTable;
