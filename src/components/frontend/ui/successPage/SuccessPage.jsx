import { Link, useParams } from "react-router-dom";
import { cartKey } from "../../../../constants/cartKey";
import { useEffect, useState } from "react";
import Header from "../../../../shared/header/Header";

const SuccessPage = () => {
  const { tranId } = useParams();
  const [localStorageRemoved, setLocalStorageRemoved] = useState(false);
  const [initialReloadDone, setInitialReloadDone] = useState(false);

  useEffect(() => {
    const removeLocalStorage = () => {
      // Process the successful order
      localStorage.removeItem(cartKey);
      setLocalStorageRemoved(true);
    };

    // Check if it's the initial render
    const isInitialRender = tranId === undefined;

    if (isInitialRender) {
      // Perform any actions you want on the initial render
      setInitialReloadDone(true);
    } else if (tranId && !localStorageRemoved) {
      // Remove localStorage only once on successful order
      removeLocalStorage();
    } else if (localStorageRemoved && !initialReloadDone) {
      // Force a one-time reload after localStorage is removed
    }
  }, [tranId, localStorageRemoved, initialReloadDone]);

  return (
    <div>
      <div className="sticky top-0 bg-primaryColor z-30">
        <Header />
      </div>
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
