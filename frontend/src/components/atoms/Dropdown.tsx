"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import the icons
import { formatEnumString } from "@/lib/utils";

type Props = {
  options: string[];
  selected: string | null;
  onSelect: (selected: string) => void;
  placeholder: string;
};

export default function Dropdown({
  options,
  selected,
  onSelect,
  placeholder,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      style={{
        width: "49%",
        height: "42px",
      }}
    >
      {/* Dropdown Header */}
      <div
        className="flex items-center justify-between border border-primary 
        rounded px-3 py-3 cursor-pointer text-primary text-sm h-full "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected ? formatEnumString(selected) : placeholder}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul
          className="absolute left-0 mt-1 w-full 
          border border-primary bg-white shadow-lg 
          ounded z-10"
          style={{
            maxHeight: "40vh",
            overflowY: "auto",
          }}
        >
          {options.map((option) => (
            <li
              key={option}
              className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-200 ${
                selected === option ? "bg-gray-300" : ""
              }`}
              onClick={() => {
                if (selected === option) {
                  console.log("Clicked the already selected option:", option);
                }
                onSelect(option);
                setIsOpen(false); // Close dropdown after selection
              }}
            >
              {formatEnumString(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
