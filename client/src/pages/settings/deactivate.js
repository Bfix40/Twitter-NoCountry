import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { HiChevronLeft } from 'react-icons/hi2'

const DisableTwitter = () => {
  const { data: session } = useSession();

  if (!session) {
    return null
  }

  return (
    <>
    <Head>
      <title>Desactivar la cuenta / Twitter</title>
    </Head>
    <section className='dark:text-white md:border-x border-x-black/5 dark:border-x-white/20 py-4 h-full w-full'>
      <h2 className='flex items-center gap-4 dark:text-white font-bold ml-4 mb-4 text-xl'><Link href="/settings/account"><HiChevronLeft size={24} /></Link> Desactivar la cuenta</h2>

      <Link href="/perfil" className='flex gap-2 w-full pl-6 py-3 hover:bg-black/5 hover:dark:bg-white/10'>
        <Image
          className="h-12 w-12 rounded-full object-cover"
          src={
            session.user?.image ? session.user.image : "/img/defaultprofile.jpg"
          }
          width={50}
          height={50}
          alt="Foto de perfil"
        />
        <div className="text-base">
          <p className="max-w-[20ch] truncate font-semibold dark:text-white">
            {session?.user.name}
          </p>
          <p className="max-w-[20ch] truncate text-sm text-slate-500">
            @{session?.user.name}
          </p>
        </div>
      </Link>
      <h2 className='text-xl font-bold dark:text-white ml-6'>Esta acción desactivará tu cuenta</h2>
      <p className='text-sm text-gray-400 ml-6 my-4'>Estás por iniciar el proceso de desactivación de tu cuenta de Twitter. Tu nombre visible, tu @usuario y tu perfil público ya no se podrán ver en twitter.com, Twitter para iOS ni Twitter para Android.</p>
      <h2 className='text-xl font-bold dark:text-white ml-6 mb-4'>Qué más debes saber</h2>
      <p className='text-sm text-gray-400 ml-6 my-2'>Si tu cuenta de Twitter se desactivó por error o accidentalmente, tienes un plazo de 30 días para restaurarla después de su desactivación.</p>
      <hr className='border-black/5 dark:border-white/20'></hr>
      <p className='text-sm text-gray-400 ml-6 my-2'>Es posible que parte de la información de la cuenta siga disponible en los motores de búsqueda como Google o Bing.</p>
      <hr className='border-black/5 dark:border-white/20'></hr>
      <p className='text-sm text-gray-400 ml-6 my-2'>Si solo quieres cambiar tu @usuario, no es necesario que desactives tu cuenta; cámbialo en tu configuración.</p>
      <hr className='border-black/5 dark:border-white/20'></hr>
      <p className='text-sm text-gray-400 ml-6 my-2'>Para usar tu @usuario o tu dirección de correo electrónico con otra cuenta de Twitter, cámbialos antes de desactivar esta cuenta.</p>
      <hr className='border-black/5 dark:border-white/20'></hr>
      <button className='text-red-600 my-4 mx-auto w-fit block'>Desactivar</button>
    </section>
    </>
  )
}

export default DisableTwitter
