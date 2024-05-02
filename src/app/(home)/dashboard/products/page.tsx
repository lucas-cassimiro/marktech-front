'use client'

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "react-toastify";

async function getCategories() {
    const response = await fetch('http://localhost:3333/categories')
    return await response.json()
}

type ProductSchema = {
    name: string
    price: number
    file?: FileList | null
    highlight: boolean
    discount: number
    description: string
    categorie_id: number
    ean: string
}

const createProductFormSchema = z.object({
    name: z.string().nonempty('Campo obrigatório.'),
    price: z.coerce.number().min(1, 'Campo obrigatório.'),
    file: z.unknown(),
    highlight: z.boolean(),
    discount: z.coerce.number(),
    description: z.string().nonempty('Campo obrigatório.'),
    categorie_id: z.coerce.number(),
    ean: z.string().nonempty('Campo obrigatório.')
})

export default function Products() {
    const { register, handleSubmit, setValue, setError, reset, formState: { errors, isSubmitting } } = useForm<ProductSchema>({
        mode: 'onBlur',
        resolver: zodResolver(createProductFormSchema)
    })

    const [categories, setCategories] = useState<any>([])

    useEffect(() => {
        async function fetchData() {
            const data = await getCategories()
            setCategories(data)
        }

        fetchData()
    }, [])

    const onSubmit: SubmitHandler<ProductSchema> = async (
        data: ProductSchema
    ) => {
        console.log(data);

        try {
            const formData = new FormData();

            // Adiciona os valores do formulário ao FormData
            formData.append('name', data.name);
            formData.append('price', String(data.price));
            formData.append('highlight', String(data.highlight));
            formData.append('discount', String(data.discount));
            formData.append('description', data.description);
            formData.append('categorie_id', String(data.categorie_id));
            formData.append('ean', data.ean);

            // Adiciona o arquivo ao FormData
            if (data.file) {
                formData.append('file', data.file[0]); // Aqui assumimos que o arquivo é o primeiro da lista (caso de múltiplos arquivos)
            }

            console.log(formData)

            const url = 'http://localhost:3333/products'

            const request = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!request.ok) {
                const errorResponse = await request.json();
                toast.error(errorResponse.message)
                throw new Error(errorResponse.message);
            }

            const response = await request.json();
            toast.success(response.message)

            reset();
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };

    const onError: SubmitErrorHandler<ProductSchema> = (errors) => console.log(errors);

    return (
        <form
            method='POST'
            action='http://localhost:3333/products/'
            onSubmit={handleSubmit(onSubmit, onError)}
            encType="multipart/form-data"
            className="flex flex-col items-center gap-2 py-5 px-10"
        >
            <h1 className="text-center text-2xl">Cadastro de produtos</h1>
            <div className="flex gap-14 justify-center items-center mt-16">
                <div className="flex flex-col gap-2">
                    <Input
                        type="text"
                        label="Nome"
                        maxLength={100}
                        isRequired
                        isClearable
                        className="w-[250px]"
                        {...register("name")}
                        isInvalid={errors?.name && true}
                        color={errors?.name ? "danger" : "default"}
                        errorMessage={errors?.name && errors.name.message}
                    />

                    <Input
                        type="text"
                        label="Preço"
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">R$</span>
                            </div>
                        }
                        isRequired
                        className="w-[250px]"
                        {...register("price")}
                        isInvalid={errors?.price && true}
                        color={errors?.price ? "danger" : "default"}
                        errorMessage={errors?.price && errors?.price?.message}
                    />

                    <input
                        type="file"
                        name="file"
                        onChange={(e) => setValue("file", e.target.files)}
                    />

                    <label>
                        <input
                            id="highlight"
                            type="checkbox"
                            {...register("highlight")}
                        />
                        Destaque
                    </label>
                </div>
                <div className="flex flex-col gap-2">
                    <Input
                        id="discount"
                        type="number"
                        label="Desconto"
                        className="w-[250px]"
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">%</span>
                            </div>
                        }
                        {...register("discount")}
                        isInvalid={errors?.discount && true}
                        color={errors?.discount ? "danger" : "default"}
                        errorMessage={errors?.discount && errors?.discount?.message}
                    />

                    <Input
                        id="description"
                        type="text"
                        label="Descrição"
                        isRequired
                        className="w-[250px]"
                        {...register("description")}
                        isInvalid={errors?.description && true}
                        color={errors?.description ? "danger" : "default"}
                        errorMessage={
                            errors?.description && errors?.description?.message
                        }
                    />

                    <Select
                        label="Categoria"
                        isRequired
                        className="w-[250px]"
                        {...register("categorie_id")}
                    >
                        {categories.map((categorie: any) => (
                            <SelectItem
                                key={categorie.id}
                                value={categorie.id}
                                {...register("categorie_id")}
                            >
                                {categorie.name}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        id="ean"
                        type="text"
                        label="EAN"
                        maxLength={13}
                        isRequired
                        className="w-[250px]"
                        {...register("ean")}
                        isInvalid={errors?.ean && true}
                        color={errors?.ean ? "danger" : "default"}
                        errorMessage={errors?.ean && errors?.ean?.message}
                    />
                </div>
            </div>
            <Button
                type='submit'
                isLoading={isSubmitting}
                color="primary"
                className="mt-10"
            >
                Cadastrar
            </Button>
        </form>
    )
}