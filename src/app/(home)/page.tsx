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
            <Link href='/register/parceiro' className='text-blue-500 text-xl'>Sou parceiro</Link>
            <Link href='/register/cliente' className='text-blue-500 text-xl'>Sou cliente</Link>
          </div>
        </section>
      </section>
    </>
  );
}
