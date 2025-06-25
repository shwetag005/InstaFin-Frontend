"use client";
import React, { useState, useEffect } from "react";

const SelectInput = React.memo(({ label, options, value, onChange, name, width }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-3" style={width ? { width } : {}}>
      <label className="block text-sm font-medium text-gray-700 font-semibold ml-10">
        {label}
      </label>

      {loading ? (
        <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
      ) : (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-grey-400 rounded-md focus:outline-none focus:border-grey-600 focus:ring-1 focus:ring-grey-600"
        >
          {Array.isArray(options) ? (
            options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))
          ) : (
            <option value={options}>{options ?? "Select an option"}</option>
          )}
        </select>
      )}
    </div>
  );
});

export default SelectInput;
