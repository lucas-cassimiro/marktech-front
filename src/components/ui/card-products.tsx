'use client'

import currencyFormat from "@/helpers/currency-format"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@nextui-org/react"
import Image from "next/image"

export default function CardProducts(product: any) {
    const { addProductIntoCart, cart } = useCart()

    const productExistent = cart.find((item) => item.id === product.product.id && item.name === product.product.name)

    return (
        <div className='w-[150px] flex flex-col'>
            <div className='relative'>
                {productExistent && (
                    <div className='absolute bg-red-500 -right-1 -top-2 text-white rounded-full p-2 w-5 h-5 flex items-center justify-center'>
                        <span>{productExistent.quantity}</span>
                    </div>
                )}
                <Image src={`http://localhost:3333/tmp/uploads/${product.product.image}`} alt='Foto do produto' quality={100} priority={true} width={150} height={130} className='rounded-md' />
            </div>
            <span className='mt-2'>{product.product.name}</span>
            <div className='flex justify-between mt-2'>
                <span className={`${product.product.discount ? 'text-black' : 'text-gray-600 line-through'}`}>{currencyFormat(product.product.price)}</span>
                <div className='relative'>
                    {product.product.discount > 0 && <span className='bg-red-500 text-white px-2 py-1  top-0 right-0 -mt-2 -mr-2 rounded'>-{product.product.discount}%</span>}
                </div>
            </div>
            {product.product.discount > 0 && <span className='text-lg font-semibold mt-2'>{currencyFormat(product.product.price * (1 - product.product.discount / 100))}</span>}
            <Button type='button' color='primary' className='w-full mt-2' onClick={() => addProductIntoCart(product.product)}>Comprar</Button>
        </div>
    )
}