'use client'

import Image from 'next/image'

import Slogan from '@/assets/slogan-register.svg'

import { toast } from 'react-toastify'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

const signUpFormSchema = z.object({
    corporate_reason: z.string().nonempty('Campo obrigatório.'),
    cnpj: z.string().nonempty('Campo obrigatório.'),
    email: z.string().nonempty('O email é obrigatório').email('Entrada inválida. Informe um endereço de e-mail válido. Por exemplo, john@doe.com.'),
    cellphone: z.string().nonempty('Campo obrigatório.'),
    password: z.string().nonempty('A senha é obrigatória.')
        .min(6, 'Verifique se a sua senha tem pelo menos 6 caracteres.'),
    passwordConfirmation: z.string().nonempty('Informe a senha novamente.'),
}).refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
        message: "As senhas informadas não correspondem. Tente novamente.",
        path: ["passwordConfirmation"],
    }
)

type signUpFormData = z.infer<typeof signUpFormSchema>

export default function Partner() {
    const { register, handleSubmit, reset, setError, setValue, formState: { errors, isSubmitting } } = useForm<signUpFormData>({
        mode: 'onBlur',
        resolver: zodResolver(signUpFormSchema)
    })

    const onSubmit: SubmitHandler<signUpFormData> = async (
        data: signUpFormData
    ) => {
        console.log(data);

        try {
            const { passwordConfirmation, ...postData } = data;

            const url = 'http://localhost:3333/partners'

            const request = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!request.ok) {
                const errorResponse = await request.json();
                toast.error(errorResponse.message)
                setError("email", { type: "manual", message: errorResponse.message });
            }

            const response = await request.json();
            console.log(response);
            toast.success(response.message)

            reset();
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };

    const onError: SubmitErrorHandler<FormData> = (errors) => console.log(errors);

    return (
        <main className="w-full h-screen bg-gray-900 flex justify-center items-center">
            <div className="w-1/2 flex justify-center items-center flex-col">
                <Image src={Slogan} className="w-3/4" alt="Slogan de Cadastro" />
            </div>
            <div className="w-1/3 bg-purple-900 p-12 rounded-lg">
                <Link href='/login/parceiro' className='text-end'>Entrar</Link>
                <form action='POST' className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit, onError)}>
                    <h1 className="text-3xl font-bold text-white mb-3">Cadastre-se</h1>
                    <div className="flex flex-col gap-2">
                        <div className='flex gap-2'>
                            <div className="w-1/2 flex flex-col mb-4">
                                <label htmlFor="corporate_reason" className="text-white">Razão Social</label>
                                <input id="corporate_reason" type="text" placeholder="Digite a razão social" className="p-2 rounded-lg" required {...register('corporate_reason')} />
                                {errors?.corporate_reason && <span className='text-red-500 text-sm mt-2'>{errors?.corporate_reason?.message}</span>}
                            </div>

                            <div className="w-1/2 flex flex-col mb-4">
                                <label htmlFor="cnpj" className="text-white">CNPJ</label>
                                <input id="cnpj" type="text" placeholder="Digite o CNPJ" className="p-2 rounded-lg" required {...register('cnpj')} />
                                {errors?.cnpj && <span className='text-red-500 text-sm mt-2'>{errors?.cnpj?.message}</span>}
                            </div>
                        </div>

                        <div className='flex gap-2'>
                            <div className="w-1/2 flex flex-col mb-4">
                                <label htmlFor="email" className="text-white">E-mail</label>
                                <input id="email" type="email" placeholder="Digite seu email" className="p-2 rounded-lg" required {...register('email')} />
                                {errors?.email && <span className='text-red-500 text-sm mt-2'>{errors?.email?.message}</span>}
                            </div>

                            <div className="w-1/2 flex flex-col mb-4">
                                <label htmlFor="cellphone" className="text-white">Celular</label>
                                <input id="cellphone" type="tel" placeholder="(xx) xxxx-xxxx" className="p-2 rounded-lg" required {...register('cellphone')} />
                                {errors?.cellphone && <span className='text-red-500 text-sm mt-2'>{errors?.cellphone?.message}</span>}
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className="w-1/2 flex flex-col mb-4">
                                <label htmlFor="password" className="text-white">Senha</label>
                                <input id="password" type="password" placeholder="Digite sua senha" className="p-2 rounded-lg" required {...register('password')} />
                                {errors?.password && <span className='text-red-500 text-sm mt-2'>{errors?.password?.message}</span>}
                            </div>

                            <div className="w-1/2 flex flex-col mb-4">
                                <label htmlFor="passwordConfirmation" className="text-white">Confirme sua senha</label>
                                <input id="passwordConfirmation" type="password" placeholder="Digite sua senha novamente" className="p-2 rounded-lg" required {...register('passwordConfirmation')} />
                                {errors?.passwordConfirmation && <span className='text-red-500 text-sm mt-2'>{errors?.passwordConfirmation?.message}</span>}
                            </div>
                        </div>
                    </div>
                    <Button type='submit' className="w-full bg-green-500 text-white px-4 py-2 rounded-lg text-base mt-5" >
                        Cadastrar
                    </Button>
                </form>
            </div>
        </main>
    )
}