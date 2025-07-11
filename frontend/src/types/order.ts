export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "CANCELLED"

export interface OrderItem {
  id: string
  productId: string
  size: string
  quantity: number
  unitPrice: number
  product: {
    id: string
    name: string
    slug: string
    images: {
      id: string
      url: string
    }[]
  }
}

export interface Order {
  id: string
  userId: string
  total: number
  status: OrderStatus
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
  items: OrderItem[]
}
