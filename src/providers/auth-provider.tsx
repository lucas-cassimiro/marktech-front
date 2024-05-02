'use client'

import { ReactNode } from 'react'

import { AuthProvider } from '@/contexts/auth-context';

export default function ProviderAuth({
    children,
}: {
    children: ReactNode;
}) {
    return <AuthProvider>{children}</AuthProvider>
}
