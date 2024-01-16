/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useUpdateSub_CategoryMutation } from "../../../redux/feature/subCategory/subCategoryApi";
import { toast } from "react-toastify";
import slugify from "slugify";
import { RxCross1 } from "react-icons/rx";
import { ImageValidate } from "../../../utils/ImageValidation";

const UpdateSubCategory = ({refetch, setSubCategoryUpdateModal, subCategoryUpdateModalValue}) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const [updateSubCategory] = useUpdateSub_CategoryMutation(); //Update Category

    // post a User details
    const handleDataPost = (data) => {
        if (data?.sub_category_image[0]){
            const formData = new FormData()
            let errorEncountered = false;

            const sub_category_image = data?.sub_category_image[0];
            const result = ImageValidate(sub_category_image, 'sub_category_image');  //check image type
            if (result == true) {
                formData.append('sub_category_image', sub_category_image);
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
                errorEncountered = true;
            }

        if (errorEncountered == true) {
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
        formData.append('_id', subCategoryUpdateModalValue?._id);
            formData.append('categoryId', subCategoryUpdateModalValue?.categoryId?._id);
            formData.append('menuId', subCategoryUpdateModalValue?.menuId?._id);
        updateSubCategory(formData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Sub Category update successfully !", {
                    autoClose: 1000
                });
                refetch();
                reset();
                setSubCategoryUpdateModal(false);
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
        }else{
        const sendData = {
            categoryId: subCategoryUpdateModalValue?.categoryId?._id,
            menuId: subCategoryUpdateModalValue?.menuId?._id,
            _id: subCategoryUpdateModalValue?._id,
            sub_category: data?.sub_category,
            slug: slugify(data.sub_category, {
                lower: true,
                replacement: '-',
            } ),
        }
        updateSubCategory(sendData).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Sub category update successfully !", {
                    autoClose: 1000
                });
                refetch();
                reset();
                setSubCategoryUpdateModal(false);
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
                    <button className='btn bg-white hover:bg-white border p-1'><RxCross1 onClick={() => setSubCategoryUpdateModal(false)} size={25}></RxCross1></button>
                </div>

                <hr className="mt-2 mb-4" />

                <form onSubmit={handleSubmit(handleDataPost)}>

                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="sub_category">Sub Category Type<span className="text-red-500">*</span></label>
                        <input placeholder="Sub Category Types" {...register("sub_category", { required: 'Sub Category Types is required' })} id="sub_category" type="text" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" defaultValue={subCategoryUpdateModalValue?.sub_category} />
                        {errors.sub_category && <p className='text-red-600'>{errors.sub_category?.message}</p>}
                    </div>

                    <div className="mt-3">
                        <label className="font-semibold text-red-500" htmlFor="sub_category_image">If need change image</label>
                        <input {...register("sub_category_image")} id="sub_category_image" type="file" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                    </div>

                    <div className="flex justify-end mt-6 gap-4">
                        <button onClick={() => setSubCategoryUpdateModal(false)} className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border">Cancel</button>
                        <button type="Submit" className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]">Update</button>
                    </div>


                </form>

            </div>
        </div>
    );
};

export default UpdateSubCategory;