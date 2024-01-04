import { useForm } from 'react-hook-form';
import { MdDeleteForever } from 'react-icons/md';
import toast from 'react-hot-toast';
import BigSpinner from '../../../shared/loader/BigSpinner'


const AddMenuType = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const [postUserRoleType] = usePostUserRoleTypeMutation();  //post user type
    const [deleteUserRoleType] = useDeleteUserRoleMutation();  //delete user type
    const { data: menuRole, isLoading } = useGetUserRoleQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 30000,
    }); // get user type

    if (isLoading) {
        <BigSpinner />
    }


    // post a Menu role
    const handleDataPost = (data) => {
        toast.loading('Please Wait', {
            duration: 1000
        })
        postMenuRoleType(data).then(result => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(result?.data?.message ? result?.data?.message : "Menu Role Added successfully !");
                reset();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }

    // delete a Menu rolr
    const handleDeleteMenuRole = (id) => {
        toast.loading('Please Wait', {
            duration: 1000
        })
        deleteMenuRoleType(id).then(result => {
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
                                menuRole?.data?.map((role, index) =>
                                    <li key={index}><p className='flex items-center gap-2 mb-2'> <MdDeleteForever onClick={() =>handleDeleteMenuRole(role?._id)} className='cursor-pointer text-red-500 hover:text-red-300' size={25} />{role?.menu}</p></li>
                                )
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

                            <button type="Submit" className="mt-6 px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]">Create Type</button>

                        </form>
                    </div>


                </div>
            </div>
        </>
    );
};

export default AddMenuType;