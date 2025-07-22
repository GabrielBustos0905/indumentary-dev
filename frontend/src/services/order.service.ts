import axios from "axios"
import { Order, OrderStatus } from "@/types/order"

const API_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/order` : "https://indumentary-dev.onrender.com/order";

export const fetchOrders = async (): Promise<Order[]> => {
  const { data } = await axios.get<Order[]>(API_URL, {
    withCredentials: true,
  })
  return data
}

export const getOrderById = async (id: string): Promise<Order> => {
  const { data } = await axios.get<Order>(`${API_URL}/${id}`, {
    withCredentials: true
  })
  return data
}

export const deleteOrder = async (id: string): Promise<{ message: string }> => {
  const { data } = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  })
  return data
}

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus
): Promise<Order> => {
  const { data } = await axios.put(`${API_URL}/${id}`, { status }, {
    withCredentials: true,
  })
  return data
}
