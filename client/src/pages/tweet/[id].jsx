import React, { useContext } from 'react'
import Head from "next/head"
import { useRouter } from "next/router"
import { HiArrowLeft } from 'react-icons/hi2'
import { useGetTweetByIdQuery } from "@/redux/services/tweetsApi";
import Tweet from '@/components/Tweet';
import { AppContext } from '@/context/AppContext';
import Modal from '@/components/Modal';
import CommentById from '@/components/CommentById';
const TweetId = () => {
  const { query, back } = useRouter();
  const [appContext] = useContext(AppContext)

  const { isLoading, data, isError, isSuccess } = useGetTweetByIdQuery(query.id, {
    refetchOnReconnect: true,
  });

  return (
    <>
      <Head>
        <title>{data?.author?.name} en Twitter</title>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={`Tweet de ${data?.author.name}`} />
        <meta name="description" content={data?.content} />
      </Head>
      <Header back={back} />
      {
        (isLoading) ? (
          <div className='w-screen h-screen absolute z-[99999999] top-0 left-0 bottom-0 rigth-0 bg-black/40' >
          </div>
        )
          : (
              null
            )
      }
      {
        isError ? (
          <div className="grid place-content-center my-40 text-center gap-y-8 dark:text-white">
            <p className="text-7xl font-semibold">Oops</p>
            <p className="text-3xl font-semibold">Esta pagina no existe.</p>
          </div>
        ) : null
      }

      {
        isSuccess ? (
          <>
            <Tweet {...data} />
            {
              data.comments.length ? (
                data.comments.map(comment => <CommentById key={comment} id={comment} />)
              ) : null
            }
            {/* <Post {...data} /> */}
            {appContext.active ? <Modal /> : null}
          </>
        ) : null
      }

    </>
  )
}

export default TweetId

const Header = ({ back }) => {
  return (
    <div className="sticky top-0 z-10  bg-white/75 backdrop-blur-md dark:bg-black/70 dark:text-[#e7e9ea]">
      <div className="flex items-center justify-start gap-8 px-4 py-4">
        <button
          onClick={() => back()}
        >
          <HiArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold">Tweet</h2>
        </div>
      </div>
    </div>
  );
};
