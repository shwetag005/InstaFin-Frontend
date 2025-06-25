"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "../Header/PageHeader";
import { bankData } from "@/app/data";
import LoanCard from "../ui/LoanCard";
import { getBanks } from "@/lib";

const BankApplicant = () => {
  //Set page title
  useEffect(() => {
    document.title = "Applications";
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const [isSettingOpen,setIsSettingOpen] = useState('');
  const [settingBank,setSettingBank]=useState(null);
  const [loading, setLoading] = useState(false);
  const [bankData, setBankData] = useState([]);

  const getAllBanks = async () => {
    try {
      setLoading(true);
      const response = await getBanks();
      console.log(response);
      if (response.status == 200) {
        setBankData(response.data.data);
        setLoading(false);
      }else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllBanks();
  },[])
  
  
  console.log(isSettingOpen)

  return (
    <>
        <PageHeader collapsed={collapsed} title="Bank List" showAddClient showFilter />
        <div className="flex-1 flex flex-col items-center">
          <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1">
            {Array.isArray(bankData) && bankData?.length > 0 ?
              bankData?.map((bank, index) => (
                <LoanCard key={bank._id || index} data={bank} isSetting setIsSettingOpen={setIsSettingOpen} isSettingOpen={isSettingOpen} setSettingBank={setSettingBank} />
              )) : <div className="text-center text-2xl font-bold my-4">No Banks found</div>}
          </div>
        </div>
    </>
  );
};

export default BankApplicant;
