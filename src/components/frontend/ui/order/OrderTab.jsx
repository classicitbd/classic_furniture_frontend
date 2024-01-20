import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../../utils/baseURL";
import { AuthContext } from "../../../../context/AuthProvider";
import { IoEyeOutline } from "react-icons/io5";
import NoDataFound from "../../../common/noDataFound/NoDataFound";
import OrderViewModal from "../../../common/modal/OrderVeiwModal";

const OrderTab = () => {
  const [products, setProducts] = useState([]);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isViewData, setIsViewData] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${BASE_URL}/order/${user?.email}`).then((response) => {
      setProducts(response?.data?.data);
    });
  }, [user?.email]);

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
  console.log(products);
  return (
    <div>
      {
        // orders?.data?.length > 0 ?
        products?.length > 0 ? (
          <div className="mt-5 overflow-x-auto rounded bg-white">
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
                    Method
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Transaction Id
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Type
                  </th>
                  <th className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {products?.map((order) => (
                  <tr key={order?._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-light text-black">
                      {order?.orderId}
                    </td>

                    <td
                      className={`whitespace-nowrap px-4 py-2 font-light text-black`}
                    >
                      {formatDate(order?.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-light text-black">
                      {order?.payment_type || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-light text-black">
                      {order?.transactionId || "N/A"}
                    </td>

                    <td
                      className={`whitespace-nowrap px-4 py-2 font-light text-black ${
                        order?.status === "pending"
                          ? "text-error-300"
                          : "text-success-400"
                      }`}
                    >
                      {order?.status === "pending" ? "processing" : "delivered"}
                    </td>

                    <td
                      className={`whitespace-nowrap px-4 py-2 font-light text-black`}
                    >
                      <span
                        className={`px-2  rounded-full ${
                          order?.type === "unpaid"
                            ? "bg-yellow-100 text-black"
                            : "bg-success-300 text-white"
                        }`}
                      >
                        {order?.type}
                      </span>
                    </td>

                    <td
                      onClick={() => handleView(order)}
                      className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4"
                    >
                      <button className="text-white bg-success-300 hover:bg-success-400 px-4 py-1 rounded-full">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NoDataFound />
        )
      }
      {/* Handle open view modal */}
      {isViewOpen && (
        <OrderViewModal setIsViewOpen={setIsViewOpen} isViewData={isViewData} />
      )}
    </div>
  );
};

export default OrderTab;
