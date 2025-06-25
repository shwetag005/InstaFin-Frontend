"use client";
import React, { useState, useEffect } from "react";

const RadioButton = React.memo(({ label, options, value, onChange, name }) => {
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
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={onChange}
                className="form-radio text-black border-grey-400 focus:ring-grey-600"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
});

export default RadioButton;
