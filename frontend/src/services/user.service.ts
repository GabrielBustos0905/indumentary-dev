import axios from "axios";
import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/users` : "https://indumentary-dev.onrender.com/users";

// Obtener todos los usuarios
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(API_URL, {
    withCredentials: true,
  });
  return data;
};

// Obtener un usuario por ID
export const fetchUserById = async (id: string): Promise<User> => {
  const { data } = await axios.get<User>(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return data;
};
