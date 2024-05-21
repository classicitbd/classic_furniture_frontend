
import { useForm } from "react-hook-form";
import { useOrderTrackingMutation } from "../../../../redux/feature/order/orderApi";
import MiniSpinner from "../../../../shared/loader/MiniSpinner";
import { useNavigate } from "react-router-dom";

const OrderTrackingForm = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [orderTracking, { isLoading }] = useOrderTrackingMutation();
    const handleOnSubmit = async (data) => {
        try {
            const res = await orderTracking(data);
            if (res?.data?.statusCode === 200 && res?.data?.success) {
                sessionStorage.setItem("furniture-order-track", JSON.stringify(res?.data?.data));
                navigate('/order-tracking-details')
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="grid grid-cols-1 gap-6 mt-4">
                    <div>
                        <label className="text-gray-700" htmlFor="order_id">
                            <span>Order Id</span>
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            id="order_id"
                            placeholder="order id"
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                            {...register("order_id", { required: "Order Id is required!" })}
                        />
                        {errors?.order_id && (
                            <span className="text-danger">{errors?.order_id?.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="text-gray-700" htmlFor="user_phone">
                            <span>Phone</span>
                            <span className="text-danger">*</span>
                        </label>
                        <input
                            id="user_phone"
                            minLength={11}
                            maxLength={11}
                            placeholder="phone"
                            type="phone"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                            {...register("customer_phone", {
                                required: "Phone Number is required!",
                            })}
                        />
                        {errors?.customer_phone && (
                            <span className="text-danger">
                                {errors?.customer_phone?.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    {isLoading ? (
                        <button
                            disabled
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            <MiniSpinner />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Track
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default OrderTrackingForm;
