// import { useEffect, useState } from "react";
// import BankBranchForm from "../form/BankBranchForm";
// import BankSettingForm from "../form/BankSettingForm";
// import ApplicantName from "./ApplicantName";
// import CibilScore from "./CibilScore";
// import LoanAmount from "./LoanAmount";
// import LoanDetails from "./LoanDetails";
// import SkeletonLoader from "./SkeletonLoader";

// const LoanCard = ({
//   data,
//   setIsSettingOpen,
//   isSettingOpen,
//   setSettingBranch,
//   settingBranch,
//   isSetting = false,
//   showBranch = false,
//   setIsBranchOpen,
//   isBranchOpen,
//   BranchBank,
//   setBranchBank,
//   bankId,
//   branchId,
//   setBankId,
//   setBranchId,
//   onClick=()=>{},
// }) => {
//   const [newData,setNewData]=useState(data);

//     useEffect(() => {
//       if(newData?.personalInfo){
//         let updatedData=[]
//          updatedData["loanType"]=newData?.loanDetails?.loanType
//          updatedData["amount"]=newData?.loanDetails?.loanAmount
//          updatedData["status"]=newData?.status
//          updatedData["applicantName"]=newData?.personalInfo?.applicantName
//          updatedData["cibilScore"]=newData?.creditScore
//          setNewData(updatedData)
//       }else{
//         setNewData(data)
//       }
//     },[data])

//     //     {
// //     "creditReport": [],
// //     "status": "Pending",
// //     "_id": "684865416b3d151a10abd868",
// //     "userId": "683ee74cb9bf1a3fdcde705f",
// //     "createdBy": "683ee74cb9bf1a3fdcde705f",
// //     "personalInfo": {
// //         "applicantName": "Prathmesh Patil",
// //         "applicantDob": "2000-08-18T00:00:00.000Z",
// //         "applicantGender": "Male",
// //         "applicantNationality": "India",
// //         "applicantMobile": "9526808213",
// //         "applicantEmail": "prathmpatil2818@gmail.com",
// //         "applicantAddress": "At. Kapileshwar Tal. Radhanagari Dist. Kolhapur",
// //         "applicantPin": "416208",
// //         "pan": "EXKP7847854"
// //     },
// //     "familyInfo": {
// //         "maritalStatus": "Single",
// //         "fatherName": "pandurang",
// //         "motherName": "padma"
// //     },
// //     "employmentInfo": {
// //         "incomeSource": "bussiness",
// //         "employerOrBusinessName": "Swami infotech",
// //         "employerAddress": "At. Kapileshwar Tal. Radhanagari Dist. Kolhapur",
// //         "workEmail": "prathmesh@swamiinfotech.com"
// //     },
// //     "loanDetails": {
// //         "loanAmount": 40000,
// //         "emiAmount": 9999,
// //         "loanType": "Personal Loan"
// //     },
// //     "propertyInvestment": {},
// //     "creditScore": 650,
// //     "references": [],
// //     "criteriaValues": [],
// //     "documents": [],
// //     "applicationDate": "2025-06-10T17:02:57.596Z",
// //     "createdAt": "2025-06-10T17:02:57.596Z",
// //     "updatedAt": "2025-06-10T17:02:57.673Z",
// //     "__v": 0
// // }


//   return (
//     <div className="flex flex-col items-center justify-center p-2 gap-2 cursor-pointer" onClick={onClick}>
//       {newData ? (
//         <div className="border border-gray-300 rounded-lg p-2 px-4 flex flex-col sm:flex-row justify-between items-center shadow-md w-full max-w-3xl">
//           {/* add edit icon for rouute to edit bank name */}
          
//           <div className="flex flex-col w-full sm:w-4/5">
//             {newData.loanType && newData.status && (
//               <LoanDetails loanType={newData.loanType} status={newData.status} />
//             )}
//             {newData.bankType && <LoanDetails loanType={newData.bankType}  />}
//             {newData.bankName && <ApplicantName fullName={newData.bankName} branchCount={newData?.branchCount.toString()} />}
//             {newData.applicantName && (
//               <ApplicantName fullName={newData.applicantName} />
//             )}

//             {isSetting && (
//               <p
//                 className="text-xs font-medium cursor-pointer"
//                 onClick={() => {
//                   branchId === newData._id
//                     ? (setBankId(null), setBranchId(null))
//                     : (setBankId(newData.bankId), setBranchId(newData._id));
//                 }}
//               >
//                 Setting
//               </p>
//             )}
//             {showBranch && (
//               <p
//                 className="text-xs font-medium cursor-pointer"
//                 onClick={() => {
//                   bankId === newData._id
//                     ? (setBankId(null), setBranchId(null))
//                     : (setBankId(newData._id), setBranchId(null));
//                 }}
//               >
//                 Branch
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col items-center w-full sm:w-3/4 mt-4 sm:mt-0">
//             {newData.cibilScore && (
//               <>
//                 <span className="text-gray-500 text-sm">CIBIL Score</span>
//                 <CibilScore score={newData.cibilScore} />
//                 <div className="flex justify-center mt-1">
//                   <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
//                   <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                 </div>
//               </>
//             )}
//             {newData?.applications && (
//               <>
//                 <span className="text-gray-500 text-sm">Applications</span>
//                 <CibilScore score={newData?.applications} />
//               </>
//             )}
//           </div>

//           <div className="flex flex-col items-center w-full sm:w-3/4 mt-4 sm:mt-0">
//             {newData.amount && (
//               <>
//                 <span className="text-gray-500 text-sm">Amount</span>
//                 <LoanAmount amount={newData.amount} />
//               </>
//             )}
//           </div>
//         </div>
//       ) : (
//         <SkeletonLoader />
//       )}
//       {branchId === newData?._id && isSetting && (
//         <BankSettingForm branchId={branchId} bankId={bankId} />
//       )}
//       {bankId === newData?._id && showBranch && (
//         <BankBranchForm bankId={bankId} />
//       )}
//     </div>
//   );
// };

// export default LoanCard;


// import { useEffect, useState } from "react";
// import BankBranchForm from "../form/BankBranchForm";
// import BankSettingForm from "../form/BankSettingForm";
// import ApplicantName from "./ApplicantName";
// import CibilScore from "./CibilScore";
// import LoanAmount from "./LoanAmount";
// import LoanDetails from "./LoanDetails";
// import SkeletonLoader from "./SkeletonLoader";
// import CommonModal from "./CommonModal";


// const LoanCard = ({
//   data,
//   role,
//   setIsSettingOpen,
//   isSettingOpen,
//   setSettingBranch,
//   settingBranch,
//   isSetting = false,
//   showBranch = false,
//   setIsBranchOpen,
//   isBranchOpen,
//   BranchBank,
//   setBranchBank,
//   bankId,
//   branchId,
//   setBankId,
//   setBranchId,
//   onClick = () => {},
// }) => {
//   const [newData, setNewData] = useState(data);
//   const [showActionModal, setShowActionModal] = useState(false);

//   useEffect(() => {
//     if (data?.personalInfo) {
//       const updatedData = {
//         loanType: data?.loanDetails?.loanType,
//         amount: data?.loanDetails?.loanAmount,
//         status: data?.status,
//         applicantName: data?.personalInfo?.applicantName,
//         cibilScore: data?.creditScore,
//         _id: data?._id,
//         bankId: data?.bankId,
//         bankType: data?.bankType,
//         bankName: data?.bankName,
//         branchCount: data?.branchCount,
//         applications: data?.applications,
//       };
//       setNewData(updatedData);
//     } else {
//       setNewData(data);
//     }
//   }, [data]);

//   if (!newData) return <SkeletonLoader />;

//   return (
//     <div
//       className="flex flex-col items-center justify-center p-2 gap-2 cursor-pointer"
//       onClick={onClick}
//     >
//       <div className="border border-gray-300 rounded-lg p-2 px-4 flex flex-col sm:flex-row justify-between items-center shadow-md w-full max-w-3xl">
//         {/* Left section */}
//         <div className="flex flex-col w-full sm:w-4/5">
//           {newData.loanType && newData.status && (
//             <LoanDetails loanType={newData.loanType} status={newData.status} />
//           )}

//           {newData.bankType && <LoanDetails loanType={newData.bankType} />}

//           {newData.bankName && (
//             <ApplicantName
//               fullName={newData.bankName}
//               branchCount={newData?.branchCount?.toString()}
//             />
//           )}

//           {newData.applicantName && (
//             <ApplicantName fullName={newData.applicantName} />
//           )}

//           {isSetting && (
//             <p
//               className="text-xs font-medium cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 branchId === newData._id
//                   ? (setBankId(null), setBranchId(null))
//                   : (setBankId(newData.bankId), setBranchId(newData._id));
//               }}
//             >
//               Setting
//             </p>
//           )}

//           {showBranch && (
//             <p
//               className="text-xs font-medium cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 bankId === newData._id
//                   ? (setBankId(null), setBranchId(null))
//                   : (setBankId(newData._id), setBranchId(null));
//               }}
//             >
//               Branch
//             </p>
//           )}
//         </div>

//         {/* Middle section: CIBIL */}
//         <div className="flex flex-col items-center w-full sm:w-3/4 mt-4 sm:mt-0">
//           {newData.cibilScore && (
//             <>
//               <span className="text-gray-500 text-sm">CIBIL Score</span>
//               <CibilScore score={newData.cibilScore} />
//               <div className="flex justify-center mt-1">
//                 <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
//                 <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//               </div>
//             </>
//           )}

//           {newData.applications && (
//             <>
//               <span className="text-gray-500 text-sm">Applications</span>
//               <CibilScore score={newData.applications} />
//             </>
//           )}
//         </div>

//         {/* Right section: Amount */}
//         <div className="flex flex-col items-center w-full sm:w-3/4 mt-4 sm:mt-0">
//           {newData.amount && (
//             <>
//               <span className="text-gray-500 text-sm">Amount</span>
//               <LoanAmount amount={newData.amount} />
//             </>
//           )}

//           {/* ✅ Role-based buttons */}
//           <div className="mt-2">
//             {["admin", "masterAdmin"].includes(role) && (
//               <span className="text-gray-400 text-xs italic">View Only</span>
//             )}

//             {["bankOperator"].includes(role) && (
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowModal(true);
//                 }}
//               >
//                 Action
//               </button>
//             )}

//             {["agent", "subAgent"].includes(role) && (
//               <button
//                 className="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   // You can add save logic here
//                 }}
//               >
//                 Save
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
      

//       {/* Conditional forms below the card */}
//       {branchId === newData?._id && isSetting && (
//         <BankSettingForm branchId={branchId} bankId={bankId} />
//       )}

//       {bankId === newData?._id && showBranch && (
//         <BankBranchForm bankId={bankId} />
//       )}

//       {showActionModal && (
//       <CommonModal
//       open={showModal}
//       handleClose={() => setShowModal(false)}
//       title="Loan Application Details"
//       showFooter={role === "bankOperator"} // show footer only for bank operators
//       onSave={() => {
//         // handle bankOperator action
//         console.log("Action on loan:", newData._id);
//         setShowModal(false);
//       }}
//       onCancel={() => setShowModal(false)}
//       saveText="Action"
//       cancelText="Close"
//     >
//       <div className="p-4 space-y-2">
//         <p><strong>Applicant:</strong> {newData.applicantName}</p>
//         <p><strong>Status:</strong> {newData.status}</p>
//         <p><strong>Loan Type:</strong> {newData.loanType}</p>
//         <p><strong>Amount:</strong> ₹{newData.amount}</p>
//         <p><strong>CIBIL Score:</strong> {newData.cibilScore}</p>

//         {role === "bankOperator" && (
//           <textarea
//             rows={3}
//             className="w-full border rounded p-2 mt-2"
//             placeholder="Add remarks..."
//           />
//         )}

//         {["admin", "masterAdmin"].includes(role) && (
//           <p className="text-gray-500 italic mt-2">View-only mode</p>
//         )}
//       </div>
//     </CommonModal>

//     )}

//     </div>
//   );
// };

// export default LoanCard;  //working ui 
import { useEffect, useState } from "react";
import BankBranchForm from "../form/BankBranchForm";
import BankSettingForm from "../form/BankSettingForm";
import ApplicantName from "./ApplicantName";
import CibilScore from "./CibilScore";
import LoanAmount from "./LoanAmount";
import LoanDetails from "./LoanDetails";
import SkeletonLoader from "./SkeletonLoader";
import UserCard from "./UserCard";

const LoanCard = ({
  data,
  role,
  setIsSettingOpen,
  isSettingOpen,
  setSettingBranch,
  settingBranch,
  isSetting = false,
  showBranch = false,
  setIsBranchOpen,
  isBranchOpen,
  BranchBank,
  setBranchBank,
  bankId,
  branchId,
  setBankId,
  setBranchId,
  onClick = () => {},
}) => {
  const [newData, setNewData] = useState(data);

  useEffect(() => {
    if (data?.personalInfo) {
      const updatedData = {
        loanType: data?.loanDetails?.loanType,
        amount: data?.loanDetails?.loanAmount,
        status: data?.status,
        applicantName: data?.personalInfo?.applicantName,
        cibilScore: data?.creditScore,
        _id: data?._id,
        bankId: data?.bankId,
        bankType: data?.bankType,
        bankName: data?.bankName,
        branchCount: data?.branchCount,
        applications: data?.applications,
      };
      setNewData(updatedData);
    } else {
      setNewData(data);
    }
  }, [data]);

  if (!newData) return <SkeletonLoader />;

  return (
    <div
      className="flex flex-col items-center justify-center p-2 gap-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="border border-gray-300 rounded-lg p-2 px-4 flex flex-col sm:flex-row justify-between items-center shadow-md w-full max-w-3xl">
        {/* Left section */}
        <div className="flex flex-col w-full sm:w-4/5">
          {newData.loanType && newData.status && (
            <LoanDetails loanType={newData.loanType} status={newData.status} />
          )}

          {newData.bankType && <LoanDetails loanType={newData.bankType} />}

          {newData.bankName && (
            <ApplicantName
              fullName={newData.bankName}
              branchCount={newData?.branchCount?.toString()}
            />
          )}

          {newData.applicantName && (
            <ApplicantName fullName={newData.applicantName} />
          )}

          {isSetting && (
            <p
              className="text-xs font-medium cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                branchId === newData._id
                  ? (setBankId(null), setBranchId(null))
                  : (setBankId(newData.bankId), setBranchId(newData._id));
              }}
            >
              Setting
            </p>
          )}

          {showBranch && (
            <p
              className="text-xs font-medium cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                bankId === newData._id
                  ? (setBankId(null), setBranchId(null))
                  : (setBankId(newData._id), setBranchId(null));
              }}
            >
              Branch
            </p>
          )}
        </div>

        {/* Middle section: CIBIL */}
        <div className="flex flex-col items-center w-full sm:w-3/4 mt-4 sm:mt-0">
          {newData.cibilScore && (
            <>
              <span className="text-gray-500 text-sm">CIBIL Score</span>
              <CibilScore score={newData.cibilScore} />
              <div className="flex justify-center mt-1">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </>
          )}

          {newData.applications && (
            <>
              <span className="text-gray-500 text-sm">Applications</span>
              <CibilScore score={newData.applications} />
            </>
          )}
        </div>

        {/* Right section: Amount */}
        <div className="flex flex-col items-center w-full sm:w-3/4 mt-4 sm:mt-0">
          {newData.amount && (
            <>
              <span className="text-gray-500 text-sm">Amount</span>
              <LoanAmount amount={newData.amount} />
            </>
          )}
          
        </div>
      </div>

      {/* Conditional forms (settings, branches) */}
      {branchId === newData?._id && isSetting && (
        <BankSettingForm branchId={branchId} bankId={bankId} />
      )}
      {bankId === newData?._id && showBranch && (
        <BankBranchForm bankId={bankId} />
      )}
    </div>
  );
};

export default LoanCard;
