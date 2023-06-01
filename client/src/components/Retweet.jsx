import React, { useState } from 'react'
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'

const Retweet = ({ retweets }) => {
  const [isRetweet, setIsRetweet] = useState(false)
  const onClickRetweet = () => {
    setIsRetweet(!isRetweet)
  }

  return (
        <div onClick={onClickRetweet} className={`flex items-center align-middle space-x-1 cursor-pointer group ${isRetweet ? 'text-[#00ba7c]' : 'hover:text-[#00ba7c]'}`} >
            <HiOutlineArrowsUpDown className='icons group-hover:bg-[#00ba7c]/10' title='Retweetear' />
            <p className='text-sm' >{ retweets.length == 0 ? "" : retweets.length}</p>
        </div>
  )
}

export default Retweet
