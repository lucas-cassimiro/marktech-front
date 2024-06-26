'use client'

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from 'react'

import { ProductTypes } from '@/interfaces/products-types'
import { toast } from 'react-toastify';

export interface Products extends ProductTypes {
    quantity: number;
}

interface CartContextProps {
    cart: Products[]
    cartOpen: boolean
    setCartOpen: Dispatch<SetStateAction<boolean>>
    addProductIntoCart: (product: ProductTypes) => void
    removeProductFromCart: (product: Products) => void
    productCartIncrement: (product: Products) => void
    productCartDecrement: (product: Products) => void
}

interface CartProviderProps {
    children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

const localStorageKey = '@MarkTech:cart'

export function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<Products[]>([])
    const [cartOpen, setCartOpen] = useState<boolean>(false)

    useEffect(() => {
        if (cart.length === 0) return
        localStorage.setItem(localStorageKey, JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        const cartFromLocalStorage = localStorage.getItem(localStorageKey)

        const parsedCart =
            cartFromLocalStorage !== null ? JSON.parse(cartFromLocalStorage) : []

        setCart(parsedCart)
    }, [])

    function ClearCart() {
        localStorage.removeItem(localStorageKey)
    }

    function addProductIntoCart(product: ProductTypes): void {
        const productExistentInCart = cart.find(
            (item) => item.name === product.name && item.id === product.id
        )

        if (productExistentInCart) {
            const newCart = cart.map((item) => {
                if (item.id === product.id) {
                    const quantity = item.quantity + 1

                    return { ...item, quantity }
                }

                return item
            })

            toast.success(`${product.name} adicionado nos pedidos!`)
            setCart(newCart)

            return
        }

        const newProduct = { ...product, quantity: 1 }
        const newCart = [...cart, newProduct]

        toast.success(`${product.name} adicionado nos pedidos!`)
        setCart(newCart)
    }

    function removeProductFromCart(product: Products) {
        const newCart = cart.filter(
            (item) => !(item.id === product.id && item.name === product.name)
        );

        setCart(newCart)

        ClearCart()
    }

    function updateProductQuantity(product: Products, newQuantity: number) {
        if (newQuantity <= 0) return

        const productExistentInCart = cart.find(
            (item) => item.id === product.id && item.name === product.name
        )

        if (!productExistentInCart) return

        const newCart = cart.map((item) => {
            if (
                item.id === productExistentInCart.id &&
                item.name === productExistentInCart.name
            ) {
                return {
                    ...item,
                    quantity: newQuantity,
                }
            }

            return item
        })

        setCart(newCart)
    }

    function productCartIncrement(product: Products) {
        updateProductQuantity(product, product.quantity + 1)
    }

    function productCartDecrement(product: Products) {
        updateProductQuantity(product, product.quantity - 1)
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                cartOpen,
                setCartOpen,
                addProductIntoCart,
                removeProductFromCart,
                productCartIncrement,
                productCartDecrement,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
