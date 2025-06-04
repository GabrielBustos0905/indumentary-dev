export default function LoginPage() {
    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>
            <form className="space-y-4">
                <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
                <input type="password" placeholder="Contraseña" className="w-full border p-2 rounded" />
                <button type="submit" className="w-full bg-black text-white py-2 rounded">
                    Entrar
                </button>
            </form>
        </div>
    );
}
