import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

interface TokenPayload {
  id: string;
  userType: string;
  iat?: number;
  exp?: number;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (err) {
    console.error("Error al verificar el token:", err);
    return null;
  }
}


export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    // console.log("❌ No hay token");
    return null;
  }

  // const decoded = verifyToken(token);
  // console.log("✅ Token decodificado:", decoded);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    headers: {
      Cookie: `token=${token}`,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    // console.log("❌ Error en fetch:", res.status);
    return null;
  }

  const { user } = await res.json();
  // console.log("✅ Usuario recibido:", user);
  return user;
}

