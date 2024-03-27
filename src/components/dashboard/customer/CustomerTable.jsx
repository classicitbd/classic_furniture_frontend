import { MdDeleteForever } from "react-icons/md";
import NoDataFound from "../../common/noDataFound/NoDataFound";
// import { BiSearch } from "react-icons/bi";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CustomerDeleteModal from "./CustomerDeleteModal";
import Pagination from "../../../shared/pagination/Pagination";
import { getCookie } from "../../../utils/cookie-storage";
import { authKey } from "../../../constants/storageKey";
import { BiSearch } from "react-icons/bi";

const CustomerTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteData, setIsDeleteData] = useState({});

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };


  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/userReg?page=${page}&limit=${rows}&searchTerm=${searchTerm}`],
    queryFn: async () => {
      const token = getCookie(authKey); // Assuming you have a function to get the token from cookies

      const res = await fetch(
        `${BASE_URL}/userReg?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Add other headers as needed
          },
        }
      );

      const data = await res.json();
      return data;
    },
  }); // get All User

  // open delete modal
  const handleDelete = (data) => {
    setIsDeleteData(data);
    setIsDeleteOpen(true);
  };

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div>
      {/* Table for showing data */}
      {users?.data?.length > 0 ? (
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

          {/* Show all user */}
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Phone
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Division
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  District
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  City
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Role
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users?.data?.map((user) => {
                if (user?.phone !== '01753142981') {
                  return (
                    <tr key={user?._id}>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {user?.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {user?.phone}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {user?.division}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {user?.district}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {user?.city}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {user?.role}
                      </td>

                      {user?.role !== 'admin' && (
                        <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                          <MdDeleteForever
                            onClick={() => handleDelete(user)}
                            className="cursor-pointer text-red-500 hover:text-red-300"
                            size={25}
                          />
                        </td>
                      )}
                    </tr>
                  );
                } else {
                  return null; // Skip rendering this user
                }
              })}

            </tbody>
          </table>
        </div>
      ) : (
        <NoDataFound />
      )}

      <hr />

      {/* Pagination */}
      <Pagination
        rows={rows}
        page={page}
        setPage={setPage}
        setRows={setRows}
        totalData={users?.totalData}
      />

      {/* Handle open delete modal */}
      {isDeleteOpen && (
        <CustomerDeleteModal
          setIsDeleteOpen={setIsDeleteOpen}
          isDeleteData={isDeleteData}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default CustomerTable;
