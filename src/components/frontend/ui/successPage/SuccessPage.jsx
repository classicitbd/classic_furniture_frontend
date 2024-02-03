import { Link } from "react-router-dom";
import { cartKey } from "../../../../constants/cartKey";
import { useEffect } from "react";

const SuccessPage = () => {
  // const { tranId } = useParams();

  useEffect(() => {
    localStorage.removeItem(cartKey);
    const timerId = setTimeout(() => {
      window.location.reload();
    }, 10);

    // Cleanup the timer to avoid memory leaks
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Your Order Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase.
        </p>
        <Link
          to="/user-profile"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          See your Order
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
