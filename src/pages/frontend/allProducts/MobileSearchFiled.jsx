const MobileSearchFiled = ({ handleSubmit, value, setValue }) => {
  return (
    <div className="search flex-1">
      <form
        className="flex flex-1 justify-between lg:max-w-5xl items-center"
        onSubmit={handleSubmit}
      >
        <div className="relative flex items-center w-full my-2 lg:hidden">
          <input
            id="search"
            type="search"
            placeholder="Search Here"
            className="w-full px-3 py-2 focus:outline-none border focus:ring-1 focus:ring-primaryDeepColor border-gray-300 rounded-md text-gray-800"
            name="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-0 px-4 py-2 bg-gray-200  text-gray-800 rounded-r-md hover:bg-gray-300"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 512 512"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={32}
                d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64z"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={32}
                d="M338.29 338.29 448 448"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MobileSearchFiled;
