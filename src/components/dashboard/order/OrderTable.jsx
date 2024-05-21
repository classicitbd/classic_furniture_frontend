// import { BiSearch } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import OrderDeleteModal from "./OrderDeleteModal";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { BASE_URL } from "../../../utils/baseURL";
import Pagination from "../../../shared/pagination/Pagination";
import { GrCompliance } from "react-icons/gr";
import { CgSandClock } from "react-icons/cg";
import axios from "axios";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useQuery } from "@tanstack/react-query";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { FaCartPlus, FaMoneyBillAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useOrderStatusUpdateMutation, useOrderTypeUpdateMutation } from "../../../redux/feature/order/orderApi";
import { toast } from "react-toastify";
import OrderView from "./orderView/OrderView";

const OrderTable = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isViewData, setIsViewData] = useState({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteData, setIsDeleteData] = useState({});

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allResetProducts, setAllResetProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [oneStartDate, setOneStartDate] = useState(new Date());
  const [totalData, setTotalData] = useState(0);

  const [calendarVisible, setCalendarVisible] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/order?page=${page}&limit=${rows}&searchTerm=${searchTerm}`)
      .then((response) => {
        setProducts(response?.data?.data);
        setAllProducts(response?.data?.data);
        setAllResetProducts(response?.data?.data);
        setTotalData(response?.data?.totalData);
        setLoading(false);
      });
  }, [page, rows, searchTerm]);

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelect = (date) => {
    const startdate = new Date(date.selection.startDate);
    const enddate = new Date(date.selection.endDate);

    const start_date = startdate.toISOString();
    const end_date = enddate.toISOString();

    let filtered = allProducts?.filter((product) => {
      let productDate = product.createdAt;
      return productDate >= start_date && productDate <= end_date;
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setProducts(filtered);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  const formattedDateRange = `${selectionRange?.startDate?.toLocaleDateString() ?? ""
    } - ${selectionRange?.endDate?.toLocaleDateString() ?? ""}`;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${date.toLocaleDateString()} ${hours}:${minutes}`;
    return formattedDate;
  };

  // if select one date then filter order
  const handleOneDateSelect = (date) => {
    setOneStartDate(date);
    const selectDate = date.toISOString().split("T")[0]; // Extracts date part in 'YYYY-MM-DD' format

    let filtered = allProducts?.filter((product) => {
      let productDatePart = product.createdAt.split("T")[0];
      return productDatePart === selectDate;
    });
    setProducts(filtered);
  };

  const {
    data: totalOrderInfo = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/api/v1/order/total_order"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/order/total_order`);
      const data = await res.json();
      return data;
    },
  }); // get Total order info type


  // open view modal
  const handleView = (data) => {
    setIsViewData(data);
    setIsViewOpen(true);
  };

  // open delete modal
  const handleDelete = (data) => {
    setIsDeleteData(data);
    setIsDeleteOpen(true);
  };

  const [updateOrderStatus] = useOrderStatusUpdateMutation(); //Update Order Status
  const [updateOrderType] = useOrderTypeUpdateMutation(); //Update Order Status

  const handleOrderStatus = (status, _id) => {
    const sendData = {
      order_status: status,
      _id,
    };
    updateOrderStatus(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Order status update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  const handleOrderType = (type, _id) => {
    const sendData = {
      order_type: type,
      _id,
    };
    updateOrderType(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Order type update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  if (isLoading || loading) {
    return <BigSpinner />;
  }

  return (
    <div>
      {/* Order info tabs */}
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 mt-6 gap-3">
        <div className="bg-[#D4F3FB] rounded-xl border border-gray-300 flex items-center justify-between p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] bg-[#00B7E9] rounded-full">
              <FaCartPlus
                size={20}
                color="#FFFFFF"
                className="relative left-1 top-2"
              />
            </p>
          </div>
          <div>
            <p className="text-end">Total</p>
            <h2 className="font-medium text-[24px]">
              {totalOrderInfo?.data?.totalOrder}
            </h2>
          </div>
        </div>

        <div className="bg-[#DEF6EE] rounded-xl border border-gray-300 flex items-center justify-between p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] bg-[#3EC99E] rounded-full">
              <CgSandClock
                size={20}
                color="#FFFFFF"
                className="relative left-1 top-2"
              />
            </p>
          </div>
          <div>
            <p className="text-end">Pending</p>
            <h2 className="font-medium text-[24px]">
              {totalOrderInfo?.data?.pendingOrder}
            </h2>
          </div>
        </div>

        <div className="bg-red-200 rounded-xl border border-red-300 flex items-center justify-between p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] bg-[#837DFB] rounded-full">
              <GrCompliance
                size={18}
                color="#FFFFFF"
                className="relative left-1 top-2"
              />
            </p>
          </div>
          <div>
            <p className="text-end">Cancel</p>
            <h2 className="font-medium text-[24px]">
              {totalOrderInfo?.data?.cancelOrder}
            </h2>
          </div>
        </div>

        <div className="bg-[#EAE9FE] rounded-xl border border-gray-300 flex items-center justify-between p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] bg-teal-500 rounded-full">
              <FaMoneyBillAlt
                size={20}
                color="#FFFFFF"
                className="relative left-1 top-2"
              />
            </p>
          </div>
          <div>
            <p className="text-end">Success</p>
            <h2 className="font-medium text-[24px]">
              {totalOrderInfo?.data?.successOrder}
            </h2>
          </div>
        </div>

        <div className="bg-teal-100 rounded-xl border border-gray-300 flex items-center justify-between p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] bg-teal-500 rounded-full">
              <FaMoneyBillAlt
                size={20}
                color="#FFFFFF"
                className="relative left-1 top-2"
              />
            </p>
          </div>
          <div>
            <p className="text-end">Revenue</p>
            <h2 className="font-medium text-[24px]">
              ৳ {totalOrderInfo?.data?.totalPrice}
            </h2>
          </div>
        </div>

      </div>

      <div className="flex items-center justify-between gap-1 mt-2">
        <div className="flex items-center gap-4">
          <div ref={calendarRef}>
            <input
              type="text"
              value={formattedDateRange}
              className="border p-2 rounded-md"
              onClick={toggleCalendar}
            />
            {calendarVisible && (
              <div style={{ position: "absolute", zIndex: 1 }}>
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                />
              </div>
            )}
          </div>
          <DatePicker
            selected={oneStartDate}
            className="border p-2 rounded-md"
            onChange={(date) => handleOneDateSelect(date)}
          />
          <button
            onClick={() => setProducts(allResetProducts)}
            type="button"
            className="btn bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center gap-2 rounded-xl border border-[#E7E7E7] bg-gray-50 px-[5px] py-2 mt-[16px]">
            <BiSearch className="text-[#717171]" size={20} />
            <input
              onKeyDown={(e) => handleSearch(e)}
              type="text"
              placeholder="Search..."
              className="bg-gray-50 bg-none w-full outline-none text-[14px] font-semibold placeholder-[#717171]"
            />
          </div>
        </div>
      </div>

      {/* Table for showing data */}
      {
        // orders?.data?.length > 0 ?
        products?.length > 0 ? (
          <div className="mt-5 overflow-x-auto rounded bg-white scrollbar-thin pb-2">
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Order ID
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Phone
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Time
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Transaction Id
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Order Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Payment Type
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Payment
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Payment Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Total Price
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Pay
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Due
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Delivery
                  </th>
                  <th className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {products?.map((order) => (
                  <tr key={order?._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {order?.order_id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {order?.customer_id?.user_name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {order?.customer_phone}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {formatDate(order?.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {order?.transaction_id || "N/A"}
                    </td>

                    <td
                      className={`whitespace-nowrap py-2 font-semibold capitalize`}
                    >
                      {/* {order?.order_status} */}
                      <select
                        onChange={(e) =>
                          handleOrderStatus(e.target.value, order?._id)
                        }
                        id="order_status"
                        className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                      >
                        <option selected value={order?.order_status}>
                          {order?.order_status}
                        </option>
                        {order?.order_status !== "pending" && (
                          <option value="pending">Pending</option>
                        )}
                        {order?.order_status !== "processing" && (
                          <option value="processing">Processing</option>
                        )}
                        {order?.order_status !== "complete" && (
                          <option value="complete">Complete</option>
                        )}
                        {order?.order_status !== "delivered" && (
                          <option value="delivered">Delivered</option>
                        )}
                      </select>
                    </td>

                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {order?.payment_type}
                    </td>

                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {order?.payment_method}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {order?.payment_status}
                    </td>

                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {order?.total_amount}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {order?.pay_amount}
                    </td>

                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {order?.due_amount}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {order?.delivery_method}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                      <IoEyeOutline
                        onClick={() => handleView(order)}
                        className="cursor-pointer text-gray-500 hover:text-gray-300"
                        size={25}
                      />
                      <select
                        onChange={(e) =>
                          handleOrderType(e.target.value, order?._id)
                        }
                        id="order_type"
                        className="px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                      >
                        <option selected value={order?.order_type}>
                          {order?.order_type}
                        </option>
                        {order?.order_type !== "pending" && (
                          <option value="pending">Pending</option>
                        )}
                        {order?.order_type !== "success" && (
                          <option value="success">Success</option>
                        )}
                        {order?.order_type !== "cancel" && (
                          <option value="cancel">Cancel</option>
                        )}
                      </select>
                      <MdDeleteForever
                        onClick={() => handleDelete(order)}
                        className="cursor-pointer text-red-500 hover:text-red-300"
                        size={25}
                      />
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

      <hr />

      {/* Pagination */}
      <Pagination
        rows={rows}
        page={page}
        setPage={setPage}
        setRows={setRows}
        totalData={totalData}
      />

      {/* Handle open view modal */}
      {isViewOpen && (
        <OrderView setIsViewOpen={setIsViewOpen} isViewData={isViewData} />
      )}

      {/* Handle open delete modal */}
      {isDeleteOpen && (
        <OrderDeleteModal
          setIsDeleteOpen={setIsDeleteOpen}
          isDeleteData={isDeleteData}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default OrderTable;
