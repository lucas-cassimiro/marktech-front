'use client'

import CardProducts from "@/components/ui/card-products"
import { useEffect, useState } from "react"

async function getProductsHighlight() {
    const response = await fetch('http://localhost:3333/products/product/highlight')
    return await response.json()
}

export default function ProductsHighlight() {
    const [products, setProducts] = useState<any>([])

    console.log(products)

    useEffect(() => {
        async function fetchData() {
            const data = await getProductsHighlight()
            setProducts(data)
        }

        fetchData()
    }, [])

    return (
        <div className='flex mt-10 pr-10 pl-10'>
            <section className='flex flex-wrap gap-28 w-full'>
                {products.map((product: any) => (
                    <CardProducts product={product} key={product.id} />
                ))}
            </section>
        </div>
    )
}