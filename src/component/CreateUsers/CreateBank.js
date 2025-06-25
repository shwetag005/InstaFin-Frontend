"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "../Header/PageHeader";
import SectionItem from "../ui/SectionItem";
import CommonFields from "../form/CommonFields";
import { Button } from "antd";
import { createBank } from "@/lib";
import { showToast } from "@/utils/toastUtils";
import { useRouter } from "next/navigation";

const CreateBank = () => {
    const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
  });

  const [sections, setSections] = useState([
    { key: "bankName", title: "Enter Bank", status: "Pending" },
  ]);

  const inputFields = {
    bankName: [
      { key: "bankName", label: "Enter Bank Name", type: "text" }
    ]
  };

  const [collapsed, setCollapsed] = useState(false);

  const handleInputChange = (sectionKey, fieldKey, value) => {
    const updatedFormData = { ...formData, [fieldKey]: value };
    setFormData(updatedFormData);

    const isSectionComplete = inputFields[sectionKey].every(
      (field) => updatedFormData[field.key]?.trim()
    );

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.key === sectionKey
          ? { ...section, status: isSectionComplete ? "Completed" : "Pending" }
          : section
      )
    );
  };

  const isFormComplete = sections.every(
    (section) => section.status === "Completed"
  );
  
  const handleSubmit =async () => {
    if (isFormComplete) {
        try{
            setLoading(true)
            const response= await createBank(formData)
            console.log(response)
            if(response.status==201){
                showToast("success", response.message);
                showToast("success", "Bank Created Successfully");
                setFormData({bankName: ""})
                setSections([{ key: "bankName", title: "Select Bank", status: "Pending" }])
                setLoading(false)
                router.push("/bank?type=bankOperator")
            }else{
                showToast("error", response.message);
                showToast("error", "Bank Creation Failed");
                setLoading(false)
            }
        } catch(error){
            setLoading(false)
            console.log(error)
        }
      console.log("Form submitted successfully", formData);
    } else {
      alert("Please complete all sections before submitting.");
    }
  };

  return (
    <div>
      <PageHeader collapsed={collapsed} title="Create Bank"  setFormData={setFormData} />
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
              onInputChange={(fieldKey, value) => handleInputChange(section.key, fieldKey, value)}
            />
          </SectionItem>
        ))}
        <div className="flex justify-end">
          <Button className={`font-semibold ${isFormComplete ? "bg-gray-800 cursor-pointer": "bg-gray-400 cursor-not-allowed"} text-white rounded`} onClick={handleSubmit} loading={loading} disabled={!isFormComplete}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBank;
