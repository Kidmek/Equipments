import { HouseType } from "./types";

export const Houses: HouseType[] = [
  {
    id: 1,
    title: "Apartment for rent",
    originalPrice: "35,000",
    discountedPrice: "34,000",
    subCity: "CMC",
    city: "Addis Ababa",
    country: "Ethiopia",
    beds: 3,
    baths: 2,
    size: 140,
    image: "/home/house1.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Apartment for sale",
    originalPrice: "75,000",
    discountedPrice: "74,000",
    subCity: "Bole",
    city: "Addis Ababa",
    country: "Ethiopia",
    beds: 5,
    baths: 3,
    size: 340,
    image: "/home/house2.jpg",
  },
  {
    id: 3,
    title: "Apartment for sale",
    originalPrice: "75,000",
    discountedPrice: "74,000",
    subCity: "Bole",
    city: "Addis Ababa",
    country: "Ethiopia",
    beds: 5,
    baths: 3,
    size: 340,
    image: "/home/house2.jpg",
    featured: true,
  },
];

export const Places = ["Bole", "4 Kilo", "5 Kilo", "6 Kilo"];
export const PropertyTypes = ["Villa", "Apartment", "Condomminum"];
