"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "../Header/PageHeader";
import SectionItem from "../ui/SectionItem";
import CommonFields from "../form/CommonFields";
import { Button } from "antd";
import { getId, getRole } from "@/lib/commonFunctions";
import { getDisplayName } from "next/dist/shared/lib/utils";
import { createUser, loginApi } from "@/lib";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/toastUtils";

const CreateUser = ({ userRole }) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    pin: "",
    email: "",
    mobileNumber: "",
    familyDetails: "",
    incomeDetails: "",
    borrowings: "",
    investments: "",
    creditScore: "",
    loanTypeAndDocuments: "",
    documents: null,
  });
  //   {
  //   "fullName": "Admin User",
  //   "address": "Admin Address",
  //   "pin": "234567",
  //   "email": "admin@example.com",
  //   "mobileNumber": "8765432109",
  //   "role": "admin",
  //   "createdBy": "6826dabd5646513020c275ab"
  // }

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

  const [collapsed, setCollapsed] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    setIsFormComplete(
      sections.every((section) => section.status === "Completed") &&
        formData?.mobileNumber?.trim()
    );
  }, [sections, formData?.mobileNumber.length]);

  const handleSubmit = async () => {
    if (isFormComplete) {
      try {
        const { fullName, address, pin, email, mobileNumber, role, createdBy } =
          formData;
        const payload = {
          fullName: fullName,
          address: address,
          pin: pin,
          email: email,
          mobileNumber: mobileNumber,
          role: userRole || undefined,
          createdBy: getId(),
        };
        const response = await createUser(payload);
        console.log(response);
        if (response.status == 201) {
          router.push("/users");
          showToast("success", response.message);
          showToast("success", "User Created Successfully");
        } else {
          showToast("error", response.message);
          showToast("error", "User Creation Failed");
        }
      } catch (error) {
        console.log(error);
      }
      console.log("Form submitted successfully", formData);
    } else {
      alert("Please complete all sections before submitting.");
    }
  };

  return (
    <>
      <PageHeader
        collapsed={collapsed}
        title={userRole?.toLowerCase() === "admin" ? "Create Agent" : userRole?.toLowerCase() === "agent" ? "Create SubAgent" : "Create User"}
        addNewSubUser
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
            <CommonFields
              formData={formData}
              setFormData={setFormData}
              inputFields={inputFields[section.key]}
              sectionKey={section.key}
              setSections={setSections} // <-- Add this line
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
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
