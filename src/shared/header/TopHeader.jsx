import { IoCallOutline } from 'react-icons/io5'
import { CiMail } from 'react-icons/ci'
import "./header.css"
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'


export default function TopHeader() {
    return (
        <div className="bg-[#008140] text-white">
            <div className="es_container">
                <div className="flex items-center justify-between py-2">
                    <div className="left flex items-center gap-4">
                        <div className="number ms-20 xl:ms-0 flex items-center ">
                            <IoCallOutline className="text-ftPrimaryColor" />
                            <Link
                                to="tel:+91 98765433345"
                                className=" text-ftMuteColor text-[13px] font-light"
                            >
                                +91 9876543210
                            </Link> <span className='ms-3'>|</span>
                        </div>
                        <div className="email flex items-center">
                            <CiMail className="text-ftPrimaryColor" />
                            <Link
                                to="mailto: develoer@dev.com"
                                className=" text-ftMuteColor text-[13px] font-light"
                            >
                                classicit@gmail.com
                            </Link>
                        </div>

                    </div>
                    <div className="right  me-20 xl:me-0">
                        <div className="left flex items-center gap-4">
                            <div className="email flex items-center">
                                <FaShoppingCart className="text-ftPrimaryColor" />
                                <Link
                                    to="mailto: develoer@dev.com"
                                    className="ml-2 text-ftMuteColor text-[13px] font-light"
                                >
                                    Track Order
                                </Link> <span className='ms-3'>|</span>
                            </div>

                            <div className="email flex items-center">
                                <Link
                                    to="mailto: develoer@dev.com"
                                    className=" text-ftMuteColor text-[13px] font-light"
                                >
                                    Help Center
                                </Link><span className='ms-3'>|</span>
                            </div>
                            <div className="email flex items-center">
                                <Link
                                    to="mailto: develoer@dev.com"
                                    className="text-ftMuteColor text-[13px] font-light"
                                >
                                    Wish List
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
