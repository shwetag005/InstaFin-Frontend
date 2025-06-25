"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/component/Layout/layout";
import { useRouter } from "next/navigation";
import useGetQueryParam from "@/component/utils/commonFunctions";


const Help = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  console.log(router);
   const type = useGetQueryParam("type");

   useEffect(() => {
     console.log("Type parameter:", type);
   }, [type]); 

  return (
    <Layout setSidebarCollapsed={setCollapsed}>
     HELP
    </Layout>
  );
};

export default Help;
