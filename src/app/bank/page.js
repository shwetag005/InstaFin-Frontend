"use client";

import PageHeader from "@/component/Header/PageHeader";
import Layout from "@/component/Layout/layout";
import React, { useEffect, useState } from "react";
import LoanCard from "@/component/ui/LoanCard";
import { getId, getRole } from "@/lib/commonFunctions";
import { getBankById, getBanks, getBanksByUserId } from "@/lib";

const Banks = () => {
  //Set page title
  useEffect(() => {
    document.title = "Applications";
  }, []);
  const role = getRole();
  const user_id = getId();
  const [collapsed, setCollapsed] = useState(false);
  const [bankId, setBankId] = useState(null);
  const [branchId,setBranchId]=useState(null)
  const [settingBranch, setSettingBranch] = useState(null);
  const [bankData, setBankData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      role?.toLowerCase() == "admin" ||
      role?.toLowerCase() == "masteradmin" ||
      role?.toLowerCase() == "bankoperator"
    ) {
      getAllBanks();
    }
  }, [role]);
  const getAllBanks = async () => {
    try {
      setLoading(true);
      const response =
        ( role?.toLowerCase() == "admin" ||
          role?.toLowerCase() == "masteradmin")
          ? await getBanks()
          :  await getBankById(user_id);
      if (response.status == 200) {
        setBankData(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout setSidebarCollapsed={setCollapsed}>
        <PageHeader
          collapsed={collapsed}
          title="Banks"
          // subTitle="(bank/nbfc)"
          // showAddLender
          showFilter
        />
        <div className="flex-1 flex flex-col items-center">
          <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1">
            {Array.isArray(bankData) &&
              bankData.map((bank, index) => (
                <LoanCard
                  key={index}
                  data={bank}
                  showBranch
                  setSettingBranch={setSettingBranch}
                  settingBranch={settingBranch}
                  bankId={bankId}
                  setBankId={setBankId}
                  branchId={branchId}
                  setBranchId={setBranchId}
                />
              ))}
              {role?.toLowerCase() == "bankoperator" && <LoanCard data={bankData} />}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Banks;
