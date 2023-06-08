import { useGetTopHashtagsQuery } from '@/redux/services/tweetsApi';
import Head from 'next/head';
import React from 'react'
import { SlOptions } from 'react-icons/sl'

const Explore = () => {
  const { data: hashtags, isSuccess: cargoHashtags } = useGetTopHashtagsQuery({
    refetchOnReconnect: true,
  });

  return (
    <>
    <Head>
      <title>Explorar / Twitter</title>
    </Head>

    <div className="w-full h-full overflow-y-scroll">
      <div className="sticky top-0 w-full bg-white py-1 dark:bg-black">
        <div className="group flex m-2 items-center gap-3 overflow-hidden rounded-3xl border border-black/20 bg-slate-100/20 px-3 transition duration-200 focus-within:border-[#1d9bf0] dark:border-white/20 dark:bg-slate-500/20 dark:focus-within:border-[#1d9bf0]">
          <button>
            <SearchIcon size={24} opacity={true} />
          </button>
          <input
            type="text"
            className="w-full bg-transparent py-2.5 outline-none text-black dark:text-white"
            placeholder="Buscar en Twitter"
          ></input>
        </div>
      </div>

      <div className='flex items-center py-4 px-3 border-y dark:border-white/20 border-black/5 bg-white dark:bg-black dark:hover:bg-white/5 hover:bg-black/5 text-[#536471] dark:text-[#e7e9ea]'>
        <span className='text-lg font-extrabold text-black dark:text-white' >Tendencias</span>
      </div>

      {
        cargoHashtags ? (
          [...hashtags].sort((x, y) => y.count - x.count).map(el => (
            <div key={el.hashtag} className='flex flex-col pt-1 justify-between border-b dark:border-white/20 border-black/5 bg-white dark:bg-black dark:hover:bg-white/5 hover:bg-black/5 text-[#536471] dark:text-[#e7e9ea]'>
              <div className='flex flex-row px-4 -mb-2' >
                <span>Tendencia</span>
                <div className='cursor-pointer ml-auto hover:text-[#1d9bf0] group'>
                  <SlOptions className='icons w-10 h-10 group-hover:bg-[#1C9BEF]/10' title='Mas opciones' />
                </div>
              </div>
              <span className='px-4 text-lg font-bold text-black dark:text-white' >#{el.hashtag}</span>
              <span className='py-3 px-4 text-sm' >{el.count} {el.count === 1 ? "Tweet" : "Tweets"}</span>
            </div>
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map(el => (
            <div key={el} className="w-full mx-auto animate-pulse px-9 py-6 border-b dark:border-white/20 border-black/5 bg-white dark:bg-black text-[#536471] dark:text-[#e7e9ea]">
              <h1 className="h-2 bg-gray-300 rounded-lg w-52 dark:bg-gray-600"></h1>
              <p className="w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-64 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>
          ))
        )
      }
      {/* {
        cargoTopTweets ? topTweets
          .map((tweet) => tweet.isRetweet ? <Retweet key={tweet._id} {...tweet} /> : <Tweet key={tweet._id} {...tweet} />)
          : [1, 2, 3, 4, 5, 6, 7].map((tweet) => <SkeletonTweet key={tweet} />)
      } */}
    </div>
    </>
  )
}

function SearchIcon({ size, active, opacity }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={
        "group-focus-within:fill-[#1d9bf0] " +
        (opacity ? "dark:fill-white/20" : "dark:fill-white")
      }
    >
      <g>
        {active ? (
          <path d="M10.25 4.25c-3.314 0-6 2.686-6 6s2.686 6 6 6c1.657 0 3.155-.67 4.243-1.757 1.087-1.088 1.757-2.586 1.757-4.243 0-3.314-2.686-6-6-6zm-9 6c0-4.971 4.029-9 9-9s9 4.029 9 9c0 1.943-.617 3.744-1.664 5.215l4.475 4.474-2.122 2.122-4.474-4.475c-1.471 1.047-3.272 1.664-5.215 1.664-4.971 0-9-4.029-9-9z"></path>
        ) : (
          <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
        )}
      </g>
    </svg>
  );
}

export default Explore
