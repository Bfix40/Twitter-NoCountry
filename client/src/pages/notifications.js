import { StarIcon } from '@/components/icons'
import { useGetAllTweetsQuery } from '@/redux/services/tweetsApi';
import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const Notifications = () => {
  const { isLoading, data } = useGetAllTweetsQuery(undefined, {
    refetchOnReconnect: true,
  });

  return (
    <>
    <Head>
      <title>Notificaciones / Twitter</title>
    </Head>
    <div className="sticky top-0 z-10 p-5 bg-white/75 backdrop-blur-md dark:bg-black/70 dark:text-[#e7e9ea] border-b border-b-black/10 dark:border-b-white/20">
      <h2 className="text-xl font-bold">Notificaciones</h2>
    </div>
    {
      !isLoading && data !== undefined
        ? data
          .filter((tweet) => tweet.author && !tweet.isRetweet && tweet.content)
          .map((tweet) => (
          <Link href={`/tweet/${tweet._id}`} key={tweet._id} className='flex p-5 gap-3 font-semibold w-full border-b border-black/10 dark:border-white/20 dark:text-white'>
            <StarIcon size={32} />
            <div className='flex flex-col gap-1 max-w-[70%]'>
              <Image
                className="h-9 w-9 object-cover rounded-full"
                src={tweet?.author?.image}
                alt={tweet?.author?.name}
                width={100}
                height={100}
              />
              <p>{tweet?.author?.name}</p>
              <p className='truncate text-gray-500'>{tweet.content}</p>
            </div>
          </Link>
          )
          )
        : null
    }
    </>
  )
}

export default Notifications
