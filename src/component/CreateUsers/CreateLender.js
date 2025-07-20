// "use client";

// import React, { useEffect, useState } from "react";
// import PageHeader from "../Header/PageHeader";
// import SectionItem from "../ui/SectionItem";
// import CommonFields from "../form/CommonFields";
// import { Button } from "antd";
// import { createBranch, getBanks } from "@/lib";
// import { getId } from "@/lib/commonFunctions";
// import { showToast } from "@/utils/toastUtils";
// import { useRouter } from "next/navigation";

// const CreateLender = () => {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [bankData, setBankData] = useState([]);
//   const [collapsed, setCollapsed] = useState(false);
//   const router =useRouter();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     address: "",
//     pin: "",
//     email: "",
//     role: "bankOperator",
//     ifscCode: "",
//     bankId: "",
//     bankBranch: "",
//     bankLocation: "",
//     bankPin: "",
//     mobileNumber: "",
//     bankName: "",
//     bankPersonDesignation: "",
//     createdBy: getId(),
//     bankPersonEId: "",
//   });

//   useEffect(() => {
//     getAllBanks();
//   }, []);
//   const getAllBanks = async () => {
//     try {
//       setLoading(true);
//       const response = await getBanks();
//       if (response.status == 200) {
//         let newData = response.data.data.map((item) => ({
//           value: item._id,
//           label: item.bankName,
//         }));
//         showToast("success", response.message);
//         setBankData(newData);
//         setLoading(false);
//       } else {
//         showToast("error", response.message);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [sections, setSections] = useState([
//     { key: "bankName", title: "Select Bank", status: "Pending" },
//     { key: "bankBranch", title: "Select Branch", status: "Pending" },
//     { key: "bankPerson", title: "Branch Person Details", status: "Pending" },
//   ]);

//   const inputFields = {
//     bankPerson: [
//       { key: "fullName", label: "Name", type: "text" },
//       { key: "address", label: "Address", type: "text" },
//       { key: "pin", label: "Pin Code", type: "text" },
//       { key: "email", label: "Email", type: "email" },
//       { key: "bankPersonDesignation", label: "Designation", type: "text" },
//       { key: "bankPersonEId", label: "Employee ID", type: "text" },
//     ],
//     bankBranch: [
//       { key: "ifscCode", label: "IFSC Code", type: "text" },
//       { key: "bankBranch", label: "Branch Name", type: "text" },
//       { key: "bankLocation", label: "Location", type: "text" },
//       { key: "bankPin", label: "Pin Code", type: "text" },
//     ],
//     bankName: [
//       {
//         key: "bankId",
//         label: "Select Bank",
//         type: "searchSelect",
//         options: bankData, 
//       },
//     ],
//   };

//   const handleInputChange = (sectionKey, fieldKey, value) => {
//     const updatedFormData = { ...formData, [fieldKey]: value };
//     setFormData(updatedFormData);

//     const isSectionComplete = inputFields[sectionKey].every((field) =>
//       updatedFormData[field.key]?.trim()
//     );

//     setSections((prevSections) =>
//       prevSections.map((section) =>
//         section.key === sectionKey
//           ? { ...section, status: isSectionComplete ? "Completed" : "Pending" }
//           : section
//       )
//     );
//   };

//   const isFormComplete =
//     sections.every((section) => section.status === "Completed") &&
//     formData?.mobileNumber?.trim();
//   console.log(formData);
//   // {
//   //     "fullName": "Loan Operator",
//   //     "address": "At. Kapileshwar Tal. Radhanagari Dist. Kolhapur",
//   //     "pin": "416208",
//   //     "email": "bankoperator@gmail.com",
//   //     "role": "bankOperator",
//   //     "ifscCode": "IFSCCS7897848",
//   //     "bankBranch": "Shahupuri",
//   //     "bankLocation": "123, 2nd line, shahupuri",
//   //     "bankPin": "415789",
//   //     "mobileNumber": "7894564585",
//   //     "bankPersonDesignation": "loan operator",
//   //     "createdBy": "6826dabd5646513020c275ab",
//   //     "bankPersonEId": "C147"
//   // }
//   const handleSubmit = async () => {
//     if (isFormComplete) {
//       try {
//         setLoading(true);

//         const updatedFormData = {
//           ...formData,
//           role: "bankOperator",
//           createdBy: getId() || undefined,
//           bankId: formData.bankId || undefined,
//           bankName:
//             bankData.find((item) => item.value === formData.bankId)?.label ||
//             undefined,
//         };

//         setFormData(updatedFormData);
//         const response = await createBranch(
//           updatedFormData.bankId,
//           updatedFormData
//         );
//         if (response.status == 201) {
//           showToast("success", response.message);
//           showToast("success", "Lender Created Successfully");
//           setFormData({
//             fullName: "",
//             address: "",
//             pin: "",
//             email: "",
//             role: "bankOperator",
//             ifscCode: "",
//             bankId: "",
//             bankBranch: "",
//             bankLocation: "",
//             bankPin: "",
//             mobileNumber: "",
//             bankName: "",
//             bankPersonDesignation: "",
//             createdBy: getId(),
//             bankPersonEId: "",
//           });
//           setSections([
//             { key: "bankName", title: "Select Bank", status: "Pending" },
//             { key: "bankBranch", title: "Select Branch", status: "Pending" },
//             {
//               key: "bankPerson",
//               title: "Key Person Details",
//               status: "Pending",
//             },
//           ]);
//           setLoading(false);
//           router.push("/bank/lender");
//         } else {
//           showToast("error", response.message);
//           showToast("error", "Lender Creation Failed");
//           setLoading(false);
//         }
//       } catch (error) {
//         setLoading(false);
//         console.log(error);
//       }

//       console.log("Form submitted successfully", formData);
//     } else {
//       alert("Please complete all sections before submitting.");
//     }
//   };

//   return (
//     <div>
//       <PageHeader
//         collapsed={collapsed}
//         title="Create Lender"
//         subTitle="(bank/nbfc)"
//         addNewSubUser
//         setFormData={setFormData}
//       />
//       <div className="container mx-auto max-w-3xl">
//         {sections?.map((section, index) => (
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
//               onInputChange={(fieldKey, value) =>
//                 handleInputChange(section.key, fieldKey, value)
//               }
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
//     </div>
//   );
// };

// export default CreateLender;




"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "../Header/PageHeader";
import SectionItem from "../ui/SectionItem";
import CommonFields from "../form/CommonFields";
import { Button } from "antd";
import { createBranch, getBanks } from "@/lib";
import { getId } from "@/lib/commonFunctions";
import { showToast } from "@/utils/toastUtils";
import { useRouter } from "next/navigation";

const CreateLender = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    pin: "",
    email: "",
    role: "bankOperator",
    ifscCode: "",
    bankId: "",
    bankBranch: "",
    bankLocation: "",
    bankPin: "",
    mobileNumber: "",
    bankName: "",
    bankPersonDesignation: "",
    createdBy: getId(),
    bankPersonEId: "",
  });

  const validationRules = {
    fullName: (val) => val.trim() !== "" || "Name is required",
    address: (val) => val.trim() !== "" || "Address is required",
    pin: (val) => /^\d{6}$/.test(val) || "Pin must be a 6-digit number",
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || "Enter a valid email",
    bankPersonDesignation: (val) => val.trim() !== "" || "Designation is required",
    bankPersonEId: (val) => val.trim() !== "" || "Employee ID is required",
    ifscCode: (val) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(val) || "Invalid IFSC code",
    bankBranch: (val) => val.trim() !== "" || "Branch name is required",
    bankLocation: (val) => val.trim() !== "" || "Location is required",
    bankPin: (val) => /^\d{6}$/.test(val) || "Bank pin must be 6 digits",
    mobileNumber: (val) => /^[6-9]\d{9}$/.test(val) || "Valid 10-digit mobile number required",
    bankId: (val) => !!val || "Bank selection is required",
  };

  const validateField = (key, value) => {
    if (validationRules[key]) {
      const result = validationRules[key](value);
      setErrors((prev) => ({
        ...prev,
        [key]: result === true ? null : result,
      }));
      return result === true;
    }
    return true;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    Object.entries(validationRules).forEach(([key, validate]) => {
      const value = formData[key];
      const result = validate(value);
      if (result !== true) {
        newErrors[key] = result;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    getAllBanks();
  }, []);

  const getAllBanks = async () => {
    try {
      setLoading(true);
      const response = await getBanks();
      if (response.status === 200) {
        const newData = response.data.data.map((item) => ({
          value: item._id,
          label: item.bankName,
        }));
        showToast("success", response.message);
        setBankData(newData);
      } else {
        showToast("error", response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [sections, setSections] = useState([
    { key: "bankName", title: "Select Bank", status: "Pending" },
    { key: "bankBranch", title: "Select Branch", status: "Pending" },
    { key: "bankPerson", title: "Branch Person Details", status: "Pending" },
  ]);

  const inputFields = {
    bankPerson: [
      { key: "fullName", label: "Name", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "pin", label: "Pin Code", type: "text" },
      { key: "email", label: "Email", type: "email" },
      { key: "bankPersonDesignation", label: "Designation", type: "text" },
      { key: "bankPersonEId", label: "Employee ID", type: "text" },
    ],
    bankBranch: [
      { key: "ifscCode", label: "IFSC Code", type: "text" },
      { key: "bankBranch", label: "Branch Name", type: "text" },
      { key: "bankLocation", label: "Location", type: "text" },
      { key: "bankPin", label: "Pin Code", type: "text" },
    ],
    bankName: [
      {
        key: "bankId",
        label: "Select Bank",
        type: "searchSelect",
        options: bankData,
      },
    ],
  };

  const handleInputChange = (sectionKey, fieldKey, value) => {
    const updatedFormData = { ...formData, [fieldKey]: value };
    setFormData(updatedFormData);
    validateField(fieldKey, value);

    const isSectionComplete = inputFields[sectionKey].every((field) =>
      updatedFormData[field.key]?.toString().trim()
    );

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.key === sectionKey
          ? { ...section, status: isSectionComplete ? "Completed" : "Pending" }
          : section
      )
    );
  };

  const isFormComplete =
    sections.every((section) => section.status === "Completed") &&
    formData?.mobileNumber?.trim();

  const handleSubmit = async () => {
    if (!isFormComplete) {
      alert("Please complete all sections before submitting.");
      return;
    }

    const isValid = validateForm();
    if (!isValid) {
      alert("Please correct validation errors before submitting.");
      return;
    }

    try {
      setLoading(true);
      const updatedFormData = {
        ...formData,
        role: "bankOperator",
        createdBy: getId() || undefined,
        bankId: formData.bankId || undefined,
        bankName:
          bankData.find((item) => item.value === formData.bankId)?.label ||
          undefined,
      };

      const response = await createBranch(updatedFormData.bankId, updatedFormData);

      if (response.status === 201) {
        showToast("success", "Lender Created Successfully");
        setFormData({
          fullName: "",
          address: "",
          pin: "",
          email: "",
          role: "bankOperator",
          ifscCode: "",
          bankId: "",
          bankBranch: "",
          bankLocation: "",
          bankPin: "",
          mobileNumber: "",
          bankName: "",
          bankPersonDesignation: "",
          createdBy: getId(),
          bankPersonEId: "",
        });
        setSections([
          { key: "bankName", title: "Select Bank", status: "Pending" },
          { key: "bankBranch", title: "Select Branch", status: "Pending" },
          {
            key: "bankPerson",
            title: "Key Person Details",
            status: "Pending",
          },
        ]);
        router.push("/bank/lender");
      } else {
        showToast("error", response.message || "Lender Creation Failed");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        collapsed={collapsed}
        title="Create Lender"
        subTitle="(bank/nbfc)"
        addNewSubUser
        setFormData={setFormData}
      />
      <div className="container mx-auto max-w-3xl">
        {sections.map((section, index) => (
          <SectionItem
            key={section.key}
            title={section.title}
            status={section.status}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <CommonFields
              formData={formData}
              setFormData={setFormData}
              inputFields={inputFields[section.key]}
              sectionKey={section.key}
              setSections={setSections}
              onInputChange={(fieldKey, value) =>
                handleInputChange(section.key, fieldKey, value)
              }
              errors={errors}
              validateField={validateField}
            />
          </SectionItem>
        ))}
        <div className="flex justify-end">
          <Button
            className={`font-semibold ${
              isFormComplete
                ? "bg-gray-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            } text-white rounded`}
            onClick={handleSubmit}
            disabled={!isFormComplete || loading}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLender;
