import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";

const CollectionTopCategory = () => {
  const { data: collections = [], isLoading } = useQuery({
    queryKey: [`/api/v1/collection?collection`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/collection`);
      const data = await res.json();
      return data;
    },
  }); // get All collection
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 grid-rows-1 md:grid-rows-2">
      {/* First Section */}
      <div className="relative group overflow-hidden md:col-span-3 md:row-span-2">
        <Link to={`/all?collection=FW302`} className="block w-full h-full">
          <video className="w-full h-full object-cover" autoPlay muted loop>
            <source src="/assets/video/shoe.mp4" type="video/mp4" />
            {/* Your browser does not support the video tag. */}
          </video>
        </Link>
      </div>

      {/* Second Section */}
      <div className="relative group overflow-hidden md:col-span-4 row-span-1 flex flex-col items-center justify-center space-y-5 py-20 md:py-0">
        <article className="text-center uppercase leading-tight space-y-1">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold">
            Regular Sale
          </h1>
          <p>Select Styles On Sale</p>
        </article>
        <Link
          className="bg-black text-xl font-medium leading-6 -tracking-normal text-white w-[60vw] md:w-[20vw] py-[10px] lg:py-[20px] flex items-center justify-center rounded-sm"
          to={`/all?discount=true`}
        >
          Shop Now
        </Link>
      </div>

      {/* Third Section */}
      {collections?.data?.slice(3, 4).map((collection) => (
        <div
          className="relative group overflow-hidden md:col-span-4 row-span-1"
          key={collection?._id}
        >
          <Link to={`/all?sub_category=${collection?.slug}`}>
            <img
              className="transition-transform transform duration-1500 ease-in-out group-hover:scale-110 object-cover md:h-[200px] lg:h-[300px] 2xl:h-[400px] w-full"
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

export default CollectionTopCategory;
