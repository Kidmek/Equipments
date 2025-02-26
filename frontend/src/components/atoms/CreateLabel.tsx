import React from "react";
import Typography from "./Typography";

export default function CreateLabel({ label }: { label: string }) {
  return (
    <Typography
      size={18}
      weight="700"
      className="font-lato mb-[20px]"
      color="#0F022C"
    >
      {label}
    </Typography>
  );
}
