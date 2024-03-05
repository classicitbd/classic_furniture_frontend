import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";

const CancellationPolicy = () => {
  const { data: cancellation = [], isLoading } = useQuery({
    queryKey: ["cancellation"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return null;
  }

  return (
    <div className="py-10 w-full md:w-[768px] px-4 md:px-0 mx-auto min-h-screen">
      <h2 className="text-xl lg:text-2xl xl:text-3xl text-center tracking-tight font-medium">
        Cancellation Policy
      </h2>
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{
          __html: cancellation?.data[0]?.cancellationPolicy,
        }}
      ></div>
    </div>
  );
};

export default CancellationPolicy;
