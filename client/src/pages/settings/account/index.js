import { ProfileIcon } from '@/components/icons'
import { BsHeartbreak } from 'react-icons/bs'
import { HiChevronRight, HiOutlineKey } from 'react-icons/hi'
import Link from 'next/link'
import { HiChevronLeft } from 'react-icons/hi2'
import Head from 'next/head'

const Settings = () => {
  return (
    <>
    <Head>
      <title>Tu cuenta / Twitter</title>
    </Head>
    <section className={'text-white md:border-x border-x-black/5 dark:border-x-white/20 py-4 h-full w-full md:max-w-[500px] '}>
      <h2 className='flex items-center gap-4 dark:text-white font-bold ml-4 text-xl'><Link href="/settings" className='md:hidden'><HiChevronLeft size={24} /></Link> Tu cuenta</h2>
      <small className='my-4 ml-4 text-gray-400 block'>Ve la información de la cuenta u obtén más información acerca de las opciones de desactivación de la cuenta</small>
      <Link href="/settings/account/your_twitter_data" className='dark:text-white p-4 h-24 hover:bg-black/5 hover:dark:bg-white/10 w-full flex gap-5 items-center transition duration-200'>
        <span className='w-10 flex justify-center my-auto'>
          <ProfileIcon size={20} />
        </span>
        <div className='text-left w-full'>
          <p>Información de la cuenta</p>
          <small className='text-gray-400 block'>Ve la información de tu cuenta, como el número de teléfono y la dirección de correo electrónico.</small>
        </div>
        <HiChevronRight size={24} />
      </Link>
      <Link href="/settings/password" className='dark:text-white p-4 h-24 hover:bg-black/5 hover:dark:bg-white/10 w-full flex gap-5 items-center transition duration-200'>
        <span className='w-10 flex justify-center my-auto'>
          <HiOutlineKey size={20} />
        </span>
        <div className='text-left w-full'>
          <p>Cambia tu contraseña</p>
          <small className='text-gray-400 block'>Cambia tu contraseña en cualquier momento.</small>
        </div>
        <HiChevronRight size={24} />
      </Link>
      <Link href="/settings/deactivate" className='dark:text-white p-4 h-24 hover:bg-black/5 hover:dark:bg-white/10 w-full flex gap-5 items-center transition duration-200'>
        <span className='w-10 flex justify-center my-auto'>
          <BsHeartbreak size={18} />
        </span>
        <div className='text-left w-full'>
          <p>Desactiva tu cuenta</p>
          <small className='text-gray-400 block'>Averigua cómo puedes desactivar tu cuenta.</small>
        </div>
        <HiChevronRight size={24} />
      </Link>
    </section>
    </>
  )
}

export default Settings
