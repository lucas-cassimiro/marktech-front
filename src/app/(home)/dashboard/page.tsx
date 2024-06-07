'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import moment from 'moment'

import { useAuth } from '@/hooks/use-auth'
import { GrFormNext } from 'react-icons/gr'

export default function Dashboard() {
    const { user } = useAuth()

    const pathname = usePathname()

    const menuNavLinks = [
        {
            name: 'Meu cadastro',
            href: '/dashboard'
        },
        {
            name: 'Meus pedidos',
            href: ''
        }
    ]


    return (
        <section className='flex px-20 mt-8'>
            <div className="flex flex-col gap-6 w-[300px] mb-10 tabletgrande:w-[230px]">
                <div className="border-b-[0.5px] border-[#878787] flex tablet:border-b-0 min-w-[150px]">
                    <span className="font-semibold text-lg mb-5 tablet:mb-1">
                        Minha conta
                    </span>
                </div>
                {menuNavLinks.map((link) => {
                    const isActive = pathname.endsWith(link.href)
                    return (
                        <li
                            key={link.name}
                            className={`${isActive ? "font-semibold" : "border-none"} list-none hover:underline`}
                        >
                            <Link
                                href={link.href}
                                className="text-black text-lg flex items-center justify-between"
                            >
                                <span>{link.name}</span>
                                <GrFormNext className="tablet:hidden text-[#878787]" />
                            </Link>
                        </li>
                    )
                })}
            </div>
            <div className="flex flex-col w-full py-4 tabletgrande:py-2 tabletgrande:w-full tabletgrande:px-10 tablet:px-0 px-5 min-w-[250px]">
                <div className="m-auto flex flex-col w-[648px] min-w-[250px] tabletgrande:w-full">
                    <span className="font-bold text-3xl mb-10 tabletgrande:text-lg">
                        Meu cadastro
                    </span>
                    <div className="m-auto w-full border tabletgrande:border-l-0 tabletgrande:border-r-0 mb-7">
                        <div className="flex flex-col gap-10 mb-7 justify-center m-auto max-w-[424px] mt-[1.75rem]">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg tablet:text-base">
                                    Dados pessoais
                                </span>
                                <Link
                                    href=''
                                    className="border-2 border-[#e5e5e5] text-sm py-4 px-8 rounded-sm text-[#7c7b7b] tablet:w-[113px] tablet:px-[14px] tablet:py-[12px] tablet:text-xs"
                                >
                                    Alterar dados
                                </Link>
                            </div>

                            <ul className="flex flex-col gap-7">
                                <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                                    <p className="text-[#878787] text-sm">E-mail</p>
                                    <span className="mb-3 text-sm w-[50%]">{user?.email}</span>
                                </li>
                                <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                                    <p className="text-[#878787] text-sm">Nome</p>
                                    <span className="mb-3 text-sm w-[50%]">
                                        {user?.first_name}
                                    </span>
                                </li>
                                <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                                    <p className="text-[#878787] text-sm">Sobrenome</p>
                                    <span className="mb-3 text-sm w-[50%]">
                                        {user?.last_name}
                                    </span>
                                </li>
                                <li className="flex justify-between border-b-1 border-[#e5e5e5]">
                                    <p className="text-[#878787] text-sm">Data de nascimento</p>
                                    <span className="mb-3 text-sm w-[50%]">
                                        {moment(user?.date_birth)
                                            .add(1, "days")
                                            .format("DD/MM/YYYY")}
                                    </span>
                                </li>
                                <li className="flex justify-between">
                                    <p className="text-[#878787] text-sm">Celular</p>
                                    <span className="mb-3 text-sm w-[50%]">
                                        {user?.cellphone}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="m-auto w-full border tabletgrande:border-l-0 tabletgrande:border-r-0 mb-7">
                        <div className="flex flex-col gap-10 mb-7 justify-center m-auto max-w-[424px] mt-[1.75rem]">
                            <span className="font-bold text-lg">Cartões</span>
                            <span className="text-sm">Não há cartões cadastrados.</span>
                        </div>
                    </div>
                    <div className="m-auto w-full border tabletgrande:border-l-0 tabletgrande:border-r-0 tabletgrande:border-b-0">
                        <div className="flex flex-col gap-10 mb-7 justify-center m-auto max-w-[424px] mt-[1.75rem]">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg">Endereços</span>
                                <Link
                                    href=''
                                    className="border-2 border-[#e5e5e5] text-sm py-4 px-6 rounded-sm text-[#7c7b7b]"
                                >
                                    Adicionar endereço
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}