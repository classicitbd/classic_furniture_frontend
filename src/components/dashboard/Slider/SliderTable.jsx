/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */
// import { MdDeleteForever } from "react-icons/md";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { CiSquarePlus } from "react-icons/ci";
import { useState } from "react";
import AddSlider from "./AddSlider";
import { BASE_URL } from "../../../utils/baseURL";
import { useDeleteSliderMutation } from "../../../redux/feature/slider/sliderApi";
import { toast } from "react-toastify";
import UpdateSlider from "./UpdateSlider";

const SliderTable = ({sliders, refetch}) => {

    const [addSliderModalOpen, setAddSliderModalOpen] = useState(false)
    const [sliderUpdateModal, setSliderUpdateModal] = useState(false)
    const [sliderUpdateModalValue, setSliderUpdateModalValue] = useState('')

    const [deleteSlider] = useDeleteSliderMutation();  //delete Slider type

    const updateSliderModal = (slider) =>{
        setSliderUpdateModal(true);
        setSliderUpdateModalValue(slider)
    }

    // delete a Slider
    const handleDeleteSlider = (slider) => {
        const sendData = {
            _id: slider?._id
        }
        deleteSlider(sendData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Slider Delete successfully !", {
                    autoClose: 1000
                });
                refetch();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }

    return (
        <div className="my-12">
            <div className="flex items-center justify-between mb-8 ">
                <h1 className="font-semiboldunderline md:text-2xl text-xl underline">Manage your image</h1>
                <button onClick={() => setAddSliderModalOpen(!addSliderModalOpen)} className="btn bg-sky-500 hover:bg-sky-300 px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2">Add <CiSquarePlus className="text-gray-300" size={20} /> </button>
            </div>
            {/* Table for showing data */}
                    {
    sliders?.data?.length > 0 ?
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
            {
                sliders?.data?.map(slider =>
            <div key={slider?._id} className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md">
    <img className="object-cover w-full h-64" src={`${BASE_URL}/sliderImages/${slider?.slider}`} alt="slider" />

    <div className="p-6">

        <div className="mt-4">
            <div className="flex items-center justify-between">
                <MdDeleteForever onClick={() => handleDeleteSlider(slider)} className='cursor-pointer text-red-500 hover:text-red-300' size={25} />
                    <FiEdit onClick={() =>updateSliderModal(slider)} className='cursor-pointer text-gray-500 hover:text-gray-300' size={25} />
            </div>
        </div>
    </div>
</div>
            )
            }
        </div>
:
<NoDataFound />
}
        {
            addSliderModalOpen && <AddSlider setAddSliderModalOpen={setAddSliderModalOpen} refetch={refetch} />
        }
        {/* Update Slider */}
            {
                sliderUpdateModal && <UpdateSlider setSliderUpdateModal={setSliderUpdateModal} sliderUpdateModalValue={sliderUpdateModalValue} refetch={refetch} />
            }
        </div>
    );
};

export default SliderTable;