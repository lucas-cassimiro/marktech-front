'use client'

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Permissions({ children }: { children: React.ReactNode }) {
    const { userPartner } = useAuth()

    const router = useRouter()

    useEffect(() => {
        if (!userPartner) router.push('/')
    }, [])

    return <>{children}</>
}