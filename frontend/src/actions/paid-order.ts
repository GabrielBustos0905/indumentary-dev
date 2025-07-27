interface ItemsOrder {
    productId: string;
    size: string;
    quantity: number;
}

export const paidOrder = async (items: ItemsOrder[]) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-preference`, {
    method: 'POST',
    credentials: 'include', // si usás cookies para auth
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items })
  })

  if (!res.ok) {
    throw new Error('No se pudo crear la preferencia de pago')
  }

  const data = await res.json()
  return data.init_point as string
}
