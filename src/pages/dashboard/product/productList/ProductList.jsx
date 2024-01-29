import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import ProductListTable from "../../../../components/dashboard/product/productList/ProductListTable";

const ProductList = () => {
    return (
        <>
            {/* Product List Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Product List</h3>
                <div className="flex items-center gap-2">
                    <Link to='/istiak'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/istiak/product'><p className="font-semibold">Product List</p></Link>
                </div>
            </div>

            {/* Show product data in table */}
            <ProductListTable />
        </>
    );
};

export default ProductList;