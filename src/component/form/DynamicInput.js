import React from "react";

const DynamicInput = ({ mobile, handleChange, position = "start", spanValue="",title,subTitle }) => {
  const spanClasses =
    "bg-gray-800 text-white px-3 py-2 rounded-md text-sm";

  const containerClasses = `flex items-center border border-gray-400 rounded-md h-9 my-2`;

  const inputClasses = `border-none focus:ring-0 focus:outline-none max-w-[154px] px-2`;

  return (<div className="">
    <div className="w-48">
    <div className="text-md text-center font-bold">{title}</div>
    <div className={containerClasses}>
      {position === "start" && <span className={spanClasses}>{spanValue}</span>}
      <input
        type="text"
        className={inputClasses}
        value={mobile}
        onChange={handleChange}
      />
      {position === "end" && <span className={spanClasses}>{spanValue}</span>}
    </div>
    </div>
    <div className="text-sm">{subTitle}</div>
    </div>
  );
};

export default DynamicInput;
