/* eslint-disable @next/next/no-img-element */
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/format-price"
import { Trash2 } from "lucide-react"
import { CheckoutButton } from "./CheckoutButton";

export function CartContent() {
    const { items, removeItem } = useCartStore();
    const prices = items.map(product => product.price);
    const totalPrice = prices.reduce((total, price) => total + price + 0)

    return (
        <div>
            <ul className="flex flex-col gap-4 h-[300px] items-center mt-8 overflow-auto scrollbar-thin scrollbar-track-gray-500">
                {
                    items.map((item) => (
                        <li key={`${item.productId}-${item.size}`} className="flex w-[330px] pt-1 justify-between">
                            <div className="flex gap-4">
                                <img
                                    src={item.imageUrl}
                                    alt={item.slug}
                                    className="w-[100px] h-[120px]"
                                />
                                <div>
                                    <p className="text-md font-medium uppercase">{item.name}</p>
                                    <p className="text-md text-gray-800 font-semibold my-2">{formatPrice(item?.price)}</p>
                                    <div className="flex items-center gap-2">
                                        <p>Tamaño: </p>
                                        <p className="text-gray-600 capitalize">{item.size}</p>
                                    </div>
                                </div>
                            </div>
                            <Trash2 strokeWidth={1} className="mx-2 hover:scale-125 transition duration-300 cursor-pointer" onClick={() => removeItem(item.productId, item.size)} />
                        </li>
                    ))
                }
            </ul>

            <div className="p-6 rounded-lg">
                <p className="text-lg font-semibold">Orden de Compra</p>
                <Separator />
                <div className="flex justify-between gap-5 my-4">
                    <p>Precio Total</p>
                    <p>{formatPrice(totalPrice)}</p>
                </div>
                <CheckoutButton />
            </div>
        </div>
    )
}