"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "../Header/PageHeader";
import LoanCard from "../ui/LoanCard";
import CommonModal from "../ui/CommonModal";
import SearchableMultiSelectDropdown from "../form/SearchableMultiSelectDropdown";
import { getBanksByUserId, updateLoanApplication, updateLoanBankBranch} from "@/lib";
import { getId, getRole } from "@/lib/commonFunctions";
import Accept_Reject from "@/component/Accept_Reject/Accept_Reject";
import { bankData } from "@/app/data";
import CreateClient from "../CreateUsers/CreateClient";
import { useRouter } from "next/navigation";



const LoanApplications = ({ applications }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [addBankData, setAddBankData] = useState(null);
  const [selectBankDataMap, setSelectBankDataMap] = useState({});
  const [showAcceptRejectModal, setShowAcceptRejectModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const loanApplications = Array.isArray(applications) ? applications : [];

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch (e) {
    user = {};
  }

  const role = user?.role?.toLowerCase() || "";

  const router = useRouter();
  console.log("✅ applications prop received:", applications);
console.log("✅ Parsed array:", loanApplications);
  console.log("✅ User role:", role);

  useEffect(() => {
    document.title = "Applications";
  }, []);

  useEffect(() => {
    if (modalData) fetchBanksAndBranches();
  }, [modalData]);

  const fetchBanksAndBranches = async () => {
    try {
      const { data, status, error } = await getBanksByUserId(getRole(), getId());
      if (error) throw new Error(error);
      if (status === 200) setAddBankData(data);
    } catch (err) {
      console.error("Error fetching banks:", err.message);
    }
  };

  // Transform selected branch IDs into required bankData format for backend
  const transformToBankData = (branchesData, selectedBranchIds, loanType) => {
    if (!branchesData) return null;

    // Filter only selected branches
    const selectedBranches = branchesData.filter(branch =>
      selectedBranchIds.includes(branch._id)
    );
    if (selectedBranches.length === 0) return null;

    // Group branches by bankId
    const bankMap = new Map();

    // selectedBranches.forEach(branch => {
    //   if (!bankMap.has(branch.bankId)) {
    //     bankMap.set(branch.bankId, []);
    //   }
    //   bankMap.get(branch.bankId).push({
    //     branchId: branch._id,
    //     loanTypes: [loanType], // only one loan type per branch
    //   });
    // });

    // Convert Map to array to match API payload
    
    selectedBranches.forEach(branch => {
    const bankId = typeof branch.bankId === "object" ? branch.bankId._id : branch.bankId;

    if (!bankMap.has(bankId)) {
      bankMap.set(bankId, []);
    }

    bankMap.get(bankId).push({
      branchId: branch._id,
      loanTypes: [loanType]
    });
  });
  
    return Array.from(bankMap.entries()).map(([bankId, branches]) => ({
      bankId,
      branches,
    }));
  };

  // const handleSaveSelectedBanks = async () => {
  //   try {
  //     const loanType = modalData?.loanDetails?.loanType;

  //     const data = transformToBankData(
  //       addBankData, // all branches fetched
  //       selectBankDataMap[modalData._id] || [], // selected branch IDs
  //       loanType
  //     );

  //     if (!data) {
  //       console.warn("No valid bank/branch selection to save.");
  //       return;
  //     }

  //     // Update loan application by sending { data: [...] } to backend
  //     await updateLoanApplication(modalData._id, { data });
  //     handleModalClose();
  //   } catch (error) {
  //     console.error("Error updating loan application:", error);
  //   }
  // };

  const handleSaveSelectedBanks = async () => {
  try {
    const loanType = modalData?.loanDetails?.loanType;
    const selectedBranchIdsMap = selectBankDataMap[modalData._id] || {};
    const selectedBranchIds = Object.values(selectedBranchIdsMap).flat();

    const data = transformToBankData(addBankData, selectedBranchIds, loanType);
    console.log("🚀 Sending bankData to backend:", data);

    if (data && Array.isArray(data) && data.length > 0) {
      console.log("🚀 Sending bankData to backend:", data);

      await updateLoanBankBranch(modalData._id, { bankData : data });
      handleModalClose();
    } else {
      console.warn('No valid bank data to update');
      // optionally handle empty selection here, e.g., show a message or just return
    }
  } catch (error) {
    console.error("Error updating loan application:", error);
  }
};

const handleModalClose = () => setModalData(null);

  return (
    <>
      <PageHeader collapsed={collapsed} title="Loan Applications" showFilter />

      <div className="flex-1 flex flex-col items-center">
        <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1 gap-4">
          {loanApplications.length > 0 ? (
            loanApplications.map((loan, index) => (
              <LoanCard
                key={loan._id || index}
                data={loan}
                role={role}
                userInfo={loan}
                onClick={() => setModalData(loan)}
              />
            ))
          ) : (
            <h1 className="text-2xl text-center font-bold text-gray-900">
              No Applications Found
            </h1>
          )}
        </div>
      </div>

      {/* Main Application Modal */}
      {modalData && (
        <CommonModal
          open={Boolean(modalData)}
          onCancel={handleModalClose}
          onSave={
            ["agent", "subagent"].includes(role)
              ? handleSaveSelectedBanks
              : role === "bankoperator"
              ? () => {
                  setSelectedApplication(modalData);
                  setShowActionModal(true);
                }
              : null
          }

          onEdit={
            ["agent", "subagent"].includes(role)
              ? () => {
                  handleModalClose();
                  router.push(`/adduser?user=client&id=${modalData._id}`);
                }
              : null
          }
          editText="Edit"
          
          showFooter={
            ["admin", "masteradmin", "agent", "subagent", "bankoperator"].includes(role)
          }
          showTitle
          title={modalData?.personalInfo?.applicantName || "Loan Application Info"}
          saveText={
            ["agent", "subagent"].includes(role)
              ? "Save"
              : role === "bankoperator"
              ? "Action"
              : null
          }


          cancelText="Cancel"
        >
          <ModalContent
            data={modalData}
            addBankData={addBankData}
            onSelect={(value) =>
              setSelectBankDataMap((prev) => ({
                ...prev,
                [modalData._id]: value,
              }))
            }
            selectedBank={selectBankDataMap[modalData?._id] || []}
          />
        </CommonModal>
      )}

      {/* Accept/Reject Modal */}
      {showActionModal && selectedApplication && (
        <CommonModal
          open={showActionModal}
          handleClose={() => {
            setShowActionModal(false);
            setSelectedApplication(null);
          }}
          title="Take Action"
          showFooter={false}
        >
          <Accept_Reject
            isBank
            applicationId={selectedApplication?._id}
            applicantName={selectedApplication?.personalInfo?.applicantName || ""}
            pan={selectedApplication?.personalInfo?.pan || ""}
            onClose={() => {
              setShowActionModal(false);
              setSelectedApplication(null);
            }}
            onSubmitted={() => {
              console.log("Submitted decision");
            }}
          />
        </CommonModal>
      )}

      {/* {showEditModal && (
        <CreateClient
          open={showEditModal}
          initialData={editData}
          onClose={() => setShowEditModal(false)}
          // ...other props as needed
        />
      )} */}
    </>
  );
};

// const ModalContent = ({ data, addBankData, onSelect, selectedBank }) => {
//   const cleanedData = cleanLoanApplication(data);

//   return (
//     <div className="grid grid-cols-1 gap-4">
//       <div className="flex justify-end">
//         <AddBankUI
//           user={data}
//           banks={addBankData}
//           onSelect={onSelect}
//           selectedBank={selectedBank}
//         />
//       </div>

//       {Object.entries(cleanedData)
//         .filter(
//           ([key]) =>
//             !["_id", "createdBy", "createdAt", "updatedAt", "__v"].includes(key)
//         )
//         .map(([key, value]) =>
//           key === "documents" && Array.isArray(value) ? (
//             <details key={key} className="bg-white rounded-lg p-4">
//               <summary className="font-bold capitalize">{key}</summary>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
//                 {value.map((doc, i) => (
//                   <div
//                     key={i}
//                     className="flex flex-col border rounded p-2 bg-gray-50"
//                   >
//                     <span className="font-medium text-sm">{doc.name}</span>
//                     <a
//                       href={doc.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 underline text-xs"
//                     >
//                       View
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </details>
//           ) : typeof value === "object" && value !== null ? (
//             <details key={key} className="bg-white rounded-lg p-4">
//               <summary className="font-bold capitalize">{key}</summary>
//               <div className="grid grid-cols-1 gap-2 mt-2">
//                 {Object.entries(value).map(([subKey, subValue]) => (
//                   <div key={subKey} className="flex justify-between">
//                     <span className="font-bold">{subKey}</span>
//                     <span>
//                       {typeof subValue === "object"
//                         ? JSON.stringify(subValue)
//                         : String(subValue)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </details>
//           ) : (
//             <div key={key} className="flex justify-between">
//               <span className="font-bold capitalize">{key}</span>
//               <span>{String(value)}</span>
//             </div>
//           )
//         )}
//     </div>
//   );
// };

const ModalContent = ({ data, addBankData, onSelect, selectedBank }) => {
  if (!data) return null;

  return (
    <div className="space-y-6 text-sm text-gray-800">

      {/* Add Bank Section */}
      <div className="flex justify-end">
        <AddBankUI
          user={data}
          banks={addBankData}
          onSelect={onSelect}
          selectedBank={selectedBank}
        />
      </div>

      
      {/* Bank Info */}
      {data.bankData?.length > 0 && (
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Bank Information</h3>
          {data.bankData.map((bank, i) => (
            <div key={i} className="mb-3 border p-2 rounded bg-gray-50">
              <p className="font-semibold text-blue-700">
                {bank.bankId?.bankName || `Bank ${i + 1}`}
              </p>
              {bank.branches?.map((branch, j) => (
                <div key={j} className="pl-4 text-gray-700">
                  <p>
                    • Branch: {branch.branchId?.bankBranch} 
                  </p>
                  <p className="text-xs">
                    Loan Types: {branch.loanTypes?.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {/* Personal Info */}
      <Section title="Personal Information" data={data.personalInfo} />
      <Section title="Family Information" data={data.familyInfo} />
      <Section title="Employment Information" data={data.employmentInfo} />
      <Section title="Loan Details" data={data.loanDetails} />
      <Section title="Property Investment" data={data.propertyInvestment} />


      {/* Uploaded Documents */}
      {data.documents?.length > 0 && (
        <div className="bg-white p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Uploaded Documents</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {data.documents.map((doc, index) => (
              <div key={index} className="border p-2 rounded bg-gray-50">
                <p className="text-sm font-medium">{doc.type.toUpperCase()}</p>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs underline"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Misc Data */}
      {Object.entries(data)
        .filter(
          ([key]) =>
            ![
              "personalInfo",
              "familyInfo",
              "employmentInfo",
              "loanDetails",
              "propertyInvestment",
              "documents",
              "bankData",
              "_id",
              "__v",
              "createdAt",
              "updatedAt",
              "createdBy",
              "userId",
            ].includes(key)
        )
        .map(([key, val]) => (
          <div key={key} className="flex justify-between">
            <span className="font-semibold capitalize">{key}</span>
            <span>{String(val)}</span>
          </div>
        ))}
    </div>
  );
};

// Reusable Section component
// const Section = ({ title, data }) => {
//   if (!data) return null;
//   return (
//     <div className="bg-white p-4 rounded-lg">
//       <h3 className="text-lg font-bold mb-2">{title}</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//         {Object.entries(data).map(([key, value]) => (
//           <div key={key} className="flex justify-between">
//             <span className="capitalize font-medium">{key}</span>
//             <span>{String(value || "-")}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const Section = ({ title, data }) => {
  if (!data) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-4 border-b pb-1">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-gray-600 font-medium capitalize">{formatLabel(key)}</span>
            <span className="text-gray-900">{value || <span className="text-gray-400">—</span>}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Utility to make labels human-readable
const formatLabel = (label) =>
  label
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());



const AddBankUI = ({ user, banks, onSelect, selectedBank }) => {
  const role = getRole()?.toLowerCase();

  // Hide dropdown for these roles
  if (["bankoperator", "admin", "masteradmin"].includes(role)) return null;

  console.log("banks:", banks);

  const eligibleBanks = getEligibleBanks(user, banks);

  // onChange handler groups selected branch IDs by bankId and calls onSelect with map
  const handleSelectChange = (selectedValues) => {
    const map = {};
    selectedValues.forEach((branchId) => {
      const branch = banks.find((b) => b._id === branchId);
      if (!branch) return;
      const bankId = branch.bankId;
      if (!map[bankId]) map[bankId] = [];
      map[bankId].push(branchId);
    });
    onSelect(map);
  };

  // Flatten selectedBank map back to array of branchIds for dropdown values
  const flatSelectedBranchIds = Object.values(selectedBank || {}).flat();

  return (
    <SearchableMultiSelectDropdown
      options={eligibleBanks}
      name="bank"
      label="Bank Branches"
      values={flatSelectedBranchIds}
      onChange={handleSelectChange}
    />
  );
};

const cleanLoanApplication = (application) => {
  const excluded = ["createdBy", "createdAt", "updatedAt", "__v", "applicationDate"];
  return Object.fromEntries(
    Object.entries(application)
      .filter(([key]) => !excluded.includes(key))
      .sort(([a], [b]) => a.localeCompare(b))
  );
};

const getEligibleBanks = (userLoan, banks) => {
  if (!userLoan || !banks || !Array.isArray(banks)) return [];

  const { loanDetails, employmentInfo, creditScore } = userLoan;
  const { loanType, loanAmount } = loanDetails || {};
  const incomeSource = employmentInfo?.incomeSource?.toLowerCase();

  if (!loanType || !incomeSource) return [];

  return banks.reduce((eligibleList, branch) => {
    const matchedCriteria = branch.criteria.find(
      (crit) => crit.loanType === loanType
    );

    if (!matchedCriteria) return eligibleList;

    const incomeCriteria = matchedCriteria.criteria?.[incomeSource];

    if (
      incomeCriteria &&
      incomeCriteria[incomeSource] === true &&
      loanAmount >= incomeCriteria.income &&
      creditScore >= incomeCriteria.creditScore
    ) {
      eligibleList.push({
        value: branch._id,
        label: `${branch.bankName} - ${branch.bankBranch}`, 
        branchId: branch._id,
        bankId: branch.bankId,
        bankName: branch.bankName, 
        bankBranch: branch.bankBranch,
        bankLocation: branch.bankLocation,
        loanType: matchedCriteria.loanType,
        criteriaId: matchedCriteria._id,
        requiredIncome: incomeCriteria.income,
        requiredCreditScore: incomeCriteria.creditScore,
      });
    }
    return eligibleList;
  }, []);
};


export default LoanApplications;
