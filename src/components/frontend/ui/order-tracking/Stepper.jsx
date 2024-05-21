import { useEffect, useState } from "react";
import "./stepper.css";
import { TiTick } from "react-icons/ti";

const steps = [
    "Pending",
    "Processing",
    "complete",
    "Delivered",
];

const Stepper = ({ order }) => {
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
                    <p className="text-gray-500">{step}</p>
                </div>
            ))}
        </div>
    );
};

export default Stepper;
