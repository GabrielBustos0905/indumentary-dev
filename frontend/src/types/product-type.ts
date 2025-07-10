export interface ProductType {
  id: string
  name: string
  description: string
  imageUrl?: string
}

export interface ProductTypeCreateInput {
  name: string
  description: string
  imageUrl?: string
}

export interface ProductTypeUpdateInput {
  name?: string
  description?: string
  imageUrl?: string
}
