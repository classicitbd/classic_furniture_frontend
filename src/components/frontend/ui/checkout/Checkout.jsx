import { useState } from "react";
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

export default function Checkout() {
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
  const [activeStep, setActiveStep] = useState(1);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

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
    <div className="es_container">
      <div className="py-10">
        {/* Step Navigation */}
        <div className="flex justify-center flex-wrap">
          {/* Step - 1 */}
          <p
            className={`md:text-xl sm:text-lg font-semibold pb-2 flex gap-1 items-center cursor-pointer  ${
              activeStep >= 1 ? "text-primaryDeepColor" : ""
            }`}
            onClick={() => handleStepClick(1)}
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
            className={`md:text-xl sm:text-lg font-semibold pb-2 flex gap-1 items-center cursor-pointer  ${
              activeStep >= 2 ? "text-primaryDeepColor" : "text-gray-700"
            }`}
            onClick={() => handleStepClick(2)}
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
            className={`md:text-xl sm:text-lg font-semibold pb-2 flex gap-1 items-center  cursor-pointer ${
              activeStep >= 3 ? "text-primaryDeepColor" : "text-gray-700"
            }`}
            onClick={() => handleStepClick(3)}
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

            {/* Left side step 1 */}
            {activeStep === 1 && (
              <CartItems
                cart={cart}
                totalQuantity={totalQuantity}
                subTotal={subTotal}
              />
            )}
            {/* Left side step 2 */}

            {activeStep === 2 && <Address />}
            {/* Left side step 3 */}
            {activeStep === 3 && <Payment />}
            {/* Right side  */}

            <RightSideAmount
              subTotal={subTotal}
              totalQuantity={totalQuantity}
              handleContinue={handleContinue}
              handleBack={handleBack}
              settingData={settingData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
