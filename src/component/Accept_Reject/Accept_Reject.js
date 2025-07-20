// "use client";

// import React, { useEffect, useState } from "react";
// import PageHeader from "../Header/PageHeader";
// import SectionItem from "../ui/SectionItem";
// import CommonFields from "../form/CommonFields";
// import CustomButton from "../form/CustomButton";
// import TextArea from "../form/TextArea";
// import DynamicInput from "../form/DynamicInput";

// const Accept_Reject = ({ isBank = false }) => {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [formData, setFormData] = useState({});

//   const sections = [
//     { key: "investments", title: "Investments" },
//     { key: "creditScore", title: "Credit Score" },
//   ];

//   const inputFields = {
//     investments: [
//       {
//         key: "investmentType",
//         label: "Investment Type",
//         type: "select",
//         options: [
//           "Stocks",
//           "Bonds",
//           "Mutual Funds",
//           "Fixed Deposits",
//           "Real Estate",
//           "Public Provident Fund (PPF)",
//           "Cryptocurrencies",
//           "Other",
//         ],
//       },
//       {
//         key: "investmentAmount",
//         label: "Current Investment Amount",
//         type: "number",
//       },
//     ],
//     creditScore: [
//       { key: "creditScore", label: "Credit Score", type: "number" },
//       {
//         key: "creditScoreUpload",
//         label: "Upload Credit Score Document",
//         type: "file",
//       },
//     ],
//   };
//   const [collapsed, setCollapsed] = useState(false);
//   const [isAccepted, setIsAccepted] = useState(false);
  

//     const handleSubmit = () => {
//       if (true) {
//          setFormData((prev) => ({
//            ...prev,
//            "isAccepted": isAccepted
//          }));
//         console.log("Form submitted successfully", formData);
//       } else {
//         alert("Please complete all sections before submitting.");
//       }
//     };
//   return (
//     <>
//       <PageHeader
//         collapsed={collapsed}
//         title="VIJAYPRASAD MOTILAL PARAB"
//         text="AAAA 1234 A"
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
//             {" "}
//             {console.log(section, inputFields[section.key])}
//             <CommonFields
//               formData={formData}
//               setFormData={setFormData}
//               inputFields={inputFields[section.key]}
//             />
//           </SectionItem>
//         ))}
//         {isBank && (
//           <>
//             <div className="flex justify-evenly">
//               <CustomButton
//                 width="w-80"
//                 color="bg-gray-300"
//                 title={"ACCEPT"}
//                 onClick={() => setIsAccepted(true)}
//               />
//               <CustomButton
//                 width="w-80"
//                 color="bg-red-500"
//                 title={"REJECTED"}
//                 onClick={() => setIsAccepted(false)}
//               />
//             </div>
//             {isAccepted ? (
//               <>
//                 <div className="flex justify-evenly">
//                   <DynamicInput
//                     title="Approved Amount"
//                     subTitle="Amount subject to approval from credit manager"
//                     spanValue="&#8377;"
//                     handleChange={(e) => {
//                       setFormData((prev) => ({
//                         ...prev,
//                         approvedAmount: e.target.value,
//                       }));
//                     }}
//                   />
//                   <DynamicInput
//                     title="Interest Rate"
//                     position="end"
//                     spanValue="%"
//                     handleChange={(e) => {
//                       setFormData((prev) => ({
//                         ...prev,
//                         interestRate: e.target.value,
//                       }));
//                     }}
//                   />
//                 </div>
//                 <div className="flex justify-center">
//                   <CustomButton
//                     width="w-80"
//                     color="bg-gray-800"
//                     title={"Submit"}
//                     onClick={handleSubmit}
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <TextArea
//                   label="Reason for Rejection"
//                   className="mt-4"
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       rejectionReason: e.target.value,
//                     }));
//                   }}
//                 />
//                 <div className="flex justify-center">
//                   <CustomButton
//                     width="w-80"
//                     color="bg-green-500"
//                     title={"REWOKE"}
                    
//                     onClick={handleSubmit}
//                   />
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Accept_Reject;


// "use client";

// import React, { useState } from "react";
// import PageHeader from "../Header/PageHeader";
// import CustomButton from "../form/CustomButton";
// import TextArea from "../form/TextArea";
// import DynamicInput from "../form/DynamicInput";

// const Accept_Reject = ({ isBank = false, applicantName = "", pan = "" }) => {
//   const [formData, setFormData] = useState({});
//   const [collapsed, setCollapsed] = useState(false);
//   const [isAccepted, setIsAccepted] = useState(false);

//   // const handleSubmit = () => {
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     isAccepted: isAccepted,
//   //   }));
//   //   console.log("Form submitted successfully", formData);
   
//   // };

//   const handleSubmit = async () => {
//   const payload = {
//     ...formData,
//     isAccepted,
//   };

//   console.log("Submitting to API:", payload);

//   try {
//     const response = await fetch("/api/loan/decision", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     const result = await response.json();

//     if (!response.ok) throw new Error(result.message || "Something went wrong");

//     alert("Loan decision submitted successfully");
//     // Optionally: navigate away or close modal
//   } catch (error) {
//     console.error("API submission failed", error);
//     alert("Submission failed: " + error.message);
//   }
// };


//   return (
//     <>
//       <PageHeader
//         collapsed={collapsed}
//         title={applicantName}
//         text={pan}
//       />

//       <div className="container mx-auto max-w-3xl">
//         {isBank && (
//           <>
//             <div className="flex justify-evenly mb-6">
//               <CustomButton
//                 width="w-80"
//                 color="bg-gray-300"
//                 title={"ACCEPT"}
//                 onClick={() => setIsAccepted(true)}
//               />
//               <CustomButton
//                 width="w-80"
//                 color="bg-red-500"
//                 title={"REJECTED"}
//                 onClick={() => setIsAccepted(false)}
//               />
//             </div>

//             {isAccepted ? (
//               <>
//                 <div className="flex justify-evenly mb-6">
//                   <DynamicInput
//                     title="Approved Amount"
//                     subTitle="Amount subject to approval from credit manager"
//                     spanValue="₹"
//                     handleChange={(e) => {
//                       setFormData((prev) => ({
//                         ...prev,
//                         approvedAmount: e.target.value,
//                       }));
//                     }}
//                   />
//                   <DynamicInput
//                     title="Interest Rate"
//                     position="end"
//                     spanValue="%"
//                     handleChange={(e) => {
//                       setFormData((prev) => ({
//                         ...prev,
//                         interestRate: e.target.value,
//                       }));
//                     }}
//                   />
//                 </div>
//                 <div className="flex justify-center">
//                   <CustomButton
//                     width="w-80"
//                     color="bg-gray-800"
//                     title={"Submit"}
//                     onClick={handleSubmit}
//                    />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <TextArea
//                   label="Reason for Rejection"
//                   className="mt-4"
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       rejectionReason: e.target.value,
//                     }));
//                   }}
//                 />
//                 <div className="flex justify-center mt-4">
//                   <CustomButton
//                     width="w-80"
//                     color="bg-green-500"
//                     title={"REWOKE"}
//                     onClick={handleSubmit}
//                   />
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Accept_Reject;



// Accept_Reject.js
"use client";
import React, { useState } from "react";
import PageHeader from "../Header/PageHeader";
import CustomButton from "../form/CustomButton";
import TextArea from "../form/TextArea";
import DynamicInput from "../form/DynamicInput";
import { submitLoanDecision } from "@/lib"; 

const Accept_Reject = ({
  isBank = false,
  applicantName = "",
  pan = "",
  applicationId = "",     // Ensure this is passed from parent
  onClose = () => {},     // Close modal callback
  onSubmitted = () => {}, // Callback after successful submission
}) => {
  const [formData, setFormData] = useState({});
  const [isAccepted, setIsAccepted] = useState(true);
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async () => {
    if (!applicationId) return alert("Missing application ID");

    const payload = {
      applicationId,
      isAccepted,
      ...formData,
    };

    try {
      setLoading(true);
      const res = await submitLoanDecision(applicationId, payload);
      alert("Decision submitted successfully");
      onSubmitted();
      onClose();
    } catch (err) {
      console.error("Submit failed:", err.message);
      alert("Submission failed: " + (err?.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader collapsed={false} title={applicantName} text={pan} />
      <div className="container mx-auto max-w-3xl">
        {isBank && (
          <>
            <div className="flex justify-evenly mb-6">
              <CustomButton
                width="w-80"
                color={isAccepted ? "bg-green-500" : "bg-gray-300"}
                title="ACCEPT"
                onClick={() => setIsAccepted(true)}
              />
              <CustomButton
                width="w-80"
                color={!isAccepted ? "bg-red-500" : "bg-gray-300"}
                title="REJECT"
                onClick={() => setIsAccepted(false)}
              />
            </div>

            {isAccepted ? (
              <>
                <div className="flex justify-evenly mb-6">
                  <DynamicInput
                    title="Approved Amount"
                    spanValue="₹"
                    handleChange={(e) =>
                      setFormData(prev => ({ ...prev, approvedAmount: e.target.value }))
                    }
                  />
                  <DynamicInput
                    title="Interest Rate"
                    spanValue="%"
                    position="end"
                    handleChange={(e) =>
                      setFormData(prev => ({ ...prev, interestRate: e.target.value }))
                    }
                  />
                </div>
                <div className="flex justify-center">
                  <CustomButton
                    width="w-80"
                    color="bg-gray-800"
                    title={loading ? "Submitting..." : "Submit"}
                    onClick={handleSubmit}
                    disabled={loading}
                  />
                </div>
              </>
            ) : (
              <>
                <TextArea
                  label="Reason for Rejection"
                  className="mt-4"
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, rejectionReason: e.target.value }))
                  }
                />
                <div className="flex justify-center mt-4">
                  <CustomButton
                    width="w-80"
                    color="bg-red-600"
                    title={loading ? "Submitting..." : "SUBMIT"}
                    onClick={handleSubmit}
                    disabled={loading}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Accept_Reject;
