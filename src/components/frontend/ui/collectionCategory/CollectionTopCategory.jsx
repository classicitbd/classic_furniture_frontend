import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../utils/baseURL";
import ProductCardSkeleton from "../../../../shared/loader/ProductCardSkeleton";

const CollectionTopCategory = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: [`/api/v1/category`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/category`);
      const data = await res.json();
      return data;
    },
  }); // get All collection

  //get video this api
  const { data: video = [], isLoading: videoLoading } = useQuery({
    queryKey: ["/api/v1/siteSetting"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = res.json();
      return data;
    },
  });

  if (isLoading || videoLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 grid-rows-1 md:grid-rows-2">
      {/* First Section */}
      <div className="relative group overflow-hidden md:col-span-3 md:row-span-2">
        <Link to={`/all`} className="block w-full h-full">
          <video className="w-full h-full object-cover" autoPlay muted loop>
            <source src={video?.data[0]?.video} type="video/mp4" />
            {/* Your browser does not support the video tag. */}
          </video>
        </Link>
      </div>

      {/* Second Section */}
      <div className="border-l relative group overflow-hidden md:col-span-4 row-span-1 flex flex-col items-center justify-center space-y-5 py-20 md:py-0">
        <article className="text-center uppercase leading-tight space-y-1">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold">
            Regular Sale
          </h1>
          <p>Select Styles On Sale</p>
        </article>
        <Link
          className="bg-primaryColor text-xl font-medium leading-6 -tracking-normal text-white w-[60vw] md:w-[20vw] py-[10px] lg:py-[20px] flex items-center justify-center rounded-sm"
          to={`/all?discount_price=true`}
        >
          Shop Now
        </Link>
      </div>

      {/* Third Section */}
      {categories?.data
        ?.filter((item) => item.show_card === "active")
        ?.slice(3, 4)
        .map((category) => (
          <div
            className="relative group overflow-hidden md:col-span-4 row-span-1"
            key={category?._id}
          >
            <Link to={`/all?category=${category?.slug}`}>
              <img
                loading="lazy"
                className="transition-transform transform duration-1500 ease-in-out group-hover:scale-110 object-cover md:h-[200px] lg:h-[300px] 2xl:h-[400px] w-full"
                src={category?.category_image}
                alt={category?.category}
              />
              <h1
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7))",
                }}
                className="absolute uppercase text-white bottom-0 px-5 py-3 w-full text-xl lg:text-3xl font-semibold"
              >
                {category?.category}
              </h1>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default CollectionTopCategory;
