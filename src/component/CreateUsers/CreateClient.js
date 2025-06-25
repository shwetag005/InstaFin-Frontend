"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "../Header/PageHeader";
import SectionItem from "../ui/SectionItem";
import CommonFields from "../form/CommonFields";
import { allLoanTypes, investments, nationality } from "@/app/data";
import { Button } from "antd";
import { createLoanApplication } from "@/lib";
import { createLoanApplicationWithFiles, getId, prepareLoanPayload, uploadDocuments } from "@/lib/commonFunctions";

const CreateClient = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({"userId":getId(),"pan": "EXKP7847854",
      "applicantName": "Prathmesh Patil",
      "applicantDob": "2000-08-18",
      "applicantGender": "Male",
      "applicantnationality": "India",
      "applicantMobile": "9526808213",
      "applicantEmail": "prathmpatil2818@gmail.com",
      "applicantAddress": "At. Kapileshwar Tal. Radhanagari Dist. Kolhapur",
      "applicantpin": "416208",
      "maritalStatus": "Single",
      "fatherName": "pandurang",
      "motherName": "padma",
      "incomeSource": "bussiness",
      "employerOrBusinessName": "Swami infotech",
      "employerAddress": "At. Kapileshwar Tal. Radhanagari Dist. Kolhapur",
      "workEmail": "prathmesh@swamiinfotech.com",
      "loanAmount": "40000",
      "loanType": "Personal Loan",
      "emiAmount": "9999",
      "creditScore": "650",
    });

  const [sections, setSections] = useState([
    { key: "personalInfo", title: "Personal Information", status: "Pending" },
    { key: "familyDetails", title: "Family Details", status: "Pending" },
    { key: "incomeDetails", title: "Income Details", status: "Pending" },
    { key: "borrowings", title: "Borrowings", status: "Pending" },
    { key: "investments", title: "Investments", status: "Pending" },
    { key: "creditScore", title: "Credit Score", status: "Pending" },
    {
      key: "loanTypeAndDocuments",
      title: "Loan Type and Documents",
      status: "Pending",
    },
  ]);

  const inputFields = {
    personalInfo: [
      { key: "applicantName", label: "Full Name", type: "text" },
      { key: "applicantDob", label: "Date of Birth", type: "date" },
      {
        key: "applicantGender",
        label: "Gender",
        type: "select",
        options: ["Male", "Female", "Transgender"],
      },
      {
        key: "applicantnationality",
        label: "Nationality",
        type: "select",
        options: nationality,
      },
      { key: "applicantMobile", label: "Mobile Number", type: "text" },
      { key: "applicantEmail", label: "Email Address", type: "email" },
      { key: "applicantAddress", label: "Address", type: "text" },
      { key: "applicantpin", label: "PIN", type: "text" },
    ],
    familyDetails: [
      {
        key: "maritalStatus",
        label: "Marital Status",
        type: "select",
        options: ["Single", "Married", "Divorced", "Separated", "Widowed"],
      },
      { key: "spouseName", label: "Spouse Name", type: "text" },
      { key: "spouseDOB", label: "Spouse Date of Birth", type: "date" },
      {
        key: "childrenCount",
        label: "Children (Below 21) Count",
        type: "number",
      },
      { key: "fatherName", label: "Father Name", type: "text" },
      { key: "fatherDOB", label: "Father Date of Birth", type: "date" },
      { key: "motherName", label: "Mother Name", type: "text" },
      { key: "motherDOB", label: "Mother Date of Birth", type: "date" },
    ],
    incomeDetails: [
      { key: "incomeSource", label: "Income Type", type: "text" },
      {
        key: "employerOrBusinessName",
        label: "Employer/Business Name",
        type: "text",
      },
      {
        key: "employerAddress",
        label: "Employer/Business Address",
        type: "text",
      },
      { key: "workEmail", label: "Work Email", type: "email" },
    ],

    // salaryBusiness: [
    //   { key: "businessAddress", label: "Address", type: "text" }, { key: "businessName", label: "Name of Employer/Business", type: "text" }, { key: "incomeType", label: "Income Type", type: "text" }, { key: "workEmail", label: "Work Email", type: "email" }
    // ],
    borrowings: [
      { key: "loanAmount", label: "Amount", type: "number" },
      {
        key: "loanType",
        label: "Select Loan Type",
        type: "select",
        options: allLoanTypes,
      },
      { key: "emiAmount", label: "EMI Amount", type: "number" },
    ],

    investments: [
      { key: "investmentAmount", label: "Current Amount", type: "number" },
      {
        key: "investmentType",
        label: "Select Investment",
        type: "select",
        options: [
          "Stocks",
          "Bonds",
          "Mutual Funds",
          "Fixed Deposits",
          "Real Estate",
          "Public Provident Fund (PPF)",
          "Cryptocurrencies",
          "Other",
        ],
      },
    ],

    creditScore: [
      { key: "creditScore", label: "Credit Score", type: "number" },
      {
        key: "creditUpload",
        label: "Upload Credit Score Document",
        type: "file",
      },
    ],

    loanTypeAndDocuments: [
      {
        key: "uploadDocuments",
        label: "Upload Documents",
        type: "multiDoc",
        documents: [
          { key: "photo", label: "Photo", type: "file", quantity: 1 },
          {
            key: "aadharcard",
            label: "Aadhar Card",
            type: "file",
            quantity: 2,
          },
          { key: "pancard", label: "Pan Card", type: "file", quantity: 1 },
          {
            key: "incomeTaxReturn",
            label: "Income Tax Return",
            type: "file",
            quantity: 5,
          },
          {
            key: "creditReport",
            label: "Credit Report",
            type: "file",
            quantity: 1,
          },
        ],
      },
    ],
  };

  const [collapsed, setCollapsed] = useState(false);

  const isFormComplete =
    sections.every((section) => section.status === "Completed") && formData.pan;
  // {
      // "pan": "EXKP7847854",
      // "applicantName": "Prathmesh Patil",
      // "applicantDob": "2000-08-18",
      // "applicantGender": "Male",
      // "applicantnationality": "India",
      // "applicantMobile": "9526808213",
      // "applicantEmail": "prathmpatil2818@gmail.com",
      // "applicantAddress": "At. Kapileshwar Tal. Radhanagari Dist. Kolhapur",
      // "applicantpin": "416208",
      // "maritalStatus": "Single",
      // "fatherName": "pandurang",
      // "motherName": "padma",
      // "incomeSource": "bussiness",
      // "employerOrBusinessName": "Swami infotech",
      // "employerAddress": "At. Kapileshwar Tal. Radhanagari Dist. Kolhapur",
      // "workEmail": "prathmesh@swamiinfotech.com",
      // "loanAmount": "40000",
      // "loanType": "Personal Loan",
      // "emiAmount": "9999",
      // "creditScore": "650",
  //     "photo": [
  //         {}
  //     ],
  //     "aadharcard": [
  //         {},
  //         {}
  //     ],
  //     "pancard": [
  //         {}
  //     ],
  //     "incomeTaxReturn": [
  //         {},
  //         {},
  //         {},
  //         {},
  //         {}
  //     ],
  //     "creditReport": [
  //         {}
  //     ]
  // }
  console.log(formData)
  const handleSubmit = async () => {
    try {
      console.log(formData)
      // i am passing the userid but not able to console why check below code and give me the ans on next line 
      const userId = getId();
     const newFormDataForPayload = {
      loanAmount: formData.loanAmount, // Assuming these are from previous state or inputs
      loanType: formData.loanType,
      emiAmount: formData.emiAmount,// This is the new value being set
      userId:userId
    };
    
    // Call setFormData with the complete new state object
      const payload = prepareLoanPayload(formData);
      // Create loan application
      const response = await createLoanApplication(payload); // You define this POST call
      console.log(response);
      const {data,status} =response;
      console.log(status)
      if(status == "201"){
        console.log("i am in")
        const loanApplicationId = data.data._id;

        // Upload files now that you have the ID
       const response = await createLoanApplicationWithFiles(loanApplicationId, formData);
       console.log(response);
      }
    } catch (err) {
      console.error("Submission failed", err);
      // alert("Failed to submit application.");
    }
  };

  return (
    <>
      <PageHeader
        collapsed={collapsed}
        title="Add New Client"
        isPan
        formData={formData}
        setFormData={setFormData}
      />
      <div className="container mx-auto max-w-3xl">
        {sections.map((section, index) => (
          <SectionItem
            key={section.key}
            title={section.title}
            status={section.status}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            {
              <CommonFields
                formData={formData}
                setFormData={setFormData}
                inputFields={inputFields[section.key]}
                sectionKey={section.key}
                setSections={setSections}
                section={section}
              />
            }
          </SectionItem>
        ))}
        <div className="flex justify-end">
          <Button
            className={`font-semibold ${
              true
                ? "bg-gray-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            } text-white rounded`}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateClient;
