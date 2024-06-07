'use client'

import { useCart } from "@/hooks/use-cart"
import Image from "next/image"
import { FaKey } from 'react-icons/fa'

import currencyFormat from "@/helpers/currency-format"

import Logo from '@/assets/logo.png'
import { useAuth } from "@/hooks/use-auth"
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react"

export default function Checkout() {
    const { cart } = useCart()
    const { user } = useAuth()

    return (
        <section className='relative flex flex-col'>
            <div className='bg-black w-[1036px] h-[70.6px] flex justify-center'>
                <Image src={Logo} alt='Logo' className='w-[100px] h-[80px]' />
                <div className='flex items-center gap-3 text-white'>
                    <span>100% seguro</span>
                    <FaKey />
                </div>
            </div>
            <div className='flex flex-col items-center w-[1035px] py-20'>
                <div className='flex flex-col border-b-1 border-[#c0c0c0] w-[500px] py-8'>
                    <h3 className='text-2xl font-semibold mb-5'>1. Identificação</h3>
                    <span>{user?.email}</span>
                    <span>{user?.first_name} {user?.last_name}</span>
                    <span>{user?.cellphone}</span>
                </div>

                <div className='flex flex-col border-b-1 border-[#c0c0c0] w-[500px] py-8'>
                    <h3 className='text-2xl font-semibold mb-5'>2. Endereço</h3>
                    <form
                        className="flex flex-col mb-7"
                    >
                        <label htmlFor="postalcode" className="text-sm text-[#878787] mb-1">
                            CEP*
                        </label>
                        <input
                            id="postalcode"
                            maxLength={8}
                        />
                        <a
                            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                            target="_blank"
                            className="underline text-sm mb-5"
                        >
                            Não sei meu CEP
                        </a>

                        <label htmlFor="endereco" className="text-sm text-[#878787] mb-1">
                            Endereço*
                        </label>
                        <input
                            type="text"
                            id="endereco"
                        />
                        <div className="flex gap-3 min-w-[250px] w-full">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="number" className="text-sm text-[#878787] mb-1">
                                    Número*
                                </label>
                                <input
                                    type="number"
                                    id="number"
                                    className='w-[80px] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4'
                                />
                            </div>

                            <div className="flex flex-col mb-3 w-full min-w-[150px]">
                                <label
                                    htmlFor="complement"
                                    className="text-sm text-[#878787] mb-1"
                                >
                                    Complemento
                                </label>
                                <input
                                    type="text"
                                    id="complement"
                                    className='max-w-[330px] min-w-[9rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4'
                                />
                            </div>
                        </div>

                        <label
                            htmlFor="neighborhood"
                            className="text-sm text-[#878787] mb-1"
                        >
                            Bairro*
                        </label>
                        <input
                            type="text"
                            id="neighborhood"
                            className='max-w-[26.5rem] min-w-[15rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3'
                        />
                        <div className="flex gap-3 min-w-[250px] w-full">
                            <div className="flex flex-col mb-3 w-[310px] min-w-[150px]">
                                <label htmlFor="city" className="text-sm text-[#878787] mb-1">
                                    Cidade*
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    className='max-w-[330px] min-w-[9rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4'
                                />
                            </div>

                            <div className="flex flex-col mb-3">
                                <label htmlFor="state" className="text-sm text-[#878787] mb-1">
                                    Estado*
                                </label>
                                <input
                                    className='w-[100px] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4'
                                    id="state"
                                />
                            </div>
                        </div>

                        <label htmlFor="recipient" className="text-sm text-[#878787] mb-1">
                            Destinatário*
                        </label>
                        <input
                            type="text"
                            id="recipient"
                            className='max-w-[26.5rem] min-w-[15rem] border bg-[#EFEFEF4D] border-[#c0c0c0] h-12 py-3 px-4 mb-3'
                        />
                        <div className="flex gap-2">
                            <Button
                                color="primary"
                            // className="w-[13rem]"
                            >
                                Salvar
                            </Button>
                        </div>
                    </form>

                </div>

                <div className='flex flex-col border-b-1 border-[#c0c0c0] w-[500px] py-8'>
                    <h3 className='text-2xl font-semibold mb-5'>3. Entrega - Selecione o tipo do pagamento</h3>
                    <div className='flex flex-col'>
                        <CheckboxGroup
                            label='Tipo do pagamento'
                            defaultValue={['pix']}
                        >
                            <Checkbox value="pix">Pix</Checkbox>
                            <Checkbox value="boleto">Boleto</Checkbox>
                            <Checkbox value="credito">Cartão de crédito</Checkbox>
                            <Checkbox value="debito">Cartão de débito</Checkbox>
                        </CheckboxGroup>
                    </div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className='ml-auto absolute h-full right-0 w-[500px] border-l-1 border-black p-10 bg-white'>
                <h3 className='text-2xl font-semibold'>Resumo do pedido</h3>
                <div className='flex flex-col gap-10'>
                    {cart.map(cart => (
                        <div className='flex items-center gap-5 border-b-1 border-black py-5' key={cart.id}>
                            <Image src={`http://localhost:3333/tmp/uploads/${cart.image}`} alt='Produto' width={100} height={100} />
                            <div className='flex flex-col'>
                                <span>{cart.name}</span>
                                <span className='text-[#878787]'>Quantidade: <strong className='text-black'>{cart.quantity}</strong></span>
                                <span className='text-black font-bold'>{currencyFormat(cart.price)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}