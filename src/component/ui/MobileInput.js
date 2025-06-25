"use client";
import { useState } from "react";

const MobileInput = ({ onMobileChange }) => {
  const [mobile, setMobile] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    if (value.length <= 10) {
      setMobile(value);
      onMobileChange(value);
    }
  };

  return (
    <div className="flex items-center gap-2 border border-gray-400 rounded-md pr-2">
      <span className="bg-gray-800 text-white px-2 py-1 rounded-md text-sm">+91</span>
      <input
        type="tel"
        placeholder="Enter Mobile Number"
        className="border-none focus:ring-0 focus:outline-none w-24 font-semibold"
        value={mobile}
        onChange={handleChange}
      />
    </div>
  );
};

export default MobileInput;
