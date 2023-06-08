import React from 'react'

const ModalWarning = ({ close, confirmSubmit, forbiddenWords = [] }) => {
  return (
        <div className='fixed top-0 left-0 bottom-0 rigth-0 z-[99999] h-screen w-screen bg-black/30  max-sm:px-2' >
            <div className='bg-white dark:bg-black transition-all duration-300 ease-out w-[350px] max-sm:w-[95%] max-sm:h-auto border dark:border-white/20 border-black/5 md:w-[450px] text-white absolute left-[50%] translate-x-[-50%] top-[12rem] max-sm:top-[12rem] p-4 max-sm:rounded-0 rounded-[20px]'
            onClick={(e) => e.stopPropagation()}>
                <div className=' flex flex-col gap-3'>
                        <h1 className='font-bold text-[#699BF7] text-lg'>{forbiddenWords.map(el => ` “${el}” `)}</h1>
                        <h2 className='dark:text-white text-gray-500 '>Este mensaje puede incitar al odio y/o violencia</h2>
                    <div className="flex flex-row justify-end gap-2" >
                    <button className="duration-400 rounded-full border-2 border-[#1d9bf0] text-lg text-[#1d9bf0] bg-transparent hover:bg-[#1d9bf0]/20 py-1 px-4 font-semibold transition-opacity"
                        onClick={close}>
                        Editar
                        </button>
                        <button className="duration-400 rounded-full border-2 border-[#1d9bf0] text-lg bg-[#1d9bf0] py-1 px-4 font-semibold text-white transition-opacity hover:bg-[#1a8cd8]"
                        onClick={confirmSubmit}>
                        Twittear
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ModalWarning
