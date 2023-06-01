import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { HiChevronLeft } from 'react-icons/hi2'

const Privacy = () => {
  return (
    <>
    <Head>
      <title>Privacidad y seguridad / Twitter</title>
    </Head>
    <section className='text-white md:border-x border-x-black/5 dark:border-x-white/20 py-4 h-full w-full md:max-w-[500px]'>
      <h2 className='flex items-center gap-4 dark:text-white font-bold ml-4 mb-2 text-xl'><Link href="/settings" className='md:hidden'><HiChevronLeft size={24} /></Link> Obtén más información sobre la privacidad en Twitter</h2>
      <a href='https://privacy.twitter.com/es' target="_blank" rel="noreferrer noopener" className='block w-full text-left px-4 py-3 hover:bg-black/5 hover:dark:bg-white/10 transition duration-200'>Centro de privacidad</a>
      <a href='https://twitter.com/en/privacy' target="_blank" rel="noreferrer noopener" className='block w-full text-left px-4 py-3 hover:bg-black/5 hover:dark:bg-white/10 transition duration-200'>Politica de privacidad</a>
      <a href='https://help.twitter.com/es/forms/privacy' target="_blank" rel="noreferrer noopener" className='block w-full text-left px-4 py-3 hover:bg-black/5 hover:dark:bg-white/10 transition duration-200'>Contacto</a>
    </section>
    </>
  )
}

export default Privacy
