import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { HiChevronLeft } from 'react-icons/hi2'

const TwitterData = () => {
  return (
    <>
    <Head>
      <title>Información de la cuenta / Twitter</title>
    </Head>
    <section className='text-white md:border-x border-x-black/5 dark:border-x-white/20 py-4 h-full w-full md:max-w-[570px]'>
      <h2 className='flex items-center gap-4 dark:text-white font-bold ml-4 mb-4 text-xl'><Link href="/settings/account"><HiChevronLeft size={24} /></Link> Información de la cuenta</h2>

      <Link
        href="/settings/screen_name"
        className='py-2 px-5 block w-full hover:bg-black/5 hover:dark:bg-white/10'
      >
        <p>Nombre de usuario</p>
        <small className='text-gray-400'>@user</small>
      </Link>

      <Link
        href="/settings/phone"
        className='py-2 px-5 block w-full hover:bg-black/5 hover:dark:bg-white/10'
      >
        <p>Telefono</p>
        <small className='text-gray-400'>1122223333</small>
      </Link>

      <Link
        href="/settings/email"
        className='py-2 px-5 block w-full hover:bg-black/5 hover:dark:bg-white/10'
      >
        <p>Correo electronico</p>
        <small className='text-gray-400'>user@gmail.com</small>
      </Link>

      <div
        className='py-2 px-5 block w-full hover:bg-black/5 hover:dark:bg-white/10'
      >
        <p>Verificado</p>
        <small className='text-gray-400'>No</small>
      </div>
      <hr className='border-black/5 dark:border-white/20'></hr>
      <Link
        href="/settings/audience_and_tagging"
        className='py-2 px-5 block w-full hover:bg-black/5 hover:dark:bg-white/10'
      >
        <p>Tweets protegidos</p>
        <small className='text-gray-400'>No</small>
      </Link>

      <div
        className='py-2 px-5 block w-full hover:bg-black/5 hover:dark:bg-white/10'
      >
        <p>Creación de la cuenta</p>
        <small className='text-gray-400'>20 jun. 2020 14:30:37</small>
      </div>
      <hr className='border-black/5 dark:border-white/20'></hr>
      <Link
        href="/settings/country"
        className='py-2 px-5 block w-full hover:bg-black/5 hover:dark:bg-white/10'
      >
        <p>Pais</p>
        <small className='text-gray-400'>Argentina</small>
      </Link>

      <Link
        href="/settings/languages"
        className='py-2 px-5 block w-full hover:bg-black/5 hover:dark:bg-white/10'
      >
        <p>Idiomas</p>
        <small className='text-gray-400'>Español</small>
      </Link>

      <Link
        href="/settings/gender"
        className='py-2 px-5 block w-full hover:bg-black/5 hover:dark:bg-white/10'
      >
        <p>Genero</p>
        <small className='text-gray-400'>No Binario</small>
      </Link>

      <div
        className='py-2 px-5 block w-full hover:bg-black/5 hover:dark:bg-white/10'
      >
        <p>Fecha de nacimiento</p>
        <small className='text-gray-400'>01 Julio 1990</small>
      </div>
      <hr className='border-black/5 dark:border-white/20'></hr>
      <Link
        href="/settings/age"
        className='py-2 px-5 block w-full hover:bg-black/5 hover:dark:bg-white/10'
      >
        <p>Edad</p>
        <small className='text-gray-400'>33</small>
      </Link>
    </section>
    </>
  )
}

export default TwitterData
