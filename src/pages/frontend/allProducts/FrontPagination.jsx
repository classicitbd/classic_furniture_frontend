import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FrontPagination = ({ rows, page, setPage, setRows, totalData }) => {
  const lastArrow = Math.ceil(totalData / rows);

  const handleRowsChange = (event) => {
    setPage(1);
    setRows(parseInt(event.target.value, 10));
  };

  return (
    <div className="flex sm:justify-end flex-wrap sm:my-4 my-2">
      <div className="sm:mr-5 mr-2 flex items-center gap-2">
        <label
          className="text-gray-500 font-semibold text-sm sm:text-md"
          htmlFor="rows_number"
        >
          Show:
        </label>
        <select
          onChange={handleRowsChange}
          value={rows}
          id="rows_number"
          className="block w-full px-3 py-1 text-gray-700 bg-white border border-gray-200 rounded-md text-sm sm:text-md"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
      <div className="flex">
        {page == 1 ? (
          <button
            type="button"
            disabled
            className="btn border flex items-center justify-center px-3 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed"
          >
            <FaChevronLeft />
          </button>
        ) : (
          <button
            type="button"
            onClick={page > 1 ? () => setPage(page - 1) : 1}
            className="btn border flex items-center justify-center px-3 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md hover:bg-[#22CD5A] hover:text-white"
          >
            <FaChevronLeft />
          </button>
        )}
        {lastArrow == page ? (
          <button
            type="button"
            className="btn border flex items-center justify-center px-3 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed"
          >
            <FaChevronRight />
          </button>
        ) : (
          <button
            type="button"
            onClick={lastArrow != page ? () => setPage(page + 1) : null}
            className="btn border flex items-center justify-center px-3 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md hover:bg-[#22CD5A] hover:text-white"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default FrontPagination;
