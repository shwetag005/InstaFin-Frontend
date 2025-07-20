"use client";

import PageHeader from "@/component/Header/PageHeader";
import Layout from "@/component/Layout/layout";
import React, { useEffect, useState } from "react";
import LoanCard from "@/component/ui/LoanCard";
import { getId, getRole } from "@/lib/commonFunctions";
import {
  createBranch,
  createLoanCriteria,
  getBankById,
  getBanksByUserId,
  getBranchById,
  getBranchs,
  getBranchsByUserId,
} from "@/lib";
import BranchCard from "@/component/ui/BranchCard";
import { Spin } from "antd";

const Lender = () => {
  //Set page title
  useEffect(() => {
    document.title = "Applications";
  }, []);
  const role = getRole();
  const user_id = getId();
  const [collapsed, setCollapsed] = useState(false);
  const [settingBranch, setSettingBranch] = useState(null);
  const [BranchData, setBranchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [BranchBank, setBranchBank] = useState(null);
  const [bankId, setBankId] = useState(null);
  const [branchId, setBranchId] = useState(null);

  useEffect(() => {
    console.log(role);
    if (
      role?.toLowerCase() == "admin" ||
      role?.toLowerCase() == "masteradmin" ||
      role?.toLowerCase() == "bankoperator"
    ) {
      getAllBranchs();
      console.log("Admin");
    }
  }, [role]);
  const getAllBranchs = async () => {
    try {
      console.log(role);
      setLoading(true);
      const response =
        role?.toLowerCase() == "admin" || role?.toLowerCase() == "masteradmin"
          ? await getBanksByUserId(role, user_id)
          : await getBanksByUserId(role, user_id);
      if (response.status == 200) {
        console.log(response.data);
        setBranchData(response.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    console.log(data)
    try {
      console.log(data, BranchData);
      if (
        data.bankId &&
        data.branchId 
        // &&  data.loanCriteriaList.length === BranchData[0]?.criteria?.length
      ) {
        const response = await createLoanCriteria(data);
        console.log(response);
        if (response.status == 201) {
          setBankId(null);
          setBranchId(null);
          // showToast("success", response.message);
          getAllBranchs();
        } else {
          showToast("error", response.message);
        }
        console.log(response);
      } else if (!data.bankId && !data.branchId) {
        setLoading(false);
        console.error("Please fill all the fields");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Layout setSidebarCollapsed={setCollapsed}>
        <PageHeader
          collapsed={collapsed}
          title="Lender"
          subTitle="(Branch/nbfc)"
          showAddLender
          showFilter
        />
        <div className="flex-1 flex flex-col items-center">
          {loading ? (
            <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1">
              <Spin size="large"/>
            </div>
          ) : (
            <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1">
              {Array.isArray(BranchData) && BranchData.length > 0 ? (
                BranchData.map((Branch, index) => (
                  <BranchCard
                    key={index}
                    data={Branch}
                    settingBranch={settingBranch}
                    setSettingBranch={setSettingBranch}
                    setBranchBank={setBranchBank}
                    BranchBank={BranchBank}
                    isSetting
                    bankId={bankId}
                    setBankId={setBankId}
                    branchId={branchId}
                    setBranchId={setBranchId}
                    onSubmit={handleSubmit}
                  />
                ))
              ) : (
                <h1 className="text-center text-2xl font-bold mt-10">
                  No Branch Found
                </h1>
              )}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Lender;

