import Head from 'next/head'
import React from 'react'

const Lists = () => {
  return (
    <>
    <Head>
      <title>Listas creadas / Twitter</title>
    </Head>
    <div className="sticky top-0 z-10 p-5 bg-white/75 backdrop-blur-md dark:bg-black/70 dark:text-[#e7e9ea] border-b border-b-black/10 dark:border-b-white/20">
      <h2 className="text-xl font-bold">Listas fijadas</h2>
      <p className='p-4 py-6 mt-2 text-gray-500'>Aún no hay nada para ver aquí. Fija tus Listas favoritas para acceder a ellas rápidamente.</p>
    </div>
    </>
  )
}

export default Lists
