// import { MdDeleteForever } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { CiSquarePlus } from "react-icons/ci";
import { useState } from "react";
import { toast } from "react-toastify";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { useDeleteBannerMutation } from "../../../redux/feature/banner/bannerApi";
import AddBanner from "./AddBanner";
import UpdateBanner from "./UpdateBanner";
import { Link } from "react-router-dom";
import Pagination from "../../../shared/pagination/Pagination";
import { BiSearch } from "react-icons/bi";

const BannerTable = ({ banners, refetch, setRows, setPage, rows, page, setSearchTerm }) => {
    const [addBannerModalOpen, setAddBannerModalOpen] = useState(false);
    const [bannerUpdateModal, setBannerUpdateModal] = useState(false);
    const [bannerUpdateModalValue, setBannerUpdateModalValue] = useState("");

    const [deleteBanner] = useDeleteBannerMutation(); //delete banner type

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            setSearchTerm(e.target.value);
        }
    };

    const updatebannerModal = (banner) => {
        setBannerUpdateModal(true);
        setBannerUpdateModalValue(banner);
    };

    // delete a banner
    const handleDeleteBanner = (banner) => {
        const sendData = {
            _id: banner?._id,
            image_key: banner?.image_key,
        };
        deleteBanner(sendData).then((result) => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(
                    result?.data?.message
                        ? result?.data?.message
                        : "banner Delete successfully !",
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
        <div className="my-12">
            <div className="flex items-center justify-between mb-8 ">
                <h1 className="font-semiboldunderline md:text-2xl text-xl underline">
                    Manage your Banner
                </h1>
                <button
                    onClick={() => setAddBannerModalOpen(!addBannerModalOpen)}
                    className="btn bg-sky-500 hover:bg-sky-300 px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2"
                >
                    Add <CiSquarePlus className="text-gray-300" size={20} />{" "}
                </button>
            </div>

            {/* Search and create */}
            <div className="flex items-center justify-end my-5 gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-[#E7E7E7] bg-gray-50 px-[5px] py-2">
                    <BiSearch className="text-[#717171]" size={20} />
                    <input
                        onKeyDown={(e) => handleSearch(e)}
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-50 bg-none w-full outline-none text-[14px] font-semibold placeholder-[#717171]"
                    />
                </div>
            </div>
            {/* Table for showing data */}
            {banners?.data?.length > 0 ? (
                <div className="mt-5 overflow-x-auto rounded">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                    Image
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                    Title
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                    Path
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                    Serial
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                    Status
                                </th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {banners?.data?.map((banner) => (
                                <tr key={banner?._id}>
                                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                                        <img
                                            src={banner?.banner_image}
                                            alt={banner.banner_title}
                                            className="w-28 h-20"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                                        {banner?.banner_title}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                                        <Link to={banner?.banner_path}>{banner?.banner_path}</Link>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                                        {banner?.banner_serial}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                                        {banner?.banner_status}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4 mt-4">
                                        <MdDeleteForever
                                            onClick={() => handleDeleteBanner(banner)}
                                            className="cursor-pointer text-red-500 hover:text-red-300"
                                            size={25}
                                        />
                                        <FiEdit
                                            onClick={() => updatebannerModal(banner)}
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

            <hr />

            {/* Pagination */}
            <Pagination
                rows={rows}
                page={page}
                setPage={setPage}
                setRows={setRows}
                totalData={banners?.totalData}
            />




            {addBannerModalOpen && (
                <AddBanner
                    setAddBannerModalOpen={setAddBannerModalOpen}
                    refetch={refetch}
                />
            )}
            {/* Update Banner */}
            {bannerUpdateModal && (
                <UpdateBanner
                    setBannerUpdateModal={setBannerUpdateModal}
                    bannerUpdateModalValue={bannerUpdateModalValue}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default BannerTable;