'use client'

import Link from 'next/link'
import Image from 'next/image'

import { FaLinkedin, FaFacebookSquare, FaYoutube, FaInstagram } from 'react-icons/fa'
import { CiShoppingCart, CiUser } from 'react-icons/ci'

import logo from '@/assets/logo.png'

import { NavTypes } from '@/interfaces/navigation-types'
import { useState } from 'react'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'
import UserModal from './user-modal'

export default function Header({ navigation }: NavTypes) {
    const { cart } = useCart()

    const icons = [
        { icon: <FaLinkedin size='1.5rem' /> },
        { icon: <FaFacebookSquare size='1.5rem' /> },
        { icon: <FaYoutube size='1.5rem' /> },
        { icon: <FaInstagram size='1.5rem' /> }
    ];

    return (
        <header>
            <ul className='h-[2.575rem] bg-[#444] pl-8 flex text-white'>
                {icons.map((icon, index) => (
                    <li key={index} className='border-x-[0.5px] p-2 cursor-pointer'>
                        <a className='cursor-pointer'>{icon.icon}</a>
                    </li>
                ))}
            </ul>
            <nav className='h-[143.45px] bg-white flex items-center justify-around'>
                <Link href='/'>
                    <Image src={logo} alt='Logo' className='w-[200px]' />
                </Link>
                <ul className='flex items-center gap-10'>
                    {navigation.map((nav) => (
                        <li key={nav.name}>
                            <Link href={nav.href} className='text-[#2c2f7b] text-xl'>{nav.name}</Link>
                        </li>
                    ))}

                    <li>
                        <div className="relative">
                            <Link href='/carrinho'>
                                <CiShoppingCart size='1.75rem' />
                                <span className="absolute text-white bg-[red] rounded-full border-[2px] border-white p-2 w-5 h-5 flex items-center justify-center top-[-1px] left-[16px]">
                                    {cart.length}
                                </span>
                            </Link>
                        </div>
                    </li>
                    <UserModal />
                </ul>
            </nav>
        </header>
    )
}