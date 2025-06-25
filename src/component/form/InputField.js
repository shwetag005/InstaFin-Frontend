"use client";
import React, { useState, useEffect } from "react";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  className = "",
  name,
  style,
  width,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay to mimic an API call or slow render
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    // Skeleton Loader
    <div
      className={`w-${width ?? "full"} h-10 rounded-lg bg-gray-200 animate-pulse`}></div>
  ) : (
    // Actual Input Field
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={`w-${width ?? "full"} px-4 py-2 rounded-lg text-gray-700 placeholder-gray-500 font-medium 
                  border border-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-100 focus:border-gray-100 transition-shadow
                  ${className}`}
      style={{ style }}
    />
  );
};


export default InputField;
