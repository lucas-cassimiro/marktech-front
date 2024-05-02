'use client'

import currencyFormat from "@/helpers/currency-format"
import { useCart } from "@/hooks/use-cart"
import { FaTrashAlt } from "react-icons/fa"
import ConfirmOrder from "./confirm-order"

import minusImg from '@/assets/circle-minus.svg'
import plusImg from '@/assets/circle-plus.svg'
import Image from "next/image"

export default function Cart() {
    const { cart, productCartDecrement, productCartIncrement, removeProductFromCart } = useCart()

    return (
        <section className='w-[70%] m-auto bg-[#0C0D0F] text-white rounded-lg'>
            <table className="w-full border-collapse border-spacing-0 text-white">
                <thead>
                    <tr>
                        <th></th>
                        <th className="p-4 text-lg uppercase">Produto</th>
                        <th className="p-4 text-lg uppercase">QTD</th>
                        <th className="p-4 text-lg uppercase">Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={`${item.name}`} className="border-b border-gray-400">
                            <td className="w-32 p-0">
                                <Image src={`http://localhost:3333/tmp/uploads/${item.image}`} className="object-cover w-full h-32 rounded-lg" alt='Imagem do produto' width={150} height={150} />
                            </td>
                            <td className="p-4">
                                <h4>{item.name}</h4>
                                <span>{currencyFormat(item.price)}</span>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        type='button'
                                        onClick={() => productCartDecrement(item)}
                                        className="flex items-center justify-center w-8 h-8 border-gray-400 rounded-full cursor-pointer"
                                    >
                                        <Image src={minusImg} alt='Remover quantidade' />
                                    </button>
                                    <span>{`${item.quantity}`.padStart(2, '0')}</span>
                                    <button
                                        type='button'
                                        onClick={() => productCartIncrement(item)}
                                        className="flex items-center justify-center w-8 h-8 border-gray-400 rounded-full cursor-pointer"
                                    >
                                        <Image src={plusImg} alt='Adicionar quantidade' />
                                    </button>
                                </div>
                            </td>
                            <td className="p-4">
                                <h5>{currencyFormat(item.price * item.quantity)}</h5>
                            </td>
                            <td className="p-4">
                                <button
                                    type='button'
                                    onClick={() => removeProductFromCart(item)}
                                    className="flex items-center justify-end w-8 h-8 border-gray-400 rounded-full cursor-pointer"
                                >
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmOrder />
        </section>
    )
}