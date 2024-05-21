
import { CgToday } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";

const DashboardTabs = ({ tabs }) => {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-2 mt-6 gap-3">
      <Link to="/admin/customer">
        <div className="bg-[#D4F3FB] rounded-xl border border-gray-300 flex items-center justify-between p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] bg-[#00B7E9] rounded-full">
              <FaUsers
                size={20}
                color="#FFFFFF"
                className="relative left-1 top-2"
              />
            </p>
          </div>
          <div>
            <p className="text-end">Customer</p>
            <h2 className="font-medium text-[24px]">
              {tabs?.allCustomerCount}
            </h2>
          </div>
        </div>
      </Link>

      <Link to="/admin/product">
        <div className="bg-[#DEF6EE] rounded-xl border border-gray-300 flex items-center justify-between p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] bg-[#3EC99E] rounded-full">
              <TiShoppingCart
                size={20}
                color="#FFFFFF"
                className="relative left-1 top-2"
              />
            </p>
          </div>
          <div>
            <p className="text-end">Products</p>
            <h2 className="font-medium text-[24px]">{tabs?.allProductCount}</h2>
          </div>
        </div>
      </Link>

      <Link to="/admin/order">
        <div className="bg-teal-100 rounded-xl border border-gray-300 flex items-center justify-between p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] bg-teal-500 rounded-full">
              <MdOutlineCalendarMonth
                size={20}
                color="#FFFFFF"
                className="relative left-1 top-2"
              />
            </p>
          </div>
          <div>
            <p className="text-end">Total Order</p>
            <h2 className="font-medium text-[24px]">{tabs?.allOrderCount}</h2>
          </div>
        </div>
      </Link>

      <Link to="/admin/order">
        <div className="bg-[#EAE9FE] rounded-xl border border-gray-300 flex items-center justify-between p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] bg-[#837DFB] rounded-full">
              <CgToday
                size={18}
                color="#FFFFFF"
                className="relative left-1 top-2"
              />
            </p>
          </div>
          <div>
            <p className="text-end">Today Order</p>
            <h2 className="font-medium text-[24px]">{tabs?.todaySellCount}</h2>
          </div>
        </div>
      </Link>

      <Link to="/admin/order">
        <div className="bg-green-300 rounded-xl border border-gray-300 flex items-center justify-between p-6 gap-4">
          <div>
            <p className="w-[30px] h-[30px] bg-primaryLightColor rounded-full">
              <MdOutlineCalendarMonth
                size={20}
                color="#FFFFFF"
                className="relative left-1 top-2"
              />
            </p>
          </div>
          <div>
            <p className="text-end">Revenue</p>
            <h2 className="font-medium text-[24px]">{tabs?.totalPrice}৳</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DashboardTabs;
