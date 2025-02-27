import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEnumString(enumValue: string): string {
  return enumValue
    .toLowerCase() // Convert to lowercase: "material_handling"
    .split("_") // Split by underscores: ["material", "handling"]
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join back into a string: "Material Handling"
}

export function getImageUrl(image?: string): string {
  if (!image) {
    return "/logo.png";
  }
  return `${process.env.NEXT_PUBLIC_API}/uploads/${image}`;
}
