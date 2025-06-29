import axios from "axios"
import { ProductType } from "@/types/product"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

export const fetchProductTypes = async (): Promise<ProductType[]> => {
  const { data } = await axios.get<ProductType[]>(`${API_URL}/product-type`, {
    withCredentials: true
  })
  return data
}
