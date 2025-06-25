"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import CustomHeader from "../Header/CustomHeader";
import useAuthContext from "@/hooks/useAuthContext";


const MasterLayout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-full min-h-screen" style={{background:"white",color:"black"}}>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Sidebar */}
          <aside
            className={`${collapsed ? 'w-16' : 'w-64'} transition-width duration-300`}
          >
            <Sidebar className={`flex ${collapsed ? 'collapsedLeft' : 'collapsedRight'}`} />
          </aside>

          {/* Main Layout */}
          <div className="flex flex-col flex-1">
            {/* Header */}
            <header className="flex items-center bg-white shadow-md py-2 px-6">
              {/* <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                {collapsed ? '☰' : '✕'}
              </button> */}
              <CustomHeader name="Dashboard" />
            </header>

            {/* Content */}
            <main className="p-6 flex-1">
              {children}
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default MasterLayout;
