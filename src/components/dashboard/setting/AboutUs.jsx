/* eslint-disable react/prop-types */

import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAddSiteSettingMutation } from '../../../redux/feature/setting/settingApi';
import { toast } from 'react-toastify';

const AboutUs = ({ initialData, refetch }) => {
    const [aboutUs, setAboutUs] = useState(initialData?.aboutUs);
    const [return_exchange, setReturn_exchange] = useState(initialData?.return_exchange);
    const [contact_us, setContact_us] = useState(initialData?.contact_us);
    const [shipping_info, setShipping_info] = useState(initialData?.shipping_info);

    const [postSiteSettng] = useAddSiteSettingMutation()

    // about us post
    const handleDataPost = async () => {
        toast.error("Please wait a moment")
        const sendData = {
            aboutUs: aboutUs,
            _id: initialData?._id
        }
        postSiteSettng(sendData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Site update successfully !", {
                    autoClose: 1000
                });
                refetch();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }

    // return and exchange post
    const handleDataPost2 = async () => {
        toast.error("Please wait a moment")
        const sendData = {
            return_exchange: return_exchange,
            _id: initialData?._id
        }
        postSiteSettng(sendData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Site update successfully !", {
                    autoClose: 1000
                });
                refetch();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }

    // return and exchange post
    const handleDataPost3 = async () => {
        toast.error("Please wait a moment")
        const sendData = {
            contact_us: contact_us,
            _id: initialData?._id
        }
        postSiteSettng(sendData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Site update successfully !", {
                    autoClose: 1000
                });
                refetch();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }

    // Shipping info post
    const handleDataPost4 = async () => {
        toast.error("Please wait a moment")
        const sendData = {
            shipping_info: shipping_info,
            _id: initialData?._id
        }
        postSiteSettng(sendData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Site update successfully !", {
                    autoClose: 1000
                });
                refetch();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }

    return (
        <>
            {/* About us */}
            <ReactQuill theme="snow" value={aboutUs} onChange={setAboutUs} />
            <div onClick={() => handleDataPost()} className="mt-2 flex items-center justify-end">
                <button type="submit" className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2">Submit</button>
            </div>

            {/* Return and exchange */}
            <h4 className="font-semibold text-[20px] mt-2">Return And Exchange</h4>
            <hr className="mt-2 mb-4" />
            <ReactQuill theme="snow" value={return_exchange} onChange={setReturn_exchange} />
            <div onClick={() => handleDataPost2()} className="mt-2 flex items-center justify-end">
                <button type="submit" className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2">Submit</button>
            </div>

            {/* Contact Us */}
            <h4 className="font-semibold text-[20px] mt-2">Contact Us</h4>
            <hr className="mt-2 mb-4" />
            <ReactQuill theme="snow" value={contact_us} onChange={setContact_us} />
            <div onClick={() => handleDataPost3()} className="mt-2 flex items-center justify-end">
                <button type="submit" className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2">Submit</button>
            </div>

            {/* Shipping Info */}
            <h4 className="font-semibold text-[20px] mt-2">Shipping Info</h4>
            <hr className="mt-2 mb-4" />
            <ReactQuill theme="snow" value={shipping_info} onChange={setShipping_info} />
            <div onClick={() => handleDataPost4()} className="mt-2 flex items-center justify-end">
                <button type="submit" className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2">Submit</button>
            </div>
        </>
    );
};

export default AboutUs;