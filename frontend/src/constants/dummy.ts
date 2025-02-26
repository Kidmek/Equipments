export enum EquipmentCategory {
  EARTHMOVING_EQUIPMENT = "EARTHMOVING_EQUIPMENT",
  CONSTRUCTION_VEHICLES = "CONSTRUCTION_VEHICLES",
  MATERIAL_HANDLING = "MATERIAL_HANDLING",
  CONCRETE_EQUIPMENT = "CONCRETE_EQUIPMENT",
  COMPACTION_EQUIPMENT = "COMPACTION_EQUIPMENT",
  PAVING_EQUIPMENT = "PAVING_EQUIPMENT",
}

export enum EquipmentType {
  // Earthmoving Equipment
  EXCAVATOR = "EXCAVATOR",
  BULLDOZER = "BULLDOZER",
  LOADER = "LOADER",
  BACKHOE = "BACKHOE",
  GRADER = "GRADER",

  // Construction Vehicles
  DUMP_TRUCK = "DUMP_TRUCK",
  WATER_TRUCK = "WATER_TRUCK",
  CONCRETE_MIXER_TRUCK = "CONCRETE_MIXER_TRUCK",

  // Material Handling
  FORKLIFT = "FORKLIFT",
  TELEHANDLER = "TELEHANDLER",
  CRANE = "CRANE",
  HOIST = "HOIST",

  // Concrete Equipment
  CONCRETE_MIXER = "CONCRETE_MIXER",
  CONCRETE_PUMP = "CONCRETE_PUMP",
  CONCRETE_VIBRATOR = "CONCRETE_VIBRATOR",

  // Compaction Equipment
  ROLLER = "ROLLER",
  PLATE_COMPACTOR = "PLATE_COMPACTOR",
  RAMMER = "RAMMER",

  // Paving Equipment
  ASPHALT_PAVER = "ASPHALT_PAVER",
  ROAD_ROLLER = "ROAD_ROLLER",
  CHIP_SPREADER = "CHIP_SPREADER",
}

type EquipmentCategoryMapType = {
  [key in EquipmentCategory]: EquipmentType[];
};

export const EquipmentCategoryMap: EquipmentCategoryMapType = {
  [EquipmentCategory.EARTHMOVING_EQUIPMENT]: [
    EquipmentType.EXCAVATOR,
    EquipmentType.BULLDOZER,
    EquipmentType.LOADER,
    EquipmentType.BACKHOE,
    EquipmentType.GRADER,
  ],
  [EquipmentCategory.CONSTRUCTION_VEHICLES]: [
    EquipmentType.DUMP_TRUCK,
    EquipmentType.WATER_TRUCK,
    EquipmentType.CONCRETE_MIXER_TRUCK,
  ],
  [EquipmentCategory.MATERIAL_HANDLING]: [
    EquipmentType.FORKLIFT,
    EquipmentType.TELEHANDLER,
    EquipmentType.CRANE,
    EquipmentType.HOIST,
  ],
  [EquipmentCategory.CONCRETE_EQUIPMENT]: [
    EquipmentType.CONCRETE_MIXER,
    EquipmentType.CONCRETE_PUMP,
    EquipmentType.CONCRETE_VIBRATOR,
  ],
  [EquipmentCategory.COMPACTION_EQUIPMENT]: [
    EquipmentType.ROLLER,
    EquipmentType.PLATE_COMPACTOR,
    EquipmentType.RAMMER,
  ],
  [EquipmentCategory.PAVING_EQUIPMENT]: [
    EquipmentType.ASPHALT_PAVER,
    EquipmentType.ROAD_ROLLER,
    EquipmentType.CHIP_SPREADER,
  ],
};

export enum SortOrderEnums {
  ASC = "ASC",
  DESC = "DESC",
}
export enum SortByEnums {
  PRICE = "price",
  QUANTITY = "quantity",
  CREATED_AT = "createdAt",
}
export const SortOptions: { label: string; value: SortByEnums }[] = [
  {
    label: "Price",
    value: SortByEnums.PRICE,
  },
  {
    label: "Quantity",
    value: SortByEnums.QUANTITY,
  },
  {
    label: "Created At",
    value: SortByEnums.CREATED_AT,
  },
];

export const SortOrderOptions: Record<
  "time" | "number",
  { label: string; value: SortOrderEnums }[]
> = {
  time: [
    {
      label: "Oldest to newest",
      value: SortOrderEnums.DESC,
    },
    {
      label: "Newest to oldest",
      value: SortOrderEnums.ASC,
    },
  ],
  number: [
    {
      label: "Highest to lowest",
      value: SortOrderEnums.DESC,
    },
    {
      label: "Lowest to highest",
      value: SortOrderEnums.ASC,
    },
  ],
};
