// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import Layout from "@/component/Layout/layout";
// import LoanApplications from "@/component/Applications/LoanApplications";
// import UserApplicant from "@/component/Applications/UserApplicant";
// import BankApplicant from "@/component/Applications/BankApplicant";
// import { useRouter } from "next/navigation";
// import useGetQueryParam from "@/component/utils/commonFunctions";
// import SubUserApplicant from "@/component/Applications/SubUserApplicant";
// import { getId, getRole } from "@/lib/commonFunctions";
// import { getAllUsers } from "@/lib";
// import { showToast } from "@/utils/toastUtils";

// const Users = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const router = useRouter();
//   console.log(router);
//   const type = useGetQueryParam("type");
//   const role = getRole();
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     console.log("Type parameter:", type);
//     fetchUserData()
//   }, [type]);
//     const fetchUserData = async () => {
//       try {
//         const response = await getAllUsers(getId());
//         console.log(response);
//         if (response.status == 200) {
//           setUserData(response.data);
//           showToast("success", response.message);
//           showToast("success", "Applications Fetched");
//         } else {
//           showToast("error", response.message);
//           console.log(response.message);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     console.log(role)
//     const userList=useMemo(()=>{
//         if(["masterAdmin", "admin", "agent"].includes(role)){
//             console.log(userData)
//             return <SubUserApplicant data={userData} role={role} />
//         }else if(["agent", "subAgent"].includes(role)){
//             return <LoanApplications />
//         }else if(["masterAdmin", "admin"].includes(role)){
//             return <UserApplicant />
//         }else if(["masterAdmin", "admin", "bankOperator"].includes(role)){
//             return <BankApplicant />
//         }
//     },[role, userData])
//   return (
//     <Layout setSidebarCollapsed={setCollapsed}>
//       {userList}
//     </Layout>
//   );
// };

// export default Users;

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/component/Layout/layout";
import LoanApplications from "@/component/Applications/LoanApplications";
import UserApplicant from "@/component/Applications/UserApplicant";
import BankApplicant from "@/component/Applications/BankApplicant";
import { useRouter } from "next/navigation";
import useGetQueryParam from "@/component/utils/commonFunctions";
import SubUserApplicant from "@/component/Applications/SubUserApplicant";
import { getId, getRole } from "@/lib/commonFunctions";
import { getAllUsers } from "@/lib";
import { showToast } from "@/utils/toastUtils";

const Users = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const type = useGetQueryParam("type");
  const role = getRole();
  const [userData, setUserData] = useState([]);

  // ✅ Show toast message if it was stored before redirect
  useEffect(() => {
    const message = localStorage.getItem("toastMessage");
    if (message) {
      showToast("success", message);
      localStorage.removeItem("toastMessage");
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [type]);

  const fetchUserData = async () => {
    try {
      const response = await getAllUsers(getId());
      if (response.status === 200) {
        setUserData(response.data);
        console.log("userData in Users component:", userData);
        showToast("success", response.message || "Applications Fetched");
      } else {
        showToast("error", response.message || "Failed to fetch users");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Something went wrong while fetching users.");
    }
  };

  const userList = useMemo(() => {
    if (["masterAdmin", "admin", "agent"].includes(role)) {
      return <SubUserApplicant data={userData} role={role} />;
    } else if (["agent", "subAgent"].includes(role)) {
      return <LoanApplications />;
    } else if (["masterAdmin", "admin"].includes(role)) {
      return <UserApplicant />;
    } else if (["masterAdmin", "admin", "bankOperator"].includes(role)) {
      return <BankApplicant />;
    }
    return null;
  }, [role, userData]);

  return (
    <Layout setSidebarCollapsed={setCollapsed}>
      {userList}
    </Layout>
  );
};

export default Users;


const borrowingsData = [
  {
    type: "Home Loan",
    bank: "AXIS BANK",
    accountNumber: "100100101028390",
    amount: "₹ 26,24,835",
    emiLeft: "56 EMI Left",
  },
  {
    type: "Car Loan",
    bank: "HDFC BANK",
    accountNumber: "100100103792390",
    amount: "₹ 7,46,462",
    emiLeft: "16 EMI Left",
  },
  {
    type: "Personal Loan",
    bank: "AXIS BANK",
    accountNumber: "100100101028390",
    amount: "₹ 2,03,000",
    emiLeft: "28 EMI Left",
  },
  {
    type: "Personal Loan",
    bank: "IDBI BANK",
    accountNumber: "100100101028390",
    amount: "₹ 46,493",
    emiLeft: "12 EMI Left",
  },
  {
    type: "Credit Card",
    bank: "HDFC BANK",
    accountNumber: "837702774002",
    amount: "₹ 20,304",
  },
];

const LoanCard = ({ children }) => {
  return (
    <div
      className="loan-card flex justify-between bg-white rounded-md p-4 mb-6 shadow-inner border border-gray-300 shadow-lg shadow-gray-300 hover:shadow-xl transition duration-300"
      style={{ boxShadow: "inset 0 4px 8px rgb(223 193 194)" }}
    >
      {children}
    </div>
  );
};

const renderTotalBorrowings = () => (
  <>
    <div className="flex justify-center flex-col">
      <p className="text-lg font-bold text-gray-800">Total</p>
      <h2 className="text-sm font-semibold text-gray-600">Borrowings</h2>
      <span className="text-sm font-semibold text-gray-400">
        As on 03/09/2024
      </span>
      <div className="w-full mt-2 rounded border-2 border-red-500"></div>
    </div>
    <div className="flex justify-center flex-col">
      <p
        className="text-2xl font-bold text-gray-900"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}
      >
        ₹ 37,61,862
      </p>
      <span className="text-sm font-semibold text-center text-gray-500">
        7 Accounts
      </span>
    </div>
  </>
);

const renderLoanDetails = (loan) => (
  <>
    <div className="flex justify-center flex-col">
      <h3 className="text-lg font-bold text-gray-800">{loan.type}</h3>
      <p className="text-sm font-semibold text-gray-600">{loan.bank}</p>
      <p className="text-sm font-semibold text-gray-400">
        {loan.accountNumber}
      </p>
    </div>
    <div className="flex justify-center flex-col">
      <p className="text-2xl font-bold text-gray-900">{loan.amount}</p>
      {loan.emiLeft && (
        <span className="text-sm font-semibold text-center text-gray-500">
          {loan.emiLeft}
        </span>
      )}
    </div>
  </>
);
