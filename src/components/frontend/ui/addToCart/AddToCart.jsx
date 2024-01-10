import { useState } from "react";
import { sizeData } from "../../../../data/size-data";
// Import React icons
import { CiTrash } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const AddToCart = () => {
  const [quatity, setQuantity] = useState(0);
  return (
    <div>
      <div>
        {sizeData.map((item) => (
          <div className="my-3" key={item?.size}>
            <div className="flex cursor-pointer ring ring-success-300 justify-between items-center py-3 border rounded-md px-3">
              <span></span>
              <button className="text-xl">{item?.size}</button>
              <div className="flex items-center border rounded-md px-2">
                <button className="text-error-200 px-2 py-2 border rounded hover:bg-bgray-300">
                  <CiTrash />
                </button>
                <button className="text-bgray-700 px-2 py-2 border rounded hover:bg-bgray-300">
                  <FiMinus />
                </button>
                <span className=" px-3 py-2">{quatity}</span>
                <button className="text-bgray-700 px-2 py-2 border rounded hover:bg-bgray-300">
                  <GoPlus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddToCart;
