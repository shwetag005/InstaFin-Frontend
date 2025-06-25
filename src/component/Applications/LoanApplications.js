"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "../Header/PageHeader";
import LoanCard from "../ui/LoanCard";
import DynamicPagination from "../ui/DynamicPagination";
import CommonModal from "../ui/CommonModal";
import SearchableDropdown from "../form/SearchableDropdown";
import { getBanksByUserId, updateLoanApplication, updateLoanCriteria } from "@/lib";
import { getId, getRole } from "@/lib/commonFunctions";
import { set } from "react-hook-form";
import SearchableMultiSelectDropdown from "../form/SearchableMultiSelectDropdown";

const LoanApplications = ({ applications: loanData }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [paginatedData, setPaginatedData] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [addBanksOpen, setAddBanksOpen] = useState(false);
  const [addBankData, setAddBankData] = useState(null);
  const [selectBankData, setSelectBankData] = useState([]);

  const loanApplications = Array.isArray(loanData?.data?.loanApplication)
    ? loanData.data.loanApplication
    : [];

  useEffect(() => {
    document.title = "Applications";
  }, []);

  useEffect(() => {
    if (modalData) fetchBanksAndBranches();
  }, [modalData]);

  const fetchBanksAndBranches = async () => {
    try {
      const { data, status, error } = await getBanksByUserId(
        getRole(),
        getId()
      );
      if (error) throw new Error(error);
      if (status === 200) setAddBankData(data);
    } catch (err) {
      console.error("Error fetching banks:", err.message);
    }
  };

  const handlePageChange = (startIndex, endIndex) => {
    setPaginatedData(loanApplications.slice(startIndex, endIndex));
  };

  const handleModalClose = () => setModalData(null);
  const handleAddBankClose = () => setAddBanksOpen(false);
  // selectBank

  useEffect(() => {
    try {
      console.log(selectBankData, addBankData);
      const  transformToBankData=(branchesData, selectedIds)=> {
        if(!branchesData) return null;
        const selectedBranches = branchesData.filter((branch) =>
          selectedIds.includes(branch._id)
        );
        if (selectedBranches.length === 0) return null;

        return {
          bankId: selectedBranches[0].bankId,
          branches: selectedBranches.map((branch) => ({
            branchId: branch._id
          })),
        };
      }
      if(selectBankData.length > 0){
        updateLoanData(transformToBankData(addBankData, selectBankData));
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectBankData]);

  const updateLoanData = async (data) => {
  try {
    console.log(data, modalData);
    const payload = [data]; // Assuming backend expects array of data
    const responce = await updateLoanApplication(modalData._id, { data: payload });
    console.log(responce);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <PageHeader collapsed={collapsed} title="Loan Applications" showFilter />
      <div className="flex-1 flex flex-col items-center">
        <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1 gap-4">
          {paginatedData.length > 0 ? (
            paginatedData.map((loan) => (
              <LoanCard
                key={loan.id}
                data={loan}
                onClick={() => setModalData(loan)}
              />
            ))
          ) : (
            <h1 className="text-2xl text-center font-bold text-gray-900">
              No Applications Found
            </h1>
          )}
          {loanApplications.length > 0 && (
            <DynamicPagination
              data={loanApplications}
              currentPageNumber={handlePageChange}
            />
          )}
        </div>
      </div>

      {modalData && (
        <CommonModal
          open={modalData}
          onCancel={handleModalClose}
          showFooter
          showTitle
          title={
            modalData?.personalInfo?.applicantName || "Loan Application Info"
          }
        >
          <ModalContent
            data={modalData}
            addBankData={addBankData}
            onSelect={(value) => setSelectBankData(value)}
            selectedBank={selectBankData}
          />
        </CommonModal>
      )}

      {/* {addBanksOpen && (
        <CommonModal
          open={addBanksOpen}
          onCancel={handleAddBankClose}
          showFooter
          showTitle
          title="Add Bank"
        >
          <AddBankUI
            user={modalData}
            banks={addBankData}
            selectBank={selectBank}
          />
        </CommonModal>
      )} */}
    </>
  );
};

const ModalContent = ({ data, addBankData, onSelect, selectedBank }) => {
  const cleanedData = cleanLoanApplication(data);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex justify-end">
        <AddBankUI
          user={data}
          banks={addBankData}
          onSelect={onSelect}
          selectedBank={selectedBank}
        />
      </div>
      {Object.entries(cleanedData)
        .filter(
          ([key]) =>
            !["_id", "createdBy", "createdAt", "updatedAt", "__v"].includes(key)
        ) // Skip unwanted keys
        .map(([key, value]) =>
          typeof value === "object" && value !== null ? (
            <details key={key} className="bg-white rounded-lg p-4">
              <summary className="font-bold capitalize">{key}</summary>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {Object.entries(value).map(([subKey, subValue]) => (
                  <div key={subKey} className="flex justify-between">
                    <span className="font-bold">{subKey}</span>
                    <span>{String(subValue)}</span>
                  </div>
                ))}
              </div>
            </details>
          ) : (
            <div key={key} className="flex justify-between">
              <span className="font-bold capitalize">{key}</span>
              <span>{String(value)}</span>
            </div>
          )
        )}
    </div>
  );
};

const AddBankUI = ({ user, banks, onSelect, selectedBank }) => {
  const eligibleBanks = getEligibleBanks(user, banks);

  return (
    <SearchableMultiSelectDropdown
      options={eligibleBanks}
      name="bank"
      label="Bank"
      value={selectedBank}
      onChange={onSelect}
    />
  );
};

const cleanLoanApplication = (application) => {
  const excluded = [
    "createdBy",
    "createdAt",
    "updatedAt",
    "__v",
    "applicationDate",
  ];
  return Object.fromEntries(
    Object.entries(application)
      .filter(([key]) => !excluded.includes(key))
      .sort(([a], [b]) => a.localeCompare(b))
  );
};

const getEligibleBanks = (userLoan, banks) => {
  if (!userLoan || !banks || !Array.isArray(banks)) return [];

  const { loanDetails, employmentInfo, creditScore } = userLoan;
  const { loanType, loanAmount } = loanDetails || {};
  const incomeSource = employmentInfo?.incomeSource?.toLowerCase();

  if (!loanType || !incomeSource) return [];

  return banks.reduce((eligibleList, branch) => {
    const matchedCriteria = branch.criteria.find(
      (crit) => crit.loanType === loanType
    );

    if (!matchedCriteria) return eligibleList;

    const incomeCriteria = matchedCriteria.criteria?.[incomeSource];

    if (
      incomeCriteria &&
      incomeCriteria[incomeSource] === true &&
      loanAmount >= incomeCriteria.income &&
      creditScore >= incomeCriteria.creditScore
    ) {
      eligibleList.push({
        value: branch._id,
        label: branch.bankBranch,
        branchId: branch._id,
        bankId: branch.bankId,
        bankBranch: branch.bankBranch,
        bankLocation: branch.bankLocation,
        loanType: matchedCriteria.loanType,
        criteriaId: matchedCriteria._id,
        requiredIncome: incomeCriteria.income,
        requiredCreditScore: incomeCriteria.creditScore,
      });
    }

    return eligibleList;
  }, []);
};

export default LoanApplications;
