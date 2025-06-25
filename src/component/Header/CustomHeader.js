"use client";

import React, { useState } from "react";
// import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ImSwitch } from "react-icons/im";
import { Button, Modal, Tooltip } from "antd";
import Image from "next/image";
import localImage from "./149071.png"; // Adjust the path if necessary
import InstaFinn from "../ui/InstaFinn";
import useAuthContext from "@/hooks/useAuthContext";
import { convertKeyCase, convertKeyToCamelCase, getUser, splitAndCapitalize } from "@/lib/commonFunctions";
import LogoutModal from "../ui/LogoutModal";

function CustomHeader(props) {
  const router = useRouter();
  const { name, role, profileImage } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [confLogout, setConfLogOut] = useState(false);
  const { logout } = useAuthContext();
  const user = getUser();

  const userLogout = async () => {
    logout();
    // Cookies.remove("Auth");
    router.push("/login");
  };

  return (
    <header className="top-0 w-full  flex justify-between items-center">
      {/* Left: Logo & Back Button */}
      <div className="flex items-center">
        <InstaFinn />

        <Button
          shape="round"
          size="small"
          className="border-gray-500 ml-4"
          onClick={() => router.back()}
        >
          ← Back
        </Button>
      </div>

      {/* Right: User Profile Section */}
      <div className="flex items-center space-x-3">
        <div className="flex flex-col text-right">
          <span className="text-gray-500 text-sm">Welcome</span>
          {user && (
            <>
              <span className="text-gray-800 text-sm font-bold">
                {user?.fullName || "User"}
              </span>
              <span className="text-gray-500 text-xs">{splitAndCapitalize(user?.role) || "Role"}</span>
            </>
          )}
        </div>
        <Image
          src={localImage} // Replace with actual profile image
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        {/* Logout Button */}
        <Tooltip title="Log Out">
          <button onClick={() => setConfLogOut(true)}>
            <ImSwitch size={22} className="text-gray-600 hover:text-red-500" />
          </button>
        </Tooltip>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal 
        isOpen={confLogout} 
        onClose={() => setConfLogOut(false)} 
        onConfirm={userLogout}
        />
    </header>
  );
}

export default CustomHeader;
