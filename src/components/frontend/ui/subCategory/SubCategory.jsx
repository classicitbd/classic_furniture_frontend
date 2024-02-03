import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import BigSpinner from "../../../../shared/loader/BigSpinner";

const SubCategory = () => {
  const { data: subCategories = [], isLoading } = useQuery({
    queryKey: [`/api/v1/sub_category`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/sub_category`);
      const data = await res.json();
      return data;
    },
  }); // get All subcategory

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {subCategories?.data?.slice(0, 3)?.map((subCategory) => (
        <div className="relative group overflow-hidden" key={subCategory?._id}>
          <Link to={`/all?sub_category=${subCategory?.slug}`}>
            <img
              loading="lazy"
              className="transition-transform transform duration-1500 ease-in-out group-hover:scale-110"
              src={subCategory?.sub_category_image}
              alt={subCategory?.sub_category}
            />
            <h1
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7))",
              }}
              className="absolute uppercase text-white bottom-0 px-5 py-3 w-full text-xl lg:text-3xl font-semibold"
            >
              {subCategory?.sub_category}
            </h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SubCategory;
