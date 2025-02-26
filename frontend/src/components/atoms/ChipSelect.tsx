import React from "react";
import Typography from "./Typography";

export default function ChipSelect({
  label,
  selected,
  onClick,
  style,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      style={{
        backgroundColor: selected ? "var(--orange)" : "#F5F4F8",
        borderRadius: "20px",
        padding: "17.5px 13px",
        width: "fit-content",
        ...(style ?? {}),
      }}
    >
      <Typography
        className="font-poppins font-[10px]"
        weight="500"
        color={selected ? "white" : "#252B5C"}
      >
        {label}
      </Typography>
    </div>
  );
}
