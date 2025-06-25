import React from "react";

export const Button = ({ children, variant = "default", onClick }) => {
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-gray-300 text-gray-600 hover:bg-gray-200",
    destructive: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-all ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
