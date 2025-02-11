import React from "react";
import Typography from "./Typography";

type Props = {
  label: string;
  onClick?: () => void;
};
export default function OrangeChip({ label, onClick }: Props) {
  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      style={{
        backgroundColor: "var(--orange)",
        borderRadius: "20px",
        padding: "5px 13px",
      }}
    >
      <Typography
        className="font-poppins font-[10px]"
        weight="500"
        color="white"
      >
        {label}
      </Typography>
    </div>
  );
}
