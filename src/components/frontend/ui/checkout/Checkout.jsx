import { useContext, useState } from "react";
import { BsCart } from "react-icons/bs";
import { useSelector } from "react-redux";
import { CiCreditCard1, CiLocationOn } from "react-icons/ci";
import CartItems from "./CartItems";
import Payment from "./Payment";
import Address from "./Address";
import RightSideAmount from "./RightSideAmount";
import Loader from "../../../../shared/loader/Loader";
import { BASE_URL } from "../../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../context/AuthProvider";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";

export default function Checkout() {
  const { user: userData } = useContext(AuthContext);

  const { data: settingData = [], isLoading } = useQuery({
    queryKey: [`/api/v1/siteSetting`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/siteSetting`);
      const data = await res.json();
      return data?.data;
    },
  });

  const cart = useSelector((state) => state.furnitureCart.products);
  const subTotal = useSelector((state) => state.furnitureCart.subtotal);
  const totalQuantity = useSelector((state) => state.furnitureCart.quantity);
  const delivery_charge = useSelector(
    (state) => state.furnitureCart.delivery_charge
  );
  const deliveryType = useSelector((state) => state.furnitureCart.deliveryType);
  const [activeStep, setActiveStep] = useState(1);

  const [selectedDeliveryLocation, setSelectedDeliveryLocation] =
    useState(deliveryType);

  // const handleStepClick = (step) => {
  //   setActiveStep(step);
  // };

  const handleContinue = () => {
    if (activeStep < 3) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };
  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {cart?.length > 0 ? (
        <div className="es_container">
          <div className="py-10">
            {/* Step Navigation */}
            <div className="flex justify-center flex-wrap">
              {/* Step - 1 */}
              <p
                className={`md:text-xl sm:text-lg font-semibold pb-2 flex gap-1 items-center  ${
                  activeStep >= 1 ? "text-primaryDeepColor" : ""
                }`}
                // onClick={() => handleStepClick(1)}
              >
                <span
                  className={`sm:w-6  sm:h-6 w-4 h-4 sm:text-[14px] text-[10px] flex items-center justify-center text-white rounded-full mr-1    ${
                    activeStep >= 1 ? "bg-primaryDeepColor" : "bg-gray-400 "
                  } `}
                >
                  1
                </span>{" "}
                Bag <BsCart className="sm:text-xl " />
                <div
                  className={`md:w-12 w-4 h-[1px] sm:mr-4 mr-1.5  rounded-full ${
                    activeStep >= 1 ? "bg-primaryDeepColor " : "bg-gray-500"
                  }`}
                ></div>
              </p>

              {/* Step - 2 */}
              <p
                className={`md:text-xl sm:text-lg font-semibold pb-2 flex gap-1 items-center  ${
                  activeStep >= 2 ? "text-primaryDeepColor" : "text-gray-700"
                }`}
                // onClick={() => handleStepClick(2)}
              >
                <span
                  className={`sm:w-6  sm:h-6 w-4 h-4 sm:text-[14px] text-[10px] flex items-center justify-center text-white rounded-full mr-1    ${
                    activeStep >= 2 ? "bg-primaryDeepColor" : "bg-gray-400  "
                  } `}
                >
                  2
                </span>{" "}
                Address <CiLocationOn className="sm:text-xl font-semibold " />
                <div
                  className={`md:w-12 sm:w-6 w-4 h-[1px] sm:mr-4 mr-1.5  rounded-full ${
                    activeStep >= 2 ? "bg-primaryDeepColor " : "bg-gray-500"
                  }`}
                ></div>
              </p>
              {/* Step - 3 */}
              <p
                className={`md:text-xl sm:text-lg font-semibold pb-2 flex gap-1 items-center ${
                  activeStep >= 3 ? "text-primaryDeepColor" : "text-gray-700"
                }`}
                // onClick={() => handleStepClick(3)}
              >
                <span
                  className={`sm:w-6  sm:h-6 w-4 h-4 sm:text-[14px] text-[10px] flex items-center justify-center text-white rounded-full mr-1    ${
                    activeStep >= 3 ? "bg-primaryDeepColor" : "bg-gray-400 "
                  } `}
                >
                  3
                </span>{" "}
                Payment <CiCreditCard1 className="sm:text-xl" />
              </p>
            </div>
            <div className="lg:mx-10 md:mx-4 mx-2">
              <div className="flex flex-col md:flex-row gap-4 my-4  lg:gap-8  ">
                {/* Left side condition aria */}
                <div className="w-full md:w-[64%]">
                  <div className="flex justify-between items-center p-4 ">
                    <p className="md:text-xl  text-xs sm:text-sm  font-semibold   flex gap-2 items-center">
                      <BsCart size={26} /> Shopping Bag Item {totalQuantity}
                    </p>
                    <p className="md:text-xl  text-xs sm:text-sm  font-semibold   flex gap-2 items-center">
                      Total: {subTotal}৳
                    </p>
                  </div>
                  {/* Left side step 1 */}
                  {activeStep === 1 && (
                    <CartItems
                      cart={cart}
                      totalQuantity={totalQuantity}
                      subTotal={subTotal}
                    />
                  )}
                  {/* Left side step 2 */}

                  {activeStep === 2 && (
                    <Address
                      setSelectedDeliveryLocation={setSelectedDeliveryLocation}
                      selectedDeliveryLocation={selectedDeliveryLocation}
                      settingData={settingData}
                      deliveryType={deliveryType}
                      userData={userData}
                    />
                  )}
                  {/* Left side step 3 */}
                  {activeStep === 3 && <Payment userData={userData} />}
                </div>

                {/* Right side  */}
                <div className="w-full md:w-[32%] md:pt-16   ">
                  <RightSideAmount
                    subTotal={subTotal}
                    totalQuantity={totalQuantity}
                    handleContinue={handleContinue}
                    activeStep={activeStep}
                    handleBack={handleBack}
                    settingData={settingData}
                    delivery_charge={delivery_charge}
                    deliveryType={deliveryType}
                    selectedDeliveryLocation={selectedDeliveryLocation}
                    userData={userData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <section className="flex items-center h-full sm:p-16 text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-4 text-center sm:max-w-md">
              <BsCartX className="text-7xl sm:text-9xl" />
              <p className="sm:text-3xl  text-2xl">Your Car is Empty!</p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-[12px] sm:text-[16px] font-semibold rounded  text-gray-50 bg-gray-400 hover:scale-105 duration-200"
                >
                  Back to homepage
                </Link>
                <Link
                  to="/all"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-[12px] sm:text-[16px] font-semibold rounded  text-gray-50 bg-primaryLightColor hover:scale-105 duration-200"
                >
                  Shop More
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
