/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {RxCross1} from 'react-icons/rx';
import slugify from "slugify";
import { useUpdateCategoryMutation } from "../../../redux/feature/category/categoryApi";
import { ImageValidate } from "../../../utils/ImageValidation";

const UpdateCategory = ({setCategoryUpdateModal, categoryUpdateModalValue, refetch}) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const [updateCategory] = useUpdateCategoryMutation(); //Update Category

    // post a User details
    const handleDataPost = (data) => {
        if (data?.category_image[0]){
            const formData = new FormData()
            let errorEncountered = false;

            const category_image = data?.category_image[0];
            const result = ImageValidate(category_image, 'category_image');  //check image type
            if (result == true) {
                formData.append('category_image', category_image);
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
                errorEncountered = true;
            }

        if (errorEncountered == true) {
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
        formData.append('_id', categoryUpdateModalValue?._id);
        updateCategory(formData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Category update successfully !", {
                    autoClose: 1000
                });
                refetch();
                reset();
                setCategoryUpdateModal(false);
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
        }else{
        const sendData = {
            _id: categoryUpdateModalValue?._id,
            category: data?.category,
            slug: slugify(data.category, {
                lower: true,
                replacement: '-',
            } ),
        }
        updateCategory(sendData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Category update successfully !", {
                    autoClose: 1000
                });
                refetch();
                reset();
                setCategoryUpdateModal(false);
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-30">
            <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">

                <div className="flex items-center justify-between">
                    <h3 className="text-[26px] font-bold text-[#0A0A0A] capitalize" id="modal-title"> Update Menu Type </h3>
                    <button className='btn bg-white hover:bg-white border p-1'><RxCross1 onClick={() => setCategoryUpdateModal(false)} size={25}></RxCross1></button>
                </div>

                <hr className="mt-2 mb-4" />

                <form onSubmit={handleSubmit(handleDataPost)}>

                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="category">Category Type<span className="text-red-500">*</span></label>
                        <input placeholder="Category Types" {...register("category", { required: 'Category Types is required' })} id="category" type="text" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" defaultValue={categoryUpdateModalValue?.category} />
                        {errors.category && <p className='text-red-600'>{errors.category?.message}</p>}
                    </div>

                    <div className="mt-3">
                        <label className="font-semibold text-red-500" htmlFor="category_image">If need change image</label>
                        <input {...register("category_image")} id="category_image" type="file" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                    </div>


                    <div className="flex justify-end mt-6 gap-4">
                        <button onClick={() => setCategoryUpdateModal(false)} className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border">Cancel</button>
                        <button type="Submit" className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]">Update</button>
                    </div>


                </form>

            </div>
        </div>
    );
};

export default UpdateCategory;