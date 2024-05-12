import { useGetVideoQuery } from "../../../../redux/feature/video/videoApi";
import MiniSpinner from "../../../../shared/loader/MiniSpinner";

export default function ProductYoutubeVideo() {
  const { data: videos, isLoading } = useGetVideoQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });
  //

  if (isLoading)
    return (
      <div>
        <MiniSpinner />
      </div>
    );
  // console.log(videos);
  return (
    <div className="bg-[#F2F4F8] py-6">
      <div className="es_container  ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-4">
          {videos?.data?.map((video) => (
            <div
              key={video?._id}
              className="bg-white p-4 rounded shadow-md"
              style={{
                width: "100%",
              }}
            >
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${video?.video_link}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
