import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useDeleteOrderMutation } from "../../../redux/feature/order/orderApi";

const OrderDeleteModal = ({ setIsDeleteOpen, isDeleteData, refetch }) => {
  const [deleteOrder] = useDeleteOrderMutation(); //delete Order

  const handleDelete = () => {
    const sendData = {
      _id: isDeleteData?._id
    };
    deleteOrder(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Order Delete successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setIsDeleteOpen(false);
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
                onClick={() => setIsDeleteOpen(false)}
                size={25}
              ></RxCross1>
            </button>
          </div>

          <h2 className="text-red-500 text-center mt-8 text-xl">
            Are you sure you want to delete this item?
          </h2>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleDelete()}
              className="btn bg-red-500 hover:bg-red-300 border border-gray-300 rounded-md text-white px-4 py-2"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDeleteModal;
