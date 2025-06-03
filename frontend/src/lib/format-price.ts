export function formatPrice(price: number) {
    const priceFormated = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS"
    });
    const finalPrice = priceFormated.format(price);

    return finalPrice
}

export function cuotas(price: number, discount: number) {
    const finalPrice = Math.floor(price / discount) + 1

    return formatPrice(finalPrice)
};

export function discount(price: number, discount: number) {
    const percentage = price * (discount / 100)
    const finalPrice = price - percentage

    return finalPrice
}