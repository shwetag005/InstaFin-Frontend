import React, { useEffect, useState } from "react";
import PageHeader from "../Header/PageHeader";
import LoanCard from "../ui/LoanCard";
import { getAllUsers } from "@/lib";
import { showToast } from "@/utils/toastUtils";
import { getId } from "@/lib/commonFunctions";

const UserApplicant = () => {
  const [userData, setUserData] = useState([]);
  const [role, setRole] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.title = "Applications";

    // ✅ Load role safely from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      console.log("Setting role from localStorage:", user.role);
      setRole(user.role);
    } else {
      console.warn("No role found in localStorage");
    }

    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await getAllUsers(getId());
      if (response.status === 200) {
        setUserData(response.data);
        showToast("success", response.message);
        showToast("success", "Applications Fetched");
      } else {
        showToast("error", response.message);
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const title = "User";

  return (
    <>
      <PageHeader collapsed={collapsed} title={title} showAddClient showFilter />
      <div className="flex-1 flex flex-col items-center">
        <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1">
          {/* ✅ Render LoanCard ONLY when role is available */}
          {role &&
            Array.isArray(userData) &&
            userData.map((loan, index) => (
              <LoanCard key={index} data={loan} role={role} />
            ))}
        </div>
      </div>
    </>
  );
};

export default UserApplicant;
