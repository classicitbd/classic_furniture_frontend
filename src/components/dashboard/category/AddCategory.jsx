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
import { ImageValidate } from '../../../utils/ImageValidation';
import Select from 'react-select';


const AddCategory = ({refetch, isLoading}) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [menuLength, setMenuLength] = useState(1);
    const [menuId, setMenuId] = useState('');

    const { data: menuTypes = [] } = useQuery({
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
         const formData = new FormData()
        let errorEncountered = false;

        if (data?.category_image[0]) {
            const category_image = data?.category_image[0];
            const result = ImageValidate(category_image, 'category_image');  //check image type
            if (result == true) {
                formData.append('category_image', category_image);
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
            if (key !== 'category_image') {
                formData.append(key, value);
            }
        });
        const slug = slugify(data.category, {
                lower: true,
                replacement: '-',
            } )
        formData.append('slug', slug);
        formData.append('menuId', menuId);
        postCategoryType(formData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                setLoading(false)
                toast.success(result?.data?.message ? result?.data?.message : "Category Added successfully !", {
                    autoClose: 1000
                });
                refetch();
                reset();
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
                                <input {...register("category_image", { required: 'Image is required' })} id="category_image" type="file" className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                                {errors.category_image && <p className='text-red-600'>{errors.category_image?.message}</p>}
                            </div>

                            <div>
                                {
                                    menuTypes?.data?.length > 0 ?
                                    // <>
                                    // <select  {...register('menuId', { required: 'Menu type is required' })} id="menuId" className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl">
                                    // {
                                    // menuTypes?.data?.map(menu =>
                                    //     <option key={menu?._id} value={menu?._id}>{menu?.menu}</option> )
                                    // }
                                    // </select>
                                    // {errors.menuId && <p className='text-red-600'>{errors.menuId?.message}</p>}
                                    // </>
                                        <Select
                                            id="menuId"
                                            name="menuId"
                                            required
                                            aria-label="Select a Menu"
                                            options={menuTypes?.data}
                                            getOptionLabel={(x) => x?.menu}
                                            getOptionValue={(x) => x?._id}
                                            onChange={(selectedOption) => setMenuId(selectedOption?._id)}
                                        ></Select>
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