import { SubCategory } from "./subCategory";
export interface category {
  id: number;
  name: string;
  imageCategory: string;
  subCategories: SubCategory[];
}
