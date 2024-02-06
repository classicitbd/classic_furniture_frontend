import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";

const Aboutus = () => {
  const { data: aboutus = [], isLoading } = useQuery({
    queryKey: ["/api/v1/siteSetting"],
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
    <div className="py-10 w-full md:w-[1024px] px-4 md:px-0 mx-auto">
      <h2 className="text-xl lg:text-2xl xl:text-3xl text-center tracking-tight font-medium">
        Our Story
      </h2>
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{
          __html: aboutus?.data[0]?.aboutUs,
        }}
      ></div>
    </div>
  );
};

export default Aboutus;
