import { Select, SelectItem } from '@nextui-org/react';
import Image from 'next/image'
import Link from 'next/link';

// import background from '@/assets/ilustras.svg'

export default function Home() {
  return (
    <>
      <section className='flex flex-col h-[400px] pt-8 bg-[url("../assets/ilustras.svg")]'>
        <span className='text-center text-3xl mb-10'>Cadastre sua loja e comece a vender na Mark Tech</span>
        <div className='flex justify-center gap-10'>
          <div className='w-[300px] h-[200px] bg-[#EF5753] rounded-md text-white flex flex-col p-6'>
            <span>Restaurantes</span>
            <p>Bebidas, Confeitaria, Lanchonete, Foodtruck, Conveniência</p>
            <button type='button' className='bg-white p-2 border-0 rounded-lg text-[#FA1D2C] font-medium self-end'>Cadastrar agora</button>
          </div>
          <div className='w-[300px] h-[200px] bg-[#EF5753] rounded-md text-white flex flex-col p-6'>
            <span>Mercados</span>
            <p>Pet Shop, Farmácia, Empório, Hortifruti, Açougue...</p>
            <button type='button' className='bg-white p-2 border-0 rounded-lg text-[#FA1D2C] font-medium self-end'>Cadastrar agora</button>
          </div>
        </div>
      </section>
      <section className='flex flex-col'>
        <span className='text-center text-3xl mb-10'>Você é nosso cliente ou parceiro?</span>
        <div className='flex gap-10 justify-center'>
          <Link href='/register/parceiro' className='text-blue-500 text-xl'>Sou parceiro</Link>
          <Link href='/register/cliente' className='text-blue-500 text-xl'>Sou cliente</Link>
        </div>
      </section>
    </>
  );
}
