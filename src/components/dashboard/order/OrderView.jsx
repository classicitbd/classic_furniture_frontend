import { RxCross1 } from "react-icons/rx";
import "./OrderView.css";

const OrderView = ({ setIsViewOpen, isViewData }) => {
  const handlePrint = () => {
    const printContent = document.getElementById("invoicePrintArea");
    const originalBody = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;

    window.print();

    // Restore the original content after printing
    document.body.innerHTML = originalBody;

    // Reload the page after printing
    setTimeout(() => {
      location.reload();
    }, 10);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${date.toLocaleDateString()} ${hours}:${minutes}`;
    return formattedDate;
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[1000px] p-6 max-h-[100vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3
              className="text-[26px] font-bold text-[#0A0A0A] capitalize"
              id="modal-title"
            >
              {" "}
              Order Information{" "}
            </h3>
            <button className="btn bg-white hover:bg-white border p-1">
              <RxCross1
                onClick={() => setIsViewOpen(false)}
                size={25}
              ></RxCross1>
            </button>
          </div>
          {/* start */}

          <div
            className="vertical-layout vertical-menu-modern  navbar-floating footer-static  "
            data-open="click"
            data-menu="vertical-menu-modern"
            data-col=""
          >
            <div className="app-content content ">
              <div className="content-overlay"></div>
              <div className="header-navbar-shadow"></div>
              <div className="content-wrapper">
                <div className="content-body">
                  <section>
                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-body">
                            <div>
                              <div id="invoicePrintArea">
                                <div className="my-page page" size="A4">
                                  <div className="invoice__body">
                                    <div className="customer__info">
                                      <ul>
                                        <li>
                                          <h4>
                                            OrderId :{" "}
                                            <span>{isViewData?.orderId}</span>
                                          </h4>
                                        </li>
                                        <li>
                                          <h4>
                                            Curior :{" "}
                                            <span>
                                              {isViewData?.curior}
                                            </span>
                                          </h4>
                                        </li>
                                        <li>
                                          <h4>
                                            Transaction Id:{" "}
                                            <span>
                                              {isViewData?.transactionId}
                                            </span>
                                          </h4>
                                        </li>
                                        <li>
                                          <h4>
                                            Customer Name :{" "}
                                            <span>
                                              {isViewData?.userInfo?.name}
                                            </span>
                                          </h4>
                                        </li>
                                        <li>
                                          <h4>
                                            Date :{" "}
                                            <span>
                                              {formatDate(
                                                isViewData?.createdAt
                                              )}
                                            </span>
                                          </h4>
                                        </li>
                                        <li>
                                          <h4>
                                            Customer Phone :{" "}
                                            <span>{isViewData?.phone}</span>
                                          </h4>
                                        </li>
                                        <li>
                                          <h4>
                                            Shipping Price :{" "}
                                            <span>
                                              {isViewData?.shipping_price}
                                            </span>
                                          </h4>
                                        </li>
                                        <li>
                                          <h4>
                                            Customer Address :{" "}
                                            <span>{isViewData?.address}</span>
                                          </h4>
                                        </li>
                                        <li>
                                          <h4>
                                            Method :{" "}
                                            <span>
                                              {isViewData?.payment_type}
                                            </span>
                                          </h4>
                                        </li>
                                        <li>
                                          <h4>
                                            Division :{" "}
                                            <span>{isViewData?.division}</span>
                                          </h4>
                                        </li>
                                        <li>
                                          <h4>
                                            Total Include Shipping :{" "}
                                            <span>
                                              {isViewData?.totalPrice}
                                            </span>
                                          </h4>
                                        </li>
                                        <li>
                                          <h4>
                                            District :{" "}
                                            <span>{isViewData?.district}</span>
                                          </h4>
                                        </li>
                                      </ul>
                                    </div>

                                    <div
                                      className="table__space najmul overflow-x-auto"
                                      style={{
                                        paddingBottom: "20px",
                                        borderTop: "1px solid #ddd",
                                        marginTop: "120px",
                                        paddingTop: "20px",
                                        borderBottom: "1px solid #ddd",
                                        marginBottom: "20px",
                                      }}
                                    >
                                      <table className="min-w-full divide-y-2 divide-gray-200 text-sm mb-10">
                                        <thead>
                                          <tr>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                              #
                                            </th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                              Item Image
                                            </th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                              Item Name
                                            </th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                              Unit Price
                                            </th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                              Quantity
                                            </th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                              Color
                                            </th>
                                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                              Size
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                          {isViewData?.order?.map(
                                            (order, index) => (
                                              <tr key={order?._id}>
                                                <td className="whitespace-nowrap px-4 py-2 font-semibold">
                                                  {index + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 font-semibold">
                                                  <img
                                                    src={order?.thumbnail_image}
                                                    alt="image"
                                                    className="w-20 h-20"
                                                  />
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 font-semibold">
                                                  {order?.title}
                                                </td>
                                                <td
                                                  className={`whitespace-nowrap px-4 py-2 font-semibold`}
                                                >
                                                  {order?.price}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 font-semibold">
                                                  {order?.quantity}
                                                </td>

                                                <td
                                                  className={`whitespace-nowrap px-4 py-2 font-semibold`}
                                                >
                                                  {order?.color}
                                                </td>

                                                <td
                                                  className={`whitespace-nowrap px-4 py-2 font-semibold`}
                                                >
                                                  {order?.size}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>

                                    <h2 className="text-xl font-semibold text-sky-500 text-end mb-3">
                                      Total Product Price:{" "}
                                      {isViewData?.order?.reduce(
                                        (prev, next) =>
                                          prev +
                                          parseInt(next.price) *
                                            parseInt(next.quantity),
                                        0
                                      )}
                                    </h2>

                                    <h2 style={{ textAlign: "center" }}>
                                      Thank You !
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="text-center px-3 my-1">
                              <div className="mb-1 pb-1">
                                <button
                                  type="button"
                                  onClick={() => handlePrint()}
                                  className="btn bg-sky-500 hover:bg-sky-400 px-4 py-2 text-white border rounded-lg"
                                >
                                  Print
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>

          {/* end */}
        </div>
      </div>
    </>
  );
};

export default OrderView;
