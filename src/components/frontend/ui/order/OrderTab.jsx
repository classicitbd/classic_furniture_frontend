import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../utils/baseURL";
import OrderViewModal from "../../../common/modal/OrderVeiwModal";
import ProductNotFound from "../../../common/productNotFound/ProductNotFound";
import { FaCartPlus, FaMoneyBillAlt } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import { CgSandClock } from "react-icons/cg";
import BigSpinner from "../../../../shared/loader/BigSpinner";
import { MdOutlineCancel } from "react-icons/md";

const OrderTab = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isViewData, setIsViewData] = useState({});

  useEffect(() => {
    setLoading(true);
    axios.get(`${BASE_URL}/order/${user?.user_phone}`).then((response) => {
      setProducts(response?.data?.data);
      setLoading(false);
    });
  }, [user?.user_phone]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${date.toLocaleDateString()} ${hours}:${minutes}`;
    return formattedDate;
  };

  // open view modal
  const handleView = (data) => {
    setIsViewData(data);
    setIsViewOpen(true);
  };

  const orderPending = products.filter(
    (product) => product.order_type === "pending"
  );
  const orderSuccess = products.filter(
    (product) => product.order_type === "success"
  );
  const orderCancel = products.filter(
    (product) => product.order_type === "cancel"
  );

  const totalPrice = products.reduce((total, product) => {
    return total + product.total_amount;
  }, 0);

  if (loading) {
    return <BigSpinner />;
  }

  return (
    <div>
      {/* ------ Order info tabs ------ start */}
      <div className="grid lg:grid-cols-5 grid-cols-2 mt-6 gap-3 py-6">
        <div className="bg-[#D4F3FB] rounded-xl border border-gray-300 flex items-center justify-between p-3 md:p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] flex items-center justify-center bg-[#00B7E9] rounded-full">
              <FaCartPlus size={20} color="#FFFFFF" />
            </p>
          </div>
          <div>
            <p className="text-end">Total</p>
            <h2 className="font-medium text-[16px] md:text-[24px]">
              {products?.length}
            </h2>
          </div>
        </div>

        <div className=" bg-[#EAE9FE] rounded-xl border border-gray-300 flex items-center justify-between p-3 md:p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] flex items-center justify-center bg-[#3EC99E] rounded-full">
              <CgSandClock size={20} color="#FFFFFF" />
            </p>
          </div>
          <div>
            <p className="text-end">Pending</p>
            <h2 className="font-medium text-[16px] md:text-[24px]">
              {orderPending?.length}
            </h2>
          </div>
        </div>
        <div className="bg-red-50 rounded-xl border border-gray-300 flex items-center justify-between p-3 md:p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] flex items-center justify-center bg-red-500 rounded-full">
              <MdOutlineCancel size={20} color="#FFFFFF" />
            </p>
          </div>
          <div>
            <p className="text-end">Cancel</p>
            <h2 className="font-medium text-[16px] md:text-[24px]">
              {orderCancel?.length}
            </h2>
          </div>
        </div>

        <div className="bg-[#DEF6EE] rounded-xl border border-gray-300 flex items-center justify-between p-3 md:p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] flex justify-center items-center bg-[#837DFB] rounded-full">
              <GrCompliance size={20} color="#FFFFFF" />
            </p>
          </div>
          <div>
            <p className="text-end">Success</p>
            <h2 className="font-medium text-[16px] md:text-[24px]">
              {orderSuccess?.length}
            </h2>
          </div>
        </div>

        <div className="bg-teal-100 rounded-xl border border-gray-300 flex items-center justify-between p-3 md:p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] flex items-center justify-center bg-teal-500 rounded-full">
              <FaMoneyBillAlt size={20} color="#FFFFFF" />
            </p>
          </div>
          <div>
            <p className="text-end">Order Price</p>
            <h2 className="font-medium text-[16px] md:text-[24px]">
              ৳ {totalPrice}.00
            </h2>
          </div>
        </div>
      </div>
      {/* ------ Order info tabs ------ end */}
      {/* ------ order table ------ start */}
      {products?.length > 0 ? (
        <div className="mt-5 overflow-x-auto scrollbar-thin rounded bg-white py-6">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead className="shadow">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Order Time
                </th>

                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Payment Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Buying Type
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Total Amount
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Pay Amount
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Due Amount
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Transaction Id
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Order Type
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Order Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Delivery Method
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products?.map((order) => (
                <tr key={order?._id}>
                  {/* Order id */}
                  <td className="whitespace-nowrap px-4 py-2 font-light text-black">
                    {order?.order_id}
                  </td>
                  {/* Order time */}
                  <td
                    className={`whitespace-nowrap px-4 py-2 font-light text-black`}
                  >
                    {formatDate(order?.createdAt)}
                  </td>

                  {/* Payment Status */}
                  <td
                    className={`whitespace-nowrap px-4 py-2 font-light text-black `}
                  >
                    <span
                      className={`px-2 ${
                        order?.payment_status === "pending"
                          ? "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
                          : "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                      }`}
                    >
                      {order?.payment_status}
                    </span>
                  </td>
                  {/* Buying type */}
                  <td className="whitespace-nowrap px-4 py-2 font-light text-black">
                    {order?.buying_type || "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-light text-black">
                    {order?.total_amount} ৳
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-light text-black">
                    {order?.pay_amount} ৳
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-light text-black">
                    {order?.due_amount} ৳
                  </td>

                  {/* Transaction id */}
                  <td className="whitespace-nowrap px-4 py-2 font-light text-black">
                    {order?.transaction_id || "N/A"}
                  </td>

                  {/* Order type pending or success or cancel */}
                  <td
                    className={`whitespace-nowrap px-4 py-2 font-light text-black `}
                  >
                    <span
                      className={`px-2 ${
                        order?.order_type === "pending" &&
                        "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
                      } ${
                        order?.order_type === "success" &&
                        "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                      } ${
                        order?.order_type === "cancel" &&
                        "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-600/20"
                      }`}
                    >
                      {order?.order_type}
                    </span>
                  </td>
                  {/* Order status delivered or pending or processing */}
                  <td
                    className={`whitespace-nowrap px-4 py-2 font-light text-black `}
                  >
                    <span
                      className={`px-2 ${
                        order?.order_status === "pending" ||
                        order?.order_status === "processing"
                          ? "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
                          : "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                      }`}
                    >
                      {order?.order_status}
                    </span>
                  </td>
                  {/* Delivery method "home" | "shop"; */}

                  <td className="whitespace-nowrap px-4 py-2 font-light text-black">
                    {order?.delivery_method}
                  </td>

                  {/* details button */}
                  <td
                    onClick={() => handleView(order)}
                    className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4"
                  >
                    <button className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ProductNotFound />
      )}

      {/* ------ order table ------ end */}

      {/* ------ Handle open view modal ------ start */}
      {isViewOpen && (
        <OrderViewModal setIsViewOpen={setIsViewOpen} isViewData={isViewData} />
      )}

      {/* ------ Handle open view modal ------ end */}
    </div>
  );
};

export default OrderTab;
