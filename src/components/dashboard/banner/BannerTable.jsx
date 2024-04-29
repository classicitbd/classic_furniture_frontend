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

const BannerTable = ({ banners, refetch }) => {
    const [addBannerModalOpen, setAddBannerModalOpen] = useState(false);
    const [bannerUpdateModal, setBannerUpdateModal] = useState(false);
    const [bannerUpdateModalValue, setBannerUpdateModalValue] = useState("");

    const [deleteBanner] = useDeleteBannerMutation(); //delete banner type

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
            {/* Table for showing data */}
            {banners?.data?.length > 0 ? (
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
                    {banners?.data?.map((banner) => (
                        <div
                            key={banner?._id}
                            className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md"
                        >
                            <img
                                className="object-cover w-full h-64"
                                src={banner?.banner_image}
                                alt="banner"
                            />

                            <h3 className="mt-2 text-2xl font-medium">{banner?.banner_title}</h3>
                            <div className="flex items-center justify-between mx-4 font-medium">
                                <p>Serial: {banner?.banner_serial}</p>
                                <p>Status: {banner?.banner_status}</p>
                            </div>
                            <p className="mt-2 ml-4">Path: <Link to={banner?.banner_path}>{banner?.banner_path}</Link></p>

                            <div className="p-6">
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <NoDataFound />
            )}
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