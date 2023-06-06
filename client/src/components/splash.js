import React from 'react'
import { TwitterIcon } from './icons'

const Splash = () => {
  return (
    <div className='bg-[#1d9bf0] dark:bg-black  h-full w-full fixed inset-0 z-50 grid place-content-center'>
      <TwitterIcon size={128} color={"fill-white"} />
    </div>
  )
}

export default Splash
