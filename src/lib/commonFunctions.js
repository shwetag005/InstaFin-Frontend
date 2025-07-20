// import { uploadLoanFile } from ".";

// //caitalizse and split
// export const splitAndCapitalize = (str) => {
//   if (!str) return str;
//   const words = str.split(/(?=[A-Z])/);
//   return words
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

// export function toTitleCase(name) {
//   if (!name) return name;
//   return name
//     .toLowerCase()
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// }
// //return localstorage user value
// export const getUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };
// export const getRole = () => {
//   return localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))?.role
//     : null;
// };

// export const getId = () => {
//   return JSON.parse(localStorage.getItem("user"))?._id || null;
// };

// // 2025-05-16T06:27:09.040Z => 2025-05-16
// export const getDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };
// export const prepareLoanPayload = (formData) => {
//   const {
//     applicantName,
//     applicantDob,
//     applicantGender,
//     applicantnationality,
//     applicantMobile,
//     applicantEmail,
//     applicantAddress,
//     applicantpin,
//     maritalStatus,
//     spouseName,
//     spouseDOB,
//     childrenCount,
//     fatherName,
//     fatherDOB,
//     motherName,
//     motherDOB,
//     incomeSource,
//     employerOrBusinessName,
//     employerAddress,
//     workEmail,
//     loanAmount,
//     loanPurpose,
//     loanTerm,
//     interestRate,
//     emiAmount,
//     loanType,
//     propertyAddress,
//     propertyValue,
//     investmentAmount,
//     investmentType,
//     creditScore,
//     references,
//     collateral,
//     collateralDescription,
//     criteriaValues,
//     pan,
//     bankId,
//     branchId,
//     userId,
//   } = formData;

//   return {
//     userId: userId ?? "",
//     createdBy: userId ?? "", // Using the same userId as createdBy
//     personalInfo: {
//       applicantName,
//       applicantDob,
//       applicantGender,
//       applicantNationality: applicantnationality,
//       applicantMobile,
//       applicantEmail,
//       applicantAddress,
//       applicantPin: applicantpin,
//       pan,
//     },
//     familyInfo: {
//       maritalStatus,
//       spouseName,
//       spouseDOB,
//       childrenCount: childrenCount ? Number(childrenCount) : undefined,
//       fatherName,
//       fatherDOB,
//       motherName,
//       motherDOB,
//     },
//     employmentInfo: {
//       incomeSource,
//       employerOrBusinessName,
//       employerAddress,
//       workEmail,
//     },
//     loanDetails: {
//       loanAmount: Number(loanAmount),
//       loanPurpose,
//       loanTerm: loanTerm ? Number(loanTerm) : undefined,
//       interestRate: interestRate ? Number(interestRate) : undefined,
//       emiAmount: Number(emiAmount),
//       loanType,
//     },
//     propertyInvestment: {
//       propertyAddress,
//       propertyValue: propertyValue ? Number(propertyValue) : undefined,
//       investmentAmount: investmentAmount ? Number(investmentAmount) : undefined,
//       investmentType,
//     },
//     creditScore: creditScore ? Number(creditScore) : undefined,
//     references: references || [],
//     collateral,
//     collateralDescription,
//     criteriaValues: criteriaValues || [],
//     // bankId: Array.isArray(bankId) ? bankId : [bankId ?? ""],
//     // branchId: Array.isArray(branchId) ? branchId : [branchId ?? ""],
//     // Include any other root-level fields from your schema
//   };
// };

// export const createLoanApplicationWithFiles = async (applicationId, formData) => {
//   try {
//     const form = new FormData();

//     // Append application ID
//     form.append("applicationId", applicationId);

//     const documentTypes = {
//       photo: "photo",
//       aadharcard: "aadhar",
//       pancard: "pan",
//       incomeTaxReturn: "itr",
//       creditReport: "credit_report",
//     };

//     console.log("Received formData:", formData);

//     // Loop through document types and append files
//     for (const [formKey, apiKey] of Object.entries(documentTypes)) {
//       const files = formData[formKey];

//       if (Array.isArray(files)) {
//         files.forEach((file, index) => {
//           if (file instanceof File) {
//             form.append(apiKey, file, file.name);
//             console.log(`✅ Appended ${apiKey} file:`, file.name);
//           } else {
//             console.warn(`⚠ Skipped ${formKey}[${index}] — not a File instance`, file);
//           }
//         });
//       } else if (files instanceof File) {
//         form.append(apiKey, files, files.name);
//         console.log(`✅ Appended ${apiKey} file:`, files.name);
//       } else {
//         console.warn(`⚠ No valid files for ${formKey}`);
//       }
//     }

//     // Send form data to backend
//     const response = await uploadLoanFile(applicationId, form, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       onUploadProgress: (progressEvent) => {
//         const percentCompleted = Math.round(
//           (progressEvent.loaded * 100) / progressEvent.total
//         );
//         console.log(`📤 Upload progress: ${percentCompleted}%`);
//       },
//     });

//     return {
//       success: true,
//       data: response.data,
//       status: response.status,
//     };
//   } catch (error) {
//     console.error("❌ Error uploading documents:", error);
//     return {
//       success: false,
//       error: error.response?.data?.message || error.message,
//       status: error.response?.status || 500,
//     };
//   }
  
// };


// src/lib/commonFunctions.js

// Capitalize words by splitting on uppercase letters


export const splitAndCapitalize = (str) => {
  if (!str) return str;
  const words = str.split(/(?=[A-Z])/);
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Convert a full string to Title Case
export function toTitleCase(name) {
  if (!name) return name;
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Safely get user object from localStorage (client only)
export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Safely get user's role from localStorage
export const getRole = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user)?.role : null;
  }
  return null;
};

// Safely get user's ID from localStorage
export const getId = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user)?._id : null;
  }
  return null;
};

// Format a date string into dd-MMM-yyyy (e.g. 16-May-2025)
export const getDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Convert your form data to API payload format for loan applications
export const prepareLoanPayload = (formData) => {
  const {
    applicantName,
    applicantDob,
    applicantGender,
    applicantNationality,
    applicantMobile,
    applicantEmail,
    applicantAddress,
    applicantPin,
    maritalStatus,
    spouseName,
    spouseDOB,
    childrenCount,
    fatherName,
    fatherDOB,
    motherName,
    motherDOB,
    incomeSource,
    employerOrBusinessName,
    employerAddress,
    workEmail,
    loanAmount,
    loanPurpose,
    loanTerm,
    interestRate,
    emiAmount,
    loanType,
    propertyAddress,
    propertyValue,
    investmentAmount,
    investmentType,
    creditScore,
    references,
    collateral,
    collateralDescription,
    criteriaValues,
    pan,
    bankId,
    branchId,
    userId,
  } = formData;

  return {
    userId: userId ?? "",
    createdBy: userId ?? "",
    personalInfo: {
      applicantName,
      applicantDob,
      applicantGender,
      applicantNationality,
      applicantMobile,
      applicantEmail,
      applicantAddress,
      applicantPin,
      pan,
    },
    familyInfo: {
      maritalStatus,
      spouseName,
      spouseDOB,
      childrenCount: childrenCount ? Number(childrenCount) : undefined,
      fatherName,
      fatherDOB,
      motherName,
      motherDOB,
    },
    employmentInfo: {
      incomeSource,
      employerOrBusinessName,
      employerAddress,
      workEmail,
    },
    loanDetails: {
      loanAmount: Number(loanAmount),
      loanPurpose,
      loanTerm: loanTerm ? Number(loanTerm) : undefined,
      interestRate: interestRate ? Number(interestRate) : undefined,
      emiAmount: Number(emiAmount),
      loanType,
    },
    propertyInvestment: {
      propertyAddress,
      propertyValue: propertyValue ? Number(propertyValue) : undefined,
      investmentAmount: investmentAmount ? Number(investmentAmount) : undefined,
      investmentType,
    },
    creditScore: creditScore ? Number(creditScore) : undefined,
    references: references || [],
    collateral,
    collateralDescription,
    criteriaValues: criteriaValues || [],
  };
};

// Upload files for a loan application
export const createLoanApplicationWithFiles = async (applicationId, formData) => {
  try {
    const form = new FormData();

    form.append("applicationId", applicationId);

    const documentTypes = {
      photo: "photo",
      aadharcard: "aadhar",
      pancard: "pancard",
      incomeTaxReturn: "itr",
      creditReport: "credit_report",
    };

    for (const [formKey, apiKey] of Object.entries(documentTypes)) {
      const files = formData[formKey];
      if (Array.isArray(files)) {
        files.forEach((file) => {
          if (file instanceof File) {
            form.append(apiKey, file, file.name);
          }
        });
      } else if (files instanceof File) {
        form.append(apiKey, files, files.name);
      }
    }

    const response = await uploadLoanFile(applicationId, form, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        const pct = Math.round((e.loaded * 100) / e.total);
        console.log(`Upload progress: ${pct}%`);
      },
    });

    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    console.error("Error uploading docs:", error);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
    };
  }
};
