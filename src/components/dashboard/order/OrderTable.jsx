/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
// import { BiSearch } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import OrderDeleteModal from "./OrderDeleteModal";
import OrderView from "./OrderView";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { BASE_URL } from "../../../utils/baseURL";
import Pagination from "../../../shared/pagination/Pagination";
import { GrCompliance } from "react-icons/gr";
import { CgSandClock } from "react-icons/cg";
import axios from "axios";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { FaCartPlus, FaMoneyBillAlt } from "react-icons/fa";
import OrderCompleteModal from "./OrderCompleteModal";

const OrderTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isViewData, setIsViewData] = useState({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteData, setIsDeleteData] = useState({});

  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isCompleteData, setIsCompleteData] = useState("");

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalData, setTotalData] = useState(0);

  const [calendarVisible, setCalendarVisible] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/order?page=${page}&limit=${rows}`)
      .then((response) => {
        setProducts(response?.data?.data);
        setAllProducts(response?.data?.data);
        setTotalData(Response?.data?.totalData);
      });
  }, [page, rows]);

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

  //

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  const formattedDateRange = `${
    selectionRange?.startDate?.toLocaleDateString() ?? ""
  } - ${selectionRange?.endDate?.toLocaleDateString() ?? ""}`;

  useEffect(() => {
    if (searchTerm != "") {
      fetch(`${BASE_URL}/order/searchOrder/${searchTerm}`)
        .then((response) => response.json())
        .then((result) => {
          if (result?.statusCode == 200 && result?.success == true) {
            setProducts(result?.data);
            setAllProducts(result?.data);
          } else {
            toast.error(result?.error?.data?.message);
          }
        });
    } else {
      setSearchTerm("");
    }
  }, [searchTerm]);

 const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${date.toLocaleDateString()} ${hours}:${minutes}`;
    return formattedDate;
  };

  const {
    data: totalOrderInfo = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/api/v1/order/totalOrder"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/order/totalOrder`);
      const data = await res.json();
      return data;
    },
  }); // get Total order info type

  if (isLoading) {
    return <BigSpinner />;
  }

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

  // open complete modal
  const handleOrderComplete = (data) => {
    setIsCompleteData(data);
    setIsCompleteOpen(true);
  };

  return (
    <div>
      {/* Order info tabs */}
      <div className="grid lg:grid-cols-4 grid-cols-2 mt-6 gap-3">
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

        <div className="bg-[#EAE9FE] rounded-xl border border-gray-300 flex items-center justify-between p-6 gap-4">
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
              $ {totalOrderInfo?.data?.totalPrice}
            </h2>
          </div>
        </div>
      </div>

      {/* Date and search field */}

      <div className="flex items-center justify-between gap-1">
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
          <div className="mt-5 overflow-x-auto rounded bg-white">
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
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Payment
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
                      {order?.orderId}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {order?.userInfo?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {order?.phone}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {formatDate(order?.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {order?.transactionId || "N/A"}
                    </td>

                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {order?.status}
                    </td>

                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {order?.type}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                      <IoEyeOutline
                        onClick={() => handleView(order)}
                        className="cursor-pointer text-gray-500 hover:text-gray-300"
                        size={25}
                      />
                      {order?.status == "complete" && order?.type == "paid" ? (
                        <button className="btn bg-green-500 hover:bg-green-400 border border-gray-300 rounded-md text-sm text-white p-2 btn-sm">
                          Completed
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOrderComplete(order)}
                          className="btn bg-blue-500 hover:bg-blue-400 border border-gray-300 rounded-md text-sm text-white p-2 btn-sm"
                        >
                          Complete?
                        </button>
                      )}
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

      {/* Handle open Complete modal */}
      {isCompleteOpen && (
        <OrderCompleteModal
          setIsCompleteOpen={setIsCompleteOpen}
          isCompleteData={isCompleteData}
          refetch={refetch}
        />
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
