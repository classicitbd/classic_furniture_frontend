import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ rows, page, setPage, setRows, totalData }) => {
  const lastArrow = Math.ceil(totalData / rows);

  const handleRowsChange = (event) => {
    setPage(1);
    setRows(parseInt(event.target.value, 10));
  };

  return (
    <div className="flex justify-center my-6">
      <div className="mr-10 flex items-center gap-2">
        <label className="text-gray-500 font-semibold" htmlFor="rows_number">
          Rows:
        </label>
        <select
          onChange={handleRowsChange}
          value={rows}
          id="rows_number"
          className="block w-full px-4 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
      <button
        onClick={page > 1 ? () => setPage(page - 1) : 1}
        className="border flex items-center justify-center px-3 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md hover:bg-[#22CD5A] hover:text-white"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={lastArrow != page ? () => setPage(page + 1) : null}
        className="border flex items-center justify-center px-3 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md hover:bg-[#22CD5A] hover:text-white"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
