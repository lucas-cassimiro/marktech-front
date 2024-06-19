import { Select, SelectItem } from '@nextui-org/react';
import Image from 'next/image'
import Link from 'next/link';

// import background from '@/assets/ilustras.svg'

export default function Home() {
  return (
    <>
      <section className='flex flex-col h-[400px] pt-8 bg-[url("../assets/ilustras.svg")]'>
        <section className='flex flex-col'>
          <span className='text-center text-3xl mb-10'>Você é nosso cliente ou parceiro?</span>
          <div className='flex gap-10 justify-center'>
            <div className='bg-blue-500 w-[350px] h-[250px] border rounded-lg flex flex-col p-6 justify-between'>
              <span className='text-xl'>Gostaria de trabalhar conosco? Cadastre-se na plataforma e anuncie seus produtos!</span>
              <Link href='/register/parceiro' className='text-black text-xl'>Sou parceiro</Link>
            </div>
            <div className='bg-blue-500 w-[350px] h-[250px] border rounded-lg flex flex-col p-6 justify-between'>
              <span className='text-xl'>Gostaria de comprar algum produto? Cadastre-se na plataforma e compre o quanto quiser!</span>
              <Link href='/register/cliente' className='text-black text-xl'>Sou cliente</Link>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
