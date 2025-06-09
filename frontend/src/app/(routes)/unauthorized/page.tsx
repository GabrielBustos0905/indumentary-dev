import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Acceso denegado</h1>
                <p className="text-gray-600 mb-6">
                    No tenés permisos para acceder a esta página.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
