import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import BigSpinner from "../../../shared/loader/BigSpinner";
import AddVideo from "../../../components/dashboard/youtube/AddVideo";
import VideoTable from "../../../components/dashboard/youtube/VideoTable";
import { useState } from "react";
import { getCookie } from "../../../utils/cookie-storage";
import { authKey } from "../../../constants/storageKey";

const Youtube = () => {
    const token = getCookie(authKey);
    const [rows, setRows] = useState(10);
    const [page, setPage] = useState(1);

    const { data: youtubeVideo = [], isLoading, refetch } = useQuery({
        queryKey: [`/api/v1/video_tab/dashboard?page=${page}&limit=${rows}`],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/video_tab/dashboard?page=${page}&limit=${rows}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            const data = await res.json();
            return data;
        }
    }) // get Video Tab type

    if (isLoading) {
        return <BigSpinner />;
    }

    return (
        <>
            {/* Video Tab Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Video Tab</h3>
                <div className="flex items-center gap-2">
                    <Link to='/admin'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/admin/video_tab'><p className="font-semibold">Video Tab</p></Link>
                </div>
            </div>

            {/* Add Video Tab Type And Show In Table */}
            <AddVideo refetch={refetch} />

            {/* update delete and show deails in table */}
            <VideoTable youtubeVideo={youtubeVideo} refetch={refetch} rows={rows} page={page} setRows={setRows} setPage={setPage} />

        </>
    );
};

export default Youtube;