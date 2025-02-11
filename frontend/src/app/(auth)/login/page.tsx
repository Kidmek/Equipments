"use client";

import Typography from "@/components/atoms/Typography";
import {
  FacebookIcon,
  GoogleIcon,
  PhoneIcon,
  TelegramIcon,
} from "@/constants/images";
import IconButton from "@/components/molecules/IconButton";
import PhoneEmailPage from "@/components/organisms/auth/PhoneEmailLogin";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginPage() {
  const [chosenMethod, setChosenMethod] = useState<
    "phone" | "email" | "google" | "facebook" | "telegram" | null
  >(null);

  if (chosenMethod === "phone") {
    return <PhoneEmailPage />;
  }

  return (
    <div className="flex flex-col gap-[19px]">
      <div className="pt-[48px] w-[90vw] flex flex-col gap-[11px]">
        <IconButton
          Icon={PhoneIcon}
          label="Continue with Phone"
          onClick={() => {
            setChosenMethod("phone");
          }}
        />
        <IconButton
          Icon={GoogleIcon}
          label="Continue with Google"
          onClick={() => {
            setChosenMethod("google");
          }}
        />
        <IconButton
          Icon={FacebookIcon}
          label="Continue with Facebook"
          onClick={() => {
            setChosenMethod("facebook");
          }}
        />
        <IconButton
          Icon={TelegramIcon}
          label="Continue with Telegram"
          onClick={() => {
            setChosenMethod("telegram");
          }}
          bgColor="var(--primary)"
        />
      </div>
      <Typography align="center">OR</Typography>

      <Typography
        align="center"
        className="underline underline-offset-2"
        weight="600"
      >
        Login with Email
      </Typography>

      <Typography align="center" color="var(--gray-text)">
        Don&apos;t have an account?{" "}
        <Link href={"/register"}>
          <Typography color="var(--primary)" weight="700" tag="span">
            Sign Up
          </Typography>
        </Link>
      </Typography>
    </div>
  );
}
