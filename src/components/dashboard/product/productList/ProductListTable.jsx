/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import { FiEdit } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import NoDataFound from "../../../common/noDataFound/NoDataFound";
import { MdDeleteForever } from "react-icons/md";
import { BASE_URL } from "../../../../utils/baseURL";
import BigSpinner from "../../../../shared/loader/BigSpinner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "../../../../shared/pagination/Pagination";
import { IoEyeOutline } from "react-icons/io5";
import ProductView from "./ProductView";
import ProductDelete from "./ProductDelete";

const ProductListTable = () => {

  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isViewData, setIsViewData] = useState({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteData, setIsDeleteData] = useState({});

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: [`/api/v1/product?page=${page}&limit=${rows}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/product?page=${page}&limit=${rows}`)
      const data = await res.json();
      return data;
    }
  }) // get All Product

  if (isLoading) {
    <BigSpinner />
  }

  // open view modal
  const handleView = (data) => {
    setIsViewData(data)
    setIsViewOpen(true)
  }

  // open delete modal
  const handleDelete = (data) => {
    setIsDeleteData(data)
    setIsDeleteOpen(true)
  }

  return (
    <div>
      {/* Table for showing data */}
      {
        products?.data?.length > 0 ?
          <div className="mt-5 overflow-x-auto rounded bg-white">

            <div className="flex items-center justify-end mb-4">
              <div className="flex items-center gap-2 rounded-xl border border-[#E7E7E7] bg-gray-50 px-[5px] py-2 mt-[24px]">
                <BiSearch className="text-[#717171]" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-50 bg-none w-full outline-none text-[14px] font-semibold placeholder-[#717171]"
                />
              </div>
            </div>

            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Product
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Price
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Color
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Menu
                  </th>
                  <th className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {products?.data?.map((product) => (
                  <tr key={product?._id}>
                    <td className="whitespace-nowrap px-4 py-2">
                      <img src={product?.thumbnail_image} alt="" className="w-20" />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {product?.title}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-semibold">
                      {product?.price}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-semibold text-${product?.colorId?.color.toLowerCase()}-500`}>
                      {product?.colorId?.color}
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                      {product?.menuId?.menu}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                      <IoEyeOutline onClick={() => handleView(product)} className='cursor-pointer text-gray-500 hover:text-gray-300' size={25} />
                      <FiEdit className='cursor-pointer text-gray-500 hover:text-gray-300' size={25} />
                      <MdDeleteForever onClick={() => handleDelete(product)} className='cursor-pointer text-red-500 hover:text-red-300' size={25} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          :
          <NoDataFound />
      }

      <hr />

      {/* Pagination */}
      <Pagination rows={rows} page={page} setPage={setPage} setRows={setRows} totalData={products?.totalData} />

      {/* Handle open view modal */}
      {
        isViewOpen &&
        <ProductView setIsViewOpen={setIsViewOpen} isViewData={isViewData} />
      }

      {/* Handle open delete modal */}
      {
        isDeleteOpen &&
        <ProductDelete setIsDeleteOpen={setIsDeleteOpen} isDeleteData={isDeleteData} refetch={refetch} />
      }

    </div>
  );
};

export default ProductListTable;