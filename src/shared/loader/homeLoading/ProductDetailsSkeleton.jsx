import ProductCardSkeleton from "../ProductCardSkeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className=" my-8 es_container bg-white p-4  ">
      <div className="grid  grid-cols-1 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-7 gap-3 ">
        <div className=" lg:col-span-2  sm:col-span-2  md:col-span-2  col-span-1 ">
          <div className="">
            <div className="border-2 border-gray-300">
              <div className=" w-full lg:h-[310px] sm:h-[310px]  h-[280px] bg-gray-300 animate-pulse " />
            </div>

            <div className=" flex  overflow-x-auto  scrollbar-thin my-2 ">
              {[...Array(3)].map((index) => (
                <div
                  key={index}
                  className="md:h-20 md:w-20 h-16 w-16 border bg-gray-300 animate-pulse   p-1 mr-2 my-2  "
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3  sm:col-span-3 md:col-span-3 col-span-1 px-4  ">
          <h1 className="animate-pulse required w-40 h-4 bg-gray-300 my-3" />

          <hr />
          <div className="flex items-center flex-wrap required gap-4 py-3  ">
            <div className="bg-gray-300 h-4 w-4 rounded-full animate-pulse"></div>
            <div className="bg-gray-300 h-4 w-4 rounded-full animate-pulse"></div>
            <div className="bg-gray-300 h-4 w-4 rounded-full animate-pulse"></div>
          </div>
          <h1 className="animate-pulse w-36 rounded h-3 bg-gray-300 my-3" />
          <h1 className="animate-pulse w-36 rounded h-3 bg-gray-300 my-8" />
          <hr className="my-6" />
          <div className="flex flex-wrap gap-8 my-8">
            <div className="w-20     h-16 bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col">
              <h1 className="animate-pulse w-24 rounded h-2 bg-gray-300 mt-2" />
              <h1 className="animate-pulse w-32 rounded h-2 bg-gray-300 my-3" />
              <h1 className="animate-pulse w-28 rounded h-2 bg-gray-300 " />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2  sm:col-span-5 md:col-span-2 col-span-1 px-4 ">
          <h1 className="animate-pulse rounded required w-40 h-4 bg-gray-300 my-3" />
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((item) => (
              <div
                key={item?._id}
                disabled
                className="border rounded-lg mt-3 w-16 h-8 cursor-pointer py-2 px-3.5 mr-2  font-semibold text-gray-700 "
              ></div>
            ))}
          </div>
          <h1 className="animate-pulse required mt-8 w-32 h-3 rounded bg-gray-300 my-3" />
          <div className="w-full h-8 text-center animate-pulse bg-gray-400 mt-6 rounded-full my-2.5"></div>
          <div className="w-full h-8 text-center animate-pulse bg-gray-300 mt-6 rounded-full my-2.5"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 my-4   ">
        <div className="w-full  lg:w-[72%]">
          <div></div>
        </div>

        <div className="w-full lg:w-[28%] ">
          <ProductCardSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
