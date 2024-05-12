import { useGetVideoQuery } from "../../../../redux/feature/video/videoApi";
import MiniSpinner from "../../../../shared/loader/MiniSpinner";

export default function ProductYoutubeVideo() {
  const { data: videos, isLoading } = useGetVideoQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });
  if (isLoading)
    return (
      <div>
        <MiniSpinner />
      </div>
    );
  console.log(videos);
  return <div></div>;
}
