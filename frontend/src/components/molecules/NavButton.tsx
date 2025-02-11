import Typography from "@/components/atoms/Typography";
import React from "react";

interface NavButtonProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>; // Add more icons as needed
  label: string;
  selected: boolean;
  onClick: () => void;
  isMiddle?: boolean;
}

export default function NavButton({
  Icon,
  label,
  selected,
  onClick,
  isMiddle,
}: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
        position: isMiddle ? "relative" : undefined,
      }}
      type="button"
    >
      <Icon
        style={{
          color: selected ? "var(--primary)" : "var(--gray-text)",
          position: isMiddle ? "absolute" : undefined,
          bottom: "250%",
        }}
      />
      <Typography
        variant="xsmall"
        color={selected ? "var(--primary)" : "var(--gray-text)"}
        weight={selected ? "700" : "400"}
      >
        {label}
      </Typography>
    </button>
  );
}
