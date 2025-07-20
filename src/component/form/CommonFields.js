// "use client";
// import React from "react";
// import SelectInput from "./SelectInput";
// import TextInput from "./TextInput";
// import TextArea from "./TextArea";
// import RadioButton from "./RadioButton";
// import Checkbox from "./Checkbox";
// import FileUpload from "./FileUpload";
// import SectionItem from "../ui/SectionItem";
// import SearchableDropdown from "./SearchableDropdown";
// import DateInput from "./DateInput";

// const CommonFields = ({
//   formData,
//   setFormData,
//   inputFields,
//   sectionKey,
//   setSections,
// }) => {
//   const handleInputChange = (sectionKey, fieldKey, value) => {
//     const updatedFormData = { ...formData, [fieldKey]: value };
//     setFormData(updatedFormData);

//     const isSectionComplete = inputFields.every((field) => {
//       if (field.type === "multiDoc") {
//         return field.documents.every(
//           (doc) =>
//             Array.isArray(updatedFormData[doc.key]) &&
//             updatedFormData[doc.key].length >= doc.quantity
//         );
//       }
//       return updatedFormData[field.key]?.trim();
//     });

//     setSections &&
//       setSections((prevSections) =>
//         prevSections.map((section) =>
//           section.key === sectionKey
//             ? {
//                 ...section,
//                 status: isSectionComplete ? "Completed" : "Pending",
//               }
//             : section
//         )
//       );
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       const updatedValues = checked
//         ? [...(formData[name] || []), value]
//         : formData[name].filter((v) => v !== value);
//       setFormData((prev) => ({ ...prev, [name]: updatedValues }));
//       handleInputChange(sectionKey, name, updatedValues);
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//       handleInputChange(sectionKey, name, value);
//     }
//   };
//   const handleFileUpload = (files, fieldKey) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldKey]: files,
//     }));
//     handleInputChange(sectionKey, fieldKey, files);
//   };

//   const renderMultiFileUpload = (field) => {
//     if (!Array.isArray(field.documents)) return null;

//     return field.documents.map((doc, index) => (
//       <div
//         key={index}
//         className="p-2 my-2 px-4 flex flex-col sm:flex-row justify-between items-center w-full max-w-3xl"
//       >
//         <span className="w-full sm:w-1/4 font-medium text-lg">{doc.label}</span>

//         <span className="w-full sm:w-1/4 mt-4 sm:mt-0 flex flex-col items-center text-center">
//           <FileUpload
//             onUpload={(files) => handleFileUpload(files, doc.key)}
//             selectQuantity={doc.quantity}
//           />
//           <span className="text-xs">Maximum file size 1MB</span>
//         </span>

//         <span className="w-full sm:w-2/4 mt-4 sm:mt-0 flex flex-wrap gap-2 justify-end">
//           {formData[doc.key] &&
//             formData[doc.key].length > 0 &&
//             formData[doc.key].map((file, index) => (
//               <img
//                 key={file.name || file.lastModified}
//                 src={URL.createObjectURL(file)}
//                 alt={`Preview ${index}`}
//                 className="w-16 h-16 rounded-md border border-gray-300"
//               />
//             ))}
//         </span>
//       </div>
//     ));
//   };

//   return (
//     <div className="w-full">
//       {inputFields?.map((field, index) => {
//         const { key, ...rest } = field;
//         const uniqueKey = `${key}-${index}`;
//         const value = formData[key] || "";
//         let options = field.options;

//         if (options) {
//           options = Array.from(new Set(["Select Option", ...options]));
//         }

//         switch (field.type) {
//           case "text":
//           case "email":
//           case "number":
//             return (
//               <TextInput
//                 key={uniqueKey}
//                 name={key}
//                 {...rest}
//                 value={value}
//                 onChange={handleChange}
//               />
//             );
//           case "searchSelect":
//             return (
//               <SearchableDropdown
//                 key={uniqueKey}
//                 name={key}
//                 {...rest}
//                 value={value}
//                 onChange={handleChange}
//               />
//             );
//           case "select":
//             return (
//               <SelectInput
//                 key={uniqueKey}
//                 name={key}
//                 {...rest}
//                 options={options}
//                 value={value}
//                 onChange={handleChange}
//               />
//             );
//           case "textarea":
//             return (
//               <TextArea
//                 key={uniqueKey}
//                 name={key}
//                 {...rest}
//                 value={value}
//                 onChange={handleChange}
//               />
//             );
//           case "radio":
//             return (
//               <RadioButton
//                 key={uniqueKey}
//                 name={key}
//                 {...rest}
//                 value={value}
//                 onChange={handleChange}
//               />
//             );
//           case "checkbox":
//             return (
//               <Checkbox
//                 key={uniqueKey}
//                 name={key}
//                 {...rest}
//                 selectedValues={formData[key] || []}
//                 onChange={handleChange}
//               />
//             );
//           case "file":
//             return (
//               <>
//                 <FileUpload
//                   key={uniqueKey}
//                   name={key}
//                   {...rest}
//                   onUpload={(files) => handleFileUpload(files, key)}
//                 />
//                 {/* show file name */}
//                 {formData[key] && formData[key].length > 0 && (
//                   <div className="mt-4">
//                     {formData[key].map((file, index) => (
//                       <span key={file.name || file.lastModified}>
//                         {file.name}
//                         {index < formData[key].length - 1 && ", "}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </>
//             );
//           case "multiDoc":
//             return (
//               <SectionItem
//                 isActive={true}
//                 key={uniqueKey}
//                 name={key}
//                 title={field.label}
//               >
//                 {renderMultiFileUpload(field)}
//               </SectionItem>
//             );
//           case "date":
//             return (
//               <DateInput
//                 key={uniqueKey}
//                 name={key}
//                 {...rest}
//                 value={value}
//                 onChange={handleChange}
//               />
//             );
//           default:
//             return null;
//         }
//       })}
//     </div>
//   );
// };

// export default CommonFields;

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
import SearchableMultiSelectDropdown from "./SearchableMultiSelectDropdown";

const CommonFields = ({
  formData,
  setFormData,
  inputFields,
  sectionKey,
  setSections,
  errors = {},
  validateField = null,
  handleChange = null,
  onInputChange = null,
}) => {
  const updateFormAndValidate = (key, value) => {
    if (handleChange) {
      handleChange(key, value);
    } else if (onInputChange) {
      onInputChange(key, value);
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
      if (validateField) validateField(key, value);
    }

    if (setSections && inputFields && sectionKey) {
      const updatedForm = { ...formData, [key]: value };
      const isComplete = inputFields.every((field) => {
        if (field.type === "multiDoc") {
          return field.documents.every((doc) => {
            const files = updatedForm[doc.key];
            const min = doc.min ?? doc.quantity ?? 1;
            const max = doc.max ?? doc.quantity ?? Infinity;
            return Array.isArray(files) && files.length >= min && files.length <= max;
          });
        }
        return updatedForm[field.key]?.toString().trim();
      });

      setSections((prev) =>
        prev.map((s) =>
          s.key === sectionKey ? { ...s, status: isComplete ? "Completed" : "Pending" } : s
        )
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue;

    if (type === "checkbox") {
      finalValue = checked
        ? [...(formData[name] || []), value]
        : (formData[name] || []).filter((v) => v !== value);
    } else {
      finalValue = value;
    }

    if (name === "mobile") {
      const mobilePattern = /^[6-9]\d{9}$/;
      if (!mobilePattern.test(finalValue)) {
        alert("Enter a valid 10-digit mobile number starting with 6–9.");
        return;
      }
    }

    updateFormAndValidate(name, finalValue);
  };

  const handleFileUpload = (files, key) => {
  if (!files) return;
  const value = Array.isArray(files) ? files : [files];
  updateFormAndValidate(key, value);
};

  const renderMultiFileUpload = (field) =>
  field.documents.map((doc, index) => (
    <div key={doc.key || index} className="my-2 flex flex-col sm:flex-row gap-4 items-start">
      <span className="w-1/4 font-medium">{doc.label}</span>
      <FileUpload
        onUpload={(files) => handleFileUpload(files, doc.key)}
        multiple={(doc.max ?? doc.quantity ?? 1) > 1}
        accept={doc.accept || "*/*"}
      />
      <p className="text-sm text-gray-500 mt-1">Max file size: 2MB</p>

      <div className="flex gap-2 flex-wrap">
        {Array.isArray(formData[doc.key]) &&
          formData[doc.key].map((file, i) => {
            const isURL = typeof file === "string";
            const fileKey = `${doc.key}_${i}`;
            return (
              <div key={fileKey} className="flex flex-col items-center relative group">
                {isURL ? (
                  file.endsWith(".pdf") ? (
                    <a href={file} target="_blank" rel="noreferrer" className="text-blue-600 underline text-xs">PDF</a>
                  ) : (
                    <img src={file} alt="uploaded" className="w-16 h-16 object-cover border rounded" />
                  )
                ) : file instanceof File ? (
                  file.type.startsWith("image/") ? (
                    <img src={URL.createObjectURL(file)} alt="preview" className="w-16 h-16 object-cover border rounded" />
                  ) : (
                    <span className="text-xs text-gray-600">{file.name}</span>
                  )
                ) : null}

                {/* 🗑️ Remove button */}
                <button
                  className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded px-1 opacity-0 group-hover:opacity-100"
                  onClick={() => {
                    const updated = [...formData[doc.key]];
                    const removed = updated.splice(i, 1);

                    setFormData((prev) => ({
                      ...prev,
                      [doc.key]: updated,
                      removedFiles: [...(prev.removedFiles || []), ...(isURL ? removed : [])],
                    }));
                  }}
                  type="button"
                >
                  ✕
                </button>
              </div>
            );
          })}
      </div>
    </div>
  ));


  return (
    <div>
      {inputFields?.map((field, index) => {
        const value = field.key in formData ? formData[field.key] : "";
        const error = errors?.[field.key];
        const { key, ...restFieldProps } = field;

        const props = {
          name: key,
          value,
          label: field.label,
          onChange: handleInputChange,
          ...restFieldProps,
        };

        switch (field.type) {
          case "text":
          case "email":
          case "number":
            return (
              <div key={key || index} className="mb-4">
                <TextInput {...props} className={error ? "border-red-500" : ""} />
                {error && <p className="text-red-500 text-xs">{error}</p>}
              </div>
            );

          case "textarea":
            return <TextArea key={key || index} {...props} />;

          case "select":
            return (
              <SelectInput
                key={key || index}
                {...props}
                options={["Select Option", ...field.options]}
              />
            );

          case "radio":
            return <RadioButton key={key || index} {...props} />;

          case "checkbox":
            return (
              <Checkbox
                key={key || index}
                {...props}
                selectedValues={formData[field.key] || []}
              />
            );

          case "file":
           return (
            <div key={key || index} className="mb-4">
              <FileUpload
                key={key || index}
                name={field.key}
                onUpload={(files) => handleFileUpload(files[0], field.key)}
                {...field}
              />
<p className="text-sm text-gray-500 mt-1 bg-yellow-200">Max file size: 3MB</p>

              {/* Preview uploaded file (if exists and it's a string URL) */}
              {typeof formData[field.key] === "string" && formData[field.key].startsWith("http") && (
                <div className="mt-2">
                  <a
                    href={formData[field.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    View Uploaded File
                  </a>
                </div>
              )}
              
            </div>
          );

          case "multiDoc":
            return (
              <SectionItem key={key || index} title={field.label} isActive>
                {renderMultiFileUpload(field)}
              </SectionItem>
            );

          case "date":
            return (
              <div key={key || index} className="mb-4">
                <DateInput {...props} />
                {error && <p className="text-red-500 text-xs">{error}</p>}
              </div>
            );

          case "searchSelect":
            return (
              <SearchableDropdown
                key={key || index}
                {...props}
                options={field.options}
                onChange={(value) => updateFormAndValidate(field.key, value)}
              />
            );

          case "searchMultiSelect":
            return (
              <SearchableMultiSelectDropdown
                key={key || index}
                label={field.label}
                options={field.options}
                values={formData[field.key] || []}
                onChange={(values) => updateFormAndValidate(field.key, values)}
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