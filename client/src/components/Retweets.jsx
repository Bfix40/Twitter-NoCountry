import { useReTweetMutation, useUndoReTweetMutation } from '@/redux/services/tweetsApi';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'

const Retweets = ({ _id, retweets }) => {
  const { data: session } = useSession();
  const loggedInUserId = session?.user?._id;
  const [isRetweet, setIsRetweet] = useState(retweets.find(like => like._id === loggedInUserId))
  const [undoReTweet] = useUndoReTweetMutation()
  const [reTweet] = useReTweetMutation()

  useEffect(() => {
    setIsRetweet(retweets.find(like => like._id === loggedInUserId))
  }, [loggedInUserId, retweets])

  const onClickRetweet = () => {
    if (isRetweet) {
      undoReTweet({ tweetId: _id, token: session.token })
    } else {
      reTweet({ tweetId: _id, token: session.token })
    }
    setIsRetweet(!isRetweet)
  }

  return (
        <div onClick={onClickRetweet} className={`flex items-center align-middle space-x-1 cursor-pointer group ${isRetweet || retweets.length >= 1 ? 'text-[#00ba7c]' : 'hover:text-[#00ba7c]'}`} >
            <HiOutlineArrowsUpDown className='icons group-hover:bg-[#00ba7c]/10' title='Retweetear' />
            <p className='text-sm' >{ retweets.length === 0 ? "" : retweets.length}</p>
        </div>
  )
}

export default Retweets
