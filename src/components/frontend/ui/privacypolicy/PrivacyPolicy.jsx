import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";

const PrivacyPolicy = () => {
  const { data: privacypolicy = [], isLoading } = useQuery({
    queryKey: ["privacypolicy"],
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
        Privacy & Policy
      </h2>
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{
          __html: privacypolicy?.data[0]?.privacyPolicy,
        }}
      ></div>
    </div>
  );
};

export default PrivacyPolicy;
