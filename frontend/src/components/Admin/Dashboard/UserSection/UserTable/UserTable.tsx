"use client"

import { Loader } from "@/components/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUser } from "@/contexts/UserContext/UserContext"
import { UpdateUser } from "../UpdateUser";

export function UserTable() {
    const { users, loading } = useUser();

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className="overflow-x-auto rounded-lg border mr-4 my-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-6">No hay usuarios</TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.userType}</TableCell>
                                    <TableCell>
                                        <UpdateUser userId={user.id} userType={user.userType} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}