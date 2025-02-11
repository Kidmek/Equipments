"use client";

import Typography from "@/components/atoms/Typography";
import React from "react";

interface Props {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>; // Add more icons as needed
  label: string;
  bgColor?: string;
  onClick: () => void;
}

export default function IconButton({ Icon, label, bgColor, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: bgColor ?? "var(--gray-bg)",
        padding: "11px 20%",
        borderRadius: "25px",
      }}
      type="button"
    >
      {Icon && (
        <Icon
          style={{
            color: bgColor ? "white" : "var(--primary)",
          }}
        />
      )}
      <Typography
        color={bgColor ? "white" : "var(--primary)"}
        className="flex-1"
      >
        {label}
      </Typography>
    </button>
  );
}
