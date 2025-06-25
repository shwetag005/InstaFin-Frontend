"use client";

import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/component/Layout/layout";
import LoanApplications from "@/component/Applications/LoanApplications";
import CreateUser from "@/component/CreateUsers/CreateUser";
import CreateLender from "@/component/CreateUsers/CreateLender";
import CreateClient from "@/component/CreateUsers/CreateClient";
import { useRouter } from "next/navigation";
import useGetQueryParam from "@/component/utils/commonFunctions";
import CreateSubUser from "@/component/Applications/SubUserApplicant";
import CreateSubUsers from "@/component/CreateUsers/CreateSubUser";
import CreateBank from "@/component/CreateUsers/CreateBank";
import { getBanks } from "@/lib";

const AddUser = () => {
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();
  const user = useGetQueryParam("user");
  console.log(user)
  const userCreation=useMemo(() => {
    if (user?.toLowerCase() == "agent") {
      return <CreateUser userRole={"agent"} />;
    } else if (user?.toLowerCase() == "lender") {
      return <CreateLender />;
    } else if (user?.toLowerCase() == "client") {
      return <CreateClient />;
    } else if (user?.toLowerCase() == "subagent") {
      return <CreateUser userRole={"subAgent"} />;
    } else if(user?.toLowerCase() == "bank"){
      return <CreateBank />
    } else  if (user?.toLowerCase() == "admin") {
      return <CreateUser userRole={"admin"} />;
    } else {
      return <div className="text-center text-red-500 text-2xl font-bold mt-10">
        <h1>Invalid User</h1>
      </div>
    }
  }, [user]);
  return (
    <Layout setSidebarCollapsed={setCollapsed}>
      {userCreation}      
    </Layout>
  );
};

export default AddUser;