export type ProductResponse = {
  data: Product[];
};

export type ProductImage = {
  id: string;
  url: string;
  productId: string;
};

export type ProductType = {
  id: string;
  name: string;
  imageUrl?: string | null;
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
