import { SortByEnums, SortOrderEnums } from "./dummy";

export type PostType = {
  type?: string;
  category?: string;
  description?: string;
  images: (File | null)[];
  price?: string;
  quantity?: string;
  phone?: string;
};

export type SingleEquipmentType = {
  id: string;
  type: string;
  category: string;
  description?: string;
  images: string[];
  price: string;
  quantity: number;
  featured?: boolean;
  phone?: string;
};

export type MinMaxFilterType = {
  minPrice?: string;
  maxPrice?: string;
  minQuantity?: string;
  maxQuantity?: string;
};

export type SortFilterType = {
  sortBy: SortByEnums;
  sortOrder: SortOrderEnums;
};
