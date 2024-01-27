// const BigSpinner = () => {
//   return (
//     <div className="relative min-h-screen flex justify-center items-center">
//       <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
//       <img
//         loading="lazy"
//         alt="loader"
//         src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
//         className="rounded-full h-28 w-28"
//       />
//     </div>
//   );
// };

// export default BigSpinner;

const BigSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-textColor">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primaryColor"></div>
    </div>
  );
};

export default BigSpinner;
