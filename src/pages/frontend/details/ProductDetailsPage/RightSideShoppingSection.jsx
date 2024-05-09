import React, { useState } from 'react'
import { FaRegHeart, FaStar } from 'react-icons/fa'
import { HiMinus, HiOutlinePlus } from 'react-icons/hi'
const RightSideShoppingSection = ({ singleProduct }) => {
  const [quantity, setQuantity] = useState(1)
  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  return (
    <div>
      {/* shop */}
      <div className="border bg-gray-50 rounded-sm p-2 ">
        <p className="font-semibold text-sm text-gray-800">Shop</p>

        <div className="flex items  -center gap-2 flex-wrap p-1">
          <div className="w-12 h-12 rounded-full bg-gray-300 ring-1 ring-ftPrimaryColor p-3">
            <img
              src="https://classicshop.classicit.org/assets/image/favicon.png"
              alt="icon"
              className=""
            />
          </div>

          <div>
            <p className="font-semibold text-sm text-gray-800">Classic Shop</p>
            <section className=" flex items-center gap-1 text-sm ">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar className="text-yellow-400" key={index}></FaStar>
              ))}
              <span className="text-gray-700 mr-2 text-xs">(32 Reviews)</span>
            </section>
          </div>
        </div>
        <button className="w-full text-center bg-[#F7F0F0] text-ftPrimaryColor font-semibold border-ftPrimaryColor hover:bg-ftMuteColor duration-300 border py-1 text-sm  rounded-md my-3">
          VIEW SHOP
        </button>
      </div>
      {/* Short Description / Stock / Quantity / cart */}
      <div className="p-4 border rounded-sm my-4">
        {/* Short description */}
        <div className="bg-[#F2F2F2] rounded p-2.5">
          <p className=" font-semibold text-gray-800 tracking-tight">
            Short Description:
          </p>
          <li className="text-xs font-semibold text-gray-700 list-decimal pt-2 py-1">
            <span className="text-gray-600 font-normal ">
              {' '}
              NVIDIA GeForce RTX 4060 Laptop GPU 8 GB GDDR6
            </span>
          </li>
          <li className="text-xs font-semibold text-gray-700 list-decimal py-1">
            <span className="text-gray-600 font-normal ">
              {' '}
              Intel Core i7 13th Gen 13620H (2.40GHz)
            </span>
          </li>
          <li className="text-xs font-semibold text-gray-700 list-decimal py-1">
            <span className="text-gray-600 font-normal ">
              {' '}
              16GB Memory 1 TB NVMe SSD
            </span>
          </li>
        </div>
        {/* Product  stock */}
        <div>
          <p className="font-semibold text-sm text-gray-800 my-2">
            Product Stock:{' '}
            <span className="ml-1 bg-ftPrimaryColor text-white text-xs px-2.5 py-1 rounded-xl">
              {' '}
              {singleProduct?.stock}
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
                onChange={e => {
                  const newQuantity = parseInt(e.target.value)
                  if (!isNaN(newQuantity) && newQuantity >= 1) {
                    setQuantity(newQuantity)
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
            <div className=" text-xs px-2.5 py-2  bg-ftPrimaryColor text-white ">
              <FaRegHeart />
            </div>
          </div>
        </div>
        {/* Add to cart button  */}
        <button className="w-full text-center bg-ftPrimaryColor text-white font-semibold py-1.5 hover:bg-[#019C9F] duration-150    rounded-full my-2.5">
          Buy Now
        </button>
        <button className="w-full text-center bg-[#F2F2F2] font-semibold py-1.5 hover:bg-gray-200 duration-150 mb-2 border border-black rounded-full ">
          Add To Cart
        </button>
      </div>
    </div>
  )
}

export default RightSideShoppingSection
