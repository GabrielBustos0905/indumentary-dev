/* eslint-disable @next/next/no-img-element */
import { fetchProductTypes } from "@/services/product-type.service"
import { ProductType } from "@/types/product-type";
import Link from "next/link";

export async function ChooseCategory() {
    const categories = await fetchProductTypes();

    return (
        <div className="w-screen md:max-w-7xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8 uppercase">Elija la categoria que desee</h3>
            <div className="grid grid-cols-2 gap-2 md:flex md:gap-1">
                {
                    categories?.map((category: ProductType) => (
                        <Link
                            href={`/catalogo?typeId=${category.name}`}
                            key={category.id}
                            className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
                        >
                            <img
                                src={category.imageUrl ?? category.imageUrl}
                                alt={category.name}
                                className="max-w-[270px] h-[320px] transition duration-350 ease-in-out rounded-lg hover:scale-110 w-60"
                            />
                            <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">{category.name}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}