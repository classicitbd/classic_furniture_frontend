import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const SiteSetting = () => {
    return (
        <>

        {/* Site setting navbar */}

            <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Site Seeting</h3>
                <div className="flex items-center gap-2">
                    <Link to='/dashboard'><p><PiHouseBold size={25} color="#3EA2FA" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link to='/dashboard/seeting'><p className="font-semibold">Site Seeting</p></Link>
                </div>
            </div>
        
        </>
    );
};

export default SiteSetting;