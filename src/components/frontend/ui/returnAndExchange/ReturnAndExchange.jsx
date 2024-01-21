import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";

const ReturnAndExchange = () => {
  const { data: returnExchange = [] } = useQuery({
    queryKey: ["returnExchange"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = res.json();
      return data;
    },
  });
  console.log(returnExchange);
  return (
    <div className="py-10 w-full md:w-[768px] px-4 md:px-0 mx-auto">
      <h2 className="text-xl lg:text-2xl xl:text-3xl text-center tracking-tight font-medium">
        Return and Exchange
      </h2>
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{
          __html: returnExchange?.data[0]?.return_exchange,
        }}
      ></div>
    </div>
  );
};

export default ReturnAndExchange;
