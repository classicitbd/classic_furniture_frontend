import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { MdOutlineTextFields } from "react-icons/md";

const ProductDescription = ({ product, description }) => {
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  // console.log(selectedSizeData);
  return (
    <div className="mx-4 lg:mx-0 mt-10">
      {/* Description part */}
      {/* Accordion1 */}
      <div className="border rounded-lg my-4 h-[380px] overflow-y-auto scrollbar-thin ">
        <div
          className="bg-primaryLightColor/10 px-3 flex items-center justify-between py-2 cursor-pointer "
          // onClick={() => setDescriptionOpen(!descriptionOpen)}
        >
          <p className="flex items-center text-lg text-gray-700">
            <MdOutlineTextFields className="text-lg text-primaryDeepColor mr-2" />
            Description
          </p>
          {/* {descriptionOpen ? (
            <FaChevronUp className="text-lg font-light text-gray-600" />
          ) : (
            <FaChevronDown className="text-lg font-light text-gray-600" />
          )} */}
        </div>
        <div
          className="p-6"
          dangerouslySetInnerHTML={{
            __html: description
              ? description
              : product?.data?.product_description,
          }}
        ></div>
        {/* <div
          className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
            descriptionOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden ">
            <div
              className="p-6"
              dangerouslySetInnerHTML={{
                __html: description
                  ? description
                  : product?.data?.product_description,
              }}
            ></div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductDescription;
