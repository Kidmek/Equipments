import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Typography from "@/components/atoms/Typography";
import { MinMaxFilterType } from "@/constants/types";
import IconButton from "@/components/molecules/IconButton";
import FilterInput from "@/components/molecules/FilterInput";

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: MinMaxFilterType) => void;
  prevFilter: MinMaxFilterType;
}

export default function FilterOverlay({
  isOpen,
  onClose,
  onApply,
  prevFilter,
}: FilterOverlayProps) {
  const [filters, setFilters] = useState<MinMaxFilterType>(prevFilter);

  useEffect(() => {
    if (isOpen) {
      setFilters(prevFilter);
    }
  }, [isOpen, prevFilter]);

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
            Filtering Options
          </Typography>
          <IconButton Icon={X} onClick={onClose} style={{ padding: 0 }} />
        </div>
        <div className="flex flex-col gap-4">
          <FilterInput
            label="Min Price"
            value={filters.minPrice ?? ""}
            setValue={(v) => setFilters({ ...filters, minPrice: v })}
            type="number"
          />
          <FilterInput
            label="Max Price"
            value={filters.maxPrice ?? ""}
            setValue={(v) => setFilters({ ...filters, maxPrice: v })}
            type="number"
          />
          <FilterInput
            label="Min Quantity"
            value={filters.minQuantity ?? ""}
            setValue={(v) => setFilters({ ...filters, minQuantity: v })}
            type="number"
          />
          <FilterInput
            label="Max Quantity"
            value={filters.maxQuantity ?? ""}
            setValue={(v) => setFilters({ ...filters, maxQuantity: v })}
            type="number"
          />
          <IconButton
            onClick={() => onApply(filters)}
            label="Apply Filters"
            bgColor="var(--primary)"
          />
        </div>
      </div>
    </div>
  );
}
