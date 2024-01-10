import { useState } from "react";
import { sizeData } from "../../../../data/size-data";
import { CiTrash } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const AddToCart = () => {
  const [sizeVariation, setSizeVariation] = useState([]);

  const selectSize = (value) => {
    const existingSize = sizeVariation.find((item) => item.size === value.size);

    if (existingSize) {
      const updatedVariation = sizeVariation.filter(
        (item) => item.size !== value.size
      );
      setSizeVariation(updatedVariation);
    } else {
      const newData = {
        size: value.size,
        quantity: 1,
        price: value.price ? value.price : 0,
      };
      const newVariation = [...sizeVariation, newData];
      setSizeVariation(newVariation);
    }
  };

  const increaseQuantity = (size) => {
    const updatedVariation = sizeVariation.map((item) =>
      item.size === size ? { ...item, quantity: item.quantity + 1 } : item
    );
    setSizeVariation(updatedVariation);
  };

  const decreaseQuantity = (size) => {
    const updatedVariation = sizeVariation.map((item) =>
      item.size === size && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setSizeVariation(updatedVariation);
  };

  console.log(sizeVariation);

  return (
    <div>
      <div>
        {sizeData.map((item) => (
          <div
            key={item?.size}
            className={`my-3 group  hover:-z-20 ${
              sizeVariation.some(
                (selectedItem) => selectedItem.size === item?.size
              )
                ? "border-green-500"
                : ""
            }`}
          >
            {item?.quantity === 0 ? (
              <div className="flex justify-between items-center py-4 border border-bgray-300 rounded-md px-3">
                <div></div>
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
                className={`flex cursor-pointer justify-between items-center py-3 border rounded-md px-3 ${
                  sizeVariation.some(
                    (selectedItem) => selectedItem.size === item?.size
                  )
                    ? "border-green-500"
                    : ""
                }`}
              >
                <span></span>
                <button className="text-xl flex items-center gap-x-3">
                  <span>{item?.size}</span>
                  <span>
                    <IoCheckmarkCircleOutline
                      className={`text-success-300 text-xl ${
                        sizeVariation.some(
                          (selectedItem) => selectedItem.size === item?.size
                        )
                          ? "visible"
                          : "invisible"
                      }`}
                    />
                  </span>
                </button>
                <div
                  className={`flex items-center border rounded-md px-2 group-hover:z-20 ${
                    sizeVariation.some(
                      (selectedItem) => selectedItem.size === item?.size
                    )
                      ? "block"
                      : "hidden"
                  }`}
                >
                  {sizeVariation.find(
                    (selectedItem) => selectedItem.size === item?.size
                  )?.quantity === 1 && (
                    <button className="text-error-200 px-2 py-2 border rounded hover:bg-bgray-300">
                      <CiTrash />
                    </button>
                  )}
                  {sizeVariation.find(
                    (selectedItem) => selectedItem.size === item?.size
                  )?.quantity > 1 && (
                    <button
                      onClick={() => decreaseQuantity(item?.size)}
                      className="text-bgray-700 px-2 py-2 border rounded hover:bg-bgray-300"
                    >
                      <FiMinus />
                    </button>
                  )}
                  <span className="px-3 py-2">
                    {sizeVariation.find(
                      (selectedItem) => selectedItem.size === item?.size
                    )?.quantity || 1}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item?.size)}
                    className="text-bgray-700 px-2 py-2 border rounded hover:bg-bgray-300"
                  >
                    <GoPlus />
                  </button>
                </div>
                <div
                  className={`${
                    sizeVariation.some(
                      (selectedItem) => selectedItem.size === item?.size
                    )
                      ? "hidden"
                      : "block"
                  }`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddToCart;
