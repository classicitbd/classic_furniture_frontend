import { useEffect, useState } from "react";
import { HiMinus, HiOutlinePlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../../redux/feature/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
const RightSideShoppingSection = ({
  product,
  selectSize,
  setSelectSize,
  setSelectedSizeData,
  setDescription,
  selectedSizeData,
}) => {
  const navigate = useNavigate();

  const [outOfStockStock, setOutOfStock] = useState(false);
  const stackManage = product?.data?.product_size_variation;

  useEffect(() => {
    if (stackManage && stackManage.length > 0) {
      const allZero = stackManage
        .map((item) => item?.quantity === 0)
        .every(Boolean);
      setOutOfStock(allZero);
    } else {
      if (product?.data?.product_quantity === 0) {
        setOutOfStock(true);
      }
    }
  }, [stackManage, product]);

  const dispatch = useDispatch();
  const carts = useSelector((state) => state.furnitureCart.products);

  const [quantity, setQuantity] = useState(1);
  const [inQuantity, setInQuantity] = useState(product?.data?.product_quantity);
  const handleIncrement = () => {
    if (quantity < inQuantity) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Quantity should be less than or equal to " + inQuantity);
    }
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    const checkExist = carts.some(
      (selectedItem) =>
        (selectedItem.size === selectedSizeData?.size ||
          selectedItem.size === undefined) &&
        selectedItem.productId === product?.data?._id
    );
    if (checkExist) {
      toast.error("Already added in cart", {
        autoClose: 1000,
      });
      return;
    }
    if (
      product?.data?.product_size_variation &&
      product?.data?.product_size_variation?.length > 0
    ) {
      if (!selectSize || !selectedSizeData) {
        toast.error("Please select size", {
          autoClose: 1000,
        });
        return;
      }
      dispatch(
        addToCart({
          size: selectedSizeData?.size,
          quantity: quantity,
          totalQuantity: selectedSizeData?.quantity,
          size_variationId: selectedSizeData?._id,
          price: selectedSizeData?.discount_price
            ? selectedSizeData?.discount_price
            : selectedSizeData?.price
            ? selectedSizeData?.price
            : product?.data?.product_discount_price
            ? product?.data?.product_discount_price
            : product?.data?.product_price,
          product_name: product?.data?.product_name,
          color: product?.data?.product_color_id?.color_name,
          color_id: product?.data?.product_color_id?._id,
          product_thumbnail: product?.data?.product_thumbnail,
          productId: product?.data?._id,
          product_partial_payment: product?.data?.product_partial_payment,
          product_partial_payment_amount:
            product?.data?.product_partial_payment_amount,
          product_partial_total_payment:
            product?.data?.product_partial_payment_amount * quantity,
        })
      );
      toast.success("Added to cart", {
        autoClose: 1000,
      });
      navigate("/checkout");
      return;
    }
    dispatch(
      addToCart({
        quantity: quantity,
        totalQuantity: product?.data?.product_quantity,
        price: product?.data?.product_discount_price
          ? product?.data?.product_discount_price
          : product?.data?.product_price,
        product_name: product?.data?.product_name,
        color: product?.data?.product_color_id?.color_name,
        color_id: product?.data?.product_color_id?._id,
        product_thumbnail: product?.data?.product_thumbnail,
        productId: product?.data?._id,
        product_partial_payment: product?.data?.product_partial_payment,
        product_partial_payment_amount:
          product?.data?.product_partial_payment_amount,
        product_partial_total_payment:
          product?.data?.product_partial_payment_amount * quantity,
      })
    );
    toast.success("Added to cart", {
      autoClose: 1000,
    });
    navigate("/checkout");
  };
  const handleAddCart = () => {
    const checkExist = carts.some(
      (selectedItem) =>
        (selectedItem.size === selectedSizeData?.size ||
          selectedItem.size === undefined) &&
        selectedItem.productId === product?.data?._id
    );
    if (checkExist) {
      toast.error("Already added in cart", {
        autoClose: 1000,
      });
      return;
    }
    if (
      product?.data?.product_size_variation &&
      product?.data?.product_size_variation?.length > 0
    ) {
      if (!selectSize || !selectedSizeData) {
        toast.error("Please select size", {
          autoClose: 1000,
        });
        return;
      }
      dispatch(
        addToCart({
          size: selectedSizeData?.size,
          quantity: quantity,
          totalQuantity: selectedSizeData?.quantity,
          size_variationId: selectedSizeData?._id,
          price: selectedSizeData?.discount_price
            ? selectedSizeData?.discount_price
            : selectedSizeData?.price
            ? selectedSizeData?.price
            : product?.data?.product_discount_price
            ? product?.data?.product_discount_price
            : product?.data?.product_price,
          product_name: product?.data?.product_name,
          color: product?.data?.product_color_id?.color_name,
          color_id: product?.data?.product_color_id?._id,
          product_thumbnail: product?.data?.product_thumbnail,
          productId: product?.data?._id,
          product_partial_payment: product?.data?.product_partial_payment,
          product_partial_payment_amount:
            product?.data?.product_partial_payment_amount,
          product_partial_total_payment:
            product?.data?.product_partial_payment_amount * quantity,
        })
      );
      toast.success("Added to cart", {
        autoClose: 1000,
      });
      return;
    }
    dispatch(
      addToCart({
        quantity: quantity,
        totalQuantity: product?.data?.product_quantity,
        price: product?.data?.product_discount_price
          ? product?.data?.product_discount_price
          : product?.data?.product_price,
        product_name: product?.data?.product_name,
        color: product?.data?.product_color_id?.color_name,
        color_id: product?.data?.product_color_id?._id,
        product_thumbnail: product?.data?.product_thumbnail,
        productId: product?.data?._id,
        product_partial_payment: product?.data?.product_partial_payment,
        product_partial_payment_amount:
          product?.data?.product_partial_payment_amount,
        product_partial_total_payment:
          product?.data?.product_partial_payment_amount * quantity,
      })
    );
    toast.success("Added to cart", {
      autoClose: 1000,
    });
  };

  return (
    <div>
      {outOfStockStock == false ? (
        <>
          {product?.data?.product_size_variation?.length > 0 && (
            <>
              {" "}
              <p className="font-semibold text-[16px] text-gray-800 pb-2">
                Select Size: {selectSize}
              </p>
              <div className="flex flex-wrap gap-2">
                {product?.data?.product_size_variation.map((item) => (
                  <button
                    key={item?._id}
                    className={
                      item && item?.quantity > 0
                        ? `border rounded-lg cursor-pointer py-2 px-3.5 mr-2 hover:bg-primaryLightColor hover:text-white font-semibold text-gray-700 transition duration-200 ease-in-out hover:shadow-xl ${
                            selectSize === item?.size
                              ? "bg-primaryLightColor text-white"
                              : ""
                          }`
                        : "disabled border rounded-lg py-2 px-3.5 mr-2 font-semibold text-gray-700 transition duration-200 ease-in-out hover:shadow-xl"
                    }
                    onClick={() => {
                      item?.quantity && setSelectSize(item.size);
                      setSelectedSizeData(item);
                      setDescription(item?.description);
                      setInQuantity(item?.quantity);
                      setQuantity(1);
                    }}
                    disabled={item?.quantity === 0}
                  >
                    {item?.size}
                  </button>
                ))}
                <button
                  className="border rounded-lg cursor-pointer px-3 mr-2  hover:bg-red-600 hover:text-white text-[12px] font-semibold hover:shadow-xl duration-200 text-gray-700  bg-gray-200"
                  onClick={() => {
                    setSelectSize("");
                    setSelectedSizeData(null);
                    setDescription(null);
                    setInQuantity(product?.data?.product_quantity);
                    setQuantity(1);
                  }}
                >
                  Remove
                </button>
              </div>
            </>
          )}

          <div>
            {" "}
            <div>
              <p className="font-semibold text-sm text-gray-800 mt-6 mb-4">
                Product Stock:{" "}
                <span className="ml-1 bg-primaryDeepColor text-white text-xs px-2.5 py-1 rounded-xl">
                  {" "}
                  {inQuantity}
                </span>
              </p>
            </div>
            {/* Product quantity */}
            <div>
              <p className="font-semibold text-sm text-gray-800">Quantity</p>
              <div className="flex items-center my-2  gap-2.5 flex-wrap ">
                <div className="flex  ">
                  <button
                    type="button"
                    className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2] border border-gray-200"
                    onClick={handleDecrement}
                  >
                    <HiMinus className="text-gray-700" />
                  </button>
                  <input
                    type="number"
                    className="border border-gray-200 text-gray-800  text-xs  text-center w-14 "
                    value={quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity) && newQuantity >= 1) {
                        setQuantity(newQuantity);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-2 py-1.5  hover:bg-gray-200 bg-[#F2F2F2]  border border-gray-200"
                    onClick={handleIncrement}
                  >
                    <HiOutlinePlus className="text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
            {/* Add to cart button  */}
            <button
              onClick={() => handleBuyNow()}
              className="w-full text-center bg-primaryDeepColor text-white font-semibold py-1.5 hover:bg-primaryLightColor duration-150 rounded-full my-2.5"
            >
              Buy Now
            </button>
            <button
              onClick={() => handleAddCart()}
              className="w-full text-center bg-[#F2F2F2] font-semibold py-1.5 hover:bg-gray-200 duration-150 mb-2 border border-black rounded-full "
            >
              Add To Cart
            </button>
          </div>
        </>
      ) : (
        <div className="border">
          <section className="flex items-center h-full lg:px-8 px-0  w-full dark:bg-gray-50 ">
            <div className="container flex flex-col items-center justify-center px-2  mx-auto my-8 space-y-8 text-center md:w-full  max-w-md">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-32  h-32  dark:text-gray-400"
              >
                <path d="M14.1 8.5L12 6.4 9.9 8.5 8.5 7.1 10.6 5 8.5 2.9l1.4-1.4L12 3.6l2.1-2.1 1.4 1.4L13.4 5l2.1 2.1-1.4 1.4M7 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m10 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m-9.8-3.2c0 .1.1.2.2.2H19v2H7c-1.1 0-2-.9-2-2 0-.4.1-.7.2-1l1.3-2.4L3 4H1V2h3.3l4.3 9h7l3.9-7 1.7 1-3.9 7c-.3.6-1 1-1.7 1H8.1l-.9 1.6v.2z" />
              </svg>
              <p className="md:text-lg lg:text-xl text-xl w-full">
                Looks like our product are currently Out Of Stock
              </p>
              <Link
                rel="noopener noreferrer"
                to="/all"
                className="w-11/12  py-3 rounded bg-emerald-600 hover:bg-primaryLightColor duration-200 font-semibold text-gray-50"
              >
                Shop More
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default RightSideShoppingSection;
