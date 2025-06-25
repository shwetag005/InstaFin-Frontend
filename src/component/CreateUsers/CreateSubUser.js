"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "../Header/PageHeader";
import SectionItem from "../ui/SectionItem";
import CommonFields from "../form/CommonFields";
import { Button } from "antd";
import { createBranch, getBanks } from "@/lib";
import { getId } from "@/lib/commonFunctions";
import { showToast } from "@/utils/toastUtils";

const CreateSubUsers = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    pin: "",
    email: "",
    role: "bankOperator",
    ifscCode: "",
    bankId: "",
    bankBranch: "",
    bankLocation: "",
    bankPin: "",
    mobileNumber: "",
    bankName: "",
    bankPersonDesignation: "",
    createdBy: getId(),
    bankPersonEId: "",
  });

  useEffect(() => {
    getAllBanks();
  }, []);
  const getAllBanks = async () => {
    try {
      setLoading(true);
      const response = await getBanks();
      if (response.status == 200) {
        let newData = response.data.data.map((item) => ({
          value: item._id,
          label: item.bankName,
        }));
        showToast("success", response.message);
        setBankData(newData);
        setLoading(false);
      } else {
        showToast("error", response.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

const [sections, setSections] = useState([
    { key: "personalInfo", title: "Personal Information", status: "Pending" },
    { key: "familyDetails", title: "Family Details", status: "Pending" },
    { key: "incomeDetails", title: "Income Details", status: "Pending" },
  ]);

  const inputFields = {
    personalInfo: [
      { key: "fullName", label: "Name", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "email", label: "Email", type: "email" },
    ],
    familyDetails: [
      { key: "familyDetails", label: "Family Details", type: "textarea" },
      { key: "pin", label: "Pin Code", type: "number" },
    ],
    incomeDetails: [
      { key: "businessName", label: "Business Name", type: "text" },
      // { key: "incomeDetails", label: "Income Details", type: "textarea" },
    ],
  };

  const handleInputChange = (sectionKey, fieldKey, value) => {
    const updatedFormData = { ...formData, [fieldKey]: value };
    setFormData(updatedFormData);

    const isSectionComplete = inputFields[sectionKey].every((field) =>
      updatedFormData[field.key]?.trim()
    );

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.key === sectionKey
          ? { ...section, status: isSectionComplete ? "Completed" : "Pending" }
          : section
      )
    );
  };

  const isFormComplete =
    sections.every((section) => section.status === "Completed") &&
    formData?.mobileNumber?.trim();
  console.log(formData);
//  fullName: fullName,
//           address: address,
//           pin: pin,
//           email: email,
//           mobileNumber: mobileNumber,
//           role: userRole || undefined,
//           createdBy: getId(),
  const handleSubmit = async () => {
    if (isFormComplete) {
      try {
        setLoading(true);

        const updatedFormData = {
          ...formData,
          role: "SubUser",
          createdBy: getId() || undefined,
        };

        setFormData(updatedFormData);
        const response = await createUser(
          updatedFormData
        );
        if (response.status == 201) {
          showToast("success", response.message);
          showToast("success", "Sub User Created Successfully");
          setFormData({
            fullName: "",
            address: "",
            pin: "",
            email: "",
            role: "bankOperator",
            ifscCode: "",
            bankId: "",
            bankBranch: "",
            bankLocation: "",
            bankPin: "",
            mobileNumber: "",
            bankName: "",
            bankPersonDesignation: "",
            createdBy: getId(),
            bankPersonEId: "",
          });
          setSections([
            { key: "bankName", title: "Select Bank", status: "Pending" },
            { key: "bankBranch", title: "Select Branch", status: "Pending" },
            {
              key: "bankPerson",
              title: "Key Person Details",
              status: "Pending",
            },
          ]);
          setLoading(false);
          router.push("/applications?type=lender");
        } else {
          showToast("error", response.message);
          showToast("error", "Lender Creation Failed");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

      console.log("Form submitted successfully", formData);
    } else {
      alert("Please complete all sections before submitting.");
    }
  };

  return (
    <div>
      <PageHeader
        collapsed={collapsed}
        title="add new Sub-User"
        addNewSubUser
        setFormData={setFormData}
      />
      <div className="container mx-auto max-w-3xl">
        {sections?.map((section, index) => (
          <SectionItem
            key={section.key}
            title={section.title}
            status={section.status}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <CommonFields
              formData={formData}
              setFormData={setFormData}
              inputFields={inputFields[section.key]}
              sectionKey={section.key}
              setSections={setSections}
              onInputChange={(fieldKey, value) =>
                handleInputChange(section.key, fieldKey, value)
              }
            />
          </SectionItem>
        ))}
        <div className="flex justify-end">
          <Button
            className={`font-semibold ${
              isFormComplete
                ? "bg-gray-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            } text-white rounded`}
            onClick={handleSubmit}
            disabled={!isFormComplete}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateSubUsers;
