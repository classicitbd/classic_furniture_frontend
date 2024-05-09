import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaRegStar, FaStar } from 'react-icons/fa'
import CustomerReviewSection from './CustomerReviewSection'
import WriteProductReview from './WriteProductReview'
import ReviewAndReply from './ReviewAndReply'
import { MdOutlineTextFields } from 'react-icons/md'

const ProductAccordion = ({ singleProduct }) => {
  const reviews = [
    { rating: 5, numReviews: 10 },
    { rating: 4, numReviews: 7 },
    { rating: 3, numReviews: 5 },
    { rating: 2, numReviews: 3 },
    { rating: 1, numReviews: 1 },
  ]

  const [descriptionOpen, setDescriptionOpen] = useState(false)
  const [reviewsOpen, setReviewsOpen] = useState(false)
  return (
    <div className="mx-3">
      {/* Description part */}
      {/* Accordion1 */}
      <div className="border rounded-lg my-4">
        <div
          className="bg-ftPrimaryColor/10 px-3 flex items-center justify-between py-2 cursor-pointer "
          onClick={() => setDescriptionOpen(!descriptionOpen)}
        >
          <p className="flex items-center text-gray-700">
            <span className="text-[20px] text-ftPrimaryColor mr-2">
              <MdOutlineTextFields />
            </span>{' '}
            Description
          </p>
          {descriptionOpen ? (
            <FaChevronUp className="text-[20px] font-light text-gray-600" />
          ) : (
            <FaChevronDown className="text-[20px] font-light text-gray-600" />
          )}
        </div>
        <div
          className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
            descriptionOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden ">
            {/* Accordion body 1 */}
            <div className="p-6">
              <p className=" text-sm text-gray-500">
                {' '}
                Jeans are a wardrobe essential and every man should own to be
                able to take their styling game to the next level. This is a
                Skinny Fit Jeans that carries a 5 pocket style. It's a low waist
                jeans with slim legs for that stylish individual. Has a zip fly
                and an emboss on the coin pocket. Completely made up of 98%
                Cotton and 2% Spandex for that maximum comfort and easy
                mobility. Be comfortable, be yourself and nothing else.
              </p>
              <div className="border border-red-50 bg-[#F2F2F2] max-w-sm rounded my-4  p-2">
                <p className="text-sm">
                  <span className="font-semibold text-black">Note:</span> <br />
                  <i>
                    Final color of the product may slightly vary due to the
                    variation of light source & the photo device.
                  </i>
                </p>
              </div>
              <div className="my-4">
                <p className="text-xs font-semibold">Material</p>
                <ul className="list-none pl-1">
                  <li className="flex items-center">
                    <div className="w-2 h-2 mr-2 border border-gray-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 py-1 ">
                      {' '}
                      Cotton 98%, Spandex 2%
                    </span>
                  </li>
                </ul>
              </div>
              <div className="my-4">
                <p className="text-xs font-semibold">Care</p>
                <ul className="list-none pl-1">
                  <li className="flex items-center">
                    <div className="w-2 h-2 mr-2 border border-gray-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 py-1 ">
                      {' '}
                      Hand Wash
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 mr-2 border border-gray-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 py-1 ">
                      {' '}
                      Do Not Bleach
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 mr-2 border border-gray-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 py-1 ">
                      {' '}
                      Do Not Tumble Dry
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 mr-2 border border-gray-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 py-1 ">
                      {' '}
                      Wash Separately
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <img
                  src="https://classicshop.classicit.org/assets/image/productdetails/size-chart-cuban-2023-holago-2.jpg.webp"
                  alt="size img"
                  className="w-1/2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Review part */}
      {/* Accordion 2 */}
      <div className="border rounded-lg">
        <div
          className="bg-ftPrimaryColor/10 px-3 flex items-center justify-between py-2 cursor-pointer "
          onClick={() => setReviewsOpen(!reviewsOpen)}
        >
          <p className="flex items-center text-gray-700">
            <span className="text-[20px] mr-2">
              <FaRegStar className="text-[18px] text-ftPrimaryColor" />
            </span>{' '}
            Reviews
          </p>

          {reviewsOpen ? (
            <FaChevronUp className="text-[20px] font-light  text-gray-600" />
          ) : (
            <FaChevronDown className="text-[20px] font-light  text-gray-600" />
          )}
        </div>
        <div
          className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
            reviewsOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-6">
              <p className="  text-gray-800 text-sm font-semibold">
                Customer Reviews (47)
              </p>

              <div className="flex flex-wrap w-full">
                <div className="w-full md:w-1/2 md:border-r border-r-0">
                  <p className="text-5xl mt-4 mb-2 text-gray-900 font-bold">
                    4.6
                  </p>
                  <div className=" flex items-center gap-1 text-sm ">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar className="text-[#FFA20F]" key={index}></FaStar>
                    ))}
                  </div>

                  <p className="text-xs my-2 text-gray-500">
                    All reviews come from verified purchasers
                  </p>
                </div>
                <div className="md:w-1/3 sm:w-10/12 w-full">
                  <CustomerReviewSection reviews={reviews} />
                </div>
              </div>

              <div className="mt-4">
                <p className="border-y pl-1 py-2 text-sm font-semibold text-gray-900">
                  {' '}
                  Product Reviews
                </p>
                <WriteProductReview />
                <ReviewAndReply singleProduct={singleProduct} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <Accordion allowMultipleExpanded>
    //   <AccordionItem>
    //     <AccordionItemHeading>
    //       <AccordionItemButton> Description</AccordionItemButton>
    //     </AccordionItemHeading>
    //     <AccordionItemPanel>
    //       {' '}
    //       <div>
    //         <p className=" text-sm text-gray-500">
    //           {' '}
    //           Jeans are a wardrobe essential and every man should own to be able
    //           to take their styling game to the next level. This is a Skinny Fit
    //           Jeans that carries a 5 pocket style. It's a low waist jeans with
    //           slim legs for that stylish individual. Has a zip fly and an emboss
    //           on the coin pocket. Completely made up of 98% Cotton and 2%
    //           Spandex for that maximum comfort and easy mobility. Be
    //           comfortable, be yourself and nothing else.
    //         </p>
    //         <div className="border border-red-50 bg-[#F2F2F2] max-w-sm rounded my-4  p-2">
    //           <p className="text-sm">
    //             <span className="font-semibold text-black">Note:</span> <br />
    //             <i>
    //               Final color of the product may slightly vary due to the
    //               variation of light source & the photo device.
    //             </i>
    //           </p>
    //         </div>
    //         <div className="my-4">
    //           <p className="text-xs font-semibold">Material</p>
    //           <ul className="list-none pl-1">
    //             <li className="flex items-center">
    //               <div className="w-2 h-2 mr-2 border border-gray-500 rounded-full"></div>
    //               <span className="text-xs text-gray-500 py-1 ">
    //                 {' '}
    //                 Cotton 98%, Spandex 2%
    //               </span>
    //             </li>
    //           </ul>
    //         </div>
    //         <div className="my-4">
    //           <p className="text-xs font-semibold">Care</p>
    //           <ul className="list-none pl-1">
    //             <li className="flex items-center">
    //               <div className="w-2 h-2 mr-2 border border-gray-500 rounded-full"></div>
    //               <span className="text-xs text-gray-500 py-1 ">
    //                 {' '}
    //                 Hand Wash
    //               </span>
    //             </li>
    //             <li className="flex items-center">
    //               <div className="w-2 h-2 mr-2 border border-gray-500 rounded-full"></div>
    //               <span className="text-xs text-gray-500 py-1 ">
    //                 {' '}
    //                 Do Not Bleach
    //               </span>
    //             </li>
    //             <li className="flex items-center">
    //               <div className="w-2 h-2 mr-2 border border-gray-500 rounded-full"></div>
    //               <span className="text-xs text-gray-500 py-1 ">
    //                 {' '}
    //                 Do Not Tumble Dry
    //               </span>
    //             </li>
    //             <li className="flex items-center">
    //               <div className="w-2 h-2 mr-2 border border-gray-500 rounded-full"></div>
    //               <span className="text-xs text-gray-500 py-1 ">
    //                 {' '}
    //                 Wash Separately
    //               </span>
    //             </li>
    //           </ul>
    //         </div>

    //         <div>
    //           <img
    //             src="https://classicshop.classicit.org/assets/image/productdetails/size-chart-cuban-2023-holago-2.jpg.webp"
    //             alt="size img"
    //             className="w-1/2"
    //           />
    //         </div>
    //       </div>
    //     </AccordionItemPanel>
    //   </AccordionItem>
    //   <AccordionItem>
    //     <AccordionItemHeading>
    //       <AccordionItemButton>Reviews</AccordionItemButton>
    //     </AccordionItemHeading>
    //     <AccordionItemPanel>
    //       <div>
    //         <p className="  text-gray-800 text-sm font-semibold">
    //           Customer Reviews (47)
    //         </p>

    //         <div className="flex flex-wrap w-full">
    //           <div className="w-full md:w-1/2 md:border-r border-r-0">
    //             <p className="text-5xl mt-4 mb-2 text-gray-900 font-bold">
    //               4.6
    //             </p>
    //             <div className=" flex items-center gap-1 text-sm ">
    //               {Array.from({ length: 5 }).map((_, index) => (
    //                 <FaStar className="text-[#FFA20F]" key={index}></FaStar>
    //               ))}
    //             </div>

    //             <p className="text-xs my-2 text-gray-500">
    //               All reviews come from verified purchasers
    //             </p>
    //           </div>
    //           <div className="md:w-1/3 sm:w-10/12 w-full">
    //             <CustomerReviewSection reviews={reviews} />
    //           </div>
    //         </div>

    //         <div className="mt-4">
    //           <p className="border-y pl-1 py-2 text-sm font-semibold text-gray-900">
    //             {' '}
    //             Product Reviews
    //           </p>
    //           <WriteProductReview />
    //           <ReviewAndReply singleProduct={singleProduct} />
    //         </div>
    //       </div>
    //     </AccordionItemPanel>
    //   </AccordionItem>
    // </Accordion>
  )
}

export default ProductAccordion
