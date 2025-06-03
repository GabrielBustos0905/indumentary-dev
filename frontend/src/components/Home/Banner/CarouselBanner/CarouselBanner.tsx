type TickerBannerProps = {
    direction?: 'left' | 'right';
};

export function CarouselBanner({ direction = 'left' }: TickerBannerProps) {
    const animationClass =
        direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee';

    const items = [
        '🚚 Envíos a todo el país',
        '🎁 10% OFF pagando en efectivo',
        '🛍️ Cambios sin cargo',
        '👕 Nueva temporada disponible',
    ];

    return (
        <div className="w-full bg-black overflow-hidden whitespace-nowrap relative">
            <div className={`flex w-max ${animationClass} hover:pause text-white py-2 text-sm sm:text-base font-medium`}>
                {Array(2)
                    .fill(items)
                    .flat()
                    .map((text, i) => (
                        <span key={i} className="mx-8">
                            {text}
                        </span>
                    ))}
            </div>
        </div>
    );
}
