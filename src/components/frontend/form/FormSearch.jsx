// import { useDispatch } from "react-redux";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

const FormSearch = ({ isSearchFieldOpen, setSearchFieldOpen }) => {
  const [value, setValue] = useState("");
  // const [selectedValue, setSelectedValue] = useState(null);
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();

  const handleDiscountClick = (text) => {
    // Update the query parameters
    const queryParams = new URLSearchParams(queryParameters);
    queryParams.set("keyword", text);

    // Update the URL using navigate
    navigate(`/all?${queryParams.toString()}`);
  };

  // const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    handleDiscountClick(value);
    setValue("");
    setSearchFieldOpen(!isSearchFieldOpen);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border border-bgray-900 flex justify-between font-sans rounded-full"
      >
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search by title"
          className="w-full px-5 py-2 focus:outline-none rounded-l-full text-black"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="px-5 text-black rounded-r-full bg-white"
          type="submit"
        >
          <IoSearchOutline />
        </button>
      </form>
    </>
  );
};

export default FormSearch;
