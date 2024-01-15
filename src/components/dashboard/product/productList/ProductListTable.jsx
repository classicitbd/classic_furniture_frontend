/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import { FiEdit } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import NoDataFound from "../../../common/noDataFound/NoDataFound";
import { MdDeleteForever } from "react-icons/md";
import { BASE_URL } from "../../../../utils/baseURL";
import BigSpinner from "../../../../shared/loader/BigSpinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Pagination from "../../../../shared/pagination/Pagination";
import { IoEyeOutline } from "react-icons/io5";
import ProductView from "./ProductView";
import ProductDelete from "./ProductDelete";
import ProductUpdate from "./ProductUpdate";
import { toast } from "react-toastify";

const ProductListTable = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.target.value);
      fetch(
        `${BASE_URL}/product/searchProduct/${searchTerm}`
      )
        .then((response) => response.json())
        .then((result) => {
          if (result?.statusCode == 200 && result?.success == true) {
            setSearchData(result?.data)
            setIsSearchOpen(true);
          } else {
            toast.error(result?.error?.data?.message);
          }
        });
    }
  }

  useEffect(() => {
    if (searchTerm != '') {
      fetch(
        `${BASE_URL}/product/searchProduct/${searchTerm}`
      )
        .then((response) => response.json())
        .then((result) => {
          if (result?.statusCode == 200 && result?.success == true) {
            setSearchData(result?.data)
            setIsSearchOpen(true);
          } else {
            toast.error(result?.error?.data?.message);
          }
        });
    }else{
      setSearchTerm('')
      setSearchData([])
    }
  }, [searchTerm]);

  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isViewData, setIsViewData] = useState({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteData, setIsDeleteData] = useState({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState(false);

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

  const handleUpdate = (data) => {
    setUpdateModalValue(data)
    setIsUpdateModalOpen(true)
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
                  onKeyDown={(e) => handleSearch(e)}
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-50 bg-none w-full outline-none text-[14px] font-semibold placeholder-[#717171]"
                />
              </div>
            </div>

            {/* Search product show */}

            {
              isSearchOpen === true &&
               <>
               {
                  searchData?.length > 0 ?
                    <>
                    <p className="text-center text-red-500 font-semibold mb-4">Search Product is here: </p>
                      <table className="min-w-full divide-y-2 divide-gray-200 text-sm mb-10">
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
                          {searchData?.map((product) => (
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
                              <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                                {product?.colorId?.color}
                              </td>
                              <td className={`whitespace-nowrap px-4 py-2 font-semibold`}>
                                {product?.menuId?.menu}
                              </td>

                              <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                                <IoEyeOutline onClick={() => handleView(product)} className='cursor-pointer text-gray-500 hover:text-gray-300' size={25} />
                                <FiEdit onClick={() => handleUpdate(product)} className='cursor-pointer text-gray-500 hover:text-gray-300' size={25} />
                                <MdDeleteForever onClick={() => handleDelete(product)} className='cursor-pointer text-red-500 hover:text-red-300' size={25} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                    :
                    <NoDataFound />
               }
               </>
            }

            {/* All product show */}

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
                      <FiEdit onClick={() => handleUpdate(product)} className='cursor-pointer text-gray-500 hover:text-gray-300' size={25} />
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

      {/* Handle open update modal */}
      {
        isUpdateModalOpen &&
        <ProductUpdate setIsUpdateModalOpen={setIsUpdateModalOpen} updateModalValue={updateModalValue} refetch={refetch} />
      }

    </div>
  );
};

export default ProductListTable;