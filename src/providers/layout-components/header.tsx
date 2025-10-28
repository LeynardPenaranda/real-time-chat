"use client";

import { GetCurrentUserFromDB } from "@/server-actions/users";
import React, { useEffect } from "react";
import { Avatar, message, App } from "antd";
import { UserType } from "@/interfaces";
import CurrentUserInfo from "./current-user-info";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = React.useState<UserType | null>(null);
  const [showCurrentUserInfo, setShowCurrentUserInfo] = React.useState(false);

  const isPublicRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");

  // ✅ Hooks always defined before any return
  useEffect(() => {
    if (!isPublicRoute) {
      getCurrentUser();
    }
  }, [isPublicRoute]);

  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUserFromDB();
      if (response.error) throw new Error(response.error);
      setCurrentUser(response);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  if (isPublicRoute) return null;

  return (
    <App>
      {" "}
      {/* ✅ Wrap with AntD App for proper context */}
      <div className="bg-gray-100 w-full p-3 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#31304D] uppercase">
            Real Time Chat
          </h1>
        </div>
        <div className="gap-5 flex items-center">
          <span className="text-sm ">{currentUser?.name}</span>
          <Avatar
            className="cursor-pointer"
            onClick={() => {
              setShowCurrentUserInfo(!showCurrentUserInfo);
            }}
            src={currentUser?.profilePicture}
          />
        </div>
        {showCurrentUserInfo && (
          <CurrentUserInfo
            currentUser={currentUser}
            setCurrentUserInfo={setShowCurrentUserInfo}
            showCurrentUserInfo={showCurrentUserInfo}
          />
        )}
      </div>
    </App>
  );
};

export default Header;
