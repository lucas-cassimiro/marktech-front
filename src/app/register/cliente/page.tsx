'use client'

import Image from 'next/image'

import Slogan from '@/assets/slogan-register.svg'

import { toast } from 'react-toastify'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const signUpFormSchema = z.object({
    first_name: z.string().nonempty('Campo obrigatório.'),
    last_name: z.string().nonempty('Campo obrigatório.'),
    email: z.string().email('Entrada inválida. Informe um endereço de e-mail válido. Por exemplo, john@doe.com.').nonempty('O email é obrigatório'),
    cellphone: z.string().nonempty('Campo obrigatório.'),
    password: z.string().nonempty('A senha é obrigatória.')
        .min(6, 'Verifique se a sua senha tem pelo menos 6 caracteres.'),
    passwordConfirmation: z.string().nonempty('Informe a senha novamente.'),
    date_birth: z.date()
}).refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
        message: "As senhas informadas não correspondem. Tente novamente.",
        path: ["passwordConfirmation"],
    }
)

type signUpFormData = z.infer<typeof signUpFormSchema>

export default function Client() {
    const { register, handleSubmit, reset, setError, setValue, formState: { errors, isSubmitting } } = useForm<signUpFormData>({
        mode: 'onBlur',
        resolver: zodResolver(signUpFormSchema)
    })

    const router = useRouter()

    const onSubmit: SubmitHandler<signUpFormData> = async (
        data: signUpFormData
    ) => {
        console.log(data);

        try {
            const { passwordConfirmation, ...postData } = data;

            const url = 'http://localhost:3333/users'

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

            router.push('/login/cliente')
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };

    const onError: SubmitErrorHandler<FormData> = (errors) => console.log(errors);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="w-1/2 flex justify-center items-center flex-col">
                <Image src={Slogan} className="w-3/4" alt="Slogan de Cadastro" />
            </div>
            <div className="w-1/3 bg-purple-900 p-12 rounded-lg">
                <form action='POST' className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="flex justify-between mb-6">
                        <div className="text-white">
                            <h1 className="text-3xl font-bold">Cadastre-se</h1>
                        </div>
                    </div>
                    <div className="flex justify-between gap-2">
                        <div className="w-1/2 flex flex-col mb-4">
                            <label htmlFor="first_name" className="text-white">Nome</label>
                            <input id="first_name" type="text" placeholder="Digite seu primeiro nome" className="p-2 rounded-lg" required {...register('first_name')} />
                            {errors?.first_name && <span className='text-red-500 text-sm mt-2'>{errors?.first_name?.message}</span>}
                        </div>
                        <div className="w-1/2 flex flex-col mb-4">
                            <label htmlFor="last_name" className="text-white">Sobrenome</label>
                            <input id="last_name" type="text" placeholder="Digite seu sobrenome" className="p-2 rounded-lg" required {...register('last_name')} />
                            {errors?.last_name && <span className='text-red-500 text-sm mt-2'>{errors?.last_name?.message}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between gap-2">
                        <div className="w-1/2 flex flex-col mb-4">
                            <label htmlFor="email" className="text-white">E-mail</label>
                            <input id="email" type="email" placeholder="Digite seu e-mail" className="p-2 rounded-lg" required {...register('email')} />
                            {errors?.email && <span className='text-red-500 text-sm mt-2'>{errors?.email?.message}</span>}
                        </div>
                        <div className="w-1/2 flex flex-col mb-4">
                            <label htmlFor="number" className="text-white">Celular</label>
                            <input id="number" type="tel" placeholder="(xx) xxxx-xxxx" className="p-2 rounded-lg" required {...register('cellphone')} />
                            {errors?.cellphone && <span className='text-red-500 text-sm mt-2'>{errors?.cellphone?.message}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between gap-2">
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

                    <div className="flex items-center">
                        <label htmlFor="date_birth" className="text-white">Data de nascimento</label>
                        <input id="date_birth" type='date' onChange={(e) => {
                            const dateOfBirth = new Date(e.target.value);
                            setValue('date_birth', dateOfBirth, { shouldValidate: true });
                        }} className="p-2 ml-2 rounded-lg" required />
                        {errors?.date_birth && <span className='text-red-500 text-sm mt-2'>{errors?.date_birth?.message}</span>}
                    </div>

                    <Button type='submit' className="w-full bg-green-500 text-white px-4 py-2 rounded-lg text-base mt-5" isLoading={isSubmitting}>
                        Cadastrar
                    </Button>
                </form>
            </div>
        </div>
    )
}
