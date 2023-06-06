import Image from 'next/image'
import { BiMessageRounded } from 'react-icons/bi'
import { HiBadgeCheck } from 'react-icons/hi'
import { FiShare } from 'react-icons/fi'
import { SlOptions } from 'react-icons/sl'
import { IoStatsChart } from 'react-icons/io5'
import { IoIosLock } from 'react-icons/io'
import Likes from './Likes'
import Retweets from './Retweets'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'
import TimeAgo from './TimeAgo'

const Retweet = (props) => {
  const { originalTweet, author: originalAuthor } = props;
  const { author, timestamp, createdAt, content, images, comments, __v } = originalTweet
  const formatNum = (num) => (num === 0 ? "" : num);

  const { data: session } = useSession();
  const loggedInUserId = session?.user?._id;

  return (
      <div className='h-auto w-full flex flex-col p-4 items-start cursor-pointer border-b dark:border-white/20 border-black/5 bg-white dark:bg-black dark:hover:bg-white/5 hover:bg-black/5 text-[#536471] dark:text-[#e7e9ea]' >
        <div className='pb-2'>
        <Link href={"/" + originalAuthor?.username}>
            <div className="flex hover:underline">
          <HiOutlineArrowsUpDown className='icons group-hover:bg-[#00ba7c]/10' title='Retweetear' />
          <p className='self-center'>{originalAuthor?._id === loggedInUserId ? "Retwitteado por ti" : `${originalAuthor?.name} retwitteó`}</p>
        </div>
      </Link>
      </div>
      <div className='flex w-full h-auto items-start'>
            {
                (author?.image) ? (
                    <Link href={"/" + author?.username}><Image src={author.image} alt={author.name} width={64} height={64} className='h-12 w-12 rounded-full mr-4 hover:opacity-90' /></Link>)
                  : (
                        <svg className="text-gray-200 w-14 h-14 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                    )
            }
            <div className="w-full flex flex-col gap-1 text-[#536471] dark:bg-transparent" >
                <Link href={"/" + author?.username} className='flex flex-row items-start group gap-1 text-lg w-full' >
                    <h4 className="ml-2 inline-flex items-center align-middle font-bold text-black dark:text-[#e7e9ea] group-hover:underline" >{author?.name}
                        {
                            author?.private && <IoIosLock className='text-black dark:text-white ml-1' title='Cuenta verificada' />
                        }
                        {
                            author?.confirmed && <HiBadgeCheck className='text-[#1d9bf0] ml-1' title='Cuenta verificada' />
                        }
                    </h4>
                    <span>{'@' + author?.username}</span>
                    {
                        (timestamp || createdAt) && <TimeAgo timestamp={timestamp || createdAt} />
                    }
                </Link>
                <p className='ml-2 dark:text-white w-[90%]' >{content}</p>
                {
                    images.length ? (
                        <div className='max-w-fit max-h-fit py-2'>
                            <img src={images[0] || "https://pbs.twimg.com/media/FkWOB7-WQAAPLaU?format=jpg&name=small"} className="object-fit rounded-3xl" alt="postImg" />
                        </div>
                    ) : null
                }
                <div className='max-w-fit flex items-center gap-2' >
                    <div className='flex items-center align-middle space-x-1 cursor-pointer hover:text-[#1C9BEF] group' >
                        <BiMessageRounded className='icons group-hover:bg-[#1C9BEF]/10' title='Responder' />
                        <p className='text-sm' >{formatNum(comments.length)}</p>
                    </div>
                    <Retweets {...originalTweet}/>
                    <Likes {...originalTweet}/>
                    <div className='flex items-center align-middle space-x-1 cursor-pointer hover:text-[#1C9BEF] group' >
                        <IoStatsChart className='icons group-hover:bg-[#1C9BEF]/10' title='Ver' />
                        <p className='text-sm' >{__v}</p>
                    </div>
                    <div className='flex items-center align-middle space-x-1 cursor-pointer hover:text-[#1d9bf0] group' >
                        <FiShare className='icons group-hover:bg-[#1d9bf0]/10' title='Compartir' />
                    </div>
                </div>
            </div>
            <div className='w-auto flex items-center align-middle -ml-5 cursor-pointer hover:text-[#1d9bf0] group' >
                <SlOptions className='icons w-10 h-10 group-hover:bg-[#1C9BEF]/10' title='Mas opciones' />
            </div>
            </div>
        </div>
  )
}

export default Retweet
