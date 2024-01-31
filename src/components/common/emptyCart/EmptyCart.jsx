import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[500px]">
      <div className="rounded-full mb-3 border border-primaryColor p-2">
        <img
          src="/assets/images/logo/logo.png"
          alt="logo"
          className="h-10 w-10"
        />
      </div>
      <p className="text-gray-600 text-xl">Your Cart is Empty!</p>
      <Link
        to={`/all`}
        className="relative mt-10 bg-primaryColor inline-flex items-center justify-start px-5 py-3 overflow-hidden font-normal rounded group"
      >
        <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-primaryColor opacity-[3%]"></span>
        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-logoColor opacity-100 group-hover:-translate-x-8"></span>
        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
          Shop more
        </span>
        <span className="absolute inset-0 border-2 border-white rounded"></span>
      </Link>
    </div>
  );
};

export default EmptyCart;
