import { useNavigate } from "react-router-dom";
import { cartKey } from "../../../../constants/cartKey";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    localStorage.removeItem(cartKey);
    navigate("/user-profile");
    window.location.reload();
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Your Order Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase.
        </p>
        <button
          className="bg-primaryColor text-white px-4 py-2 rounded-md"
          onClick={() => handleNavigate()}
        >
          See your Order
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
