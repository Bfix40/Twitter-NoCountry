import React, { useContext } from 'react'
import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import { BiMessageRounded } from 'react-icons/bi'
import { HiBadgeCheck } from 'react-icons/hi'
import { FiShare } from 'react-icons/fi'
import { IoStatsChart } from 'react-icons/io5'
import { IoIosLock } from 'react-icons/io'
import Likes from './Likes'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { URL_CLIENT } from '../../utils/api'
import TimeAgo from './TimeAgo'
import Retweets from './Retweets'
import Options from './Options'
const Tweet = (props) => {
  const { id, _id, content, timestamp = 0, author, comments = [], createdAt, __v, images = [], isComment = false } = props
  const formatNum = (num) => (num === 0 ? "" : num);
  const [appContext, setAppContext] = useContext(AppContext)
  const { data: session } = useSession();
  const onComment = () => {
    if (session) {
      setAppContext({
        ...appContext,
        post: { ...props },
        active: true
      })
    }
  }

  const shareTweet = () => {
    if (navigator.share && !isComment) {
      navigator.share({
        title: `Compartir Tweet de ${author?.name}`,
        text: content,
        url: `${URL_CLIENT}/tweet/${_id}`
      })
        .then(() => console.log('Tweet compartido'))
        .catch((error) => console.log('Error al compartir el tweet:', error));
    }
  };

  const handleImageError = (event) => {
    event.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG27rp6wCKcUSGuXvHpeSiFQNyHVBcak9LT5t57-dwI_KEEEtfRTvI8oBeYhCmrB9jQmw&usqp=CAU";
  };

  return (
        <div key={id} className='h-auto w-full flex flex-row p-4 items-start cursor-pointer border-b dark:border-white/20 border-black/5 bg-white dark:bg-black dark:hover:bg-white/5 hover:bg-black/5 text-[#536471] dark:text-[#e7e9ea]' >
            {
                (author?.image) ? (
                    <Link href={"/" + author?.username}><Image src={author.image} alt={author.name} onError={handleImageError} width={64} height={64} className='h-12 w-12 rounded-full mr-4 hover:opacity-90' /></Link>)
                  : (
                        <svg className="text-gray-200 w-14 h-14 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                    )
            }
            <div className="w-full flex flex-col gap-1 text-[#536471] dark:bg-transparent" >
                {isComment ? (
                    <>
                        <div className='flex flex-row items-start group gap-1 text-lg w-full' >
                            <Link href={"/" + author?.username}>
                                <h4 className={` mx-2 inline-flex items-center align-middle font-bold text-black dark:text-[#e7e9ea] group-hover:underline`} >{author.name.length <= 25 ? author.name : `${author.name.slice(0, 25)}...`}
                                    {
                                        author?.private && <IoIosLock className='text-black dark:text-white ml-1' title='Cuenta verificada' />
                                    }
                                    {
                                        author?.confirmed && <HiBadgeCheck className='text-[#1d9bf0] ml-1' title='Cuenta verificada' />
                                    }
                                </h4>
                            </Link>
                            <span>{'@' + author?.username}</span>
                            {
                                (timestamp || createdAt) && <TimeAgo timestamp={timestamp || createdAt} />
                            }
                        </div>
                        <p className='ml-2 dark:text-white w-[90%]' >{content}</p>
                        {
                            images?.length ? (
                                <div className='max-w-fit max-h-fit py-2'>
                                    <img src={images[0]} className="object-fit rounded-3xl border dark:border-white/20 border-black/5 " onError={handleImageError} alt="postImg" />
                                </div>
                            ) : null
                        }
                    </>
                ) : <Link href={`/tweet/${_id}`}>
                    <div className='flex flex-row items-start group gap-1 text-lg w-full' >
                        <Link href={"/" + author?.username}>
                            <h4 className={` mx-2 inline-flex items-center align-middle font-bold text-black dark:text-[#e7e9ea] group-hover:underline`} >{author.name.length <= 25 ? author.name : `${author.name.slice(0, 25)}...`}
                                {
                                    author?.private && <IoIosLock className='text-black dark:text-white ml-1' title='Cuenta verificada' />
                                }
                                {
                                    author?.confirmed && <HiBadgeCheck className='text-[#1d9bf0] ml-1' title='Cuenta verificada' />
                                }
                            </h4>
                        </Link>
                        <span>{'@' + author?.username}</span>
                        {
                            (timestamp || createdAt) && <TimeAgo timestamp={timestamp || createdAt} />
                        }
                    </div>
                    <p className='ml-2 dark:text-white w-[90%]' >{content}</p>
                    {
                        images?.length ? (
                            <div className='max-w-fit max-h-fit py-2'>
                                <img src={images[0]} onError={handleImageError} className="object-fit rounded-3xl border dark:border-white/20 border-black/5 " alt="postImg" />
                            </div>
                        ) : null
                    }
                </Link>}
                <div className='max-w-fit flex items-center gap-2' >
                    {
                        isComment ? null
                          : (
                                <>
                                    <div onClick={onComment} className='flex items-center align-middle space-x-1 cursor-pointer hover:text-[#1C9BEF] group' >
                                        <BiMessageRounded className='icons group-hover:bg-[#1C9BEF]/10' title='Responder' />
                                        <p className='text-sm' >{formatNum(comments.length)}</p>
                                    </div>
                                    <Retweets {...props} loggedInUserId={session?.user?._id} />
                                </>
                            )
                    }
                    <Likes {...props} isComment={isComment} />
                    <div className='flex items-center align-middle space-x-1 cursor-pointer hover:text-[#1C9BEF] group' >
                        <IoStatsChart className='icons group-hover:bg-[#1C9BEF]/10' title='Ver' />
                        <p className='text-sm' >{__v}</p>
                    </div>
                    <div onClick={shareTweet} className='flex items-center align-middle space-x-1 cursor-pointer hover:text-[#1d9bf0] group' >
                        <FiShare className='icons group-hover:bg-[#1d9bf0]/10' title='Compartir' />
                    </div>
                </div>
            </div>
            <Options {...props} user={session?.user} />
        </div>
  )
}

export default Tweet
