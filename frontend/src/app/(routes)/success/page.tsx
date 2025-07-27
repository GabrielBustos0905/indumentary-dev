import { CheckCircle2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
            <Card className="max-w-md w-full shadow-xl p-6 text-center space-y-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <CheckCircle2 className="text-green-500 w-14 h-14 animate-bounce" />
                    <h1 className="text-2xl font-bold text-gray-800">¡Pago exitoso!</h1>
                    <p className="text-gray-600">
                        Gracias por tu compra. En breve recibirás la confirmación de tu pedido.
                    </p>
                </div>

                <CardContent className="flex flex-col gap-3">
                    <Link href="/">
                        <Button className="w-full">Volver al inicio</Button>
                    </Link>
                    <Link href="/catalogo">
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            Seguir comprando
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}
