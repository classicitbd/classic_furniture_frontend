import { RxCross1 } from "react-icons/rx";

const OrderViewModal = ({ setIsViewOpen, isViewData }) => {
  // const handlePrint = () => {
  //   const printContent = document.getElementById("invoicePrintArea");
  //   const originalBody = document.body.innerHTML;

  //   document.body.innerHTML = printContent.innerHTML;

  //   window.print();

  //   // Restore the original content after printing
  //   document.body.innerHTML = originalBody;

  //   // Reload the page after printing
  //   setTimeout(() => {
  //     location.reload();
  //   }, 10);
  // };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 px-2">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full md:w-[1000px] p-6 max-h-[100vh]">
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
            <div className="app-content content" id="invoicePrintArea">
              <div className="overflow-x-auto">
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
                        Shipping Price
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
                    {isViewData?.order?.map((order, index) => (
                      <tr key={order?._id}>
                        <td className="whitespace-nowrap px-4 py-2 font-semibold">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-semibold">
                          <img
                            loading="lazy"
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
                        <td className="whitespace-nowrap px-4 py-2 font-semibold">
                          {isViewData?.shipping_price}
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
                    ))}
                  </tbody>
                </table>
              </div>
              <h2 className="text-xl font-semibold text-sky-500 text-end mb-3">
                Total Price : {isViewData?.totalPrice}
              </h2>
            </div>

            {/* <div className="text-center px-3 my-1">
              <div className="mb-1 pb-1">
                <button
                  type="button"
                  onClick={() => handlePrint()}
                  className="btn bg-sky-500 hover:bg-sky-400 px-4 py-2 text-white border rounded-lg"
                >
                  Print
                </button>
              </div>
            </div> */}
          </div>

          {/* end */}
        </div>
      </div>
    </>
  );
};

export default OrderViewModal;
