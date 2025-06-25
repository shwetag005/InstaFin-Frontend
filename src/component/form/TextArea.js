"use client";
import React, { useState, useEffect } from "react";

const TextArea = React.memo(({ label, value, onChange, name, className="mt-3" }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 font-semibold ml-10">{label}</label>

      {loading ? (
        <div className="w-full h-24 bg-gray-300 animate-pulse rounded-md"></div>
      ) : (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows="4"
          className="w-full px-3 py-2 border border-grey-400 rounded-md focus:outline-none focus:border-grey-600 focus:ring-1 focus:ring-grey-600"
        />
      )}
    </div>
  );
});

export default TextArea;
