// "use client";
// import { useState, useEffect, useRef } from "react";

// const SearchableDropdown = ({
//   options = [],
//   name,
//   value,
//   onChange=()=>{},
//   placeholder,
//   label,
//   isMandatory = false,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredOptions, setFilteredOptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const [initialLoading, setInitialLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setInitialLoading(false), 1000); // Simulating loading delay
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       setFilteredOptions(options);
//       setLoading(false);
//     }, 1000); // Simulated loading delay
//   }, [options]);

//   useEffect(() => {
//     setFilteredOptions(
//       searchTerm
//         ? options.filter((opt) =>
//             opt.label.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//         : options
//     );
//   }, [searchTerm, options]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div ref={dropdownRef} className="relative w-full mb-3">
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 font-semibold ml-10">
//           {label}
//         </label>
//       )}

//       {/* Display selected value or input field */}
//       {initialLoading ? (
//         <>
//           <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
//         </>
//       ) : !isDropdownOpen ? (
//         <div
//           className="w-full px-3 py-2 border border-gray-400 rounded-md bg-white cursor-pointer flex justify-between items-center"
//           onClick={() => setDropdownOpen(true)}
//           label={label || ""}
//         >
//           <span>
//             {value
//               ? options.find((opt) => opt.value === value)?.label
//               : placeholder || "Select an option"}
//           </span>
//           {value && !isMandatory && (
//             <button
//               className="text-gray-500 hover:text-red-500 ml-2"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onChange({ target: { name, value: "" } });
//               }}
//             >
//               ✕
//             </button>
//           )}
//         </div>
//       ) : (
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
//         />
//       )}

//       {/* Dropdown Options */}
//       {isDropdownOpen && (
//         <div className="absolute w-full mt-1 bg-white border border-gray-400 rounded-md shadow-lg max-h-40 overflow-y-auto">
//           {loading ? (
//             <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
//           ) : filteredOptions.length > 0 ? (
//             filteredOptions.map((option) => (
//               <div
//                 key={option.value}
//                 className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
//                   value === option.value ? "bg-gray-200" : ""
//                 }`}
//                 onClick={() => {
//                   onChange({ target: { name, value: option.value } });
//                   setDropdownOpen(false);
//                   setSearchTerm(""); // Reset search term after selection
//                 }}
//               >
//                 {option.label}
//               </div>
//             ))
//           ) : (
//             <p className="p-2 text-gray-500">No options found</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchableDropdown;


"use client";
import { useState, useEffect, useRef } from "react";

const SearchableDropdown = ({
  options = [],
  name,
  value,
  onChange = () => {},
  placeholder,
  label,
  isMandatory = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFilteredOptions(options);
      setLoading(false);
    }, 1000);
  }, [options]);

  useEffect(() => {
    const filtered = searchTerm
      ? options.filter((opt) =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    setFilteredOptions(filtered);
    setHighlightIndex(0); // Reset highlight when search changes
  }, [searchTerm, options]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isDropdownOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selectedOption = filteredOptions[highlightIndex];
      if (selectedOption) {
        onChange(selectedOption.value);
        setDropdownOpen(false);
        setSearchTerm("");
      }
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full mb-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700 font-semibold ml-10">
          {label}
        </label>
      )}

      {initialLoading ? (
        <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
      ) : !isDropdownOpen ? (
        <div
          className="w-full px-3 py-2 border border-gray-400 rounded-md bg-white cursor-pointer flex justify-between items-center"
          onClick={() => {
            setDropdownOpen(true);
            setTimeout(() => inputRef.current?.focus(), 100); // focus input
          }}
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
                onChange("");
              }}
            >
              ✕
            </button>
          )}
        </div>
      ) : (
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
        />
      )}

      {isDropdownOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-400 rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
          {loading ? (
            <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  value === option.value ? "bg-gray-200" : ""
                } ${highlightIndex === index ? "bg-gray-300" : ""}`}
                onClick={() => {
                  onChange(option.value);
                  setDropdownOpen(false);
                  setSearchTerm("");
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
