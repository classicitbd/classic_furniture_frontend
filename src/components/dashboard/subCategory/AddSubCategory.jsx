/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */
import { useForm } from 'react-hook-form';
import BigSpinner from '../../../shared/loader/BigSpinner'
import { toast } from 'react-toastify';
import { useState } from 'react';
import MiniSpinner from '../../../shared/loader/MiniSpinner';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../../../utils/baseURL';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import { useAddSub_CategoryMutation } from '../../../redux/feature/subCategory/subCategoryApi';
import { ImageValidate } from '../../../utils/ImageValidation';

const AddSubCategory = ({refetch, isLoading}) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const { data: categoryTypes = []} = useQuery({
        queryKey: ['/api/v1/category'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/category`)
            const data = await res.json();
            return data;
        }
    }) // get Category type

    const { data: menuTypes = [] } = useQuery({
        queryKey: ['/api/v1/menu'],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/menu`)
            const data = await res.json();
            return data;
        }
    }) // get All Menu type

    const [postSubCategoryType] = useAddSub_CategoryMutation();  //post Sub Category type

    if (isLoading) {
        <BigSpinner />
    }

    // post a Sub Category 
    const handleDataPost = (data) => {
        setLoading(true)
        const formData = new FormData()
        let errorEncountered = false;

        if (data?.sub_category_image[0]) {
            const sub_category_image = data?.sub_category_image[0];
            const result = ImageValidate(sub_category_image, 'sub_category_image');  //check image type
            if (result == true) {
                formData.append('sub_category_image', sub_category_image);
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
                errorEncountered = true;
            }
        }

        if (errorEncountered == true) {
            setLoading(false)
            return;
        }

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'sub_category_image') {
                formData.append(key, value);
            }
        });
        const slug = slugify(data.sub_category, {
                lower: true,
                replacement: '-',
            } )
        formData.append('slug', slug);
        postSubCategoryType(formData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                setLoading(false)
                toast.success(result?.data?.message ? result?.data?.message : "Sub Category Added successfully !", {
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

                    {/* Add A Sub Category Type */}
                    <div>
                        <h2 className="font-semibold text-[20px]">Add A Sub Category Type: </h2>

                        <form onSubmit={handleSubmit(handleDataPost)} className='flex items-center gap-2 md:gap-6 mt-3'>

                            <div>
                                <input placeholder="Type Name" {...register("sub_category", { required: 'Type Name is required' })} id="sub_category" type="text" className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                                {errors.sub_category && <p className='text-red-600'>{errors.sub_category?.message}</p>}
                            </div>

                            <div>
                                <input {...register("sub_category_image", { required: 'Image is required' })} id="sub_category_image" type="file" className="block w-full px-1 py-1 bg-white border border-gray-200 rounded-xl" />
                                {errors.sub_category_image && <p className='text-red-600'>{errors.sub_category_image?.message}</p>}
                            </div>

                            <div>
                                {
                                    categoryTypes?.data?.length > 0 ?
                                    <>
                                    <select  {...register('categoryId', { required: 'Category type is required' })} id="categoryId" className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl">
                                    {
                                    categoryTypes?.data?.map(category =>
                                        <option key={category?._id} value={category?._id}>{category?.category}</option> )
                                    }
                                    </select>
                                    {errors.categoryId && <p className='text-red-600'>{errors.categoryId?.message}</p>}
                                    </>
                                    :
                                    ''
                                }
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
                                    menuTypes?.data?.length === 0 ?
                                    <Link to='/dashboard/menu'>
                                    <button type="Submit" className="px-6 py-2 text-white transition-colors duration-300 transform bg-red-500 rounded-xl hover:bg-red-400">Please create a menu</button>
                                    </Link>
                                    :
                                    categoryTypes?.data?.length === 0 ?
                                    <Link to='/dashboard/category'>
                                    <button type="Submit" className="px-6 py-2 text-white transition-colors duration-300 transform bg-red-500 rounded-xl hover:bg-red-400">Please create a category</button>
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

export default AddSubCategory;