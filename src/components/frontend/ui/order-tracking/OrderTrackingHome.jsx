import OrderTrackingForm from "./OrderTrackingForm";
import image from './order-tracking.webp'

const OrderTrackingHome = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-5 bg-white shadow rounded-md">
            <div className="flex items-center justify-center">
                <img
                    src={image}
                    alt="tracking-logo"
                    className="border p-2 rounded-md w-[500px] h-[500px]"
                />
            </div>
            <div>
                <article>
                    <h4 className="font-semibold">Track Your Order Status</h4>
                    <p>
                        To track your order Status please enter your Invoice No in the box
                        below and press &quot;Track&ldquo; button. This was given to you on
                        your receipt and in the confirmation phone you should have received.
                    </p>
                </article>
                <OrderTrackingForm />
            </div>
        </div>
    );
};

export default OrderTrackingHome
