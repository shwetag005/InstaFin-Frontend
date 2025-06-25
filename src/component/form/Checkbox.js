"use client";
import React, { useState, useEffect } from "react";

const Checkbox = React.memo(({ label, options, selectedValues, onChange, name }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 font-semibold ml-10">{label}</label>

      {loading ? (
        <div className="w-full h-6 bg-gray-300 animate-pulse rounded-md"></div>
      ) : (
        <div className="flex flex-col">
          {options.map((option, index) => (
            <label key={index} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                name={name}
                value={option}
                checked={selectedValues.includes(option)}
                onChange={onChange}
                className="form-checkbox text-black border-grey-400 focus:ring-grey-600"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
});

export default Checkbox;
