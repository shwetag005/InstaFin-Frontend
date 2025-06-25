"use client";

import React, { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import PageHeader from "../Header/PageHeader";
import UserCard from "../ui/UserCard";

const SubUserApplicant = ({data, role}) => {
  //Set page title
  useEffect(() => {
    document.title =["admin","masterAdmin"].includes(role)?"Applications" : "Applications";
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const subUserData = [
    {
      name: "vijay prasad",
      email: "vijayprasadmotitalparab",
      mobile: "3564 B",
      status: "active",
    },
  ]
  console.log(role,data);
  return (
    <>
      <PageHeader
        collapsed={collapsed}
        title={["admin","masterAdmin"].includes(role)?"User" : "My Sub User"}
        showFilter
        showAddSubUser
      />
      <div className="flex-1 flex flex-col items-center">
        <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1">
          {Array.isArray(data) &&
            data?.map((user, index) => (
              <UserCard key={index} data={user} />
            ))}
        </div>
      </div>
    </>
  );
};

export default SubUserApplicant;
