// "use client";

// import React, { useState, useEffect } from "react";
// import PageHeader from "../Header/PageHeader";
// import SectionItem from "../ui/SectionItem";
// import CommonFields from "../form/CommonFields";
// import { allLoanTypes, investments, nationality } from "@/app/data";
// import { Button } from "antd";
// import { createLoanApplication } from "@/lib";
// import {
//   createLoanApplicat,
//   getId,
//   prepareLoanPayload,
// } from "@/lib/commonFunctions";
// import{
//   getLoanApplicationById,
// } from "@/lib"; 

// const initialFormData = {
//   userId: "",
//   pan: "",
//   applicantName: "",
//   applicantDob: "",
//   applicantGender: "",
//   applicantNationality: "",
//   applicantMobile: "",
//   applicantEmail: "",
//   applicantAddress: "",
//   applicantPin: "",
//   maritalStatus: "",
//   spouseName: "",
//   spouseDOB: "",
//   childrenCount: "",
//   fatherName: "",
//   fatherDOB: "",
//   motherName: "",
//   motherDOB: "",
//   incomeSource: "",
//   employerOrBusinessName: "",
//   employerAddress: "",
//   workEmail: "",
//   loanAmount: "",
//   loanType: "",
//   emiAmount: "",
//   investmentAmount: "",
//   investmentType: "",
//   creditScore: "",
//   creditUpload: null,
//   photo: [],
//   aadharcard: [],
//   pancard: [],
//   incomeTaxReturn: [],
//   creditReport: [],
// };

// const inputFields = {
//   personalInfo: [
//     { key: "applicantName", label: "Full Name", type: "text" },
//     { key: "applicantDob", label: "Date of Birth", type: "date" },
//     {
//       key: "applicantGender",
//       label: "Gender",
//       type: "select",
//       options: ["Male", "Female", "Transgender"],
//     },
//     {
//       key: "applicantNationality",
//       label: "Nationality",
//       type: "select",
//       options: nationality,
//     },
//     { key: "applicantMobile", label: "Mobile Number", type: "text" },
//     { key: "applicantEmail", label: "Email Address", type: "email" },
//     { key: "applicantAddress", label: "Address", type: "text" },
//     { key: "applicantPin", label: "PIN", type: "text" },
//   ],
//   familyDetails: [
//     {
//       key: "maritalStatus",
//       label: "Marital Status",
//       type: "select",
//       options: ["Single", "Married", "Divorced", "Separated", "Widowed"],
//     },
//     { key: "spouseName", label: "Spouse Name", type: "text" },
//     { key: "spouseDOB", label: "Spouse Date of Birth", type: "date" },
//     { key: "childrenCount", label: "Children (Below 21) Count", type: "number" },
//     { key: "fatherName", label: "Father Name", type: "text" },
//     { key: "fatherDOB", label: "Father Date of Birth", type: "date" },
//     { key: "motherName", label: "Mother Name", type: "text" },
//     { key: "motherDOB", label: "Mother Date of Birth", type: "date" },
//   ],
//   incomeDetails: [
//     {
//       key: "incomeSource",
//       label: "Income Type",
//       type: "radio",
//       options: ["Business", "Salary"],
//     },
//     {
//       key: "employerOrBusinessName",
//       label: "Employer/Business Name",
//       type: "text",
//     },
//     {
//       key: "employerAddress",
//       label: "Employer/Business Address",
//       type: "text",
//     },
//     { key: "workEmail", label: "Work Email", type: "email" },
//   ],
//   borrowings: [
//     { key: "loanAmount", label: "Amount", type: "number" },
//     {
//       key: "loanType",
//       label: "Select Loan Type",
//       type: "select",
//       options: allLoanTypes,
//     },
//     { key: "emiAmount", label: "EMI Amount", type: "number" },
//   ],
//   investments: [
//     { key: "investmentAmount", label: "Current Amount", type: "number" },
//     {
//       key: "investmentType",
//       label: "Select Investment",
//       type: "select",
//       options: investments,
//     },
//   ],
//   creditScore: [
//     { key: "creditScore", label: "Credit Score", type: "number" },
//     {
//       key: "creditUpload",
//       label: "Upload Credit Score Document",
//       type: "file",
//     },
//   ],
//   loanTypeAndDocuments: [
//     {
//       key: "uploadDocuments",
//       label: "Upload Documents",
//       type: "multiDoc",
//       documents: [
//         { key: "photo", label: "Photo", type: "file", quantity: 1 },
//         { key: "aadharcard", label: "Aadhar Card", type: "file", min: 1, max: 2 },
//         { key: "pancard", label: "Pan Card", type: "file", quantity: 1 },
//         { key: "incomeTaxReturn", label: "Income Tax Return", type: "file", min: 1, max: 5 },
//         { key: "creditReport", label: "Credit Report", type: "file", quantity: 1 },
//       ],
//     },
//   ],
// };

// // Helper to flatten nested objects into FormData keys
// function appendFormData(formData, data, parentKey = "") {
//   Object.entries(data).forEach(([key, value]) => {
//     const formKey = parentKey ? `${parentKey}.${key}` : key;

//     if (
//       value &&
//       typeof value === "object" &&
//       !Array.isArray(value) &&
//       !(value instanceof File)
//     ) {
//       appendFormData(formData, value, formKey);
//     } else if (Array.isArray(value)) {
//       value.forEach((item, index) => {
//         if (item instanceof File) {
//           formData.append(formKey, item);
//         } else {
//           formData.append(`${formKey}[${index}]`, item);
//         }
//       });
//     } else {
//       if (value !== null && value !== undefined) {
//         formData.append(formKey, value);
//       }
//     }
//   });
// }

// const CreateClient = ({ initialData = {}, open, onClose, applicationId }) => {
//   const [formData, setFormData] = useState(initialFormData);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [collapsed, setCollapsed] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [sections, setSections] = useState([
//     { key: "personalInfo", title: "Personal Information", status: "Pending" },
//     { key: "familyDetails", title: "Family Details", status: "Pending" },
//     { key: "incomeDetails", title: "Income Details", status: "Pending" },
//     { key: "borrowings", title: "Borrowings", status: "Pending" },
//     { key: "investments", title: "Investments", status: "Pending" },
//     { key: "creditScore", title: "Credit Score", status: "Pending" },
//     {
//       key: "loanTypeAndDocuments",
//       title: "Loan Type and Documents",
//       status: "Pending",
//     },
//   ]);

//   const isFormComplete =
//     sections.every((section) => section.status === "Completed") && formData.pan;

//   useEffect(() => {
//     const id = getId();
//     setFormData((prev) => ({ ...prev, userId: id }));
//   }, []);

//   useEffect(() => {
//     if (initialData && Object.keys(initialData).length > 0) {
//       // Merge initialData into initialFormData to ensure all fields exist
//       setFormData({ ...initialFormData, ...initialData });
//     }
//   }, [initialData]);

//   useEffect(() => {
//     if (applicationId) {
//       getLoanApplicationById(applicationId)
//         .then(res => {
//           const appData = res.data?.data;
//           if (appData) {
//             console.log(appData)
//             setFormData({
//               ...initialFormData,
//               // Personal Info
//               applicantName: appData.personalInfo?.applicantName || "",
//               applicantDob: appData.personalInfo?.applicantDob?.slice(0, 10) || "",
//               applicantGender: appData.personalInfo?.applicantGender || "",
//               applicantNationality: appData.personalInfo?.applicantNationality || "", // map to lowercase "n"
//               applicantMobile: appData.personalInfo?.applicantMobile || "",
//               applicantEmail: appData.personalInfo?.applicantEmail || "",
//               applicantAddress: appData.personalInfo?.applicantAddress || "",
//               applicantPin: appData.personalInfo?.applicantPin || "", // map to lowercase "p"
//               pan: appData.personalInfo?.pan || "",
//               // Family Info
//               maritalStatus: appData.familyInfo?.maritalStatus || "",
//               spouseName: appData.familyInfo?.spouseName || "",
//               spouseDOB: appData.familyInfo?.spouseDOB || "",
//               childrenCount: appData.familyInfo?.childrenCount || "",
//               fatherName: appData.familyInfo?.fatherName || "",
//               fatherDOB: appData.familyInfo?.fatherDOB || "",
//               motherName: appData.familyInfo?.motherName || "",
//               motherDOB: appData.familyInfo?.motherDOB || "",
//               // Employment Info
//               incomeSource: appData.employmentInfo?.incomeSource || "",
//               employerOrBusinessName: appData.employmentInfo?.employerOrBusinessName || "",
//               employerAddress: appData.employmentInfo?.employerAddress || "",
//               workEmail: appData.employmentInfo?.workEmail || "",
//               // Loan Details
//               loanAmount: appData.loanDetails?.loanAmount || "",
//               emiAmount: appData.loanDetails?.emiAmount || "",
//               loanType: appData.loanDetails?.loanType || "",
//               // Property Investment
//               investmentAmount: appData.propertyInvestment?.investmentAmount || "",
//               investmentType: appData.propertyInvestment?.investmentType || "",
//               // Credit Score
//               creditScore: appData.creditScore || "",
//               // ...handle files if needed
//             });
//           }
//         })
//         .catch(err => {
//           console.error("Failed to fetch application data", err);
//         });
//     }
//   }, [applicationId]);

//   const handleSubmit = async () => {
//     const payload = prepareLoanPayload(formData); // structured fields

//     const form = new FormData();

//     // Append structured fields
//     form.append("personalInfo", JSON.stringify(payload.personalInfo));
//     form.append("familyInfo", JSON.stringify(payload.familyInfo));
//     form.append("employmentInfo", JSON.stringify(payload.employmentInfo));
//     form.append("loanDetails", JSON.stringify(payload.loanDetails));
//     form.append("propertyInvestment", JSON.stringify(payload.propertyInvestment));
//     form.append("creditScore", payload.creditScore);
//     form.append("userId", payload.userId);
//     form.append("createdBy", payload.createdBy);
//     form.append("references", JSON.stringify(payload.references));
//     form.append("collateral", payload.collateral || "");
//     form.append("collateralDescription", payload.collateralDescription || "");
//     form.append("criteriaValues", JSON.stringify(payload.criteriaValues));

//     // File field mappings
//     const documentTypes = {
//       photo: "photo",
//       aadharcard: "aadhar",
//       pancard: "pan",
//       incomeTaxReturn: "itr",
//       creditReport: "credit_report",
//     };

//     // Append file data
//     Object.keys(documentTypes).forEach((formKey) => {
//       const apiKey = documentTypes[formKey];
//       const file = formData[formKey];

//       if (file instanceof File) {
//         form.append(apiKey, file, file.name);
//       } else if (Array.isArray(file)) {
//         file.forEach((f) => {
//           if (f instanceof File) {
//             form.append(apiKey, f, f.name);
//           }
//         });
//       }
//     });

//     // Debugging output
//     for (let [key, value] of form.entries()) {
//       console.log("➡️", key, value instanceof File ? value.name : value);
//     }

//     try {
//       const response = await createLoanApplication(form);
//       console.log("✅ Loan submitted successfully:", response.data);
//     } catch (error) {
//       console.error("❌ Submission failed:", error);
//     }
//   };

//   const validateField = (key, value) => {
//     let error = "";

//     switch (key) {
//       case "pan":
//         if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value.toUpperCase())) {
//           error = "Invalid PAN format (e.g., ABCDE1234F)";
//         }
//         break;
//       case "applicantMobile":
//         if (!/^\d{10}$/.test(value)) {
//           error = "Mobile number must be 10 digits";
//         }
//         break;
//       case "applicantEmail":
//       case "workEmail":
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           error = "Invalid email address";
//         }
//         break;
//       case "applicantPin":
//         if (!/^\d{6}$/.test(value)) {
//           error = "PIN must be 6 digits";
//         }
//         break;
//       case "applicantDob":
//       case "spouseDOB":
//       case "fatherDOB":
//       case "motherDOB":
//         if (new Date(value) > new Date()) {
//           error = "Date cannot be in the future";
//         }
//         break;
//       case "childrenCount":
//       case "loanAmount":
//       case "emiAmount":
//       case "creditScore":
//         if (!/^\d+$/.test(value)) {
//           error = "Only digits are allowed";
//         }
//         break;
//       default:
//         break;
//     }

//     setErrors((prev) => ({ ...prev, [key]: error }));
//   };

//   return (
//     <>
//       <PageHeader
//         collapsed={collapsed}
//         title="Add New Client"
//         isPan
//         formData={formData}
//         setFormData={setFormData}
//         validateField={validateField}
//         errors={errors}
//       />

//       <div className="container mx-auto max-w-3xl">
//         {onClose && (
//           <div className="flex justify-end mb-2">
//             <Button onClick={onClose} type="default">Close</Button>
//           </div>
//         )}

//         {sections.map((section, index) => (
//           <SectionItem
//             key={section.key}
//             title={section.title}
//             status={section.status}
//             isActive={activeIndex === index}
//             onClick={() => setActiveIndex(activeIndex === index ? null : index)}
//           >
//             <CommonFields
//               formData={formData}
//               setFormData={setFormData}
//               inputFields={inputFields[section.key]}
//               sectionKey={section.key}
//               setSections={setSections}
//               errors={errors}
//               validateField={validateField}
//             />
//           </SectionItem>
//         ))}

//         <div className="flex justify-end">
//           <Button
//             className={`font-semibold ${
//               isFormComplete
//                 ? "bg-gray-800 cursor-pointer"
//                 : "bg-gray-400 cursor-not-allowed"
//             } text-white rounded`}
//             onClick={handleSubmit}
//             disabled={!isFormComplete}
//           >
//             Submit
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateClient;


// "use client";

// import React, { useState, useEffect } from "react";
// import PageHeader from "../Header/PageHeader";
// import SectionItem from "../ui/SectionItem";
// import CommonFields from "../form/CommonFields";
// import { allLoanTypes, investments, nationality } from "@/app/data";
// import { Button } from "antd";
// import { createLoanApplication, updateLoanApplication} from "@/lib";
// import { getId, prepareLoanPayload } from "@/lib/commonFunctions";
// import { getLoanApplicationById } from "@/lib";

// const initialFormData = {
//   userId: "",
//   pan: "",
//   applicantName: "",
//   applicantDob: "",
//   applicantGender: "",
//   applicantNationality: "",
//   applicantMobile: "",
//   applicantEmail: "",
//   applicantAddress: "",
//   applicantPin: "",
//   maritalStatus: "",
//   spouseName: "",
//   spouseDOB: "",
//   childrenCount: "",
//   fatherName: "",
//   fatherDOB: "",
//   motherName: "",
//   motherDOB: "",
//   incomeSource: "",
//   employerOrBusinessName: "",
//   employerAddress: "",
//   workEmail: "",
//   loanAmount: "",
//   loanType: "",
//   emiAmount: "",
//   investmentAmount: "",
//   investmentType: "",
//   creditScore: "",
//   creditUpload: null,
//   photo: [],
//   aadharcard: [],
//   pancard: [],
//   incomeTaxReturn: [],
//   creditReport: [],
// };

// const inputFields = {
//   personalInfo: [
//     { key: "applicantName", label: "Full Name", type: "text" },
//     { key: "applicantDob", label: "Date of Birth", type: "date" },
//     {
//       key: "applicantGender",
//       label: "Gender",
//       type: "select",
//       options: ["Male", "Female", "Transgender"],
//     },
//     {
//       key: "applicantNationality",
//       label: "Nationality",
//       type: "select",
//       options: nationality,
//     },
//     { key: "applicantMobile", label: "Mobile Number", type: "text" },
//     { key: "applicantEmail", label: "Email Address", type: "email" },
//     { key: "applicantAddress", label: "Address", type: "text" },
//     { key: "applicantPin", label: "PIN", type: "text" },
//   ],
//   familyDetails: [
//     { key: "maritalStatus", label: "Marital Status", type: "select", options: ["Single", "Married", "Divorced", "Separated", "Widowed"] },
//     { key: "spouseName", label: "Spouse Name", type: "text" },
//     { key: "spouseDOB", label: "Spouse Date of Birth", type: "date" },
//     { key: "childrenCount", label: "Children (Below 21) Count", type: "number" },
//     { key: "fatherName", label: "Father Name", type: "text" },
//     { key: "fatherDOB", label: "Father Date of Birth", type: "date" },
//     { key: "motherName", label: "Mother Name", type: "text" },
//     { key: "motherDOB", label: "Mother Date of Birth", type: "date" },
//   ],
//   incomeDetails: [
//     { key: "incomeSource", label: "Income Type", type: "radio", options: ["Business", "Salary"] },
//     { key: "employerOrBusinessName", label: "Employer/Business Name", type: "text" },
//     { key: "employerAddress", label: "Employer/Business Address", type: "text" },
//     { key: "workEmail", label: "Work Email", type: "email" },
//   ],
//   borrowings: [
//     { key: "loanAmount", label: "Amount", type: "number" },
//     {
//       key: "loanType", label: "Select Loan Type", type: "select", options: allLoanTypes,
//     },
//     { key: "emiAmount", label: "EMI Amount", type: "number" },
//   ],
//   investments: [
//     { key: "investmentAmount", label: "Current Amount", type: "number" },
//     {
//       key: "investmentType", label: "Select Investment", type: "select", options: investments,
//     },
//   ],
//   creditScore: [
//     { key: "creditScore", label: "Credit Score", type: "number" },
//     {
//       key: "creditUpload", label: "Upload Credit Score Document", type: "file",quantity: 1,
//       accept: "application/pdf,image/*",
//     },
//   ],
//   loanTypeAndDocuments: [
//     {
//       key: "uploadDocuments", label: "Upload Documents", type: "multiDoc",
//       documents: [
//         { key: "photo", label: "Photo", type: "file", quantity: 1 , accept: "image/*",},
//         { key: "aadharcard", label: "Aadhar Card", type: "file", min: 1, max: 2, accept: "application/pdf,image/*" },
//         { key: "pancard", label: "Pan Card", type: "file", quantity: 1 , accept: "application/pdf,image/*"},
//         { key: "incomeTaxReturn", label: "Income Tax Return", type: "file", min: 1, max: 5,accept: "application/pdf,image/*" },
//         { key: "creditReport", label: "Credit Report", type: "file", quantity: 1, accept: "application/pdf,image/*" },
//       ],
//     },
//   ],
// };

// const CreateClient = ({ initialData = {}, onClose, applicationId }) => {
//   const [formData, setFormData] = useState(initialFormData);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [collapsed, setCollapsed] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [sections, setSections] = useState([
//     { key: "personalInfo", title: "Personal Information", status: "Pending" },
//     { key: "familyDetails", title: "Family Details", status: "Pending" },
//     { key: "incomeDetails", title: "Income Details", status: "Pending" },
//     { key: "borrowings", title: "Borrowings", status: "Pending" },
//     { key: "investments", title: "Investments", status: "Pending" },
//     { key: "creditScore", title: "Credit Score", status: "Pending" },
//     { key: "loanTypeAndDocuments", title: "Loan Type and Documents", status: "Pending" },
//   ]);

//   const isFormComplete = sections.every(s => s.status === "Completed") && formData.pan;

//   // to avoid SSR hydration mismatch
//   const [hydrated, setHydrated] = useState(false);
//   useEffect(() => setHydrated(true), []);

//   // init userId
//   useEffect(() => {
//     const id = getId();
//     setFormData(prev => ({ ...prev, userId: id }));
//   }, []);

//   // merge initialData prop if any
//   useEffect(() => {
//     if (Object.keys(initialData).length) {
//       setFormData(prev => ({ ...prev, ...initialData }));
//     }
//   }, [initialData]);

//   // fetch application data by id and map nested data to flat formData keys
//   useEffect(() => {
//     if (!applicationId) return;

//     setLoading(true);
//     getLoanApplicationById(applicationId)
//       .then(res => {
//         console.log("Full API Response:", res);

//         // Try different possible data structures
//         let data = res?.data?.data || res?.data || res;

//         console.log("Extracted data:", data);

//         if (data && typeof data === 'object' && data._id) {
//           // Helper function to format dates
//           const formatDate = (dateString) => {
//             if (!dateString) return "";
//             try {
//               return new Date(dateString).toISOString().split("T")[0];
//             } catch (e) {
//               return "";
//             }
//           };

//           // Map the nested backend data to flat formData structure
//           const mappedData = {
//             ...initialFormData,
//             userId: data.userId || "",
//             pan: data.personalInfo?.pan || "",
//             applicantName: data.personalInfo?.applicantName || "",
//             applicantDob: formatDate(data.personalInfo?.applicantDob),
//             applicantGender: data.personalInfo?.applicantGender || "",
//             applicantNationality: data.personalInfo?.applicantNationality || "",
//             applicantMobile: data.personalInfo?.applicantMobile || "",
//             applicantEmail: data.personalInfo?.applicantEmail || "",
//             applicantAddress: data.personalInfo?.applicantAddress || "",
//             applicantPin: data.personalInfo?.applicantPin || "",
//             maritalStatus: data.familyInfo?.maritalStatus || "",
//             spouseName: data.familyInfo?.spouseName || "",
//             spouseDOB: formatDate(data.familyInfo?.spouseDOB),
//             childrenCount: data.familyInfo?.childrenCount?.toString() || "",
//             fatherName: data.familyInfo?.fatherName || "",
//             fatherDOB: formatDate(data.familyInfo?.fatherDOB),
//             motherName: data.familyInfo?.motherName || "",
//             motherDOB: formatDate(data.familyInfo?.motherDOB),
//             incomeSource: data.employmentInfo?.incomeSource || "",
//             employerOrBusinessName: data.employmentInfo?.employerOrBusinessName || "",
//             employerAddress: data.employmentInfo?.employerAddress || "",
//             workEmail: data.employmentInfo?.workEmail || "",
//             loanAmount: data.loanDetails?.loanAmount?.toString() || "",
//             loanType: data.loanDetails?.loanType || "",
//             emiAmount: data.loanDetails?.emiAmount?.toString() || "",
//             investmentAmount: data.propertyInvestment?.investmentAmount?.toString() || "",
//             investmentType: data.propertyInvestment?.investmentType || "",
//             creditScore: data.creditScore?.toString() || "",
//             creditUpload: null, // file uploads cannot be pre-filled
//             photo: [], // you may want to handle existing files differently
//             aadharcard: [],
//             pancard: [],
//             incomeTaxReturn: [],
//             creditReport: [],
//           };

//           console.log("Mapped formData:", mappedData);
//           setFormData(mappedData);

//           // Update section statuses based on filled data
//           setSections(prevSections => 
//             prevSections.map(section => {
//               const fieldsForSection = inputFields[section.key] || [];
//               const isComplete = fieldsForSection.every(field => {
//                 if (field.type === "multiDoc") {
//                   return true; // Skip file validation for now
//                 }
//                 return mappedData[field.key]?.toString().trim();
//               });

//               return {
//                 ...section,
//                 status: isComplete ? "Completed" : "Pending"
//               };
//             })
//           );
//         } else {
//           console.error("Invalid data structure:", data);
//         }
//       })
//       .catch(err => {
//         console.error("Failed to fetch application data:", err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [applicationId]);

//   const handleSubmit = async () => {
//     const payload = prepareLoanPayload(formData);
//     const form = new FormData();
//     form.append("personalInfo", JSON.stringify(payload.personalInfo));
//     form.append("familyInfo", JSON.stringify(payload.familyInfo));
//     form.append("employmentInfo", JSON.stringify(payload.employmentInfo));
//     form.append("loanDetails", JSON.stringify(payload.loanDetails));
//     form.append("propertyInvestment", JSON.stringify(payload.propertyInvestment));
//     form.append("creditScore", payload.creditScore);
//     form.append("userId", payload.userId);
//     form.append("createdBy", payload.createdBy);
//     form.append("references", JSON.stringify(payload.references));
//     form.append("collateral", payload.collateral || "");
//     form.append("collateralDescription", payload.collateralDescription || "");
//     form.append("criteriaValues", JSON.stringify(payload.criteriaValues));

//     const docMap = {
//       photo: "photo",
//       aadharcard: "aadhar",
//       pancard: "pancard",
//       incomeTaxReturn: "itr",
//       creditReport: "credit_report",
//     };

//     Object.entries(docMap).forEach(([key, apiKey]) => {
//       const files = formData[key];
//       if (files instanceof File) {
//         form.append(apiKey, files, files.name);
//       } else if (Array.isArray(files)) {
//         files.forEach(f => f instanceof File && form.append(apiKey, f, f.name));
//       }
//     });

//     // try {
//     //   setLoading(true);
//     //   const resp = await createLoanApplication(form);
//     //   console.log("Submitted:", resp.data);
//     //   // optionally notify user or reset form here
//     // } catch (e) {
//     //   console.error("Error submitting:", e);
//     // } finally {
//     //   setLoading(false);
//     // }

//     try {
//     setLoading(true);
//     let resp;

//     if (applicationId) {
//       // 🔄 UPDATE mode
//       resp = await updateLoanApplication(applicationId, payload);
//      // console.log("Updated:", resp.data);
//     } else {
//       // ➕ CREATE mode
//       //const form = new FormData();
//       resp = await createLoanApplication(form);
//       console.log("Created:", resp.data);
//     }
//     console.log("Response:", resp.data);
//     // optional: reset form or redirect
//   } catch (e) {
//     console.error("Error submitting:", e);
//   } finally {
//     setLoading(false);
//   }
//   };

//   const validateField = (key, value) => {
//     let err = "";
//     switch (key) {
//       case "pan":
//         if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value.toUpperCase())) err = "Invalid PAN";
//         break;
//       case "applicantMobile":
//         if (!/^\d{10}$/.test(value)) err = "Mobile must be 10 digits";
//         break;
//       case "applicantEmail":
//       case "workEmail":
//         if (!/^\S+@\S+\.\S+$/.test(value)) err = "Invalid email";
//         break;
//       case "applicantPin":
//         if (!/^\d{6}$/.test(value)) err = "PIN must be 6 digits";
//         break;
//       case "applicantDob":
//       case "spouseDOB":
//       case "fatherDOB":
//       case "motherDOB":
//         if (new Date(value) > new Date()) err = "Date cannot be in the future";
//         break;
//       case "childrenCount":
//       case "loanAmount":
//       case "emiAmount":
//       case "creditScore":
//         if (!/^\d+$/.test(value)) err = "Only digits allowed";
//         break;
//       default:
//         break;
//     }
//     setErrors(prev => ({ ...prev, [key]: err }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <PageHeader
//         collapsed={collapsed}
//         title="Add New Client"
//         isPan
//         formData={formData}
//         setFormData={setFormData}
//         validateField={validateField}
//         errors={errors}
//       />
//       <div className="container mx-auto max-w-3xl">
//         {onClose && (
//           <div className="flex justify-end mb-2">
//             <Button onClick={onClose} type="default">Close</Button>
//           </div>
//         )}
//         {hydrated && sections.map((sec, idx) => (
//           <SectionItem
//             key={sec.key}
//             title={sec.title}
//             status={sec.status}
//             isActive={activeIndex === idx}
//             onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
//           >
//             <CommonFields
//               formData={formData}
//               setFormData={setFormData}
//               inputFields={inputFields[sec.key]}
//               sectionKey={sec.key}
//               setSections={setSections}
//               errors={errors}
//               validateField={validateField}
//             />
//           </SectionItem>
//         ))}
//         <div className="flex justify-end">
//           <Button
//             className={`font-semibold ${isFormComplete ? "bg-gray-800 cursor-pointer" : "bg-gray-400"} text-white rounded`}
//             onClick={handleSubmit}
//             disabled={!isFormComplete || loading}
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateClient;

"use client";

import React, { useState, useEffect } from "react";
import PageHeader from "../Header/PageHeader";
import SectionItem from "../ui/SectionItem";
import CommonFields from "../form/CommonFields";
import { allLoanTypes, investments, nationality } from "@/app/data";
import { Button } from "antd";
import { createLoanApplication, updateLoanApplication, getLoanApplicationById } from "@/lib";
import { getId, prepareLoanPayload } from "@/lib/commonFunctions";

const defaultFileAccept = "application/pdf,image/*";

const initialFormData = {
  userId: "",
  pan: "",
  applicantName: "",
  applicantDob: "",
  applicantGender: "",
  applicantNationality: "",
  applicantMobile: "",
  applicantEmail: "",
  applicantAddress: "",
  applicantPin: "",
  maritalStatus: "",
  spouseName: "",
  spouseDOB: "",
  childrenCount: "",
  fatherName: "",
  fatherDOB: "",
  motherName: "",
  motherDOB: "",
  incomeSource: "",
  employerOrBusinessName: "",
  employerAddress: "",
  workEmail: "",
  loanAmount: "",
  loanType: "",
  emiAmount: "",
  investmentAmount: "",
  investmentType: "",
  creditScore: "",
  creditUpload: null,
  photo: [],
  aadharcard: [],
  pancard: [],
  incomeTaxReturn: [],
  creditReport: [],
  removedFiles: [],
};

const inputFields = {
  personalInfo: [
    { key: "applicantName", label: "Full Name", type: "text" },
    { key: "applicantDob", label: "Date of Birth", type: "date" },
    { key: "applicantGender", label: "Gender", type: "select", options: ["Male", "Female", "Transgender"] },
    { key: "applicantNationality", label: "Nationality", type: "select", options: nationality },
    { key: "applicantMobile", label: "Mobile Number", type: "text" },
    { key: "applicantEmail", label: "Email Address", type: "email" },
    { key: "applicantAddress", label: "Address", type: "text" },
    { key: "applicantPin", label: "PIN", type: "text" },
    { key: "pan", label: "PAN Number", type: "text" },
  ],
  familyDetails: [
    { key: "maritalStatus", label: "Marital Status", type: "select", options: ["Single", "Married", "Divorced", "Separated", "Widowed"] },
    { key: "spouseName", label: "Spouse Name", type: "text" },
    { key: "spouseDOB", label: "Spouse Date of Birth", type: "date" },
    { key: "childrenCount", label: "Children (Below 21) Count", type: "number" },
    { key: "fatherName", label: "Father Name", type: "text" },
    { key: "fatherDOB", label: "Father Date of Birth", type: "date" },
    { key: "motherName", label: "Mother Name", type: "text" },
    { key: "motherDOB", label: "Mother Date of Birth", type: "date" },
  ],
  incomeDetails: [
    { key: "incomeSource", label: "Income Type", type: "radio", options: ["Business", "Salary"] },
    { key: "employerOrBusinessName", label: "Employer/Business Name", type: "text" },
    { key: "employerAddress", label: "Employer/Business Address", type: "text" },
    { key: "workEmail", label: "Work Email", type: "email" },
  ],
  borrowings: [
    { key: "loanAmount", label: "Amount", type: "number" },
    { key: "loanType", label: "Select Loan Type", type: "select", options: allLoanTypes },
    { key: "emiAmount", label: "EMI Amount", type: "number" },
  ],
  investments: [
    { key: "investmentAmount", label: "Current Amount", type: "number" },
    { key: "investmentType", label: "Select Investment", type: "select", options: investments },
  ],
  creditScore: [
    { key: "creditScore", label: "Credit Score", type: "number" },
    // {
    //   key: "creditUpload",
    //   label: "Upload Credit Score Document",
    //   type: "file",
    //   quantity: 1,
    //   accept: defaultFileAccept,
    // },
  ],
  loanTypeAndDocuments: [
    {
      key: "uploadDocuments",
      label: "Upload Documents",
      type: "multiDoc",
      documents: [
        { key: "photo", label: "Photo", type: "file", quantity: 1, accept: "image/*" },
        { key: "aadharcard", label: "Aadhar Card", type: "file", min: 1, max: 2, accept: defaultFileAccept },
        { key: "pancard", label: "Pan Card", type: "file", quantity: 1, accept: defaultFileAccept },
        { key: "incomeTaxReturn", label: "Income Tax Return", type: "file", min: 1, max: 5, accept: defaultFileAccept },
        { key: "creditReport", label: "Credit Report", type: "file", quantity: 1, accept: defaultFileAccept },
      ],
    },
  ],
};

const CreateClient = ({ initialData = {}, onClose, applicationId }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [activeIndex, setActiveIndex] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const [sections, setSections] = useState([
    { key: "personalInfo", title: "Personal Information", status: "Pending" },
    { key: "familyDetails", title: "Family Details", status: "Pending" },
    { key: "incomeDetails", title: "Income Details", status: "Pending" },
    { key: "borrowings", title: "Borrowings", status: "Pending" },
    { key: "investments", title: "Investments", status: "Pending" },
    { key: "creditScore", title: "Credit Score", status: "Pending" },
    { key: "loanTypeAndDocuments", title: "Loan Type and Documents", status: "Pending" },
  ]);

  const isFormComplete = sections.every((s) => s.status === "Completed") && formData.pan;

  useEffect(() => setHydrated(true), []);
  useEffect(() => setFormData((prev) => ({ ...prev, userId: getId() })), []);
  useEffect(() => {
    if (Object.keys(initialData).length) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  useEffect(() => {
    if (!applicationId) return;
    setLoading(true);

    getLoanApplicationById(applicationId)
      .then((res) => {
        const data = res?.data?.data || res?.data || res;
        const formatDate = (date) => (date ? new Date(date).toISOString().split("T")[0] : "");

        const mapped = {
          ...initialFormData,
          userId: data.userId || "",
          pan: data.personalInfo?.pan || "",
          applicantName: data.personalInfo?.applicantName || "",
          applicantDob: formatDate(data.personalInfo?.applicantDob),
          applicantGender: data.personalInfo?.applicantGender || "",
          applicantNationality: data.personalInfo?.applicantNationality || "",
          applicantMobile: data.personalInfo?.applicantMobile || "",
          applicantEmail: data.personalInfo?.applicantEmail || "",
          applicantAddress: data.personalInfo?.applicantAddress || "",
          applicantPin: data.personalInfo?.applicantPin || "",
          maritalStatus: data.familyInfo?.maritalStatus || "",
          spouseName: data.familyInfo?.spouseName || "",
          spouseDOB: formatDate(data.familyInfo?.spouseDOB),
          childrenCount: data.familyInfo?.childrenCount?.toString() || "",
          fatherName: data.familyInfo?.fatherName || "",
          fatherDOB: formatDate(data.familyInfo?.fatherDOB),
          motherName: data.familyInfo?.motherName || "",
          motherDOB: formatDate(data.familyInfo?.motherDOB),
          incomeSource: data.employmentInfo?.incomeSource || "",
          employerOrBusinessName: data.employmentInfo?.employerOrBusinessName || "",
          employerAddress: data.employmentInfo?.employerAddress || "",
          workEmail: data.employmentInfo?.workEmail || "",
          loanAmount: data.loanDetails?.loanAmount?.toString() || "",
          loanType: data.loanDetails?.loanType || "",
          emiAmount: data.loanDetails?.emiAmount?.toString() || "",
          investmentAmount: data.propertyInvestment?.investmentAmount?.toString() || "",
          investmentType: data.propertyInvestment?.investmentType || "",
          creditScore: data.creditScore?.toString() || "",
          removedFiles: [],
        };

        const docKeys = ["photo", "aadharcard", "pancard", "incomeTaxReturn", "creditReport", "creditUpload"];

        const groupedDocs = {};
        data.documents?.forEach((doc) => {
          const key = doc.type === "aadhar" ? "aadharcard" :
            doc.type === "itr" ? "incomeTaxReturn" :
              doc.type === "credit_report" ? "creditReport" :
                doc.type === "photo" ? "photo" :
                  doc.type === "pancard" ? "pancard" :
                    doc.type === "creditUpload" ? "creditUpload" : null;

          if (key) {
            if (!groupedDocs[key]) groupedDocs[key] = [];
            groupedDocs[key].push({ name: doc.name, url: doc.url, type: "cloud" });
          }
        });

        setFormData((prev) => ({
          ...prev,
          ...mapped,
          ...groupedDocs,
        }));

        // ✅ Map documents by type into correct formData keys
        const docGroups = {
          photo: [],
          aadharcard: [],
          pancard: [],
          incomeTaxReturn: [],
          creditReport: [],
        };

        for (const doc of data.documents || []) {
          if (doc.type === "photo") docGroups.photo.push(doc.url);
          if (doc.type === "aadhar") docGroups.aadharcard.push(doc.url);
          if (doc.type === "pancard") docGroups.pancard.push(doc.url);
          if (doc.type === "itr") docGroups.incomeTaxReturn.push(doc.url);
          if (doc.type === "credit_report") docGroups.creditReport.push(doc.url);
        }
        setFormData({ ...mapped, ...docGroups });

        setSections((prev) =>
          prev.map((section) => {
            const fields = inputFields[section.key] || [];
            const isComplete = fields.every((field) => {
              if (field.type === "multiDoc") {
                return field.documents.every((doc) => {
                  const files = docGroups[doc.key] || [];
                  const min = doc.min ?? doc.quantity ?? 1;
                  const max = doc.max ?? doc.quantity ?? Infinity;
                  return Array.isArray(files) && files.length >= min && files.length <= max;
                });
              }
              // Skip spouse fields if maritalStatus is Single
            if (
              mapped.maritalStatus === "Single" &&
              ["spouseName", "spouseDOB"].includes(field.key)
            ) {
              return true;
  }
              return mapped[field.key]?.toString().trim();
            });

            return {
              ...section,
              status: isComplete ? "Completed" : "Pending",
            };
          })
        );
      })
      .catch((err) => {
        console.error("Failed to fetch application data:", err);
      })
      .finally(() => setLoading(false));
  }, [applicationId]);



  const handleSubmit = async () => {
    const payload = prepareLoanPayload(formData);
    const form = new FormData();
    const MAX_FILE_SIZE_MB = 3;
try{
    // Append raw string fields
    form.append("userId", payload.userId);
    form.append("createdBy", payload.createdBy);
    form.append("creditScore", payload.creditScore);
    form.append("collateral", payload.collateral || "");
    form.append("collateralDescription", payload.collateralDescription || "");

    // Append JSON objects as strings
    form.append("personalInfo", JSON.stringify(payload.personalInfo));
    form.append("familyInfo", JSON.stringify(payload.familyInfo));
    form.append("employmentInfo", JSON.stringify(payload.employmentInfo));
    form.append("loanDetails", JSON.stringify(payload.loanDetails));
    form.append("propertyInvestment", JSON.stringify(payload.propertyInvestment));
    form.append("references", JSON.stringify(payload.references || []));
    form.append("criteriaValues", JSON.stringify(payload.criteriaValues || []));
    form.append("removedFiles", JSON.stringify(formData.removedFiles || []));

    // Map formData keys to backend file field names
    const docMap = {
      photo: "photo",
      aadharcard: "aadhar",
      pancard: "pancard",
      incomeTaxReturn: "itr",
      creditReport: "credit_report",
    };

    Object.entries(docMap).forEach(([formKey, apiKey]) => {
      const files = formData[formKey];
      if (Array.isArray(files)) {
        for (const file of files) {
          if (file instanceof File) {
            const fileSizeMB = file.size / (1024 * 1024);
            if (fileSizeMB > MAX_FILE_SIZE_MB) {
              throw new Error(`${file.name} is larger than 3MB.`);
            }
            form.append(apiKey, file, file.name);
          }
        }
      } else if (files instanceof File) {
        const fileSizeMB = files.size / (1024 * 1024);
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
          throw new Error(`${files.name} is larger than 3MB.`);
        }
        form.append(apiKey, files, files.name);
      }
    });

    if (formData.creditUpload instanceof File) {
      const fileSizeMB = formData.creditUpload.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        throw new Error(`${formData.creditUpload.name} is larger than 3MB.`);
      }
      form.append("creditUpload", formData.creditUpload, formData.creditUpload.name);
    }

    setLoading(true);
    let response;
    if (applicationId) {
      response = await updateLoanApplication(applicationId, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      response = await createLoanApplication(form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    console.log("✅ Submit Response:", response?.data);
    if (onClose) onClose();
  } catch (err) {
    console.error("❌ Error submitting:", err);
    alert(err.message || "Submission failed.");
  } finally {
    setLoading(false);
  }

    // Object.entries(docMap).forEach(([formKey, apiKey]) => {
    //   const files = formData[formKey];
    //   if (Array.isArray(files)) {
    //     files.forEach((file) => {
    //       if (file instanceof File) {
    //         form.append(apiKey, file, file.name);
    //       }
    //     });
    //   } else if (files instanceof File) {
    //     form.append(apiKey, files, files.name);
    //   }
    // });

    // if (formData.creditUpload instanceof File) {
    //   form.append("creditUpload", formData.creditUpload, formData.creditUpload.name);
    // }

    // try {
    //   setLoading(true);
    //   let response;
    //   if (applicationId) {
    //     response = await updateLoanApplication(applicationId, form, {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     });
    //   } else {
    //     response = await createLoanApplication(form, {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     });
    //   }
    //   console.log("✅ Submit Response:", response?.data);
    //   if (onClose) onClose();
    // } catch (err) {
    //   console.error("❌ Error submitting:", err);
    // } finally {
    //   setLoading(false);
    // }
  };



  ///////////////////////////

  const validateField = (key, value) => {
    let err = "";
    switch (key) {
      case "pan":
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value.toUpperCase())) err = "Invalid PAN";
        break;
      case "applicantMobile":
        if (!/^\d{10}$/.test(value)) err = "Mobile must be 10 digits";
        break;
      case "applicantEmail":
      case "workEmail":
        if (!/^\S+@\S+\.\S+$/.test(value)) err = "Invalid email";
        break;
      case "applicantPin":
        if (!/^\d{6}$/.test(value)) err = "PIN must be 6 digits";
        break;
      case "applicantDob":
      case "spouseDOB":
      case "fatherDOB":
      case "motherDOB":
        if (new Date(value) > new Date()) err = "Date cannot be in the future";
        break;
      case "childrenCount":
      case "loanAmount":
      case "emiAmount":
      case "creditScore":
        if (!/^\d+$/.test(value)) err = "Only digits allowed";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [key]: err }));
  };

  if (loading) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-lg font-medium text-gray-600 animate-pulse">
        Please wait, your application is being submitted...
      </div>
    </div>
  );
}


  return (
    <>
      <PageHeader
        collapsed={collapsed}
        title="Add New Client"
        isPan
        formData={formData}
        setFormData={setFormData}
        validateField={validateField}
        errors={errors}
      />

      <div className="container mx-auto max-w-3xl">
        {onClose && (
          <div className="flex justify-end mb-2">
            <Button onClick={onClose} type="default">
              Close
            </Button>
          </div>
        )}

        {hydrated &&
          // sections.map((sec, idx) => (
          //   <SectionItem
          //     key={sec.key}
          //     title={sec.title}
          //     status={sec.status}
          //     isActive={activeIndex === idx}
          //     onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
          //   >
          //     <CommonFields
          //       formData={formData}
          //       setFormData={setFormData}
          //       inputFields={inputFields[sec.key]}
          //       sectionKey={sec.key}
          //       setSections={setSections}
          //       errors={errors}
          //       validateField={validateField}
          //     />
          //   </SectionItem>
          // ))

          sections.map((sec, idx) => {
            let fieldsToRender = inputFields[sec.key];

            // 🔒 Conditionally remove spouse fields if "Single"
            if (sec.key === "familyDetails" && formData.maritalStatus === "Single") {
              fieldsToRender = fieldsToRender.filter(
                (field) => !["spouseName", "spouseDOB"].includes(field.key)
              );
            }

            return (
              <SectionItem
                key={sec.key}
                title={sec.title}
                status={sec.status}
                isActive={activeIndex === idx}
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
              >
                <CommonFields
                  formData={formData}
                  setFormData={setFormData}
                  inputFields={fieldsToRender}
                  sectionKey={sec.key}
                  setSections={setSections}
                  errors={errors}
                  validateField={validateField}
                />
              </SectionItem>
            );
          })


        }

        <div className="flex justify-end mt-6">
          <Button
            className={`font-semibold ${isFormComplete ? "bg-gray-800" : "bg-gray-400"} text-white rounded`}
            onClick={handleSubmit}
            disabled={!isFormComplete || loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateClient;



