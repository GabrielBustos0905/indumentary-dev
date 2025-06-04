"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export function Social() {

    return (
        <div className="w-full">
            <Button size="lg" className="w-full cursor-pointer" variant="outline" onClick={() => { }}>
                <FcGoogle className="h-5 w-5" />
            </Button>
        </div>
    )
}