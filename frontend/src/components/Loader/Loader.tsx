import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400'] })

export function Loader() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-2">
            <h2 className={`text-3xl md:text-4xl font-semibold text-center px-4 ${dancingScript.className}`}>
                Indumentary - Dev<br />
                <span className="text-lg font-light tracking-wide">
                    El mejor estilo
                </span>
            </h2>
            <div className="loader p-5 rounded-full flex space-x-3">
                <div className="w-5 h-5 bg-gray-900 rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-gray-900 rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-gray-900 rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-gray-900 rounded-full animate-bounce"></div>
            </div>
        </div>
    )
}