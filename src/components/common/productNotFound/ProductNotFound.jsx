import { IoDocumentTextOutline } from "react-icons/io5";
const ProductNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[500px]">
      <div className="bg-slate-300 rounded-full mb-3">
        <IoDocumentTextOutline className="text-[80px] rounded-full bg-gray-500 p-2" />
      </div>
      <p className="text-gray-600">Sorry! No Product Founds</p>
      <p>Please try searching for something else</p>
    </div>
  );
};

export default ProductNotFound;
