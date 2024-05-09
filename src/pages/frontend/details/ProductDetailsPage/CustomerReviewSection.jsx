import React from 'react'
import { FaStar } from 'react-icons/fa'

const CustomerReviewSection = ({ reviews }) => {
  return (
    <div className="md:px-4 px-0 text-xs">
      {reviews.map((review, index) => (
        <div key={index} className="flex items-center mb-2">
          <div className="flex mr-2">
            {[...Array(review.rating)].map((_, i) => (
              <FaStar key={i} className="text-[#FFA20F]" />
            ))}
            {[...Array(5 - review.rating)].map((_, i) => (
              <FaStar key={i} className="text-gray-400" />
            ))}
          </div>
          <div className="flex-1 bg-gray-200 h-2 rounded-md"></div>
          <span className="ml-2">{review.numReviews} Reviews</span>
        </div>
      ))}
    </div>
  )
}

export default CustomerReviewSection
