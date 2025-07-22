import axios from "axios"
import { ProductType, ProductTypeCreateInput, ProductTypeUpdateInput } from "@/types/product-type"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://indumentary-dev.onrender.com";

export const fetchProductTypes = async (): Promise<ProductType[]> => {
  const { data } = await axios.get<ProductType[]>(`${API_URL}/product-type`, {
    withCredentials: true
  })
  return data
}

export const createProductType = async (
  newType: ProductTypeCreateInput
): Promise<ProductType> => {
  const { data } = await axios.post<ProductType>(API_URL, newType, {
    withCredentials: true
  })
  return data
}

// PUT: Actualizar tipo
export const updateProductType = async (
  id: string,
  updatedType: ProductTypeUpdateInput
): Promise<ProductType> => {
  const { data } = await axios.put<ProductType>(`${API_URL}/${id}`, updatedType, {
    withCredentials: true
  })
  return data
}

// DELETE: Eliminar tipo
export const deleteProductType = async (
  id: string
): Promise<{ message: string }> => {
  const { data } = await axios.delete<{ message: string }>(`${API_URL}/${id}`, {
    withCredentials: true
  })
  return data
}
