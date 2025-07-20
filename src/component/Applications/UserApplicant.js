// "use client";

// import React, { useEffect, useState } from "react";
// import PageHeader from "../Header/PageHeader";
// import { userData } from "@/app/data";
// import LoanCard from "../ui/LoanCard";
// import { getAllUsers } from "@/lib";
// import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
// import { showToast } from "@/utils/toastUtils";
// import { getId } from "@/lib/commonFunctions";

// const UserApplicant = () => {
//   //Set page title
//   const [userData, setUserData] = useState([]);
//   useEffect(() => {
//     document.title = " Applications";
//     fetchUserData();
//   }, []);
//   const [collapsed, setCollapsed] = useState(false);

//   const title = true ? "User" : "Loan Applications";
  
//   const fetchUserData = async () => {
//     try {
//       const response = await getAllUsers(getId());
//       console.log(response);
//       if (response.status == 200) {
//         setUserData(response.data);
//         showToast("success", response.message);
//         showToast("success", "Applications Fetched");
//       } else {
//         showToast("error", response.message);
//         console.log(response.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const role = getRole(); // get current user role

//   return (
//     <>
//       <PageHeader
//         collapsed={collapsed}
//         title={title}
//         showAddClient
//         showFilter
//       />
//       <div className="flex-1 flex flex-col items-center">
//         <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1">
//           {Array.isArray(userData) &&
//             userData.map((loan, index) => <LoanCard key={index} data={loan} />)}
//         </div>
//       </div>

//       <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1">
//         {Array.isArray(userData) &&
//           userData.map((loan, index) => (
//             <LoanCard key={index} data={loan} role={role} />
//           ))}
//       </div>
//     </>
//   );
// };

// export default UserApplicant;
import React, { useEffect, useState } from "react";
import PageHeader from "../Header/PageHeader";
import UserCard from "../ui/UserCard"; // Use UserCard instead of LoanCard
import { getAllUsers } from "@/lib";
import { showToast } from "@/utils/toastUtils";
import { getId } from "@/lib/commonFunctions";

const UserApplicant = () => {
  const [userData, setUserData] = useState([]);
  const [role, setRole] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.title = "Applications";

    // Load role safely from localStorage
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.role) {
        console.log("Setting role from localStorage:", user.role);
        setRole(user.role);
      } else {
        console.warn("No role found in localStorage");
      }
    } catch (error) {
      console.warn("Error parsing user from localStorage:", error);
    }

    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await getAllUsers(getId());
      console.log("Fetched user data:", response); // Debug log
      if (response.status === 200) {
        setUserData(response.data);
        showToast("success", response.message);
        showToast("success", "Applications Fetched");
      } else {
        showToast("error", response.message);
        console.log(response.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      showToast("error", "Failed to fetch user data");
    }
  };

  const title = "Users";

  return (
    <>
      <PageHeader collapsed={collapsed} title={title} showAddClient showFilter />
      <div className="flex-1 flex flex-col items-center">
        <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1 gap-4">
          {Array.isArray(userData) && userData.length > 0 ? (
            userData.map((user, index) => {
              console.log("Rendering user:", user); // Debug log
              return (
                <UserCard
                  key={user._id || index}
                  data={{
                    fullName: user.fullName || "",
                    role: user.role || "",
                    rank: user.rank || "0",
                    totalBusiness: user.totalBusiness || "0",
                    mobileNumber: user.mobileNumber || "",
                    email: user.email || "",
                    address: user.address || "",
                    applicationCount: user.applicationCount || "0"
                  }}
                />
              );
            })
          ) : (
            <div className="text-center text-gray-500 p-8">
              <h2 className="text-xl font-semibold mb-2">No Users Found</h2>
              <p>There are no users to display at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserApplicant;