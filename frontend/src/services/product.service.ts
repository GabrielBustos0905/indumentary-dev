import { Product, ProductCreateInput, ProductResponse, ProductUpdateInput } from "@/types/product"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://indumentary-dev.onrender.com"

export const fetchProducts = async (
  queryParams: Record<string, unknown> = {}
): Promise<ProductResponse> => {
  const { data } = await axios.get<ProductResponse>(API_URL, { 
    params: queryParams ,
    withCredentials: true
  })
  return data
}

export const fetchProductById =  async (slug: string): Promise<Product> => {
  const { data } =  await axios.get(`${API_URL}/${slug}`, {
    withCredentials: true
  })

  return data
}

export const createProduct = async (productData: ProductCreateInput): Promise<Product> => {
  const { data } = await axios.post<Product>(API_URL, productData, {
    withCredentials: true
  })
  return data
}

export const updateProduct = async (id: string, productData: ProductUpdateInput): Promise<Product> => {
  const { data } = await axios.put<Product>(`${API_URL}/${id}`, productData, {
    withCredentials: true
  })
  return data
}

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const { data } = await axios.delete<{ message: string }>(`${API_URL}/${id}`, {
    withCredentials: true
  })
  return data
}