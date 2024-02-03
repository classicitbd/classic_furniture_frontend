import { MdDeleteForever } from "react-icons/md";
import NoDataFound from "../../common/noDataFound/NoDataFound";
// import { BiSearch } from "react-icons/bi";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { BASE_URL } from "../../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CustomerDeleteModal from "./CustomerDeleteModal";
import Pagination from "../../../shared/pagination/Pagination";
import Select from "react-select";
import { getCookie } from "../../../utils/cookie-storage";
import { authKey } from "../../../constants/storageKey";

const CustomerTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteData, setIsDeleteData] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchData, setIsSearchData] = useState({});

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/userReg?page=${page}&limit=${rows}`],
    queryFn: async () => {
      const token = getCookie(authKey); // Assuming you have a function to get the token from cookies

      const res = await fetch(
        `${BASE_URL}/userReg?page=${page}&limit=${rows}`,
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

  // open search user
  const handleSearchUser = (data) => {
    setIsSearchData(data);
    setIsSearchOpen(true);
  };

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div>
      {/* Table for showing data */}
      {users?.data?.length > 0 ? (
        <div className="mt-5 overflow-x-auto rounded bg-white">
          <div className="flex items-center justify-end my-4">
            <Select
              className="w-[300px]"
              id="user"
              name="user"
              required
              aria-label="Select a user"
              options={users?.data}
              getOptionLabel={(x) => x?.name}
              getOptionValue={(x) => x?._id}
              onChange={(selectedOption) => handleSearchUser(selectedOption)}
            ></Select>
          </div>

          {/* show search user */}
          {isSearchOpen && (
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    Phone
                  </th>
                  <th className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {isSearchData?.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {isSearchData?.phone}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    <MdDeleteForever
                      onClick={() => handleDelete(isSearchData)}
                      className="cursor-pointer text-red-500 hover:text-red-300"
                      size={25}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          )}

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
                <th className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users?.data?.map((user) => (
                <tr key={user?._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {user?.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-semibold">
                    {user?.phone}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    <MdDeleteForever
                      onClick={() => handleDelete(user)}
                      className="cursor-pointer text-red-500 hover:text-red-300"
                      size={25}
                    />
                  </td>
                </tr>
              ))}
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
          setIsSearchData={setIsSearchData}
          setIsSearchOpen={setIsSearchOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          isDeleteData={isDeleteData}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default CustomerTable;
