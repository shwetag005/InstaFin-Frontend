// "use client";
// import { Button } from "antd";
// import React, { useRef, useState } from "react";
// import { FiUpload } from "react-icons/fi";

// const FileUpload = ({ onUpload, selectQuantity = 1 }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const fileInputRef = useRef(null); // Reference to file input
//   const handleFileChange = (e) => {
//     let files = Array.from(e.target.files);

//     if (files.length > selectQuantity) {
//       alert(`You can only select up to ${selectQuantity} files.`);
//       files = files.slice(0, selectQuantity); // Restrict to selectQuantity
//     }

//     setSelectedFiles(files);
//     onUpload(files);
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current.click(); // Trigger file input click
//   };

//   return (
//     <div className="">
//       {/* Hidden File Input */}
//       <input
//         type="file"
//         multiple
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         style={{ display: "none" }} // Hide the input
//       />

//       {/* Upload Button */}
//       <Button
//         shape="round"
//         size="small"
//         className="flex gap-2 border-gray-500 cursor-pointer"
//         onClick={handleUploadClick} // Click handler
//       >
//         <span>Upload</span> <FiUpload />
//       </Button>
//     </div>
//   );
// };

// export default FileUpload;


"use client";
import React, { useRef, useState } from "react";
import { Button } from "antd";
import { FiUpload } from "react-icons/fi";

/**
 * @param {Function} onUpload - Callback when files are selected
 * @param {number} max - Max number of files allowed (from quantity or max prop)
 * @param {boolean} multiple - Whether multiple file selection is allowed
 * @param {string} accept - MIME types allowed (default: images)
 */
const FileUpload = ({ onUpload, max = 1, multiple = false, accept = "image/*" }) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    let files = Array.from(e.target.files);

    // enforce max files if applicable
    if (files.length > max) {
      alert(`You can only select up to ${max} file${max > 1 ? "s" : ""}.`);
      files = files.slice(0, max);
    }

    setSelectedFiles(files);
    onUpload(files);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple={multiple || max > 1}
        accept={accept}
      />

      <Button
        shape="round"
        size="small"
        className="flex gap-2 border-gray-500 cursor-pointer"
        onClick={handleUploadClick}
      >
        <span>Upload</span>
        <FiUpload />
      </Button>

      {selectedFiles.length > 0 && (
        <div className="mt-2 text-sm text-gray-600">
          {selectedFiles.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;