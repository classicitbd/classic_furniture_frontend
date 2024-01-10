import { useState } from "react";
import { sizeData } from "../../../../data/size-data";
// Import React icons
import { CiTrash } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const AddToCart = () => {
  const [quatity, setQuantity] = useState(1);
  const [sizeVariation, setSizeVariation] = useState([]);
  const selectSize = (value) => {
    const data = {
      size: value?.size,
      quatity: 1,
      price: value?.price ? value?.price : 0,
    };
    const newValue = [...sizeVariation, data];
    setSizeVariation(newValue);
  };
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const decreaseQuantity = () => {
    setQuantity((prev) => prev - 1);
  };
  console.log(sizeVariation);
  return (
    <div>
      <div>
        {sizeData.map((item) => (
          <div className="my-3" key={item?.size}>
            {item?.quantity === 0 ? (
              <div className="flex justify-between items-center py-4 border border-bgray-300 rounded-md px-3">
                <span></span>
                <button className="text-xl flex items-center gap-x-3">
                  <span className="text-bgray-500">{item?.size}</span>
                  <span className="invisible">
                    <IoCheckmarkCircleOutline className="text-success-300 text-xl" />
                  </span>
                </button>
                <div className="flex items-center rounded-md px-3">
                  <p>out of stock</p>
                </div>
              </div>
            ) : (
              <div
                onClick={() => selectSize(item)}
                className="flex cursor-pointer justify-between items-center py-3 border border-success-300 rounded-md px-3"
              >
                <span></span>
                <button className="text-xl flex items-center gap-x-3">
                  <span>{item?.size}</span>
                  <span>
                    <IoCheckmarkCircleOutline className="text-success-300 text-xl" />
                  </span>
                </button>
                <div className="flex items-center border rounded-md px-2">
                  {quatity === 1 && (
                    <button className="text-error-200 px-2 py-2 border rounded hover:bg-bgray-300">
                      <CiTrash />
                    </button>
                  )}
                  {quatity > 1 && (
                    <button
                      onClick={decreaseQuantity}
                      className="text-bgray-700 px-2 py-2 border rounded hover:bg-bgray-300"
                    >
                      <FiMinus />
                    </button>
                  )}
                  <span className=" px-3 py-2">{quatity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="text-bgray-700 px-2 py-2 border rounded hover:bg-bgray-300"
                  >
                    <GoPlus />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddToCart;
