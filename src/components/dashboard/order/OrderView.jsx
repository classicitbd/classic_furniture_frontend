/* eslint-disable react/prop-types */
import { RxCross1 } from "react-icons/rx";

const OrderView = ({ setIsViewOpen, isViewData }) => {

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[700px] p-6 max-h-[100vh] overflow-y-auto">

                    <div className="flex items-center justify-between">
                        <h3 className="text-[26px] font-bold text-[#0A0A0A] capitalize" id="modal-title"> Order Information </h3>
                        <button className='btn bg-white hover:bg-white border p-1'><RxCross1 onClick={() => setIsViewOpen(false)} size={25}></RxCross1></button>
                    </div>

                    {/* Order view start */}

                        <div className="space-y-2 border-t pt-3 mt-4">
                            {isViewData?.order?.map((order) => (
                                <div
                                    className="flex items-center justify-between gap-2 border-b pb-3"
                                    key={order?._id}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-[150px] h-[100px] border rounded mr-3">
                                            <img
                                                src={order?.thumbnail_image}
                                                alt={order?.title}
                                                className="object-fill rounded"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="font-semibold">
                                                {order?.title}
                                            </h2>
                                            <h4 className="font-medium">
                                                Color: {order?.color}
                                            </h4>
                                            <h4 className="font-medium">
                                                Size: {order?.size}
                                            </h4>
                                            <h4 className="font-medium">
                                                Quantity: {order?.quantity}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


            {/* Product view end */}

        </div >
            </div >
        </>
    );
};

export default OrderView;