const SkeletonLoader = () => (
    <div className="animate-pulse border border-gray-300 rounded-lg p-4 flex justify-between items-center shadow-md w-full h-24">
      <div className="w-1/3">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
      </div>
      <div className="w-1/4 flex flex-col items-center">
        <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-12"></div>
      </div>
      <div className="w-1/4 flex flex-col items-center">
        <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
export default SkeletonLoader  