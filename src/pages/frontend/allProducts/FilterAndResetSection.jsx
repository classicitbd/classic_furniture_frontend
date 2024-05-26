import { IoFilterOutline } from "react-icons/io5";
import { RxReload } from "react-icons/rx";

const FilterAndResetSection = ({
  products,
  setMobileFiltersOpen,
  mobileFiltersOpen,
  queryParameters,
  handleResetFilter,
  sortedProducts,
}) => {
  return (
    <div className="sm:p-3 p-1 bg-white sm:px-6 rounded">
      <div className="flex sm:justify-between items-center">
        <div className="flex items-center justify-center">
          <p className="sm:text-xl font-semibold text-primaryDeepColor hidden sm:flex">
            Products {products?.length}
          </p>
        </div>
        <div
          className="flex items-center sm:w-auto w-full justify-between sm:justify-center flex-wrap
           gap-4"
        >
          <div className="flex gap-2 items-center justify-center ">
            <span
              className="text-gray-800 sm:mr-2 mr-0 items-center gap-2 flex bg-gray-100 sm:p-2 p-1 rounded lg:hidden"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <IoFilterOutline size={20} /> <span>Filter</span>
            </span>
            <span>
              {queryParameters.size > 0 && (
                <>
                  <span
                    className="hidden bg-gray-100  shadow p-1 rounded sm:block cursor-pointer"
                    onClick={handleResetFilter}
                  >
                    Reset Filter
                  </span>
                  <span onClick={handleResetFilter} className="block sm:hidden">
                    <RxReload />
                  </span>
                </>
              )}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="hidden sm:flex">Sort By </p>
            <select
              className="border   outline-none focus:ring-1 focus:ring-primaryLightColor rounded-md px-2 py-1.5 text-[12px]"
              onChange={(e) => sortedProducts(e.target.value)}
            >
              <option className="text-[13px] " value="Default">
                Price: Default
              </option>
              <option className="text-[13px] " value="price-asc">
                Price: Low to High
              </option>
              <option className="text-[13px] " value="price-desc">
                Price: High to Low
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAndResetSection;
