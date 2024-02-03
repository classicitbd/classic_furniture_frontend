import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";
import BigSpinner from "../../../../shared/loader/BigSpinner";

const CollectionCategory = () => {
  const { data: collections = [], isLoading } = useQuery({
    queryKey: [`/api/v1/collection?collection`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/collection`);
      const data = await res.json();
      return data;
    },
  }); // get All collection

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {collections?.data?.slice(0, 3).map((collection) => (
        <div className="relative group overflow-hidden" key={collection?._id}>
          <Link to={`/all?sub_category=${collection?.slug}`}>
            <img
              loading="lazy"
              className="transition-transform transform duration-1500 ease-in-out group-hover:scale-110"
              src={collection?.collection_image}
              alt={collection?.collection_name}
            />
            <h1
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7))",
              }}
              className="absolute uppercase text-white bottom-0 px-5 py-3 w-full text-xl lg:text-3xl font-semibold"
            >
              {collection?.collection_name}
            </h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CollectionCategory;
