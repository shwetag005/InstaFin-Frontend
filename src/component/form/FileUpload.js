"use client";
import { Button } from "antd";
import React, { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";

const FileUpload = ({ onUpload, selectQuantity = 1 }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null); // Reference to file input
  const handleFileChange = (e) => {
    let files = Array.from(e.target.files);

    if (files.length > selectQuantity) {
      alert(`You can only select up to ${selectQuantity} files.`);
      files = files.slice(0, selectQuantity); // Restrict to selectQuantity
    }

    setSelectedFiles(files);
    onUpload(files);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  return (
    <div className="">
      {/* Hidden File Input */}
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the input
      />

      {/* Upload Button */}
      <Button
        shape="round"
        size="small"
        className="flex gap-2 border-gray-500 cursor-pointer"
        onClick={handleUploadClick} // Click handler
      >
        <span>Upload</span> <FiUpload />
      </Button>
    </div>
  );
};

export default FileUpload;
