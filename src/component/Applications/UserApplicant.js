"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "../Header/PageHeader";
import { userData } from "@/app/data";
import LoanCard from "../ui/LoanCard";
import { getAllUsers } from "@/lib";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { showToast } from "@/utils/toastUtils";
import { getId } from "@/lib/commonFunctions";

const UserApplicant = () => {
  //Set page title
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    document.title = "Applications";
    fetchUserData();
  }, []);
  const [collapsed, setCollapsed] = useState(false);

  const title = true ? "User" : "Loan Applications";

  const fetchUserData = async () => {
    try {
      const response = await getAllUsers(getId());
      console.log(response);
      if (response.status == 200) {
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

  return (
    <>
      <PageHeader
        collapsed={collapsed}
        title={title}
        showAddClient
        showFilter
      />
      <div className="flex-1 flex flex-col items-center">
        <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1">
          {Array.isArray(userData) &&
            userData.map((loan, index) => <LoanCard key={index} data={loan} />)}
        </div>
      </div>
    </>
  );
};

export default UserApplicant;
