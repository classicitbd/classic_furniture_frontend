import { Link } from "react-router-dom";
import { useGetVideoQuery } from "../../../../redux/feature/video/videoApi";
import Loader from "../../../../shared/loader/Loader";
import { MdOndemandVideo } from "react-icons/md";
import { useEffect, useState } from "react";
import FrontPagination from "../../../../pages/frontend/allProducts/FrontPagination";
export default function ProductYoutubeVideo() {
  const [totalData, setTotalData] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);

  const { data: videos, isLoading } = useGetVideoQuery({ rows, page }, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (videos) {
      setTotalData(videos?.data?.totalData);
    }
  }, [videos])

  if (isLoading) return <Loader />;
  // console.log(videos);
  return (
    <div className="bg-[#F2F4F8] py-6">
      <div className="es_container  ">
        {videos?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-4 mx-3">
            {videos?.data?.map((video) => (
              <div
                key={video?._id}
                className="bg-white p-4 rounded shadow-md"
                style={{
                  width: "100%",
                }}
              >
                <div>
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${video?.video_link}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">
                    {video?.product_id?.product_name
                      ? video?.product_id?.product_name.length > 22
                        ? video?.product_id?.product_name.slice(0, 22) + "..."
                        : video?.product_id?.product_name
                      : " "}
                  </h3>
                  <p className="text-sm my-1.5">
                    {video?.product_id?.product_color_id?.color_name}
                  </p>

                  <p className="my-3">
                    <span
                      className={`pr-1 ${video?.product_id?.product_discount_price
                        ? "line-through"
                        : ""
                        }`}
                    >
                      {video?.product_id?.product_price}
                    </span>
                    <span>৳</span>
                    {video?.product_id?.product_discount_price && (
                      <>
                        <span className="text-error-300 ml-2">
                          {video?.product_id?.product_discount_price}
                          <span className="ml-1">৳</span>
                        </span>
                        <span className="bg-red-600 text-xs  ml-2 rounded-tr-lg rounded-bl-lg text-white px-2 ">
                          Save{" "}
                          {video?.product_id?.product_price -
                            video?.product_id?.product_discount_price}{" "}
                          ৳
                        </span>
                      </>
                    )}
                  </p>

                  <Link to={`/${video?.product_id?.product_slug}`}>
                    <button className="bg-primaryDeepColor text-white px-4 py-2 rounded-md w-full font-semibold mt-3 mb-2 hover:bg-primaryLightColor duration-200 transition">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <section className="flex items-center h-full sm:p-16 text-gray-800">
              <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-4 text-center sm:max-w-md">
                <MdOndemandVideo className="text-7xl sm:text-9xl" />
                <p className="sm:text-3xl  text-xl">
                  Looks like our product video is currently unavailable!
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    to="/"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-[12px] sm:text-[16px] font-semibold rounded  text-gray-50 bg-gray-400 hover:scale-105 duration-200"
                  >
                    Back to homepage
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}
        {
          videos?.data?.length > 0 &&
          <FrontPagination
            rows={rows}
            page={page}
            setPage={setPage}
            setRows={setRows}
            totalData={totalData}
          />
        }
      </div>
    </div>
  );
}