"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/component/Layout/layout";
import { Box } from "@mui/material";
import { getDate } from "@/lib/commonFunctions";
import { DynamicModalForm } from "@/component/form/DynamicModalForm";
import { FaUserEdit } from "react-icons/fa";


const Profile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    applicationCount: "",
    totalBusiness: "",
    rank: "",
    branches: [],
    _id: "",
    fullName: "",
    address: "",
    pin: "",
    email: "",
    mobileNumber: "",
    role: "",
    createdAt: "",
    profileUrl: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setFormData({
      applicationCount: storedUser?.applicationCount || "",
      totalBusiness: storedUser?.totalBusiness || "",
      rank: storedUser?.rank || "",
      branches: storedUser?.branches || [],
      _id: storedUser?._id || "",
      fullName: storedUser?.fullName || "",
      address: storedUser?.address || "",
      pin: storedUser?.pin || "",
      email: storedUser?.email || "",
      mobileNumber: storedUser?.mobileNumber || "",
      role: storedUser?.role || "",
      createdAt: storedUser?.createdAt || "",
      profileUrl: storedUser?.profileUrl || "",
    });
  }, [isEditing]);

  const handleClose = () => {
    setIsEditing(false);
  }
  const handleSave = () => {
    const updatedUser = { ...formData };
    console.log(updatedUser);
    // localStorage.setItem("user", JSON.stringify(updatedUser));
    // setUser(updatedUser);
    // setIsEditing(false);
  };

  const inputFields = [
    { key: "profileUrl", label: "Profile", type: "file" },
    { key: "fullName", label: "Full Name", type: "text" },
    { key: "address", label: "Address", type: "text" },
    { key: "pin", label: "Pin", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "mobileNumber", label: "Mobile Number", type: "text" },
  ];

  const handleInputChange = (fieldKey, value) => {
    setFormData({ ...formData, [fieldKey]: value });
  };

  if (!formData) return null;
  const isNotShow=["fullName","profileUrl"]

  return (
    <Layout setSidebarCollapsed={setCollapsed}>
      <Box>
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <img
                src={formData?.profileUrl || "profile.png"}
                alt="User"
                className="w-32 h-32 rounded-full object-cover border-4 border-slate-300"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-800">
                  {formData.fullName}
                </h1>
                <p className="text-gray-600">{formData.email}</p>
                <span className="inline-block mt-2 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  {formData.role}
                </span>
              </div>
              {/* create edit button */}
              <div className="">
                <button
                  className="px-4 py-2 rounded-md border border-slate hover:bg-slate-200"
                  onClick={() => setIsEditing(true)}
                >
                  <FaUserEdit />
                </button>
              </div>
            </div>
            <hr className="my-6 border-t border-gray-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {inputFields?.filter(ele=> !isNotShow.includes(ele.key)).map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <p className="mt-1 text-gray-900">
                    {formData[field.key] || "N/A"}
                  </p>
                </div>
              ))}

              {/* You can still include extra static fields like this */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Joined On
                </label>
                <p className="mt-1 text-gray-900">
                  {getDate(formData.createdAt) || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <p className="mt-1 text-gray-900">
                  {formData.role || "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Application Count
                </label>
                <p className="mt-1 text-gray-900">
                  {formData.applicationCount || "N/A"}
                </p>
              </div><div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Business
                </label>
                <p className="mt-1 text-gray-900">
                  {formData.totalBusiness || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Box>
      {/* create model for edit user information use materialui  */}
      <DynamicModalForm
        isEditing={isEditing}
        onClose={handleClose}
        onSubmit={handleSave}
        formData={formData}
        setFormData={setFormData}
        inputFields={inputFields}
        handleInputChange={handleInputChange}
      />
    </Layout>
  );
};

export default Profile;
