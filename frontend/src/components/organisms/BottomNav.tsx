"use client";

import {
  HeartIcon,
  HomeIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from "@/constants/images";
import NavButton from "@/components/molecules/NavButton";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function BottomNav() {
  const router = useRouter();
  const location = usePathname();
  const handleButtonClick = (route: string) => {
    router.push(route);
  };

  if (location === "/add" || location.startsWith("/home/")) {
    return null;
  }
  return (
    <nav
      className="flex flex-row items-end justify-between space-y-4 pb-[36px] px-[28px]"
      style={{
        borderTop: "1px solid rgba(235, 240, 255, 1)",
      }}
    >
      <NavButton
        Icon={HomeIcon}
        label="Home"
        selected={location === "/home"}
        onClick={() => handleButtonClick("/home")}
      />
      <NavButton
        Icon={SearchIcon}
        label="Search"
        selected={location === "/search"}
        onClick={() => handleButtonClick("/search")}
      />
      <NavButton
        Icon={PlusIcon}
        label="Add Post"
        selected={location === "/add"}
        onClick={() => handleButtonClick("/add")}
        isMiddle
      />
      <NavButton
        Icon={HeartIcon}
        label="My Ads"
        selected={location === "/hearted"}
        onClick={() => handleButtonClick("/hearted")}
      />
      <NavButton
        Icon={UserIcon}
        label="Account"
        selected={location === "/account"}
        onClick={() => handleButtonClick("/account")}
      />
    </nav>
  );
}
