/* eslint-disable react/prop-types */
import { useState } from "react";
import { sizeData } from "../../../../data/size-data";
import { CiTrash } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { IoCheckmarkCircleOutline, IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../common/modal/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/feature/cart/cartSlice";

const AddToCart = ({ setModal }) => {
  const sizeType = sizeData;
  const [sizeVariation, setSizeVariation] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sizeGuide, setSizeGuide] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.products);
  console.log(carts);

  const openModal = (value) => {
    setData(value);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModal("");
  };

  const selectSize = (value, id) => {
    dispatch(addToCart({ ...value, id }));
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

  const handleConfirm = () => {
    if (data) {
      selectSize(data);
    }
    setModalOpen(false);
  };

  const selectedSizes = sizeVariation
    .map((item) => `${item.size} (${item.quantity})`)
    .join(", ")
    .replace(/,([^,]*)$/, " & $1");

  return (
    <>
      {sizeGuide ? (
        <div>
          <h2 className="text-center leading-6 tracking-normal text-xl mb-5 font-medium">
            Size Guide
          </h2>
          <img
            src="/assets/images/shoe-size-chart.png"
            alt="size-guide-chart"
            className="w-3/4 mx-auto"
          />
          <div>
            <button onClick={() => setSizeGuide(false)} className="underline">
              Size Selection
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <div>
            <article className="text-center leading-6">
              {sizeVariation.length > 0 ? (
                <h2 className="font-medium text-lg tracking-normal">
                  Selected Size : {selectedSizes}
                </h2>
              ) : (
                <h2 className="font-medium text-lg tracking-normal">
                  Please select your item size
                </h2>
              )}
              <p className="text-xs">
                Need assistence?{" "}
                <button
                  onClick={() => setSizeGuide(true)}
                  className="underline"
                >
                  Size Guide
                </button>
              </p>
            </article>
          </div>
          <div>
            {sizeType?.size_variation?.map((item) => (
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
                    <h1 className="text-xl flex items-center gap-x-3">
                      <span className="text-bgray-500">{item?.size}</span>
                      <span className="invisible">
                        <IoCheckmarkCircleOutline className="text-success-300 text-xl" />
                      </span>
                    </h1>
                    <div className="flex items-center rounded-md px-3 absolute right-2 top-5 ">
                      <p>out of stock</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div
                      onClick={() => selectSize(item, sizeType.id)}
                      className={`flex cursor-pointer justify-center items-center py-3 border rounded-md px-3 relative ${
                        carts.some(
                          (selectedItem) =>
                            selectedItem.size === item?.size &&
                            selectedItem.id === sizeType.id
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
                              carts.some(
                                (selectedItem) =>
                                  selectedItem.size === item?.size &&
                                  selectedItem.id === sizeType.id
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
                        carts.some(
                          (selectedItem) =>
                            selectedItem.size === item?.size &&
                            selectedItem.id === sizeType.id
                        )
                          ? "absolute top-2 right-2"
                          : "hidden"
                      }`}
                    >
                      {carts.find(
                        (selectedItem) => selectedItem.size === item?.size
                      )?.quantity === 1 && (
                        <button
                          onClick={() => openModal(item)}
                          className="text-error-200 px-2 py-2 border rounded hover:bg-bgray-300"
                        >
                          <CiTrash />
                        </button>
                      )}
                      {carts.find(
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
                        {carts.find(
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
                            toast.error(
                              "Max Stock Selected/Shortage of Stock",
                              {
                                autoClose: 3000,
                              }
                            );
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
                    <button
                      onClick={() => handleConfirm()}
                      className="bg-bgray-900 px-7 py-3 text-white font-medium tracking-tight leading-5 rounded"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </ConfirmationModal>
          </div>
          <div className="flex justify-between items-center mt-7">
            <button onClick={closeModal} className="underline">
              Continue Shipping
            </button>
            <button
              disabled={sizeVariation?.length === 0}
              className={`py-3 px-5 text-center text-white ${
                sizeVariation?.length > 0 ? "bg-bgray-900" : "bg-bgray-400"
              }`}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;
