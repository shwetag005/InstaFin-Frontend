"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import InstaFinn from "../ui/InstaFinn";
import { useRouter } from "next/navigation";
import { sidebarList } from "@/app/data";
import LogoutModal from "../ui/LogoutModal";
import { getUser } from "@/lib/commonFunctions";
import useAuthContext from "@/hooks/useAuthContext";
// import { UserContext } from '../context/UserContext';

const Sidebar = ({ className }) => {
  //   const { user } = useContext(UserContext);
  const [role, setRole] = useState(getUser()?.role || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuthContext();
  let location = window.location.href;
  const url = new URL(location);

  const currentPath = url.pathname.slice(1) + url.search;

  const handleLogout = () => {
    setTimeout(() => {
      logout();
      setIsModalOpen(false);
      router.push("/login");
    }, 500);
  };
  const router = useRouter();

  const navigate = (route) => {
    router.push(route);
  };

  return (
    <aside className={`${className} flex flex-col bg-white h-full p-4`}>
      <InstaFinn />
      <ul>
        {Object.values(sidebarList)
          .filter((item) => item.role.includes(role))
          .map((item) => (
            <li
              key={item.value}
              className={`p-2 my-1 hover:bg-gray-700 hover:text-white font-semibold rounded cursor-pointer ${
                "/" + currentPath == item.route ? "bg-gray-700 text-white" : ""
              }`}
              onClick={() => {
                item.value == "logout"
                  ? setIsModalOpen(true)
                  : navigate(item.route);
              }}
            >
              {item.name}
            </li>
          ))}
      </ul>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </aside>
  );
};

export default Sidebar;
