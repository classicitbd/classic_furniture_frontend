import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// import react icons
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";

const AllProducts = () => {
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [queryParameters] = useSearchParams();

  useEffect(() => {
    // Get all query parameters
    const allQueryParams = {};
    for (const [key, value] of queryParameters.entries()) {
      allQueryParams[key] = value;
    }

    console.log("All Query Parameters:", allQueryParams);

    // You can perform any other logic based on all query parameters here
  }, [queryParameters]);

  return (
    <div className="min-h-screen">
      <div className="container flex justify-between py-4 border-b border-bgray-500 sticky top-[70px]">
        <div>
          <h1>all products</h1>
        </div>
        <ul className="flex items-center gap-5 text-sm">
          <li>
            <button>On Sale</button>
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
                <div className="border-r px-4 py-[5px]">
                  <ul className="space-y-1">
                    <li className="text-lg font-medium tracking-normal mb-2">
                      <button>Categories</button>
                    </li>
                    <li>
                      <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                        Men
                      </button>
                    </li>
                    <li>
                      <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                        Women
                      </button>
                    </li>
                    <li>
                      <button className="bg-bgray-100 hover:bg-bgray-200 py-1 px-2 w-full text-left rounded-sm">
                        Unisex
                      </button>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>Subcategories</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>Collections</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>Styles</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>Colors</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>Features</li>
                  </ul>
                </div>
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
    </div>
  );
};

export default AllProducts;
