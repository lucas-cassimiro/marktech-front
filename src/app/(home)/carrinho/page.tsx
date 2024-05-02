'use client'

import { EmptyCart } from "@/components/ui/empty-cart"
import { useCart } from "@/hooks/use-cart"

import Cart from "@/components/ui/cart"

export default function MyCart() {
    const { cart } = useCart()

    return (
        <>
            {cart.length === 0 && <EmptyCart title='Ops! Seu carrinho está vazio' />}
            {cart.length >= 1 && <Cart />}
        </>
    )
}
