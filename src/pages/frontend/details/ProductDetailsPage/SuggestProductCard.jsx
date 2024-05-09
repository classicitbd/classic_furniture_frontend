import React from 'react'
import { FaStar } from 'react-icons/fa'

const SuggestProductCard = ({ product }) => {
  return (
    <div className="my-4  transition duration-500 ease-in-out transform hover:border-blue-500 hover:scale-105  border border-white rounded">
      {/* image */}
      <div className="h-[169px]">
        <img src={product.thumbnail} className="w-full h-full  rounded-t" />
      </div>
      {/* card body */}
      <div className="mt-3 mb-2 px-2">
        {/* rating */}
        <div className=" flex items-center gap-1 text-sm ">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar className="text-yellow-400" key={index}></FaStar>
          ))}
        </div>
        <p className=" text-gray-700 pt-1 text-sm">{product.title}</p>
        <p className="text-ftPrimaryColor font-extrabold py-1.5">
          500{' '}
          <span className="text-gray-500 text-sm font-normal ml-2 line-through">
            700
          </span>
        </p>

        <button className="text-sm bg-ftPrimaryColor text-white  py-1.5 rounded font-bold w-full  ">
          Shop Now
        </button>
      </div>
    </div>
  )
}

export default SuggestProductCard
