import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import AddCategory from "../../../components/dashboard/category/AddCategory";
import CategoryTable from "../../../components/dashboard/category/CategoryTable";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../utils/baseURL";
import BigSpinner from "../../../shared/loader/BigSpinner";
import { useState } from "react";
import { getCookie } from "../../../utils/cookie-storage";
import { authKey } from "../../../constants/storageKey";

const Category = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const token = getCookie(authKey);

  const {
    data: categoryTypes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  }); // get Category type

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <>
      {/* Category Page Navbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Category</h3>
        <div className="flex items-center gap-2">
          <Link to="/admin">
            <p>
              <PiHouseBold size={25} color="#3EA2FA" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link to="/admin/category">
            <p className="font-semibold">Category</p>
          </Link>
        </div>
      </div>

      {/* Add Category Type*/}
      <AddCategory refetch={refetch} />

      {/* delete and update And Show In Table  */}
      <CategoryTable
        categoryTypes={categoryTypes}
        refetch={refetch}
        rows={rows}
        page={page}
        setPage={setPage}
        setRows={setRows}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
};

export default Category;
