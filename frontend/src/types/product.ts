import { ProductType } from "./product-type";

export type ProductResponse = {
  data: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number
};

export type ProductImage = {
  id: string;
  url: string;
  productId: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  stock: number;
  isFeatured: boolean;
  offer: number;
  type: ProductType;
  typeId: string;
  availableSizes: string[];
  images: ProductImage[];
  createdAt: string; // o Date, dependiendo de si lo parseás
  updatedAt: string;
};

export type ProductCreateInput = Omit<Product, "id" | "slug" | "createdAt" | "updatedAt" | "type"> & {
  images: { url: string }[]
}

export type ProductUpdateInput = Partial<ProductCreateInput>
