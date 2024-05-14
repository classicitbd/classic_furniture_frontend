import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { HiMinus, HiOutlinePlus } from "react-icons/hi";
import { useSelector } from "react-redux";
import { CiCreditCard1, CiLocationOn } from "react-icons/ci";

export default function Checkout() {
  const cart = useSelector((state) => state.furnitureCart.products);
  console.log(cart);
  const [quantity, setQuantity] = useState(1);
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
  return (
    <div className="es_container">
      <div className="py-10">
        {/* Step Navigation */}
        <div className="flex justify-center flex-wrap">
          {/* Step - 1 */}
          <p
            className={`md:text-xl sm:text-lg font-semibold pb-2 flex gap-1 items-center   ${
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
            className={`md:text-xl sm:text-lg font-semibold pb-2 flex gap-1 items-center   ${
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
            className={`md:text-xl sm:text-lg font-semibold pb-2 flex gap-1 items-center   ${
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
          <div className="flex justify-between items-center">
            <p className="md:text-3xl  font-semibold pt-8 pb-2 flex gap-2 items-center">
              <BsCart size={26} /> Shopping Bag Item {cart.length}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 my-4  lg:gap-8  ">
            {/* Left side condition aria */}

            {/* Left side step 1 */}
            {activeStep === 1 && (
              <div className="w-full  md:w-[68%] bg-white border shadow rounded-lg p-4">
                {cart?.map((product, index) => (
                  <div
                    className="border rounded mb-4 flex justify-between "
                    key={index}
                  >
                    <div className="flex  flex-col sm:flex-row md:px-0 px-4  gap-4">
                      <img
                        className="md:w-36 md:h-36 w-20 h-20  rounded-l"
                        src={product?.product_thumbnail}
                        alt=""
                      />
                      <div className="py-1.5 md:px-4 ">
                        <p className="md:text-xl text-sm font-semibold text-gray-600 ">
                          {product?.product_name}
                        </p>
                        <p className="py-1">Color: {product?.color}</p>
                        <p className="py-1">Price: {product?.price}</p>
                      </div>
                    </div>
                    <dir>
                      <button className="flex gap-2 px-2  bg-red-500 hover:bg-red-600 duration-200 text-white p-1 rounded my-4 text-[12px]">
                        Remove <BiTrash size={16} />
                      </button>
                      {/* quantity */}
                      <div>
                        <div>
                          <p className="font-semibold text-sm text-gray-800">
                            Quantity
                          </p>
                          <div className="flex items-center my-2  gap-2.5 flex-wrap ">
                            <div className="flex  ">
                              <button
                                type="button"
                                className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2] border border-gray-200"
                                // onClick={handleDecrement}
                              >
                                <HiMinus className="text-gray-700" />
                              </button>
                              <input
                                type="number"
                                className="border border-gray-200 text-gray-800  text-xs  text-center w-14 "
                                value={quantity}
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value);
                                  if (!isNaN(newQuantity) && newQuantity >= 1) {
                                    setQuantity(newQuantity);
                                  }
                                }}
                              />
                              <button
                                type="button"
                                className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2]  border border-gray-200"
                                // onClick={handleIncrement}
                              >
                                <HiOutlinePlus className="text-gray-700" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </dir>
                  </div>
                ))}
              </div>
            )}
            {/* Left side step 2 */}

            {activeStep === 2 && (
              <div className="w-full  md:w-[68%] bg-white border shadow rounded-lg p-4">
                <p className="text-3xl font-semibold pt-8 pb-2 flex gap-2 items-center">
                  This is step 2 Your address fill here
                </p>
              </div>
            )}
            {activeStep === 3 && (
              <div className="w-full  md:w-[68%] bg-white border shadow rounded-lg p-4">
                <p className="text-3xl font-semibold pt-8 pb-2 flex gap-2 items-center">
                  This is step 3 Payment here
                </p>
              </div>
            )}
            {/* Right side  */}

            <div className="w-full md:w-[32%]  ">
              <div className=" rounded-lg border shadow bg-white p-4">
                <div className="md:px-6   py-3 ">
                  <div className="pb-1.5 flex justify-between items-center">
                    <p>Item total</p>
                    <p>৳ 26100.0</p>
                  </div>
                  <div className="flex justify-between py-2 items-center">
                    {" "}
                    <p>Delivery fee</p>
                    <p>100</p>
                  </div>
                  <hr />
                  <div className="flex justify-between py-2 items-center">
                    {" "}
                    <p>Grand total</p>
                    <p>100</p>
                  </div>

                  <div className="py-1.5 text-gray-500  flex justify-between items-center">
                    <p className="text-[12px]">Inclusive of all taxes</p>
                    <p>৳ 26100.0</p>
                  </div>
                  <hr />
                  <div className="py-3 text-gray-500  flex justify-between items-center">
                    <p className="text-[12px]">Average delivery time: ---</p>
                    <p>3 days</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      className="bg-primaryLightColor text-white px-4 py-2 w-full mt-4  rounded"
                      onClick={handleContinue}
                    >
                      Continue
                    </button>
                    <button
                      className="bg-gray-400 text-white px-4 py-2 w-full mt-4  rounded"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { BiTrash } from "react-icons/bi";
// import { BsCart } from "react-icons/bs";
// import { HiMinus, HiOutlinePlus } from "react-icons/hi";
// import { useSelector } from "react-redux";
// import { CiCreditCard1, CiLocationOn } from "react-icons/ci";

// export default function Checkout() {
//   const cart = useSelector((state) => state.furnitureCart.products);
//   const [quantity, setQuantity] = useState(1);
//   const [activeStep, setActiveStep] = useState(1);

//   const handleStepClick = (step) => {
//     setActiveStep(step);
//   };

//   const handleContinue = () => {
//     if (activeStep < 3) {
//       setActiveStep((prevStep) => prevStep + 1);
//     }
//   };
//   const handleBack = () => {
//     if (activeStep > 1) {
//       setActiveStep((prevStep) => prevStep - 1);
//     }
//   };

//   return (
//     <div className="es_container">
//       <div className="py-10">
//         <div className="flex justify-center">
//           <p
//             className={`text-xl font-semibold pb-2 flex gap-1 items-center cursor-pointer
//             ${
//               activeStep >= 1 ? "text-gray-800" : "text-gray-400"
//             }`}
//             onClick={() => handleStepClick(1)}
//           >
//             <span className="w-6 h-6 flex items-center justify-center bg-gray-400 text-white rounded-full mr-1">
//               1
//             </span>{" "}
//             Bag <BsCart size={24} />
//             <div className="w-12 h-[1px] mr-4 bg-gray-500 rounded-full"></div>
//           </p>
//           <p
//             className={`text-xl font-semibold pb-2 flex gap-1 items-center cursor-pointer ${
//               activeStep >= 2 ? "text-gray-800" : "text-gray-400"
//             }`}
//             onClick={() => handleStepClick(2)}
//           >
//             <span className="w-6 h-6 flex items-center justify-center bg-gray-400 text-white rounded-full mr-1">
//               2
//             </span>{" "}
//             Address <CiLocationOn size={24} />
//             <div className="w-12 h-[1px] mr-4 bg-gray-500 rounded-full"></div>
//           </p>
//           <p
//             className={`text-xl font-semibold pb-2 items-center cursor-pointer ${
//               activeStep >= 3 ? "text-gray-800" : "text-gray-400"
//             }`}
//             onClick={() => handleStepClick(3)}
//           >
//             <span className="w-6 h-6 flex items-center justify-center bg-gray-400 text-white rounded-full mr-1">
//               3
//             </span>{" "}
//             Payment <CiCreditCard1 size={24} />
//           </p>
//         </div>

//         {/* Render different sections based on the active step */}
//         {activeStep === 1 && (
//           <div className="lg:mx-10 md:mx-4 mx-2">This is step 1 cart item</div>
//         )}
//         {activeStep === 2 && (
//           <div className="lg:mx-10 md:mx-4 mx-2">This is step 2 address</div>
//         )}
//         {activeStep === 3 && (
//           <div className="lg:mx-10 md:mx-4 mx-2">This is step 3 payment</div>
//         )}

//         {/* Continue button */}
//         <div className="flex justify-center">
//           <button
//             onClick={handleContinue}
//             className="bg-primaryLightColor text-white px-4 py-2 mt-4 rounded"
//           >
//             Continue
//           </button>
//           <button
//             onClick={handleBack}
//             className="bg-gray-400 text-primaryColor px-4 py-2 mt-4 rounded"
//           >
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
