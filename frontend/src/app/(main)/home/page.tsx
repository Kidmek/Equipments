"use client";

import Dropdown from "@/components/atoms/Dropdown";
import FilterButton from "@/components/atoms/FilterButton";
import Typography from "@/components/atoms/Typography";
import {
  EquipmentCategory,
  EquipmentCategoryMap,
  EquipmentType,
  SortByEnums,
  SortOrderEnums,
} from "@/constants/dummy";
import { FilterImage, SortImage } from "@/constants/images";
import React, { useState, useEffect, useCallback } from "react";
import {
  MinMaxFilterType,
  SingleEquipmentType,
  SortFilterType,
} from "@/constants/types";
import FilterOverlay from "@/components/organisms/home/FilterOverlay";
import SortOverlay from "@/components/organisms/home/SortOverlay";
import { Search } from "lucide-react";
import EquipmentCard from "@/components/organisms/home/EquipmentCard";
import Loader from "@/components/atoms/Loader";

type Filter = {
  category: string | null;
  type: string | null;
  search: string;
};

type OverlayType = "filter" | "sort" | null;

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>({
    category: null,
    type: null,
    search: "",
  });
  const [tempSearch, setTempSearch] = useState("");
  const [minMaxFilters, setMinMaxFilters] = useState<MinMaxFilterType>({
    minPrice: "",
    maxPrice: "",
    minQuantity: "",
    maxQuantity: "",
  });
  const [sortFilters, setSortFilters] = useState<SortFilterType>({
    sortBy: SortByEnums.CREATED_AT,
    sortOrder: SortOrderEnums.ASC,
  });
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState<SingleEquipmentType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearchAndFilter = useCallback(async () => {
    setLoading(true);

    const params: Record<string, string> = {};

    Object.entries(minMaxFilters ?? {}).forEach(([k, v]) => {
      if (v) {
        params[k] = v;
      }
    });

    Object.entries(sortFilters ?? {}).forEach(([k, v]) => {
      if (v) {
        params[k] = v;
      }
    });
    Object.entries(filter ?? {}).forEach(([k, v]) => {
      if (v) {
        params[k] = v;
      }
    });

    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/equipment?${queryString}`,
        {
          method: "GET",
        }
      );

      const resJson = await response.json();
      if (resJson.data) {
        setEquipments(resJson.data);
        setError(null);
      } else {
        setError("Unable to fetch equipments");
      }
    } catch (error) {
      console.log(error);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [filter, minMaxFilters, sortFilters]);

  const handleInputChange = (key: keyof Filter, value: string) => {
    if (key === "search") {
      setTempSearch(value!);
    } else if (filter[key] !== value) {
      if (
        key === "category" &&
        filter.type &&
        !EquipmentCategoryMap[value as EquipmentCategory].includes(
          filter.type as EquipmentType
        )
      ) {
        setFilter((prev) => ({ ...prev, [key]: value, type: "" }));
      }

      setFilter((prev) => ({ ...prev, [key]: value }));
    } else {
      setFilter((prev) => ({ ...prev, [key]: null }));
    }
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [filter, handleSearchAndFilter, minMaxFilters, sortFilters]);

  return (
    <div className="flex flex-col items-center py-4 px-6 gap-4">
      <FilterOverlay
        onClose={() => setActiveOverlay(null)}
        isOpen={activeOverlay === "filter"}
        onApply={(e) => {
          console.log(e);
          setMinMaxFilters(e);
          setActiveOverlay(null);
        }}
        prevFilter={minMaxFilters}
      />
      <SortOverlay
        onClose={() => setActiveOverlay(null)}
        isOpen={activeOverlay === "sort"}
        onApply={(e) => {
          setSortFilters(e);
          setActiveOverlay(null);
        }}
        prevSort={sortFilters}
      />
      <div className="px-7 py-2 bg-[#002347] rounded-3xl w-min">
        <Typography className="font-poppins text-sm text-white" weight="600">
          Equipment
        </Typography>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-4 pr-10 border border-primary
           rounded-lg "
          value={tempSearch}
          onChange={(e) => handleInputChange("search", e.target.value)}
        />
        <button
          className="absolute right-3 top-2 text-primary"
          onClick={() => {
            if (filter.search !== tempSearch) {
              setFilter({ ...filter, search: tempSearch });
            }
          }}
        >
          <Search className="w-5 h-5 text-primary" />
        </button>
      </div>

      <div className="flex items-center w-full justify-between">
        <Dropdown
          options={Object.keys(EquipmentCategoryMap)}
          selected={filter.category}
          onSelect={(e) => handleInputChange("category", e)}
          placeholder="Category"
        />
        <Dropdown
          options={
            filter.category
              ? EquipmentCategoryMap[filter.category as EquipmentCategory]
              : Object.keys(EquipmentType)
          }
          selected={filter.type}
          onSelect={(e) => handleInputChange("type", e)}
          placeholder="Equipment Type"
        />
      </div>

      <div className="flex gap-2 items-center w-full justify-between flex-wrap">
        <FilterButton
          src={FilterImage.src}
          onClick={() => setActiveOverlay("filter")}
        />
        <FilterButton
          src={SortImage.src}
          onClick={() => setActiveOverlay("sort")}
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader />
        </div>
      ) : equipments.length > 0 ? (
        equipments.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))
      ) : error ? (
        <div className="text-red-400 text-center py-4">{error}</div>
      ) : (
        <div className="text-gray-500 text-center py-4">
          No equipment found matching your criteria.
        </div>
      )}
    </div>
  );
}
