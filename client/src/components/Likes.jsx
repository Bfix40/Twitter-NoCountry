import React, { useState } from 'react'
import { useLikeTweetMutation } from '@/redux/services/tweetsApi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useSession } from "next-auth/react";

const Likes = ({ _id, author, likes }) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(session ? likes.find(el => el._id === session.user._id) : false)
  const [likeTweet] = useLikeTweetMutation()
  const onLikeTweet = async (tweetId, userId) => likeTweet(tweetId, userId)
  const formatNum = (num) => (num === 0 ? "" : num);

  const onClickLike = () => {
    onLikeTweet(_id, author._id)
    setIsLiked(!isLiked)
  }

  return (
        <div onClick={onClickLike} className={`flex items-center align-middle space-x-1 cursor-pointer group ${isLiked ? 'text-[#f91880]' : 'hover:text-[#f91880]'}`} >
            {isLiked ? <AiFillHeart className='icons group-hover:bg-[#f91880]/10' title='Me gusta' /> : <AiOutlineHeart className='icons group-hover:bg-[#f91880]/10' title='Me gusta' />}
            <p className='text-sm' >{formatNum(likes.length)}</p>
        </div>
  )
}

export default Likes
