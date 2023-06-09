import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { HiBadgeCheck } from "react-icons/hi";
import { FiShare } from "react-icons/fi";
import { IoStatsChart } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import Likes from "./Likes";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { URL_CLIENT } from "../../utils/api";
import TimeAgo from "./TimeAgo";
import Retweets from "./Retweets";
import Options from "./Options";
import Content from "./Content";
const Tweet = (props) => {
  const {
    id,
    _id,
    content,
    timestamp = 0,
    author,
    comments = [],
    createdAt,
    __v,
    images = [],
    isComment = false,
  } = props;
  const formatNum = (num) => (num === 0 ? "" : num);
  const [appContext, setAppContext] = useContext(AppContext);
  const { data: session } = useSession();
  const onComment = () => {
    if (session) {
      setAppContext({
        ...appContext,
        post: { ...props },
        active: true,
      });
    }
  };

  const shareTweet = () => {
    if (navigator.share && !isComment) {
      navigator
        .share({
          title: `Compartir Tweet de ${author?.name}`,
          text: content,
          url: `${URL_CLIENT}/tweet/${_id}`,
        })
        .then(() => console.log("Tweet compartido"))
        .catch((error) => console.log("Error al compartir el tweet:", error));
    }
  };

  const handleImageError = (event) => {
    event.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG27rp6wCKcUSGuXvHpeSiFQNyHVBcak9LT5t57-dwI_KEEEtfRTvI8oBeYhCmrB9jQmw&usqp=CAU";
  };

  return (
    <div
      key={id}
      className="flex h-auto w-full cursor-pointer flex-row items-start border-b border-black/5 bg-white p-4 text-[#536471] hover:bg-black/5 dark:border-white/20 dark:bg-black dark:text-[#e7e9ea] dark:hover:bg-white/5"
    >
      {author?.image ? (
        <Link href={"/" + author?.username}>
          <Image
            src={author.image}
            alt={author.name}
            onError={handleImageError}
            width={64}
            height={64}
            className="mr-4 h-12 w-12 rounded-full hover:opacity-90"
          />
        </Link>
      ) : (
        <svg
          className="h-14 w-14 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
      <div className="flex w-full flex-col gap-1 text-[#536471] dark:bg-transparent">
        {isComment ? (
          <>
            <div className="group flex w-full flex-row items-baseline gap-1 text-lg">
              <Link href={"/" + author?.username}>
                <h4
                  className={` mx-2 inline-flex items-center align-baseline font-bold text-black group-hover:underline dark:text-[#e7e9ea] max-sm:text-xs`}
                >
                  {author.name.length <= 18
                    ? author.name
                    : `${author.name.slice(0, 17)}...`}
                  {author?.private && (
                    <IoIosLock
                      className="ml-1 text-black dark:text-white"
                      title="Cuenta verificada"
                    />
                  )}
                  {author?.confirmed && (
                    <HiBadgeCheck
                      className="ml-1 text-[#1d9bf0]"
                      title="Cuenta verificada"
                    />
                  )}
                </h4>
              </Link>
              <span className="max-sm:text-xs">{"@" + author?.username}</span>
              {(timestamp || createdAt) && (
                <TimeAgo
                  styleds={"max-sm:text-xs "}
                  timestamp={timestamp || createdAt}
                />
              )}
            </div>
            <Content content={content} />
            {images?.length ? (
              <div className="max-h-fit max-w-fit py-2">
                <img
                  src={images[0]}
                  className="object-fit rounded-3xl border border-black/5 dark:border-white/20 "
                  onError={handleImageError}
                  alt="postImg"
                />
              </div>
            ) : null}
          </>
        ) : (
          <Link href={`/tweet/${_id}`}>
            <div className="group flex w-full flex-row items-baseline gap-1">
              <Link href={"/" + author?.username}>
                <h4
                  className={` mx-2 inline-flex items-center align-middle font-bold text-black group-hover:underline dark:text-[#e7e9ea] max-sm:text-xs`}
                >
                  {author?.name.length <= 18
                    ? author.name
                    : `${author?.name.slice(0, 17)}...`}
                  {author?.private && (
                    <IoIosLock
                      className="ml-1 text-black dark:text-white"
                      title="Cuenta verificada"
                    />
                  )}
                  {author?.confirmed && (
                    <HiBadgeCheck
                      className="ml-1 text-[#1d9bf0]"
                      title="Cuenta verificada"
                    />
                  )}
                </h4>
              </Link>
              <span className="max-sm:text-xs ">{"@" + author?.username}</span>
              {(timestamp || createdAt) && (
                <TimeAgo
                  styleds={"max-sm:text-xs "}
                  timestamp={timestamp || createdAt}
                />
              )}
            </div>
            <Content content={content} />
            {images?.length ? (
              <div className="max-h-fit max-w-fit py-2">
                <img
                  src={images[0]}
                  onError={handleImageError}
                  className="object-fit rounded-3xl border border-black/5 dark:border-white/20 "
                  alt="postImg"
                />
              </div>
            ) : null}
          </Link>
        )}
        <div className="flex max-w-fit items-center gap-2">
          {isComment ? null : (
            <>
              <div
                onClick={onComment}
                className="group flex cursor-pointer items-center space-x-1 align-middle hover:text-[#1C9BEF]"
              >
                <BiMessageRounded
                  className="icons group-hover:bg-[#1C9BEF]/10"
                  title="Responder"
                />
                <p className="text-sm max-sm:text-xs">
                  {formatNum(comments.length)}
                </p>
              </div>
              <Retweets {...props} loggedInUserId={session?.user?._id} />
            </>
          )}
          <Likes {...props} isComment={isComment} />
          <div className="group flex cursor-pointer items-center space-x-1 align-middle hover:text-[#1C9BEF]">
            <IoStatsChart
              className="icons group-hover:bg-[#1C9BEF]/10"
              title="Ver"
            />
            <p className="text-sm max-sm:text-xs">{__v}</p>
          </div>
          <div
            onClick={shareTweet}
            className="group flex cursor-pointer items-center space-x-1 align-middle hover:text-[#1d9bf0]"
          >
            <FiShare
              className="icons group-hover:bg-[#1d9bf0]/10"
              title="Compartir"
            />
          </div>
        </div>
      </div>
      <Options {...props} user={session?.user} token={session?.token} />
    </div>
  );
};

export default Tweet;
