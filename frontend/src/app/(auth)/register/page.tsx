"use client";

import InputField from "@/components/atoms/InputField";
import Typography from "@/components/atoms/Typography";
import {
  AuthUserIcon,
  EmailIcon,
  PasswordIcon,
  PhoneIcon,
} from "@/constants/images";
import IconButton from "@/components/molecules/IconButton";
import { UsersIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function RegistrationPage() {
  const [user, setUser] = useState({
    accountType: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  return (
    <div className="flex flex-col gap-[19px]">
      <div className="pt-[48px] w-[90vw] flex flex-col gap-[11px]">
        <InputField
          Icon={UsersIcon}
          onChange={(e) => setUser({ ...user, accountType: e.target.value })}
          value={user.accountType}
          placeholder="Account Type"
        />
        <InputField
          Icon={AuthUserIcon}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          value={user.name}
          placeholder="Name"
        />
        <InputField
          Icon={PhoneIcon}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          value={user.phone}
          placeholder="Mobile Number"
        />
        <InputField
          Icon={EmailIcon}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
          placeholder="Your Email"
        />
        <InputField
          Icon={PasswordIcon}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          placeholder="Password"
          type="password"
        />
      </div>

      <IconButton label="Sign Up" onClick={() => {}} bgColor="var(--primary)" />
      <Typography align="center" color="var(--gray-text)">
        Already have an account?{" "}
        <Link href={"/login"}>
          <Typography color="var(--primary)" weight="700" tag="span">
            Log In
          </Typography>
        </Link>
      </Typography>
    </div>
  );
}
