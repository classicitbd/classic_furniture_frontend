import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";

const MaterialAndCare = () => {
  const { data: materail = [] } = useQuery({
    queryKey: ["materail"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = res.json();
      return data;
    },
  });
  return (
    <div className="py-10 mx-auto">
      <h2 className="text-xl lg:text-2xl xl:text-3xl text-center tracking-tight font-medium">
        Materials & Care
      </h2>
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{
          __html: materail?.data[0]?.shipping_info,
        }}
      ></div>
    </div>
  );
};

export default MaterialAndCare;
