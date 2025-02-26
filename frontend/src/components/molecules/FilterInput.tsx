import React from "react";
import InputField, { InputFieldProps } from "../atoms/InputField";
import Typography from "../atoms/Typography";

export default function CreateInput({
  value,
  label,
  setValue,
  type,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  type?: InputFieldProps["type"];
}) {
  return (
    <div>
      <Typography
        size={15}
        weight="600"
        className="font-lato mb-[10px]"
        color="#0F022C"
      >
        {label}
      </Typography>
      <InputField
        value={value}
        onChange={setValue}
        className="border-[#F5F4F8] bg-[#F5F4F8]"
        type={type}
      />
    </div>
  );
}
