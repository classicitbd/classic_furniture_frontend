export default function RightSideAmount({
  subTotal,
  handleBack,
  handleContinue,
}) {
  return (
    <div className=" rounded-lg border shadow bg-white p-4">
      <div className="md:px-6   py-3 ">
        <div className="pb-1.5 flex justify-between items-center">
          <p>Item total</p>
          <p>৳ {subTotal}</p>
        </div>
        <div className="flex justify-between py-2 items-center">
          {" "}
          <p>Delivery fee</p>
          <p>৳ 100</p>
        </div>
        <hr />
        <div className="flex justify-between py-2 items-center">
          {" "}
          <p>Grand total</p>
          <p>৳ {subTotal}</p>
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
  );
}
