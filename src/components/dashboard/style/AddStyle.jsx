/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import MiniSpinner from '../../../shared/loader/MiniSpinner';
import slugify from 'slugify';
import { useAddStyleMutation } from '../../../redux/feature/style/styleApi';

const AddStyle = ({refetch}) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const [postStyleType] = useAddStyleMutation();  //post Style type

    // post a Style
    const handleDataPost = (data) => {
        setLoading(true)
        const sendData = {
            slug: slugify(data.style, {
                lower: true,
                replacement: '-',
            } ),
            style: data.style,
        }
        postStyleType(sendData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                setLoading(false)
                toast.success(result?.data?.message ? result?.data?.message : "Style Added successfully !", {
                    autoClose: 1000
                });
                reset();
                refetch();
            } else {
                setLoading(false)
                toast.error(result?.error?.data?.message);
            }
        });
    }

    return(
        <>
            <div className="my-10 bg-white border border-gray-200 rounded-xl">
                <div className="m-[30px]">

                    {/* Add A Style Type */}
                    <div>
                        <h2 className="font-semibold text-[20px]">Add A Style Type: </h2>

                        <form onSubmit={handleSubmit(handleDataPost)} className='flex items-center gap-2 md:gap-6 mt-3'>

                            <div>
                                <input placeholder="Type Name" {...register("style", { required: 'Type Name is required' })} id="style" type="text" className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                                {errors.style && <p className='text-red-600'>{errors.style?.message}</p>}
                            </div>

                                <button type="Submit" className="px-6 py-2 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]">{loading ? <MiniSpinner /> : "Create"}</button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default AddStyle;