import React, { useEffect, useState } from 'react'
import { useLikeTweetMutation, useLikeCommentMutation, useDislikeCommentMutation } from '@/redux/services/tweetsApi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useSession } from "next-auth/react";

const Likes = ({ _id, likes = [], isComment }) => {
  const { data: session } = useSession();
  const loggedInUserId = session?.user?._id;
  const [isLiked, setIsLiked] = useState(likes.find(like => like._id === loggedInUserId || like === loggedInUserId));
  const [likeTweet] = useLikeTweetMutation()
  const [likeComment] = useLikeCommentMutation()
  const [dislikeComment] = useDislikeCommentMutation()
  const formatNum = (num) => (num === 0 ? "" : num);

  useEffect(() => {
    setIsLiked(likes.find(like => like._id === loggedInUserId || like === loggedInUserId))
  }, [loggedInUserId, likes])

  const onClickLike = async () => {
    if (session) {
      if (isComment) {
        isLiked ? dislikeComment({ commentId: _id, token: session.token }) : likeComment({ commentId: _id, token: session.token })
      } else {
        likeTweet({ tweetId: _id, token: session.token })
      }
      setIsLiked(!isLiked)
    }
  }

  return (
        <div onClick={onClickLike} className={`flex items-center align-middle space-x-1 cursor-pointer group ${isLiked ? 'text-[#f91880]' : 'hover:text-[#f91880]'}`} >
            {isLiked ? <AiFillHeart className='icons group-hover:bg-[#f91880]/10' title='Me gusta' /> : <AiOutlineHeart className='icons group-hover:bg-[#f91880]/10' title='Me gusta' />}
            <p className='text-sm max-sm:text-xs' >{formatNum(likes.length)}</p>
        </div>
  )
}

export default Likes
