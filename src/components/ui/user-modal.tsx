'use client'

import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { useState } from "react"
import { CiUser } from "react-icons/ci"

export default function UserModal() {
    const [log, setLog] = useState<boolean>(false)
    const [showLoginOptions, setShowLoginOptions] = useState<boolean>(false)

    const { user } = useAuth()

    const openModal = () => {
        setLog(true)
        setShowLoginOptions(false)
    }

    return (
        <>
            {!user && (
                <li
                    className='text-[#2c2f7b] text-xl cursor-pointer relative'
                    onMouseEnter={() => setShowLoginOptions(true)}
                    onMouseLeave={() => setShowLoginOptions(false)}
                    onClick={openModal}
                >
                    Login
                    {showLoginOptions && (
                        <div className='absolute top-full left-0 bg-white border border-gray-200 p-4 flex flex-col'>
                            <Link href='/login/cliente' className='text-[#2c2f7b] text-lg cursor-pointer mb-2'>Clientes</Link>
                            <Link href='/login/parceiro' className='text-[#2c2f7b] text-lg cursor-pointer'>Parceiros</Link>
                        </div>
                    )}
                </li>
            )}

            {user && <div className='flex flex-col items-center'>
                <CiUser size='1.75rem' className='cursor-pointer' />
            </div>}
        </>
    )
}
