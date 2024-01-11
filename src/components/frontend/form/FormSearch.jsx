// import { useDispatch } from "react-redux";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const FormSearch = () => {
  const [value, setValue] = useState("");
  // const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
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
