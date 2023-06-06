import React, { useContext } from 'react'
import { MdClose } from "react-icons/md"
import { AppContext } from '@/context/AppContext'
import Comment from "./Comment"
import { getTimeAgo } from './../../utils/formateadorTiemposRelativos';

const Modal = () => {
  const [appContext, setAppContext] = useContext(AppContext)
  const { post } = appContext

  const closeModal = async () => {
    setAppContext({ ...appContext, active: false })
  }

  return (
        <div className='fixed top-0 left-0 bottom-0 rigth-0 z-[99999] h-screen w-screen bg-black/40' onClick={closeModal}>

            <div className='bg-white dark:bg-black w-[350px] max-[640px]:w-full max-[640px]:h-full border dark:border-white/20 border-black/5 md:w-[650px] text-white absolute left-[50%] translate-x-[-50%] mt-[40px] max-[640px]:mt-0 p-4 rounded-[20px]'
                onClick={(e) => e.stopPropagation()}>

                <MdClose className='text-[22px] cursor-pointer text-black dark:text-white' onClick={closeModal} />

                <div className='relative mt-8 grid grid-cols-[48px,1fr] gap-4 '>

                    <div>
                        <img className='rounded-full' src={post?.author?.image} alt="" />
                    </div>

                    <div>
                        <div className='flex gap-2 text-[12px] text-black dark:text-white md:text-[16px]'>
                            <h1 className='font-bold'>{post?.author?.name}</h1>
                            <h2 className='text-gray-500'>{getTimeAgo(post.createdAt)}</h2>
                        </div>
                        <p className='text-[12px] text-black dark:text-white  md:text-[16px]'>{post.content}</p>

                        {post.images.length
                          ? <img src={post?.images} className='mt-2 max-h-[250px] rounded-[15px] object-cover' alt="" />
                          : null}

                        <p className='mt-4 text-gray-500'>Replying to: <span className='text-[#1d9bf0]'>@{post?.author?.username}</span></p>

                    </div>
                </div>
                    <Comment tweetId={post?._id} closeModal={closeModal} />
            </div>

        </div>
  )
}

export default Modal
