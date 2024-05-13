import "./Loader.css";
import { PuffLoader } from "react-spinners";

export default function Loader({ lable }) {
  return (
    <>
      {/* <div className="py-96 flex items-center justify-center space-x-8 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 m-auto h-screen">
        <div className="absolute z-10 flex justify-center items-center">
          <div className="c-test c-01 z-30 absolute border-2 rounded-full " />
          <div className="c-test c-02 z-20 absolute border-2 rounded-full " />
          <div className="c-test c-03 z-10 absolute border-2 rounded-full" />
          <div className="c-test c-04 z-0 absolute border-2 rounded-full " />
        </div>
      </div> */}

      <div className="bg-slate-900 h-[100vh] flex gap-3 flex-col justify-center items-center">
        {/* <ScaleLoader size={200} color="red" /> */}
        <PuffLoader
          color="#05ffe1"
          cssOverride={{}}
          loading
          size={99}
          speedMultiplier={1}
        />
        <div className="text-transparent text-4xl  text-rose-500 font-bold py-2 px-4 rounded ">
          {lable}
        </div>
      </div>
    </>
  );
}
