import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import ProductAdd from "../../../../components/dashboard/product/productCreate/ProductAdd";

const ProductCreate = () => {
    return (
        <>
            {/* Product Create Page Navbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Product Create</h3>
                <div className="flex items-center gap-2">
                    <Link to='/admin'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/admin/product/create'><p className="font-semibold">Product Create</p></Link>
                </div>
            </div>

            {/* Create a product */}
            <ProductAdd />

        </>
    );
};

export default ProductCreate;