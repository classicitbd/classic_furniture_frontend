import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useUpdateOrderMutation } from "../../../redux/feature/order/orderApi";

const OrderCompleteModal = ({ setIsCompleteOpen, isCompleteData, refetch }) => {
  const [completeOrder] = useUpdateOrderMutation(); //Complete Order

  const handleComplete = () => {
    const sendData = {
      _id: isCompleteData?._id,
    };
    completeOrder(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Order Complete successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setIsCompleteOpen(false);
        window.location.reload();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[700px] p-6 max-h-[100vh] overflow-y-auto">
          <div className="flex justify-end">
            <button className="btn bg-white hover:bg-white border p-1">
              <RxCross1
                onClick={() => setIsCompleteOpen(false)}
                size={25}
              ></RxCross1>
            </button>
          </div>

          <h2 className="text-green-500 text-center mt-8 text-xl">
            Are you sure you want to complete this item?
          </h2>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleComplete()}
              className="btn bg-green-500 hover:bg-green-300 border border-gray-300 rounded-md text-white px-4 py-2"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCompleteModal;
