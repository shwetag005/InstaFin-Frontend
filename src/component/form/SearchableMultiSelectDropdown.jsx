"use client";
import { useState, useEffect, useRef } from "react";

const SearchableMultiSelectDropdown = ({
  options = [],
  values = [],
  onChange = () => {},
  placeholder = "Select options",
  label,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      setFilteredOptions(
        options.filter((opt) =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
    setSearchTerm("");
    setDropdownOpen(false);
  };

  const handleRemove = (val) => {
    onChange(values.filter((v) => v !== val));
  };

  return (
    <div ref={dropdownRef} className="relative w-full mb-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700 font-semibold mb-1">
          {label}
        </label>
      )}

      <div
        className="w-full min-h-[2.5rem] px-2 py-1 border border-gray-400 rounded-md bg-white cursor-text flex flex-wrap gap-1 items-center"
        onClick={() => setDropdownOpen(true)}
      >{console.log(values)}
        {values.length > 0 ? (
          values.map((val) => {
            const opt = options.find((o) => o.value === val);
            return (
              <span
                key={val}
                className="bg-gray-200 text-sm rounded-full px-2 py-0.5 flex items-center"
              >
                {opt?.label || val}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(val);
                  }}
                  className="ml-1 text-gray-600 hover:text-red-600"
                >
                  ✕
                </button>
              </span>
            );
          })
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-400 rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
          <input
            type="text"
            autoFocus
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  values.includes(opt.value) ? "bg-gray-100" : ""
                }`}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableMultiSelectDropdown;
