import React from "react";

const CustomButton = ({ title, width="w-full", loading,onClick, color = "bg-gray-700", disabled = false }) => {
  return (
    <button
      type="submit"
      className={`${width} py-2 ${color} text-white font-bold rounded-lg mt-4 transition ${
        loading ? "animate-pulse bg-gray-600 text-gray-400 cursor-not-allowed" : "hover:bg-gray-800"
      }`}
      disabled={disabled || loading}
      onClick={onClick}
    >
        {loading ? "Loading..." : title}
    </button>
  );
};

export default CustomButton;
