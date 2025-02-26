import React from "react";
import Typography from "../atoms/Typography";
import ChipSelect from "../atoms/ChipSelect";
import { SortByEnums, SortOrderEnums } from "@/constants/dummy";

type SortInputProps = {
  label: string;
  options: { label: string; value: SortOrderEnums | SortByEnums }[];
  selected: string;
  setSelected: (value: SortOrderEnums | SortByEnums) => void;
};
export default function SortInput({
  label,
  options,
  selected,
  setSelected,
}: SortInputProps) {
  return (
    <div>
      <Typography
        size={15}
        weight="700"
        className="font-lato mb-[5px]"
        color="#0F022C"
      >
        {label}
      </Typography>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {options.map((s) => {
          return (
            <div key={s.value}>
              <ChipSelect
                label={s.label}
                onClick={() => setSelected(s.value)}
                selected={selected === s.value}
                style={{
                  padding: "10px",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
