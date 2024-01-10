/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAddSliderMutation } from '../../../redux/feature/slider/sliderApi';
import { RxCross1 } from 'react-icons/rx';
import { ImageValidate } from '../../../utils/ImageValidation';

const AddSlider = ({refetch, setAddSliderModalOpen}) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const [postSlider] = useAddSliderMutation();  //post Slider type

    // post a Slider 
    const handleDataPost = (data) => {
        const formData = new FormData()
        let errorEncountered = false;

        if (data?.slider[0]) {
            const slider = data?.slider[0];
            const result = ImageValidate(slider, 'slider');  //check image type
            if (result == true) {
                formData.append('slider', slider);
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
                errorEncountered = true;
            }
        }

        if (errorEncountered == true) {
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'slider') {
                formData.append(key, value);
            }
        });
        postSlider(formData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Slider Added successfully !", {
                    autoClose: 1000
                });
                reset();
                refetch();
                setAddSliderModalOpen(false)
            } else {
                toast.error(result?.error?.data?.message);
                setAddSliderModalOpen(false)
            }
        });
    }

    return (
        <>
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-30">
            <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">

                <div className="flex items-center justify-between">
                    <h3 className="text-[26px] font-bold text-[#0A0A0A] capitalize" id="modal-title"> Add Slider </h3>
                    <button className='btn bg-white hover:bg-white border p-1'><RxCross1 onClick={() => setAddSliderModalOpen(false)} size={25}></RxCross1></button>
                </div>

                    {/* Add A Slider Type */}

                        <form onSubmit={handleSubmit(handleDataPost)} className='mt-3'>

                            <div>
                                <input {...register("slider", { required: 'Slider is required' })} id="slider" type="file" className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                                {errors.slider && <p className='text-red-600'>{errors.slider?.message}</p>}
                            </div>

                                <div className="flex justify-end mt-6 gap-4">
                        <button onClick={() => setAddSliderModalOpen(false)} className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border">Cancel</button>
                        <button type="Submit" className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]">Add</button>
                    </div>
                        </form>

                </div>
            </div>
        </>
    );
};

export default AddSlider;