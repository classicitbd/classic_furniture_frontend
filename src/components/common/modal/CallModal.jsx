import { RxCross1 } from "react-icons/rx";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const CallModal = ({ phone, setOpenCallModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative text-left bg-white rounded-lg shadow-xl w-full sm:w-[400px] p-6 max-h-[90vh] mx-4">
        <div className="absolute -top-3 -right-3">
          <button
            onClick={() => setOpenCallModal(false)}
            className=" rounded-full bg-gray-600 p-2 hover:bg-gray-700 text-white"
          >
            <RxCross1 size={14}></RxCross1>
          </button>
        </div>

        <h2 className="text-center mt-3 text-xl text-wrap tracking-tight leading-7">
          Thank you for your business! We look forward to working with you again
        </h2>
        <div className="flex items-center justify-center gap-3 mt-5">
          <span>
            <TfiHeadphoneAlt className="text-xl" />
          </span>
          <h3 className="text-[18px] leading-4 font-[400]">
            <strong>Call Us: </strong>
            <span className="text-[16px]">{phone}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
