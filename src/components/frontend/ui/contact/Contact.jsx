import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";

const Contact = () => {
  const { data: contact = [] } = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = res.json();
      return data;
    },
  });
  return (
    <div className="py-10 w-full md:w-[768px] px-4 md:px-0 mx-auto">
      <h2 className="text-xl lg:text-2xl xl:text-3xl text-center tracking-tight font-medium">
        Contact Us
      </h2>
      <div
        className="mt-10"
        dangerouslySetInnerHTML={{ __html: contact?.data[0]?.contact_us }}
      ></div>
    </div>
  );
};

export default Contact;
