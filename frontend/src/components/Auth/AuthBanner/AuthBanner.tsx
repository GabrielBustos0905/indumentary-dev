import { Dancing_Script } from "next/font/google";
import Image from "next/image";

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400'] })

export function AuthBanner() {
    return (
        <div className={`hidden md:block w-1/2 relative h-screen`}>
            <Image
                src="/banner.png"
                alt="Banner"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="/tu-imagen.png"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className={`text-white text-3xl md:text-4xl font-semibold text-center px-4 ${dancingScript.className}`}>
                    Indumentary - Dev<br />
                    <span className="text-lg font-light tracking-wide">
                        El mejor estilo
                    </span>
                </h2>
            </div>
        </div>
    );
};
