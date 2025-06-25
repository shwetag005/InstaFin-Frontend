"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/component/Layout/layout";
import Accept_Reject from "@/component/Accept_Reject/Accept_Reject";

const AcceptReject = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout setSidebarCollapsed={setCollapsed}>
        <Accept_Reject  isBank />
    </Layout>
  );
};

export default AcceptReject;