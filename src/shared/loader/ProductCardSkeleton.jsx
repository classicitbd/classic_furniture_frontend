const ProductCardSkeleton = () => {
  return (
    <div className="my-2 rounded shadow-md animate-pulse bg-gray-300">
      <div className="h-[200px] bg-gray-400 animate-pulse "></div>
      <div className="flex p-4 space-x-4 sm:pr-16 sm:pl-4">
        <div className="flex-1 py-2 space-y-4">
          <div className="w-full h-3 rounded bg-gray-400"></div>
          <div className="w-4/6 h-3 rounded bg-gray-400"></div>
        </div>
      </div>
      <div className="p-4 space-y-4 sm:px-4">
        <div className="w-full h-3 rounded bg-gray-400"></div>
        <div className="w-full h-3 rounded bg-gray-400"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
