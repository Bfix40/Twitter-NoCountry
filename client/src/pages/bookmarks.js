import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

const Bookmarks = () => {
  const { data: session } = useSession()

  return (
    <>
    <Head>
      <title>Guardados / Twitter</title>
    </Head>
    <div className="sticky top-0 z-10 p-5 bg-white/75 backdrop-blur-md dark:bg-black/70 dark:text-[#e7e9ea]">
      <h2 className="text-xl font-bold">Guardados</h2>
      <p className='text-gray-500'>@{session?.user.username}</p>
    </div>
    <div className='grid place-content-center gap-4 h-fit my-5 mx-auto text-left dark:text-white w-[60%]'>
      <Image
        src="/img/birdcage.png"
        alt="Guardar Tweets"
        width={400}
        height={400}
      />
      <h2 className='text-3xl font-bold'>Guarda los Tweets para verlos más tarde</h2>
      <p className='text-gray-500'>¡No dejes que los buenos se pierdan por ahí! Guarda los Tweets para luego encontrarlos fácilmente.</p>
    </div>
    </>
  )
}

export default Bookmarks
