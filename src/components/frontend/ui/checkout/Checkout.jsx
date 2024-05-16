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

export default function Checkout() {
  const { user: userData } = useContext(AuthContext);
  const [selectedDeliveryLocation, setSelectedDeliveryLocation] =
    useState("home");

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
    <>
      {cart?.length > 0 ? (
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
                <div className="w-full md:w-[68%]">
                  <div className="flex justify-between items-center p-4 ">
                    <p className="md:text-xl  font-semibold   flex gap-2 items-center">
                      <BsCart size={26} /> Shopping Bag Item {totalQuantity}
                    </p>
                    <p className="md:text-xl  font-semibold   flex gap-2 items-center">
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
                  {activeStep === 3 && <Payment />}
                </div>

                {/* Right side  */}

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
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <section className="flex items-center h-full sm:p-16 bg-gray-50 text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-40 h-40 text-gray-400"
              >
                <path
                  fill="currentColor"
                  d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
                ></path>
                <rect
                  width="176"
                  height="32"
                  x="168"
                  y="320"
                  fill="currentColor"
                ></rect>
                <polygon
                  fill="currentColor"
                  points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
                ></polygon>
                <polygon
                  fill="currentColor"
                  points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
                ></polygon>
              </svg>
              <p className="text-3xl">
                Looks like our product is currently unavailable!
              </p>
              <Link
                to="/"
                rel="noopener noreferrer"
                className="px-8 py-3 font-semibold rounded bg-orange-600 text-gray-50 hover:scale-105 duration-100"
              >
                Back to homepage
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}
