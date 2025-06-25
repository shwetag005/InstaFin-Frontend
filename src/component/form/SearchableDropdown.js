"use client";
import { useState, useEffect, useRef } from "react";

const SearchableDropdown = ({
  options = [],
  name,
  value,
  onChange=()=>{},
  placeholder,
  label,
  isMandatory = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1000); // Simulating loading delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFilteredOptions(options);
      setLoading(false);
    }, 1000); // Simulated loading delay
  }, [options]);

  useEffect(() => {
    setFilteredOptions(
      searchTerm
        ? options.filter((opt) =>
            opt.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : options
    );
  }, [searchTerm, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full mb-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700 font-semibold ml-10">
          {label}
        </label>
      )}

      {/* Display selected value or input field */}
      {initialLoading ? (
        <>
          <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
        </>
      ) : !isDropdownOpen ? (
        <div
          className="w-full px-3 py-2 border border-gray-400 rounded-md bg-white cursor-pointer flex justify-between items-center"
          onClick={() => setDropdownOpen(true)}
          label={label || ""}
        >
          <span>
            {value
              ? options.find((opt) => opt.value === value)?.label
              : placeholder || "Select an option"}
          </span>
          {value && !isMandatory && (
            <button
              className="text-gray-500 hover:text-red-500 ml-2"
              onClick={(e) => {
                e.stopPropagation();
                onChange({ target: { name, value: "" } });
              }}
            >
              ✕
            </button>
          )}
        </div>
      ) : (
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
        />
      )}

      {/* Dropdown Options */}
      {isDropdownOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-400 rounded-md shadow-lg max-h-40 overflow-y-auto">
          {loading ? (
            <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  value === option.value ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  onChange({ target: { name, value: option.value } });
                  setDropdownOpen(false);
                  setSearchTerm(""); // Reset search term after selection
                }}
              >
                {option.label}
              </div>
            ))
          ) : (
            <p className="p-2 text-gray-500">No options found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
