'use client'

import { ReactNode } from 'react'

import { CartProvider } from '@/contexts/cart-context'

export default function ProviderCart({
    children,
}: {
    children: ReactNode;
}) {
    return <CartProvider>{children}</CartProvider>
}
