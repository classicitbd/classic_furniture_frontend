import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider";
import { useChangePasswordMutation, useUpdateUserMutation } from "../../../redux/feature/auth/authApi";

const InformationUpdate = ({ refetch }) => {
    const { register, reset, handleSubmit, formState: { errors }, } = useForm(); //get data in form

    const { user } = useContext(AuthContext)
    const [name, setName] = useState(user?.user_name)

    const [passwordChange] = useChangePasswordMutation();
    const [userUpdate] = useUpdateUserMutation();

    const handleDataPost = async (data) => {
        toast.error("Please wait a moment");
        const current_password = data?.current_password;
        const new_password = data?.new_password;
        const sendData = {
            user_phone: user?.user_phone,
            current_password: current_password,
            new_password: new_password,
        };
        passwordChange(sendData).then((result) => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(
                    result?.data?.message
                        ? result?.data?.message
                        : "Password update successfully !",
                    {
                        autoClose: 1000,
                    }
                );
                reset();
                refetch();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    };

    const handleChangeName = () =>{
        const sendData = {
            user_name: name,
            user_phone: user?.user_phone
        }
        userUpdate(sendData).then((result) => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(
                    result?.data?.message
                        ? result?.data?.message
                        : "Name update successfully !",
                    {
                        autoClose: 1000,
                    }
                );
                reset();
                refetch();
            } else {
                toast.error(result?.error?.data?.message);
            }
        });
    }

    return (
        <>
            <div className="mb-4">
                <div>
                    <label className="font-semibold" htmlFor="user_name">
                        Name<span className="text-red-500"> *</span>{" "}
                    </label>
                    <input
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        id="user_name"
                        type="text"
                        className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                    />
                    {errors.user_name && (
                        <p className="text-red-600">{errors.user_name?.message}</p>
                    )}
                </div>
                <div className="mt-2 flex items-center justify-end">
                    <button
                    onClick={() =>handleChangeName()}
                        type="button"
                        className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
                    >
                        Submit
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit(handleDataPost)}>
                <div className="grid gap-6 grid-cols-2">
                    <div>
                        <label className="font-semibold" htmlFor="current_password">
                            Current Password<span className="text-red-500"> *</span>{" "}
                        </label>
                        <input
                            placeholder="**********"
                            {...register("current_password", {
                                required: "Current Password is required",
                            })}
                            id="current_password"
                            type="password"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                        {errors.current_password && (
                            <p className="text-red-600">{errors.current_password?.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="new_password">
                            New Password<span className="text-red-500"> *</span>{" "}
                        </label>
                        <input
                            placeholder="**********"
                            {...register("new_password", {
                                required: "New Password is required",
                            })}
                            id="new_password"
                            type="password"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                        {errors.new_password && (
                            <p className="text-red-600">{errors.new_password?.message}</p>
                        )}
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-end">
                    <button
                        type="submit"
                        className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default InformationUpdate;