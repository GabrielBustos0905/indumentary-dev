"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react"; // importá el spinner que uses en el proyecto

export function Social() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    };

    return (
        <div className="w-full">
            <Button
                size="lg"
                className="w-full cursor-pointer flex items-center justify-center gap-2"
                variant="outline"
                onClick={handleGoogleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                    <FcGoogle className="h-5 w-5" />
                )}
            </Button>
        </div>
    );
}
