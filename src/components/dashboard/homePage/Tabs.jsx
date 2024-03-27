import { FaUsers } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { CgToday } from "react-icons/cg";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { Link } from "react-router-dom";

const Tabs = ({ tabs }) => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 mt-6 gap-3">
      <Link to='/istiak/customer'>
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
            <h2 className="font-medium text-[24px]">{tabs?.allCustomerCount - 1}</h2>
          </div>
        </div>
      </Link>

      <Link to='/istiak/product'>
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

      <Link to='/istiak/order'>
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

      <Link to='/istiak/order'>
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
            <p className="text-end">Month Order</p>
            <h2 className="font-medium text-[24px]">
              {tabs?.thisMonthSellCount}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Tabs;
