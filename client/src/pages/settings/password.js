import Head from 'next/head'
import Link from 'next/link'
import { useRef } from 'react'
import { HiChevronLeft } from 'react-icons/hi2'

const TwitterPassword = () => {
  const currentPassword = useRef(null)
  const newPassword = useRef(null)
  const newPasswordValidate = useRef(null)

  return (
    <>
    <Head>
      <title>Cambia tu contraseña / Twitter</title>
    </Head>
    <section className='dark:text-white md:border-x border-x-black/5 dark:border-x-white/20 py-4 h-full w-full'>
      <h2 className='flex items-center gap-4 dark:text-white font-bold ml-4 mb-4 text-xl'><Link href="/settings/account"><HiChevronLeft size={24} /></Link> Cambia tu contraseña</h2>

      <div className='mt-4 mb-1 relative pt-3 group focus-within:outline border border-black/5 dark:border-white/20 rounded-sm w-[95%] mx-auto'>
        <input ref={currentPassword} type='text' className='bg-transparent outline-none w-full indent-2 pt-3 pb-2' />
        <span className='absolute -z-10 mt-0.5 left-2 group-focus-within:top-0.5 group-focus-within:text-sm transition-all duration-[400ms]'>Contraseña actual</span>
      </div>
      <p className='mb-3 ml-[2.5%] text-sm'>¿Olvidaste tu contraseña?</p>
      <hr className='border-black/5 dark:border-white/20'></hr>
      <div className='my-4 relative pt-3 group focus-within:outline border border-black/5 dark:border-white/20 rounded-sm w-[95%] mx-auto'>
        <input ref={newPassword} type='text' className='bg-transparent outline-none w-full indent-2 pt-3 pb-2' />
        <span className='absolute -z-10 mt-0.5 left-2 group-focus-within:top-0.5 group-focus-within:text-sm transition-all duration-[400ms]'>Nueva contraseña</span>
      </div>

      <div className='my-4 relative pt-3 group focus-within:outline border border-black/5 dark:border-white/20 rounded-sm w-[95%] mx-auto'>
        <input ref={newPasswordValidate} type='text' className='bg-transparent outline-none w-full indent-2 pt-3 pb-2' />
        <span className='absolute -z-10 mt-0.5 left-2 group-focus-within:top-0.5 group-focus-within:text-sm transition-all duration-[400ms]'>Confirmar contraseña</span>
      </div>
      <hr className='border-black/5 dark:border-white/20'></hr>
      <hr className='border-black/5 dark:border-white/20 mt-2.5'></hr>
      <button className='bg-indigo-600 py-2 px-4 rounded-2xl my-2 ml-auto block mr-4 text-white'>Guardar</button>
    </section>
    </>
  )
}

export default TwitterPassword
