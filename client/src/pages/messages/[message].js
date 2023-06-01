import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiSend } from 'react-icons/bi'
import { FiInfo } from 'react-icons/fi'
import { HiArrowLeft, HiEmojiHappy } from 'react-icons/hi'
import { HiGif } from 'react-icons/hi2'
import { IoImage } from 'react-icons/io5'

const Message = () => {
  function handleResizeInput(e) {
    if (e.target.value < 10) {
      document.querySelector(".msguser").style.height = "auto"
      document.querySelector('.msgbox').style.marginBottom = "80px"
    } else if (e.target.scrollHeight > 40 && e.target.scrollHeight <= 140) {
      document.querySelector(".msguser").style.height = e.target.scrollHeight + "px"
      document.querySelector('.msgbox').style.marginBottom = 40 + e.target.scrollHeight + "px"
    }

    return null
  }

  return (
    <section className='text-white md:border-x border-x-black/5 dark:border-x-white/20 w-full h-full md:max-w-[570px] relative overflow-y-scroll'>
      <div className='flex justify-between items-center p-5 w-full dark:text-white backdrop-blur-md sticky top-0'>
        <Link href="/messages"><HiArrowLeft size={24} /></Link>
        <div className='flex items-center gap-3 font-bold text-lg'>
          <Image
            className="h-9 w-9 object-cover rounded-full"
            src="/img/defaultprofile.jpg"
            width={100}
            height={100}
            alt="Foto de perfil de Usuario"
            unoptimized
          />
          Elon Musk
        </div>
        <button><FiInfo size={24} /></button>
      </div>
      <Link href="/elonmusk" className="flex flex-col w-[95%] mx-auto pt-5 pb-10 items-center text-center justify-center transition duration-300 hover:bg-black/5 dark:hover:bg-white/10 dark:text-white">
        <Image
          className="h-20 w-20 object-cover rounded-full border-4 border-black cursor-pointer"
          src="/img/defaultprofile.jpg"
          width={100}
          height={100}
          alt="Foto de perfil de Usuario"
          unoptimized
        />
        <h2 className='text-xl font-bold'>Elon Musk</h2>
        <h3 className='text-gray-400 mb-4'>@elonmusk</h3>

        <p>twitter owner</p>
        <p>Se unio en mayo de 2023 - 1000 Seguidores</p>
      </Link>
      <hr className='border-black/5 dark:border-white/20 w-[95%] mx-auto'></hr>

      <section className='w-[95%] mx-auto flex flex-col gap-4 pt-4 mb-20 flex-1 msgbox'>
        <p className='p-2 rounded-3xl break-words max-w-full bg-indigo-500 text-white ml-auto w-fit'>Holaaaa elon</p>
        <p className='p-2 rounded-3xl break-words max-w-full bg-blue-500 text-white w-fit'>Holaaaa</p>
      </section>

      <section className='max-h-[150px] fixed bg-white dark:bg-black w-full md:max-w-[570px] bottom-0 border-t border-r border-black/5 dark:border-white/20'>
        <div className='msguser text-white flex items-center gap-4 px-4 bg-black/5 dark:bg-white/10 w-[96%] mx-auto my-2 rounded-xl'>
          <div className='flex items-center gap-2 py-2'>
            <button><IoImage size={18} /></button>
            <button><HiGif size={18} /></button>
            <button><HiEmojiHappy size={18} /></button>
          </div>
          <textarea
            placeholder='Escribe un mensaje'
            className='bg-transparent outline-none h-6 min-h-full w-full overflow-y-scroll resize-none'
            onChange={(e) => handleResizeInput(e)}
          />
          <button><BiSend size={18} /></button>
        </div>
      </section>
    </section>
  )
}

export default Message
