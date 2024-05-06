import { MdDeleteForever } from "react-icons/md";
import Pagination from "../../../shared/pagination/Pagination";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { FaEye } from "react-icons/fa";
import { useDeleteVideoMutation } from "../../../redux/feature/video/videoApi";
import { toast } from "react-toastify";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";


const VideoTable = ({ youtubeVideo, refetch, rows, page, setRows, setPage }) => {

    const [deleteVideo] = useDeleteVideoMutation(); //delete Video

    // handle delete video
    const handleDeleteVideo = (video) => {
        const sendData = {
            _id: video?._id
        }
        deleteVideo(sendData).then((result) => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(
                    result?.data?.message
                        ? result?.data?.message
                        : "Video Delete successfully !",
                    {
                        autoClose: 1000,
                    }
                );
                refetch();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }

    const opts = {
        height: '150',
        width: '200'
    };

    return (
        <div>
            {/* Table for showing data */}
            {youtubeVideo?.data?.length > 0 ? (
                <div className="mt-5 overflow-x-auto rounded">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                    Video
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                    Product Name
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                    Product Color
                                </th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {youtubeVideo?.data?.map((video) => (
                                <tr key={video?._id}>
                                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                                        <YouTube videoId={video?.video_link} opts={opts} />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                                        {video?.product_id?.product_name}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                                        {video?.product_id?.product_color_id?.color_name}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 space-x-1 ">
                                        <div className="flex items-center justify-center gap-4">
                                            <MdDeleteForever
                                                onClick={() => handleDeleteVideo(video)}
                                                className="cursor-pointer text-red-500 hover:text-red-300"
                                                size={25}
                                            />
                                            <Link to={`/${video?.product_id?.product_slug}`}><FaEye
                                                className="cursor-pointer text-gray-500 hover:text-gray-300"
                                                size={25}
                                            /></Link>
                                        </div>
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
                totalData={youtubeVideo?.totalData}
            />

        </div>
    );
};

export default VideoTable;