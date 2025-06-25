"use client";
import { useState, useEffect } from "react";

const DateInput = ({
  type = "date",
  placeholder = "",
  value = "",
  onChange,
  className = "",
  name = "",
  style = {},
  width = "full",
  label
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className={`w-${width} h-10 rounded-lg bg-gray-200 animate-pulse`}
        style={style}
      ></div>
    );
  }

  return (
    <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700 font-semibold ml-10">{label}</label>

    {loading ? (
      <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
    ) : (
        <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={`w-full px-3 py-2 border border-grey-400 rounded-md focus:outline-none focus:border-grey-600 focus:ring-1 focus:ring-grey-600`}
        style={style}
      />
    )}
  </div>

  );
};

export default DateInput;
