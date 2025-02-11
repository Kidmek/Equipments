"use client";

import Dropdown from "@/components/atoms/Dropdown";
import FilterButton from "@/components/atoms/FilterButton";
import Typography from "@/components/atoms/Typography";
import { Houses, Places, PropertyTypes } from "@/constants/dummy";
import { FilterImage, SortImage } from "@/constants/images";
import HouseCard from "@/components/organisms/home/HouseCard";
import React, { useState } from "react";

type Filter = {
  location: string | null;
  propertyType: string | null;
};

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>({
    location: null,
    propertyType: null,
  });
  return (
    <div className="flex flex-col items-center py-[14px] px-[24px] gap-[17px] ">
      <div className="px-[28.5px] py-[8px] bg-[#002347] rounded-[25px] w-min ">
        <Typography
          className="font-poppins font-[14px] line-height-[21px] text-white"
          weight="600"
        >
          Rent
        </Typography>
      </div>
      <div className="flex gap-[6px] items-center w-full justify-between ">
        <FilterButton src={FilterImage.src} onClick={() => {}} />
        <FilterButton src={SortImage.src} onClick={() => {}} />
        <Dropdown
          options={Places}
          selected={filter.location}
          onSelect={(e) => {
            setFilter({ ...filter, location: e });
          }}
          placeholder="Location"
        />
        <Dropdown
          options={PropertyTypes}
          selected={filter.propertyType}
          onSelect={(e) => {
            setFilter({ ...filter, propertyType: e });
          }}
          placeholder="Property Type"
        />
      </div>
      {Houses.map((house) => (
        <HouseCard key={house.id} house={house} />
      ))}
    </div>
  );
}
