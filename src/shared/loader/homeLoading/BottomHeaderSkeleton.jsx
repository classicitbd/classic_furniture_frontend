const BottomHeaderSkeleton = () => {
  return (
    <div className="es_container">
      <div className=" p-2 px-3">
        <div className="flex space-x-10">
          <div className="bg-gray-300 h-6 w-20 animate-pulse"></div>
          <div className="bg-gray-300 h-6 w-20 animate-pulse"></div>
          <div className="bg-gray-300 h-6 w-20 animate-pulse"></div>
          <div className="bg-gray-300 h-6 w-20 animate-pulse"></div>
          <div className="bg-gray-300 h-6 w-20 animate-pulse"></div>
          <div className="bg-gray-300 h-6 w-20 animate-pulse"></div>
          <div className="bg-gray-300 h-6 w-20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default BottomHeaderSkeleton;
