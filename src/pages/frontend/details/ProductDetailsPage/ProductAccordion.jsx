import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { MdOutlineTextFields } from "react-icons/md";

const ProductAccordion = ({ product, selectedSizeData }) => {
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  return (
    <div className="mx-3">
      {/* Description part */}
      {/* Accordion1 */}
      <div className="border rounded-lg my-4">
        <div
          className="bg-primaryLightColor/10 px-3 flex items-center justify-between py-2 cursor-pointer "
          onClick={() => setDescriptionOpen(!descriptionOpen)}
        >
          <p className="flex items-center text-lg text-gray-700">
            <MdOutlineTextFields className="text-lg text-primaryDeepColor mr-2" />
            Description
          </p>
          {descriptionOpen ? (
            <FaChevronUp className="text-lg font-light text-gray-600" />
          ) : (
            <FaChevronDown className="text-lg font-light text-gray-600" />
          )}
        </div>
        <div
          className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
            descriptionOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden ">
            {/* Accordion body 1 */}
            {/* {selectedSizeData != null && selectedSizeData?.description ? (
              <div
                className="p-6"
                dangerouslySetInnerHTML={{
                  __html: selectedSizeData?.description,
                }}
              ></div>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: product?.data?.product_description,
                }}
              >
                {" "}
              </div>
            )} */}

            <div
              className="p-6"
              dangerouslySetInnerHTML={{
                __html: product?.data?.product_description,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAccordion;
