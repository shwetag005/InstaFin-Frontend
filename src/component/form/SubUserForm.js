"use client";
import { useState, useMemo } from "react";
import CommonFields from "./CommonFields";
import { userFormSections } from "@/app/data";
import SectionItem from "../ui/SectionItem";


const SubUserForm = () => {
  const [activeIndex, setActiveIndex] = useState(null); // Track active section
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    familyDetails: "",
    incomeDetails: "",
  });

  // Define field structures
  const personalInfoFields = useMemo(
    () => [
      { "key": "fullName", "label": "Full Name", "type": "text" },
      { "key": "address", "label": "Address", "type": "text" },
      { "key": "email", "label": "Email Address", "type": "email" },
    ],
    []
  );

  const familyInfoFields = useMemo(
    () => [      { "key": "nomineeName", "label": "Nominee Name", "type": "text" },
      { "key": "nomineeDOB", "label": "Nominee Date of Birth", "type": "date" },
      { "key": "nomineeAddress", "label": "Nominee Address", "type": "text" },],
    []
  );

  const incomeInfoFields = useMemo(
    () => [      { "key": "incomeType", "label": "Income Type", "type": "text" }
    ],
    []
  );

  // Render form fields dynamically based on active index
  const renderSubUserForm = () => {
    switch (activeIndex) {
      case 0:
        return (
          <CommonFields formData={formData} setFormData={setFormData} inputFields={personalInfoFields} />
        );
      case 1:
        return (
          <CommonFields formData={formData} setFormData={setFormData} inputFields={familyInfoFields} />
        );
      case 2:
        return (
          <CommonFields formData={formData} setFormData={setFormData} inputFields={incomeInfoFields} />
        );
      default:
        return <p className="text-gray-500">Select a section to fill out the details.</p>;
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center">
      {/* Sections */}
      <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1">
        {userFormSections.map((section, index) => (
          <SectionItem
            key={index}
            title={section.title}
            status={section.status}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            {renderSubUserForm()}
          </SectionItem>
        ))}
      </div>
    </div>
  );
};

export default SubUserForm;
