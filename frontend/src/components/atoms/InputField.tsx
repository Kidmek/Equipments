import React from "react";

export interface InputFieldProps {
  type?: "text" | "email" | "password" | "number" | "textarea";
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export default function InputField({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  Icon,
}: InputFieldProps) {
  return (
    <div
      className={`flex items-center border
         border-[#9098B1] px-[16px] py-[12px] rounded-[25px] 
          focus-within:border-[#2A76AA] text-[var(--gray-text)]
           focus-within:text-[#2A76AA] font-poppins ${className}`}
      style={{
        fontSize: "12px",
        lineHeight: "21.6px",
        fontWeight: "600",
        letterSpacing: "0.5px",
      }}
    >
      {Icon && (
        <span className="mr-[10px]">
          <Icon />
        </span>
      )}
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 focus:outline-none bg-transparent"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 focus:outline-none bg-transparent"
        />
      )}
    </div>
  );
}
