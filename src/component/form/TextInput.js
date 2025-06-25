"use client";
import React, { useState, useEffect } from "react";

const TextInput = React.memo(({ label, value, onChange, name, isBold=false, type="text" }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulating loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${isBold ? '': 'mb-3'}`}>
      <label className="block text-sm font-medium text-gray-700 font-semibold ml-10">{label}</label>

      {loading ? (
        // Skeleton Loader
        <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
      ) : (
        // Input Field
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-shadow ${
            isBold ? "font-bold tracking-wide text-lg" : "font-normal"
          }`}
        />
      )}
    </div>
  );
});

export default TextInput;
