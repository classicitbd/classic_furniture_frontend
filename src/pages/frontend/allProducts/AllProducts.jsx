import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

// import react icons
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import { productData } from "../../../data/product-data";

const AllProducts = () => {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [discount, setDiscount] = useState(true);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [subCategoryTypes, setSubCategoryTypes] = useState([]);
  const [queryParameters] = useSearchParams();

  // get Category type
  const { data = [] } = useQuery({
    queryKey: ["/api/v1/category"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/category`);
      const data = await res.json();
      return data;
    },
  });

  const { data: subData = [] } = useQuery({
    queryKey: ["/api/v1/sub_category"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/sub_category`);
      const data = await res.json();
      return data;
    },
  }); // get Sub Category type

  const { data: collections = [] } = useQuery({
    queryKey: ["/api/v1/collection"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/collection`);
      const data = await res.json();
      return data;
    },
  }); // get Collection type

  const { data: styles = [] } = useQuery({
    queryKey: ["/api/v1/style"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/style`);
      const data = await res.json();
      return data;
    },
  }); // get Style type

  const { data: colors = [] } = useQuery({
    queryKey: ["/api/v1/color"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/color`);
      const data = await res.json();
      return data;
    },
  }); // get Color type

  const { data: features = [] } = useQuery({
    queryKey: ["/api/v1/feature"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/feature`);
      const data = await res.json();
      return data;
    },
  }); // get Feature type

  const handleResetFilter = () => {
    setDiscount(false);
  };

  useEffect(() => {
    // Get all query parameters
    const allQueryParams = {};
    for (const [key, value] of queryParameters.entries()) {
      allQueryParams[key] = value;
    }

    // console.log("All Query Parameters:", allQueryParams);

    // You can perform any other logic based on all query parameters here
  }, [queryParameters]);

  useEffect(() => {
    const uniqueMap = new Map();
    subData?.data?.forEach((item) => {
      uniqueMap.set(item.sub_category, item);
    });

    // Convert Map values back to an array
    const uniqueData = Array.from(uniqueMap.values());
    setSubCategoryTypes(uniqueData);
  }, [subData]);

  useEffect(() => {
    const uniqueMap = new Map();
    data?.data?.forEach((item) => {
      uniqueMap.set(item.category, item);
    });

    // Convert Map values back to an array
    const uniqueData = Array.from(uniqueMap.values());
    setCategoryTypes(uniqueData);
  }, [data]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container flex justify-between py-4 border-b border-bgray-500 sticky top-[69px] z-20 bg-white">
        <div>
          <h1>all products</h1>
        </div>
        <ul className="flex items-center gap-5 text-sm">
          <li>
            <Link onClick={handleResetFilter} to={`http://localhost:3000/all`}>
              Reset Filter
            </Link>
          </li>
          <li>
            <span className="w-[1px] h-4 bg-bgray-400 text-green inline-block"></span>
          </li>
          <li>
            <Link
              to={`http://localhost:3000/all?discount=true`}
              onClick={() => setDiscount(true)}
              className={`${discount ? "text-error-200" : ""}`}
            >
              On Sale
            </Link>
          </li>
          <li>
            <span className="w-[1px] h-4 bg-bgray-400 inline-block"></span>
          </li>
          <li>
            <button
              onClick={() => {
                setFilterDropdownOpen(!filterDropdownOpen);
                setSortDropdownOpen(false);
              }}
              className="flex items-center gap-1"
            >
              <HiOutlineAdjustmentsVertical />
              <span>Filters</span>
            </button>
            <div
              className={`absolute top-[57px] left-0 w-full border bg-[#FFFFFF] ${
                filterDropdownOpen ? "block" : "hidden"
              }`}
            >
              <div className="grid grid-cols-6 min-h-[460px] border-b">
                {/* ------ category section ------ start */}
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Categories</button>
                    </li>
                    {categoryTypes?.map((category) => (
                      <li key={category._id}>
                        <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                          {category?.category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ------ category section ------ end */}

                {/* ------ sub category section ------ start */}
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Sub Categories</button>
                    </li>
                    {subCategoryTypes?.map((subCategory) => (
                      <li key={subCategory?._id}>
                        <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                          {subCategory?.sub_category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ------ sub category section ------ end */}

                {/* ------ collections section ------ start */}
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Collections</button>
                    </li>
                    {collections?.data?.map((collection) => (
                      <li key={collection?._id}>
                        <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                          {collection?.collection_name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ------ collections section ------ end */}

                {/* ------ styles section ------ start */}
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Styles</button>
                    </li>
                    {styles?.data?.map((style) => (
                      <li key={style?._id}>
                        <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                          {style?.style}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ------ styles section ------ end */}
                {/* ------ color section ------ start */}
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Colors</button>
                    </li>
                    {colors?.data?.map((color) => (
                      <li key={color?._id}>
                        <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                          {color?.color}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ------ color section ------ end */}
                {/* ------ features section ------ start */}
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Features</button>
                    </li>
                    {features?.data?.map((feature) => (
                      <li key={feature?._id}>
                        <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                          {feature?.feature}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* ------ features section ------ end */}
              </div>
              <div className="flex justify-center py-2">
                <button
                  onClick={() => setFilterDropdownOpen(false)}
                  className="text-center"
                >
                  Hide Filter
                </button>
              </div>
            </div>
          </li>
          <li>
            <span className="w-[1px] h-4 bg-bgray-400 inline-block"></span>
          </li>

          {/* ------ sorby section ------ start */}
          <li className="relative">
            <button
              className="flex items-center gap-1"
              onClick={() => {
                setSortDropdownOpen(!sortDropdownOpen);
                setFilterDropdownOpen(false);
              }}
            >
              <span
                className={
                  sortDropdownOpen
                    ? "text-bgray-900j font-medium"
                    : "text-bgray-700 font-medium"
                }
              >
                Sort by:
              </span>
              <RiArrowDropDownLine
                className={`text-xl ${
                  sortDropdownOpen ? "rotate-180" : ""
                } transition-all duration-300`}
              />
            </button>
            <ul
              className={`absolute top-10 -right-20 w-[160px] border ${
                sortDropdownOpen ? "block" : "hidden"
              }`}
            >
              <li className="bg-bgray-300 hover:bg-bgray-400 py-1 px-2">
                <button onClick={() => setSortDropdownOpen(false)}>
                  Newest
                </button>
              </li>
              <li className="bg-bgray-200 hover:bg-bgray-400 py-1 px-2">
                <button onClick={() => setSortDropdownOpen(false)}>
                  Price Low to high
                </button>
              </li>
              <li className="bg-bgray-300 hover:bg-bgray-400 py-1 px-2">
                <button onClick={() => setSortDropdownOpen(false)}>
                  Price High to Low
                </button>
              </li>
            </ul>
          </li>
          {/* ------ sorby section ------ end */}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {productData.map((product) => (
          <div
            key={product?.id}
            className="border group rounded overflow-hidden bg-[#F0F0F0]"
          >
            <Link to={`/products/details/${product?.id}`}>
              <div className="flex">
                <img
                  src={product?.thumbnail}
                  className="w-full translate-x-0 group-hover:-translate-x-full transition-all duration-700"
                  alt={product?.id}
                />
                <img
                  src={product?.thumbnailTwo}
                  className="w-full translate-x-0 group-hover:-translate-x-full  transition-all duration-700"
                  alt={product?.id}
                />
              </div>
              <article className="pb-[10px]">
                <h2 className="text-center">{product?.title}</h2>
                <p className="text-center py-3 text-bgray-700">
                  {product?.color}
                </p>
                <p className="px-4">BDT {product?.price}.00</p>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
