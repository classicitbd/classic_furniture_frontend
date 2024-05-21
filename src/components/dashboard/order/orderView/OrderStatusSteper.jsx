import { useEffect, useState } from "react";
import "./steper.css";
import { TiTick } from "react-icons/ti";

const OrderStatusSteper = ({ order }) => {
  const steps = [
    { step: "Pending", time: order?.pending_time },
    { step: "Processing", time: order?.processing_time },
    { step: "Complete", time: order?.complete_time },
    { step: "Delivered", time: order?.delivered_time },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (
      order?.pending_time &&
      !order?.processing_time &&
      !order?.complete_time &&
      !order?.delivered_time
    ) {
      setCurrentStep(1);
    } else if (
      order?.pending_time &&
      order?.processing_time &&
      !order?.complete_time &&
      !order?.delivered_time
    ) {
      setCurrentStep(2);
    } else if (
      order?.pending_time &&
      order?.processing_time &&
      order?.complete_time &&
      !order?.delivered_time
    ) {
      setCurrentStep(3);
    } else if (
      order?.pending_time &&
      order?.processing_time &&
      order?.complete_time &&
      order?.delivered_time
    ) {
      setCurrentStep(4);
    }
  }, [order]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Dhaka",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };

  return (
    <div className="min-w-[679px] flex justify-between">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`step-item ${currentStep === i + 1 && "active"} ${i + 1 < currentStep && "complete"
            } `}
        >
          <div className="step">
            {i + 1 < currentStep ? <TiTick size={18} /> : i + 1}
          </div>
          <div className="">
            <p className="text-gray-500 text-center">{step?.step}</p>
            {step?.time && (
              <p className="text-gray-500">{formatDate(step?.time)}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusSteper;
