import React, { useEffect, useState } from 'react'
import Loader from '../../../common/Loader/Loader'
import { FaStar } from 'react-icons/fa'

const RelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setRelatedProducts(data?.products.slice(0, 5))
        setLoading(false)
      })
  })
  if (loading) {
    return <Loader />
  }
  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-cols-2 sm:gap-8 gap-2 mx-4 sm:mx-0">
      {relatedProducts?.map(product => (
        <div
          key={product.id}
          className=" bg-white rounded border-white border-2 hover:border-ftPrimaryColor transition duration-500 ease-in-out transform hover:scale-105 "
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-[250px] rounded"
          />
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
          </div>
          <button className="text-sm my-2 mx-2 bg-ftPrimaryColor text-white  py-1.5 rounded font-bold w-11/12  ">
            Shop Now
          </button>
        </div>
      ))}
    </div>
  )
}

export default RelatedProducts
