
const SectionItem = ({ title, status, isActive, onClick, children }) => {
  return (
    <div className={`flex ${isActive ? "flex-col" : "flex-rows"} items-center justify-center py-2`}>
      {/* Header */}
      <div
        className="border border-gray-900 rounded-lg p-2 px-4 flex flex-col sm:flex-row justify-between items-center shadow-md w-full max-w-3xl cursor-pointer"
        onClick={onClick}
      >
        <span className="w-full sm:w-4/5 font-medium text-lg">{title?.toUpperCase()}</span>
        <span className={`w-full sm:w-1/6 mt-4 sm:mt-0 text-center font-semibold text${status?.toLowerCase() === "completed" ? "-green-600" : status?.toLowerCase() === "pending" ? "-red-500" : "-yellow-500"} text-sm`}>{status ?? ''}</span>
        <span className="w-full sm:w-1/12 mt-4 sm:mt-0 text-gray-500">{isActive ? "▲" : "▼"}</span>
      </div>

      {/* Collapsible Content */}
      {isActive && (
        <div className="p-2 px-4 flex flex-col  w-full max-w-3xl">{children}</div>
      )}
    </div>
  );
};

export default SectionItem;
