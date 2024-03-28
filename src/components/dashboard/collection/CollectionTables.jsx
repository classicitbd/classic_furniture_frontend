import { useState } from "react";
import { useDeleteCollectionMutation, useUpdateCollectionMutation } from "../../../redux/feature/collection/collectionApi";
import { toast } from "react-toastify";
import UpdateCollection from "./UpdateCollection";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";


const CollectionTables = ({ refetch, collections }) => {
    const [subCategoryUpdateModal, setCollectionUpdateModal] = useState(false);
    const [collectionUpdateModalValue, setSubCategoryUpdateModalValue] =
        useState(false);

    const [deleteCollection] = useDeleteCollectionMutation(); //delete Collection type

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

    const [updateCollectionStatusForMainPage] =
        useUpdateCollectionMutation(); //Update Collection status for explore

    const updateCollectionStatusForMainPageFalse = (_id, show_card) => {
        const sendData = {
            _id,
            show_card,
        };
        updateCollectionStatusForMainPage(sendData).then((result) => {
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

    const updateCollectionStatusForMainPageTrues = (_id, show_card) => {
        const sendData = {
            _id,
            show_card,
        };
        updateCollectionStatusForMainPage(sendData).then((result) => {
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
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                    Card Show
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
                                    {collection?.show_card == "active" ? (
                                        <td className="whitespace-nowrap px-4 py-2">
                                            <button
                                                onClick={() =>
                                                    updateCollectionStatusForMainPageFalse(
                                                        collection?._id,
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
                                                    updateCollectionStatusForMainPageTrues(
                                                        collection?._id,
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

export default CollectionTables;
