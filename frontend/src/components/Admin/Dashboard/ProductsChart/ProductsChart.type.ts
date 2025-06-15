type OrderItem = {
    quantity: number
    unitPrice: number
    product: { name: string }
}

export type Order = {
    createdAt: string
    items: OrderItem[]
}