"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/component/Layout/layout";

const BorrowingsDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout setSidebarCollapsed={setCollapsed}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold uppercase text-center mb-6">
          My Borrowings
        </h1>
        <LoanCard key={"0"}>{renderTotalBorrowings()}</LoanCard>
        <h2 className="text-xl uppercase font-semibold mb-4">
          Active Accounts
        </h2>
        {borrowingsData.map((loan, index) => (
          <LoanCard key={index}>{renderLoanDetails(loan)}</LoanCard>
        ))}
      </div>
    </Layout>
  );
};

export default BorrowingsDashboard;

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
