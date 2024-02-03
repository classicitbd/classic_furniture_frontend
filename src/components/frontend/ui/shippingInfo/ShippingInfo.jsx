import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";

const ShippingInfo = () => {
  const { data: shippingInfo = [], isLoading } = useQuery({
    queryKey: ["shippingInfo"],
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
    <div className="py-10 mx-auto">
      <h2 className="text-xl lg:text-2xl xl:text-3xl text-center tracking-tight font-medium">
        Shipping Information
      </h2>
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{
          __html: shippingInfo?.data[0]?.shipping_info,
        }}
      ></div>
    </div>
  );
};

export default ShippingInfo;
