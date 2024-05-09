import React, { useState } from 'react'
import UploadReviewImage from './UploadReviewImage'
import { FaStar } from 'react-icons/fa'

const WriteProductReview = () => {
  const [reviewFormOpen, setReviewFormOpen] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)

  const handleRatingClick = rating => {
    setSelectedRating(rating)
  }
  return (
    <div className="mt-6">
      <div className="text-right ">
        <button
          className="text-sm font-semibold  bg-ftMuteColor text-darkColor px-3 py-1.5 rounded"
          onClick={() => setReviewFormOpen(!reviewFormOpen)}
        >
          WRITE REVIEW
        </button>
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          reviewFormOpen
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="pt-6 overflow-hidden">
          <p className="border-y pl-1 py-2 text-sm font-semibold text-gray-900">
            {' '}
            Write a Review
          </p>
          <UploadReviewImage />
          <div>
            <p className="text-sm text-gray-700 my-1.5">Name</p>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded px-2 text-sm py-1.5"
            />

            <p className="text-sm text-gray-700 mt-3 mb-1.5">Select Rating</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`mr-1 cursor-pointer ${
                    i < selectedRating ? ' text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => handleRatingClick(i + 1)}
                >
                  <FaStar />
                </span>
              ))}
            </div>

            <div>
              <p className="text-sm text-gray-700 mt-3 mb-1.5">
                Write your review
              </p>

              <textarea
                className="w-full border-2 border-gray-300 rounded px-2 text-sm py-1.5 "
                rows={4}
              />
              <div className="text-right my-2">
                <button className=" font-semibold  bg-ftPrimaryColor text-white px-4 py-1.5 rounded">
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WriteProductReview
