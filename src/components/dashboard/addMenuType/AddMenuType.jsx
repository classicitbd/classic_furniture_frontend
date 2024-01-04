import { useForm } from 'react-hook-form';
import { MdDeleteForever } from 'react-icons/md';
import BigSpinner from '../../../shared/loader/BigSpinner'
import { useAddMenuMutation, useDeleteMenuMutation, useGetMenuQuery } from '../../../redux/features/menu/menuApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import MiniSpinner from '../../../shared/loader/MiniSpinner';


const AddMenuType = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const [postMenuType] = useAddMenuMutation();  //post user type
    const [deleteMenuType] = useDeleteMenuMutation();  //delete user type
    const { data: menuType, isLoading } = useGetMenuQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 30000,
    }); // get user type

    if (isLoading) {
        <BigSpinner />
    }


    // post a Menu 
    const handleDataPost = (data) => {
        setLoading(true)
        postMenuType(data).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                setLoading(false)
                toast.success(result?.data?.message ? result?.data?.message : "Menu Added successfully !");
                reset();
            } else {
                setLoading(false)
                toast.error(result?.error?.data?.message);
            }
        });
    }

    // delete a Menu
    const handleDeleteMenuRole = (id) => {
        const data = {
            _id: id
        }
        deleteMenuType(data).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Menu Role Delete successfully !");
                reset();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }

    return (
        <>
            <div className="my-10 bg-white border border-gray-200 rounded-xl">
                <div className="m-[30px] flex items-start justify-between">
                    {/* menu All Type */}
                    <div>
                        <h2 className="font-semibold text-[20px] underline">All menu Type: </h2>
                        <ul className="list-decimal font-semibold ml-[30px] text-[20px] mt-4">
                            {
                                menuType?.data?.length > 0 ?
                                menuType?.data?.map((role, index) =>
                                    <li key={index}><p className='flex items-center gap-2 mb-2'> <MdDeleteForever onClick={() =>handleDeleteMenuRole(role?._id)} className='cursor-pointer text-red-500 hover:text-red-300' size={25} />{role?.menu}</p></li>
                                )
                                :
                                <p className='text-red-500'>There is no data found</p>
                            }
                        </ul>
                    </div>

                    {/* Add A menu Type */}
                    <div>
                        <h2 className="font-semibold text-[20px]">Add A menu Type: </h2>

                        <form onSubmit={handleSubmit(handleDataPost)}>

                            <div className="mt-3">
                                <label className="font-semibold" htmlFor="menu">Type Name<span className="text-red-500">*</span></label>
                                <input placeholder="Type Name" {...register("menu", { required: 'Type Name is required' })} id="menu" type="text" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                                {errors.menu && <p className='text-red-600'>{errors.menu?.message}</p>}
                            </div>

                            <button type="Submit" className="mt-6 px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#3EA2FA] rounded-xl hover:bg-[#3EA2FA]">{loading ? <MiniSpinner /> : "Create Now"}</button>

                        </form>
                    </div>


                </div>
            </div>
        </>
    );
};

export default AddMenuType;



// import { baseApi } from "../../api/baseApi";
// import { tagTypes } from "../../tag-types";

// const MENU_URL = "/menu";

// export const menuApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     //add menu
//     addMenu: build.mutation({
//       query: (data) => ({
//         url: `${MENU_URL}`,
//         method: "POST",
//         data: data,
//       }),
//       invalidatesTags: [tagTypes.menu],
//     }),
// //get menu
//     getMenu: build.query({
//         query: () => ({
//             url: `${MENU_URL}`,
//             providesTags: [tagTypes.menu],
//           }),
//     }),
// //delete menu
//     deleteMenu: build.mutation({
//         query: (data) => ({
//           url: `${MENU_URL}`,
//           method: "DELETE",
//           data: data,
//         }),
//         invalidatesTags: [tagTypes.menu],
//       }),

//   }),
// });

// export const { useAddMenuMutation, useDeleteMenuMutation, useGetMenuQuery } =
//   menuApi;
