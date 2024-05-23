import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import BannerImage from "../../../components/dashboard/banner/BannerImage";
import BannerTable from "../../../components/dashboard/banner/BannerTable";
import { useState } from "react";
import { getCookie } from "../../../utils/cookie-storage";
import { authKey } from "../../../constants/storageKey";

const Banner = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const token = getCookie(authKey);
  const {
    data: banners = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/banner/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/banner/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      );
      const data = await res.json();
      return data;
    },
  }); // get all Banner

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div className="">
      {/* Banner Page Navbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Banner</h3>
        <div className="flex items-center gap-2">
          <Link to="/admin">
            <p>
              <PiHouseBold size={25} color="#3EA2FA" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link to="/admin/nanner">
            <p className="font-semibold">Banner</p>
          </Link>
        </div>
      </div>

      {/* Show Banner */}
      <BannerImage banners={banners} />

      {/* Show all image in a table */}
      <BannerTable
        banners={banners}
        refetch={refetch}
        rows={rows}
        page={page}
        setPage={setPage}
        setRows={setRows}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

export default Banner;
