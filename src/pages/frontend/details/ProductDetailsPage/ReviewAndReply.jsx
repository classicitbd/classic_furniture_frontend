import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const ReviewAndReply = ({ singleProduct }) => {
  const [replyOpen, setReplyOpen] = useState(false)
  return (
    <div className="my-4">
      <div className="flex gap-3">
        <img
          src="https://classicshop.classicit.org/assets/image/comment.png"
          alt=""
          className="w-14 h-14 rounded-full"
        />
        <div className="">
          <p className="text-sm font-semibold text-gray-700"> Shabana Akter</p>
          <div className="flex items-center gap-1 text-sm ">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar className="text-[#FFA20F]" key={index}></FaStar>
            ))}
          </div>
          <p className="text-xs my-2 text-gray-500">
            "But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. No one
            rejects, dislikes, or avoids pleasure itself, because it is
            pleasure, but because those who do not know how to pursue pleasure
            rationally encounter consequences that are extremely painful. Nor
            again is there anyone who loves or pursues or desires to obtain pain
            of itself, because it is pain.
          </p>

          <div className="flex flex-wrap gap-4">
            {singleProduct?.images &&
              singleProduct?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="w-20 h-20 object-cover border"
                />
              ))}
          </div>

          <div className="my-4 bg-[#F2F2F2]  p-2.5 flex gap-3 rounded-md">
            <img
              src="https://classicshop.classicit.org/assets/image/favicon.png"
              alt=""
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-xs font-semibold">RESPONSE FROM SHOP</p>
              <p className="text-xs text-gray-500">
                Thank You For Your Good Comment💗
              </p>
            </div>
          </div>

          <div className="text-right">
            <button
              className="text-xs font-semibold border rounded px-3 py-1 text-gray-600 bg-gray-50"
              onClick={() => setReplyOpen(!replyOpen)}
            >
              Reply
            </button>
          </div>
          <div
            className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
              replyOpen
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="pt-2 overflow-hidden">
              <div>
                <p className="text-sm text-gray-700 mt-3 mb-1.5">
                  Write Your Reply
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
    </div>
  )
}

export default ReviewAndReply
