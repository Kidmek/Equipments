export type HouseType = {
  id: number;
  title: string;
  originalPrice: string;
  discountedPrice: string;
  subCity: string;
  city: string;
  country: string;
  beds: number;
  baths: number;
  size: number;
  image: string;
  featured?: boolean;
  hearted?: boolean;
};
