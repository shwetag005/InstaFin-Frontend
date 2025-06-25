"use client";
import React from "react";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import RadioButton from "./RadioButton";
import Checkbox from "./Checkbox";
import FileUpload from "./FileUpload";
import SectionItem from "../ui/SectionItem";
import SearchableDropdown from "./SearchableDropdown";
import DateInput from "./DateInput";

const CommonFields = ({
  formData,
  setFormData,
  inputFields,
  sectionKey,
  setSections,
}) => {
  const handleInputChange = (sectionKey, fieldKey, value) => {
    const updatedFormData = { ...formData, [fieldKey]: value };
    setFormData(updatedFormData);

    const isSectionComplete = inputFields.every((field) => {
      if (field.type === "multiDoc") {
        return field.documents.every(
          (doc) =>
            Array.isArray(updatedFormData[doc.key]) &&
            updatedFormData[doc.key].length >= doc.quantity
        );
      }
      return updatedFormData[field.key]?.trim();
    });

    setSections &&
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.key === sectionKey
            ? {
                ...section,
                status: isSectionComplete ? "Completed" : "Pending",
              }
            : section
        )
      );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedValues = checked
        ? [...(formData[name] || []), value]
        : formData[name].filter((v) => v !== value);
      setFormData((prev) => ({ ...prev, [name]: updatedValues }));
      handleInputChange(sectionKey, name, updatedValues);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      handleInputChange(sectionKey, name, value);
    }
  };
  const handleFileUpload = (files, fieldKey) => {
    setFormData((prev) => ({
      ...prev,
      [fieldKey]: files,
    }));
    handleInputChange(sectionKey, fieldKey, files);
  };

  const renderMultiFileUpload = (field) => {
    if (!Array.isArray(field.documents)) return null;

    return field.documents.map((doc, index) => (
      <div
        key={index}
        className="p-2 my-2 px-4 flex flex-col sm:flex-row justify-between items-center w-full max-w-3xl"
      >
        <span className="w-full sm:w-1/4 font-medium text-lg">{doc.label}</span>

        <span className="w-full sm:w-1/4 mt-4 sm:mt-0 flex flex-col items-center text-center">
          <FileUpload
            onUpload={(files) => handleFileUpload(files, doc.key)}
            selectQuantity={doc.quantity}
          />
          <span className="text-xs">Maximum file size 1MB</span>
        </span>

        <span className="w-full sm:w-2/4 mt-4 sm:mt-0 flex flex-wrap gap-2 justify-end">
          {formData[doc.key] &&
            formData[doc.key].length > 0 &&
            formData[doc.key].map((file, index) => (
              <img
                key={file.name || file.lastModified}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-16 h-16 rounded-md border border-gray-300"
              />
            ))}
        </span>
      </div>
    ));
  };

  return (
    <div className="w-full">
      {inputFields?.map((field, index) => {
        const { key, ...rest } = field;
        const uniqueKey = `${key}-${index}`;
        const value = formData[key] || "";
        let options = field.options;

        if (options) {
          options = Array.from(new Set(["Select Option", ...options]));
        }

        switch (field.type) {
          case "text":
          case "email":
          case "number":
            return (
              <TextInput
                key={uniqueKey}
                name={key}
                {...rest}
                value={value}
                onChange={handleChange}
              />
            );
          case "searchSelect":
            return (
              <SearchableDropdown
                key={uniqueKey}
                name={key}
                {...rest}
                value={value}
                onChange={handleChange}
              />
            );
          case "select":
            return (
              <SelectInput
                key={uniqueKey}
                name={key}
                {...rest}
                options={options}
                value={value}
                onChange={handleChange}
              />
            );
          case "textarea":
            return (
              <TextArea
                key={uniqueKey}
                name={key}
                {...rest}
                value={value}
                onChange={handleChange}
              />
            );
          case "radio":
            return (
              <RadioButton
                key={uniqueKey}
                name={key}
                {...rest}
                value={value}
                onChange={handleChange}
              />
            );
          case "checkbox":
            return (
              <Checkbox
                key={uniqueKey}
                name={key}
                {...rest}
                selectedValues={formData[key] || []}
                onChange={handleChange}
              />
            );
          case "file":
            return (
              <>
                <FileUpload
                  key={uniqueKey}
                  name={key}
                  {...rest}
                  onUpload={(files) => handleFileUpload(files, key)}
                />
                {/* show file name */}
                {formData[key] && formData[key].length > 0 && (
                  <div className="mt-4">
                    {formData[key].map((file, index) => (
                      <span key={file.name || file.lastModified}>
                        {file.name}
                        {index < formData[key].length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                )}
              </>
            );
          case "multiDoc":
            return (
              <SectionItem
                isActive={true}
                key={uniqueKey}
                name={key}
                title={field.label}
              >
                {renderMultiFileUpload(field)}
              </SectionItem>
            );
          case "date":
            return (
              <DateInput
                key={uniqueKey}
                name={key}
                {...rest}
                value={value}
                onChange={handleChange}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default CommonFields;
