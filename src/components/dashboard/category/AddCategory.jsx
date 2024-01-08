/* eslint-disable no-irregular-whitespace */
import { useForm } from 'react-hook-form';
import BigSpinner from '../../../shared/loader/BigSpinner'
import { toast } from 'react-toastify';
import { useState } from 'react';
import MiniSpinner from '../../../shared/loader/MiniSpinner';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../../../utils/baseURL';
import { useAddCategoryMutation } from '../../../redux/feature/category/categoryApi';
import { Link } from 'react-router-dom';
import slugify from 'slugify';


const AddCategory = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [menuLength, setMenuLength] = useState(1);

    const { data: menuTypes = [], isLoading, refetch } = useQuery({
        queryKey: ['/api/v1/menu'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/menu`)
            const data = await res.json();
            if(data?.data?.length === 0){
                setMenuLength(0)
            }
            return data;
        }
    }) // get All Menu type

    const [postCategoryType] = useAddCategoryMutation();  //post Category type

    if (isLoading) {
        <BigSpinner />
    }


    // post a Category 
    const handleDataPost = (data) => {
        setLoading(true)
        const sendData = {
            slug: slugify(data.category, {
                lower: true,
                replacement: '-',
            } ),
            category: data.category,
            menuId: data?.menuId
        }
        postCategoryType(sendData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                setLoading(false)
                toast.success(result?.data?.message ? result?.data?.message : "Category Added successfully !", {
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

    return (
        <>
            <div className="my-10 bg-white border border-gray-200 rounded-xl">
                <div className="m-[30px]">

                    {/* Add A Category Type */}
                    <div>
                        <h2 className="font-semibold text-[20px]">Add A Category Type: </h2>

                        <form onSubmit={handleSubmit(handleDataPost)} className='flex items-center gap-2 md:gap-6 mt-3'>

                            <div>
                                <input placeholder="Type Name" {...register("category", { required: 'Type Name is required' })} id="category" type="text" className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                                {errors.category && <p className='text-red-600'>{errors.category?.message}</p>}
                            </div>

                            <div>
                                {
                                    menuTypes?.data?.length > 0 ?
                                    <>
                                    <select  {...register('menuId', { required: 'Menu type is required' })} id="menuId" className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl">
                                    {
                                    menuTypes?.data?.map(menu =>
                                        <option key={menu?._id} value={menu?._id}>{menu?.menu}</option> )
                                    }
                                    </select>
                                    {errors.menuId && <p className='text-red-600'>{errors.menuId?.message}</p>}
                                    </>
                                    :
                                    ''
                                }
                                </div>

                                {
                                    menuLength == 0 ?
                                    <Link to='/dashboard/menu'>
                                    <button type="Submit" className="px-6 py-2 text-white transition-colors duration-300 transform bg-red-500 rounded-xl hover:bg-red-400">Please create a menu</button>
                                    </Link>
                                    :
                                    <button type="Submit" className="px-6 py-2 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]">{loading ? <MiniSpinner /> : "Create"}</button>

                                }
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default AddCategory;