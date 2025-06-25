"use client";
import PageHeader from "../Header/PageHeader";
import { useEffect, useState } from "react";
import { getDashboardData } from "@/lib";
import { getRole } from "@/lib/commonFunctions";
import { showToast } from "@/utils/toastUtils";


const CountDashboard = () => {

  const [dashboardData,setDashboardData]=useState([]);
  const role=getRole();
  const fetchStatusData=async()=>{
    try{
      const responce= await getDashboardData();
      if(responce.status===200){
        setDashboardData(responce.data.data);
        
      // prevent duplicate toasts
      if (!toastShown.current) {
        showToast("success", response.message);
        toastShown.current = true;
      }

    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};



  useEffect(()=>{
    fetchStatusData();
  },[])

  return (
        <>
        <PageHeader collapsed={false} role={role} title="Dashboard" />
        <div className="flex-1 flex flex-col items-center">
          <div className="container-div m-4 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.isArray(dashboardData) && dashboardData?.length > 0 ?
              dashboardData?.map((item, index) => {
                const borderColors = {
                  "New Applications": "border-pink-300",
                  "Pending Applications": "border-yellow-300",
                  "In Process Applications": "border-blue-300",
                  "Rejected Applications": "border-red-300",
                  "Completed Applications": "border-green-300",
                };

                return (
                  <div key={index} className={`rounded-lg overflow-hidden shadow-md bg-white p-4 flex flex-col text-center border-2 ${borderColors[item.status] || "border-gray-300"}`}>
                    <span className="text-md mb-2 text-black-600">
                      {item.status.toUpperCase()}
                    </span>
                    <span className="text-2xl font-bold">{item.count}</span>
                  </div>
                )
              }):<div className="text-center text-2xl font-bold text-gray-600">No Data </div>
            }
          </div>
        </div>
        </>
    )
}

export default CountDashboard