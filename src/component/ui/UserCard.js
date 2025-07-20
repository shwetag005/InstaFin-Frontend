// "use client";
// import { useState, useEffect } from "react";
// import UserContact from "./UserContact";
// import UserRank from "./UserRank";
// import ApplicantName from "./ApplicantName";
// import LoanAmount from "./LoanAmount";
// import UserRole from "./UserRole";

// const UserCard = ({ data }) => {
//   const [loading, setLoading] = useState(true);
  
//   // useEffect(() => {
//   //   setTimeout(() => setLoading(false), 1000);
//   // }, []);
//   useEffect(() => {
//   console.log("UserCard data:", data);  // See what’s coming in
//   setTimeout(() => setLoading(false), 1000);
// }, [data]);

//   if (loading) {
//     return (
//       <div className="animate-pulse p-4 border rounded-lg shadow-md bg-white w-full flex justify-between">
//         <div className="h-5 w-40 bg-gray-300 rounded"></div>
//         <div className="h-5 w-20 bg-gray-300 rounded"></div>
//         <div className="h-5 w-24 bg-gray-300 rounded"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center p-2">
//       <div className="border border-gray-300 rounded-lg p-2 px-4 flex flex-col sm:flex-row justify-between items-center shadow-md w-full max-w-3xl">
//         <div className="flex flex-col w-full sm:w-4/5">
//           {/* <UserContact mobileNumber={data.mobileNumber  || ""} role={data.role || ""} /> */}
//           <ApplicantName fullName={data.fullName || ""} />
//         </div>
//         <div className="flex flex-col items-center sm:w-1/4 mt-4 sm:mt-0">
//           <span className="text-gray-500 text-sm">Role</span>
//           <UserRole role={data.role || ""} />
//         </div>
//         <div className="flex flex-col items-center sm:w-1/4 mt-4 sm:mt-0">
//           <span className="text-gray-500 text-sm">Rank</span>
//           <UserRank rank={data.rank || "0"} />
//         </div>
//         <div className="flex flex-col items-center sm:w-1/4 mt-4 sm:mt-0">
//           <span className="text-gray-500 text-sm">Total Business</span>
//           <LoanAmount amount={data.totalBusiness || "00000"} />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default UserCard;


// components/ui/UserCard.js
import React from "react";
import ApplicantName from "./ApplicantName";
import UserRole from "./UserRole";
import UserRank from "./UserRank";
import LoanAmount from "./LoanAmount";

const UserCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="flex justify-center p-2">
      <div className="border border-gray-300 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center shadow-md w-full max-w-3xl">
        <div className="flex flex-col w-full sm:w-4/5">
          <ApplicantName fullName={data.fullName || ""} />
        </div>
        <div className="flex flex-col items-center sm:w-1/4 mt-4 sm:mt-0">
          <span className="text-gray-500 text-sm">Role</span>
          <UserRole role={data.role || ""} />
        </div>
        <div className="flex flex-col items-center sm:w-1/4 mt-4 sm:mt-0">
          <span className="text-gray-500 text-sm">Rank</span>
          <UserRank rank={data.rank || "0"} />
        </div>
        <div className="flex flex-col items-center sm:w-1/4 mt-4 sm:mt-0">
          <span className="text-gray-500 text-sm">Total Business</span>
          <LoanAmount amount={data.totalBusiness || "00000"} />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
