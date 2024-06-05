import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import "./header.css";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { BASE_URL } from "../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function TopHeader() {
  const { data: settings = [], isLoading } = useQuery({
    queryKey: [`/api/v1/siteSetting`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = await res.json();
      return data?.data;
    },
  });
  const [loading, setLoaing] = useState(true);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#008140] text-white">
      <div className="es_container">
        <div className="flex items-center justify-between py-2">
          <div className="left flex items-center gap-4">
            <div className="number ms-20 xl:ms-0 flex items-center ">
              <IoCallOutline className="text-ftPrimaryColor" />
              <p className=" text-ftMuteColor text-[13px] font-light">
                {settings[0]?.emergency_contact}
              </p>{" "}
              <span className="ms-3">|</span>
            </div>
            <div className="email flex items-center">
              <CiMail className="text-ftPrimaryColor" />
              <p className=" text-ftMuteColor text-[13px] font-light">
                {settings[0]?.email}
              </p>
            </div>
          </div>
          <div className="right  me-20 xl:me-0">
            <div className="left flex items-center gap-4">
              <div className="email flex items-center">
                <Link
                  to="/order-tracking"
                  className="ml-2 text-ftMuteColor font-semibold underline"
                >
                  Track Order
                </Link>
              </div>
              {/* <div className="email flex items-center">
                                <Link
                                    to="mailto: develoer@dev.com"
                                    className="text-ftMuteColor text-[13px] font-light"
                                >
                                    Wish List
                                </Link>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
