import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Typography from "@/components/atoms/Typography";
import IconButton from "@/components/molecules/IconButton";
import { SortFilterType } from "@/constants/types";
import {
  SortByEnums,
  SortOptions,
  SortOrderEnums,
  SortOrderOptions,
} from "@/constants/dummy";
import SortInput from "@/components/molecules/SortInput";
interface SortOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (sorts: SortFilterType) => void;
  prevSort: SortFilterType;
}

export default function SortOverlay({
  isOpen,
  onClose,
  onApply,
  prevSort,
}: SortOverlayProps) {
  const [sort, setSort] = useState<SortFilterType>(prevSort);

  useEffect(() => {
    if (isOpen) {
      setSort(prevSort);
    }
  }, [isOpen, prevSort]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white px-6 py-4 rounded-xl shadow-lg w-80 relative">
        <div className="flex mb-5">
          <Typography
            size={20}
            weight="500"
            className="font-lato flex-1 "
            color="#0F022C"
          >
            Sorting Options
          </Typography>
          <IconButton Icon={X} onClick={onClose} style={{ padding: 0 }} />
        </div>

        <div className="flex flex-col gap-4">
          <SortInput
            label="Sort By"
            options={SortOptions}
            selected={sort.sortBy}
            setSelected={(v) => setSort({ ...sort, sortBy: v as SortByEnums })}
          />
          <SortInput
            label="Sort Order"
            options={
              sort.sortBy === "createdAt"
                ? SortOrderOptions.time
                : SortOrderOptions.number
            }
            selected={sort.sortOrder}
            setSelected={(v) => {
              console.log(v);
              setSort({ ...sort, sortOrder: v as SortOrderEnums });
            }}
          />
          <IconButton
            onClick={() => onApply(sort)}
            label="Apply Sort"
            bgColor="var(--primary)"
          />
        </div>
      </div>
    </div>
  );
}
