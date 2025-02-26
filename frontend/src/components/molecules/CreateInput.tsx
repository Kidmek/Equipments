import React from "react";
import CreateLabel from "../atoms/CreateLabel";
import InputField, { InputFieldProps } from "../atoms/InputField";

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
      <CreateLabel label={label} />
      <InputField
        value={value}
        onChange={setValue}
        className="border-[#F5F4F8] bg-[#F5F4F8]"
        type={type}
      />
    </div>
  );
}
