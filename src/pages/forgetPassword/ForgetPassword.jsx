// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import "react-phone-input-2/lib/style.css";
// import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
// import { toast } from "react-toastify";
// import MiniSpinner from "../../shared/loader/MiniSpinner";

// const ForgetPassword = () => {
//   const [loading, setLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();
//   const navigate = useNavigate();
//   const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

//   const handleForgetPassword = async (data) => {
//     console.log(data);
//     try {
//       setLoading(true);
//       const res = await forgetPassword(data);
//       console.log(res);
//       if (res?.data?.success) {
//         toast.info(res?.data?.message);
//         navigate(`/`);
//         reset();
//       }
//     } catch (error) {
//       console.error("sign-in error: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen py-10 bg-gray-100">
//       <div className="w-full mx-3 md:w-96 px-3 md:px-10 pt-5 pb-14 border rounded bg-slate-100 shadow-md">
//         <h2 className="text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2">
//           Password Reset
//         </h2>

//         <form
//           onSubmit={handleSubmit(handleForgetPassword)}
//           className="space-y-4"
//         >
//           <div className="form-control w-full max-w-xs">
//             <label htmlFor="email" className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="example@gmail.com"
//               className="border rounded px-3 p-1 w-full max-w-xs"
//               {...register("email", { required: "Email is required" })}
//             />
//             {errors.email && (
//               <p className="text-red-600"> {errors.email.message}</p>
//             )}
//           </div>
//           <button
//             className="px-10 py-2 text-white bg-green-500 w-full rounded-full"
//             type="submit"
//           >
//             {loading || isLoading ? <MiniSpinner /> : "Reset Password"}
//           </button>
//         </form>
//         <p className="text-[14px] mt-4 text-center">
//           <Link to="/sign-in" className="text-secondary">
//             Back to Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;
