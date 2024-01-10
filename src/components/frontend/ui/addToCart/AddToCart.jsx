import { useState } from "react";
import { sizeData } from "../../../../data/size-data";
import { CiTrash } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { IoCheckmarkCircleOutline, IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../common/modal/ConfirmationModal";

const AddToCart = () => {
  const [sizeVariation, setSizeVariation] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
    <div className="">
      <div>
        {sizeData.map((item) => (
          <div
            key={item?.size}
            className={`my-3 ${
              sizeVariation.some(
                (selectedItem) => selectedItem.size === item?.size
              )
                ? "border-green-500"
                : ""
            }`}
          >
            {item?.quantity === 0 ? (
              <div className="flex relative justify-center items-center py-4 border border-bgray-300 rounded-md px-3">
                <button className="text-xl flex items-center gap-x-3">
                  <span className="text-bgray-500">{item?.size}</span>
                  <span className="invisible">
                    <IoCheckmarkCircleOutline className="text-success-300 text-xl" />
                  </span>
                </button>
                <div className="flex items-center rounded-md px-3 absolute right-2 top-5 ">
                  <p>out of stock</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div
                  onClick={() => selectSize(item)}
                  className={`flex cursor-pointer justify-center items-center py-3 border rounded-md px-3 relative ${
                    sizeVariation.some(
                      (selectedItem) => selectedItem.size === item?.size
                    )
                      ? "border-green-500"
                      : ""
                  }`}
                >
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
                </div>
                <div
                  className={`flex items-center border rounded-md px-2 ${
                    sizeVariation.some(
                      (selectedItem) => selectedItem.size === item?.size
                    )
                      ? "absolute top-2 right-2"
                      : "hidden"
                  }`}
                >
                  {sizeVariation.find(
                    (selectedItem) => selectedItem.size === item?.size
                  )?.quantity === 1 && (
                    <button
                      onClick={openModal}
                      className="text-error-200 px-2 py-2 border rounded hover:bg-bgray-300"
                    >
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
                    onClick={() => {
                      if (
                        sizeVariation.some(
                          (selectedItem) =>
                            selectedItem?.quantity === item?.quantity
                        )
                      ) {
                        toast.error("Max Stock Selected/Shortage of Stock", {
                          autoClose: 3000,
                        });
                      } else increaseQuantity(item?.size);
                    }}
                    className="text-bgray-700 px-2 py-2 border rounded hover:bg-bgray-300"
                  >
                    <GoPlus />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        <ConfirmationModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            <div className="flex justify-end">
              <button
                className="bg-bgray-900 hover:bg-bgray-700 text-white font-bold py-1 px-2 -mt-4 mb-2 -mr-4 rounded"
                onClick={closeModal}
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>
            <div>
              <p className="border-b pb-4">
                Are you sure you want to remove this item from cart?
              </p>
              <div className="flex justify-end mt-5">
                <button className="bg-bgray-900 px-7 py-3 text-white font-medium tracking-tight leading-5 rounded">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </ConfirmationModal>
      </div>
    </div>
  );
};

export default AddToCart;
