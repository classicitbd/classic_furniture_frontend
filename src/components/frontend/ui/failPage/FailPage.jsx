import { Link } from "react-router-dom";

const FailPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-error-200 mb-4">Payment Fail!</h1>
      <p className="text-lg text-gray-600 mb-8">Something went wrong.</p>
      <Link
        to="/all"
        className="bg-primaryColor text-white px-4 py-2 rounded-md"
      >
        Shop More
      </Link>
    </div>
  );
};

export default FailPage;
