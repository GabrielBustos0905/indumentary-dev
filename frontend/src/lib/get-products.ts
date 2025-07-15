import type { Product } from '@/types/product';

export async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?isFeatured=true`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Error al obtener productos');

  const json: { data: Product[] } = await res.json();

  return json.data;
}

