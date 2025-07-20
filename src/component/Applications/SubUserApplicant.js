"use client";

import React, { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import PageHeader from "../Header/PageHeader";
import UserCard from "../ui/UserCard";

// const SubUserApplicant = ({data, role}) => {
//   //Set page title
//   useEffect(() => {
//     document.title =["admin","masterAdmin"].includes(role)?"Applications" : "Applications";
//   }, []);
//   const [collapsed, setCollapsed] = useState(false);
//   const subUserData = [
//     {
//       name: "vijay prasad",
//       email: "vijayprasadmotitalparab",
//       mobile: "3564 B",
//       status: "active",
//     },
//   ]
//   console.log(role,data);
//   return (
//     <>
//       <PageHeader
//         collapsed={collapsed}
//         title={["admin","masterAdmin"].includes(role)?"User" : "My Sub User"}
//         showFilter
//         showAddSubUser
//       />
//       <div className="flex-1 flex flex-col items-center">
//         <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1 border-2 border-red-800">
//           {Array.isArray(data) &&
//             data?.map((user, index) => (
//               <UserCard key={index} data={user} />
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };

const SubUserApplicant = ({ data, role }) => {
  useEffect(() => {
    document.title = ["admin", "masterAdmin"].includes(role) ? "Applications" : "Applications";
  }, [role]);

  const [collapsed, setCollapsed] = useState(false);

  console.log("SubUserApplicant data:", data);

  return (
    <>
      <PageHeader
        collapsed={collapsed}
        title={["admin", "masterAdmin"].includes(role) ? "User" : "My Sub User"}
        showFilter
        showAddSubUser
      />
      <div className="flex-1 flex flex-col items-center">
        <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1 border-2 border-red-800">
          {/* {Array.isArray(data) && data.length > 0 ? (
          data.map((application, index) => {
            const userInfo = application.userId || {};
            const applicantInfo = application.personalInfo || {}; */}
          {Array.isArray(data) && data.length > 0 ? (
          data.map((user, index) => {
            return (
              <UserCard
                key={index}
                data={{
                  fullName: user.fullName || "",
                  role: user.role || "",
                  rank: user.rank || "0",
                  totalBusiness: user.totalBusiness || "0", 
                }}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}

        </div>
      </div>
    </>
  );
};

export default SubUserApplicant;
