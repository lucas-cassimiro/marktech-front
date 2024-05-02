import Link from "next/link";

export default function Categories() {
    return (
        <>
            <section className="flex flex-col mt-10">
                <span className='text-center text-3xl'>Categoria de produtos</span>
                <div className='self-center flex flex-col gap-5 mt-10'>
                    <Link href='/produtos/acougue'>
                        <div className='border-[3px] rounded-lg p-5'>
                            Açougue
                        </div>
                    </Link>
                    <Link href='/produtos/padaria'>
                        <div className='border-[3px] rounded-lg p-5'>
                            Padaria
                        </div>
                    </Link>
                    <Link href='/produtos/bebida'>
                        <div className='border-[3px] rounded-lg p-5'>
                            Bebidas
                        </div>
                    </Link>
                </div>
            </section>

        </>
    )
}