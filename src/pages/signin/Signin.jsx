// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import "react-phone-input-2/lib/style.css";
// import { useSignInMutation } from "../../redux/features/auth/authApi";
// import { toast } from "react-toastify";
// import MiniSpinner from "../../shared/loader/MiniSpinner";

// const SignIn = () => {
//   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();
//   const navigate = useNavigate();
//   const [signIn, { isLoading }] = useSignInMutation();

//   const handleSignUp = async (data) => {
//     try {
//       setLoading(true);
//       const res = await signIn(data);
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
//           Login
//         </h2>

//         <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
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
//           <div className="form-control w-full max-w-xs">
//             <label htmlFor="password" className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="* * * * *"
//               className="border rounded px-3 p-1 w-full max-w-xs"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be 6 character",
//                 },
//               })}
//             />
//             {errors.password && (
//               <p className="text-red-600"> {errors.password.message}</p>
//             )}
//           </div>
//           <div className="text-[14px] flex justify-end">
//             <Link to={"/reset-password"} className="text-secondary underline cursor-pointer">
//               Forget Password
//             </Link>
//           </div>
//           <button
//             className="px-10 py-2 text-white bg-green-500 w-full rounded-full"
//             type="submit"
//           >
//             {loading || isLoading ? <MiniSpinner /> : "Login"}
//           </button>
//         </form>
//         <p className="text-[14px] mt-4">
//           Are you new Please Create account?
//           <Link to="/sign-in" className="text-secondary">
//             Sign-up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
