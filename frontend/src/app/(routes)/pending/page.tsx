import { Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function PendingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
            <Card className="max-w-md w-full shadow-xl p-6 text-center space-y-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <Clock className="text-yellow-500 w-14 h-14 animate-pulse" />
                    <h1 className="text-2xl font-bold text-gray-800">Pago en proceso</h1>
                    <p className="text-gray-600">
                        Estamos verificando tu pago. Te notificaremos por email una vez se haya confirmado.
                    </p>
                </div>

                <CardContent className="flex flex-col gap-3">
                    <Link href="/">
                        <Button className="w-full">Volver al inicio</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}
