'use client'

import { Button, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

export interface FormData {
    email: string
    password_hash: string
}

const signInFormSchema = z.object({
    email: z.string().email('Entrada inválida. Informe um endereço de e-mail válido. Por exemplo, john@doe.com.').nonempty('O email é obrigatório'),
    password_hash: z.string().nonempty('A senha é obrigatória.')
})

type signInFormData = z.infer<typeof signInFormSchema>

export default function Partner() {
    const { partnerSignIn } = useAuth()

    const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm<signInFormData>({
        defaultValues: {
            email: '',
            password_hash: ''
        },
        mode: 'onBlur',
        resolver: zodResolver(signInFormSchema)
    })

    async function handleSignIn(data: signInFormData) {
        try {
            await partnerSignIn(data)
            reset()
        } catch (error) {
            console.log(error)
            // if (error.message === "Usuário ou senha incorretos.") {
            //     setError("password_hash", { type: "manual", message: error.message });
            // } else {
            //     setError("email", { type: "manual", message: error.message });
            // }
        }
    }

    return (
        <section>
            <div className="flex flex-col">
                <h1 className="text-center text-3xl font-semibold mb-8">Login Parceiro</h1>
                <div className="flex flex-col items-center gap-5">
                    <form method='post' className='flex flex-col gap-3' onSubmit={handleSubmit(handleSignIn)}>
                        <Input type='email' label='Email' placeholder="john@doe.com" isRequired variant='bordered' isInvalid={errors.email && true} color={errors.email ? "danger" : "default"} className="max-w-xs" {...register('email')} errorMessage={errors?.email && errors?.email?.message} />
                        <Input type='password' label='Senha' isRequired variant='bordered' className="max-w-xs" {...register('password_hash')} errorMessage={errors?.password_hash && errors?.password_hash?.message} />
                        <div className='flex gap-2'>
                            <span>Ainda não possui uma conta?</span>
                            <Link href='/register/cliente' className='text-blue-500'>Inscreva-se</Link>
                        </div>
                        <Button type='submit' color='primary' isLoading={isSubmitting}>Entrar</Button>
                    </form>
                </div>
            </div>
        </section>
    )
}