import { useGetCommentByIdQuery } from '@/redux/services/tweetsApi'
import React, { useContext } from 'react'
import { AppContext } from '@/context/AppContext';
import SkeletonTweet from './SkeletonTweet';
import Tweet from './Tweet';
import Modal from './Modal';

const CommentById = ({ id }) => {
  const { isLoading, data, isError, isSuccess } = useGetCommentByIdQuery(id, {
    refetchOnReconnect: true,
  });
  const [appContext] = useContext(AppContext)

  return (
    <div className="ml-8 border-l-2 border-[#1d9bf0] bg-white dark:bg-black" >
     {
        (isLoading) ? (
            < SkeletonTweet />
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
        <Tweet {...data} isComment={true} />
        {appContext.active ? <Modal /> : null}
        </>
        ) : null
    }

    </div>
  )
}

export default CommentById
