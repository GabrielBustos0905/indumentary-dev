
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

export function AddButton({ product }: { product: Product }) {

    return (
        <Button className="uppercase text-sm w-full">Añadir al carrito</Button>
    )
}