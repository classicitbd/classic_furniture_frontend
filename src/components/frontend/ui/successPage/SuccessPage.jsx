import { Link, useParams } from "react-router-dom";
import { cartKey } from "../../../../constants/cartKey";
import { useEffect } from "react";

const SuccessPage = () => {
  const { tranId } = useParams();
 if (tranId) {
   localStorage.removeItem(cartKey);
   
 }
  useEffect(() => {
   
  }, [tranId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-600 mb-8">Thank you for your purchase.</p>
      <Link to="/all" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Shop More
      </Link>
    </div>
  );
};

export default SuccessPage;
