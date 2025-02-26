"use client";

import Typography from "@/components/atoms/Typography";
import React from "react";

interface Props {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>; // Add more icons as needed
  label?: string;
  bgColor?: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

export default function IconButton({
  Icon,
  label,
  bgColor,
  onClick,
  style,
}: Props) {
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
        ...(style ?? {}),
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
      {label && (
        <Typography
          color={bgColor ? "white" : "var(--primary)"}
          className="flex-1"
        >
          {label}
        </Typography>
      )}
    </button>
  );
}
